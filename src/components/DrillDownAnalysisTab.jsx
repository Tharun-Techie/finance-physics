import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { SECTORS, METRICS } from '../data/mockData';
import { Sparkles, Play, RotateCcw, AlertCircle, Zap, Shield } from 'lucide-react';

// Localized 3D Spring simulation component
function SpringSimulationScene({ 
  primaryAsset, 
  peers, 
  shockVal, 
  shockType, 
  damping, 
  elasticity, 
  isRunning,
  onNodeHover,
  selectedPeerSymbol,
  onSelectPeer
}) {
  // We keep track of node positions and velocities in local state inside R3F
  // Primary node is at [0,0,0], but can wobble or move on shock.
  // Peer nodes are initialized in a circle or sphere around the primary.
  const nodesRef = useRef({});
  const lineRefs = useRef([]);

  useEffect(() => {
    // Initialize nodes
    const initialNodes = {};
    
    // Central node
    initialNodes[primaryAsset.symbol] = {
      pos: new THREE.Vector3(0, 0, 0),
      vel: new THREE.Vector3(0, 0, 0),
      mass: 5,
      isPrimary: true,
      color: SECTORS[primaryAsset.sector]?.color || '#00f2fe',
      symbol: primaryAsset.symbol,
      asset: primaryAsset
    };

    // Peer nodes
    peers.forEach((peer, idx) => {
      const angle = (idx / peers.length) * Math.PI * 2;
      const radius = 6 + Math.random() * 2;
      // Position them on a plane or sphere
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 4;
      const z = Math.sin(angle) * radius;

      initialNodes[peer.symbol] = {
        pos: new THREE.Vector3(x, y, z),
        vel: new THREE.Vector3(0, 0, 0),
        mass: 1.5,
        isPrimary: false,
        color: SECTORS[peer.sector]?.color || '#d946ef',
        symbol: peer.symbol,
        correlation: peer.correlation !== undefined ? peer.correlation : 0.75,
        asset: peer
      };
    });

    nodesRef.current = initialNodes;
  }, [primaryAsset, peers]);

  // Handle shock application
  useEffect(() => {
    if (shockVal !== 0 && isRunning) {
      // Apply sudden force/velocity outward from central node
      const nodes = nodesRef.current;
      if (nodes[primaryAsset.symbol]) {
        // Shock pushes center or accelerates it
        const dir = new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ).normalize();
        
        // Velocity boost proportional to shock
        nodes[primaryAsset.symbol].vel.addScaledVector(dir, shockVal * 0.3);
      }
    }
  }, [shockVal, isRunning, primaryAsset.symbol]);

  useFrame((state, delta) => {
    if (!isRunning) return;

    // Cap delta to prevent crazy physics explosions on tab switch
    const dt = Math.min(delta, 0.05);
    const nodes = nodesRef.current;
    if (!nodes[primaryAsset.symbol]) return;

    const primaryNode = nodes[primaryAsset.symbol];

    // Compute forces
    const forces = {};
    Object.keys(nodes).forEach(symbol => {
      forces[symbol] = new THREE.Vector3(0, 0, 0);
    });

    // 1. Hooke's Law Spring forces between primary and peers
    Object.keys(nodes).forEach(symbol => {
      if (symbol === primaryAsset.symbol) return;
      const node = nodes[symbol];

      // Vector from peer to primary
      const diff = new THREE.Vector3().subVectors(primaryNode.pos, node.pos);
      const dist = diff.length();
      
      // Rest length of spring is proportional to correlation (stronger correlation = closer rest distance)
      const restLength = 6 - (node.correlation * 3.5); 
      
      // Spring force: F = -k * (x - rest_x)
      const springStiffness = elasticity * 2.0;
      const displacement = dist - restLength;
      const forceMag = springStiffness * displacement;
      
      const springForce = diff.clone().normalize().multiplyScalar(forceMag);
      
      // Apply force to peer (towards primary)
      forces[symbol].add(springForce);
      // Equal and opposite force on primary
      forces[primaryAsset.symbol].sub(springForce);
    });

    // 2. Local repulsion between peers to prevent overlaps (Coulomb-like)
    const keys = Object.keys(nodes);
    for (let i = 0; i < keys.length; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        const symbolA = keys[i];
        const symbolB = keys[j];
        const nodeA = nodes[symbolA];
        const nodeB = nodes[symbolB];

        const diff = new THREE.Vector3().subVectors(nodeB.pos, nodeA.pos);
        const dist = diff.length();
        if (dist < 3.5) {
          // Repulsive force
          const forceMag = 1.2 / (dist * dist + 0.1);
          const repForce = diff.clone().normalize().multiplyScalar(forceMag);
          
          forces[symbolB].add(repForce);
          forces[symbolA].sub(repForce);
        }
      }
    }

    // 3. Central gravity restoring force towards center (0,0,0) to keep the whole system from drifting away
    Object.keys(nodes).forEach(symbol => {
      const node = nodes[symbol];
      const restForce = node.pos.clone().multiplyScalar(-0.15);
      forces[symbol].add(restForce);
    });

    // Update positions and velocities
    Object.keys(nodes).forEach(symbol => {
      const node = nodes[symbol];
      const force = forces[symbol];

      // Acceleration = Force / Mass
      const acc = force.clone().divideScalar(node.mass);
      
      // Update velocity: V = V + A * dt
      node.vel.addScaledVector(acc, dt);
      
      // Apply damping friction
      node.vel.multiplyScalar(1 - damping * 0.1);
      
      // Update position: P = P + V * dt
      node.pos.addScaledVector(node.vel, dt);
    });
  });

  return (
    <group>
      {/* Background Starfield */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.0} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#00f2fe" distance={15} />

      {/* Grid rings */}
      {[2, 4, 6, 8, 10].map(r => (
        <mesh key={r} rotation={[Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <ringGeometry args={[r - 0.02, r + 0.02, 64]} />
          <meshBasicMaterial color="#1e293b" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Connection Lines (Springs) */}
      {peers.map((peer) => {
        return (
          <SpringLine
            key={peer.symbol}
            nodesRef={nodesRef}
            symbolA={primaryAsset.symbol}
            symbolB={peer.symbol}
          />
        );
      })}

      {/* Render Nodes */}
      {Object.keys(nodesRef.current).map(symbol => {
        const node = nodesRef.current[symbol];
        if (!node) return null;
        const isSelected = selectedPeerSymbol === symbol;

        return (
          <InteractiveNode
            key={symbol}
            node={node}
            isSelected={isSelected}
            onClick={() => onSelectPeer(symbol)}
            onHover={onNodeHover}
          />
        );
      })}
    </group>
  );
}

// Helper to draw animated spring line on frame
function SpringLine({ nodesRef, symbolA, symbolB }) {
  const lineRef = useRef();

  useFrame(() => {
    if (lineRef.current) {
      const nodeA = nodesRef.current[symbolA];
      const nodeB = nodesRef.current[symbolB];
      if (nodeA && nodeB) {
        lineRef.current.setPoints([
          [nodeA.pos.x, nodeA.pos.y, nodeA.pos.z],
          [nodeB.pos.x, nodeB.pos.y, nodeB.pos.z]
        ]);
      }
    }
  });

  return (
    <Line
      ref={lineRef}
      points={[[0,0,0], [0,0,0]]}
      color="#475569"
      lineWidth={1.5}
      transparent
      opacity={0.5}
    />
  );
}

// Interactive node mesh with label
function InteractiveNode({ node, isSelected, onClick, onHover }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(node.pos);
    }
  });

  const size = node.isPrimary ? 1.4 : 0.75;

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(node.asset);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={node.color}
          roughness={0.1}
          metalness={0.8}
          emissive={node.color}
          emissiveIntensity={hovered || isSelected ? 0.9 : 0.3}
        />
        {/* Glow halo */}
        {(hovered || isSelected) && (
          <mesh>
            <sphereGeometry args={[size * 1.3, 16, 16]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.15} />
          </mesh>
        )}
        
        {/* Text Symbol inside group */}
        <Text
          position={[0, size + 0.4, 0]}
          color="#f8fafc"
          fontSize={0.45}
          font="https://fonts.gstatic.com/s/outfit/v11/o7glCpwuz7To7Twy6Nf7.woff"
          anchorX="center"
          backgroundColor="rgba(9, 11, 23, 0.85)"
          padding={[0.06, 0.15]}
          borderRadius={0.05}
        >
          {node.symbol}
        </Text>
      </mesh>
    </group>
  );
}

// Main Drill Down Analysis Component
export default function DrillDownAnalysisTab({ asset, fullAssetList, onCloseTab }) {
  const [shockVal, setShockVal] = useState(0);
  const [shockType, setShockType] = useState('earnings');
  const [damping, setDamping] = useState(3.0); // friction
  const [elasticity, setElasticity] = useState(5.0); // spring strength
  const [isRunning, setIsRunning] = useState(true);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedPeer, setSelectedPeer] = useState(null);

  // Filter 6 most correlated peers in same sector or high correlation
  const peers = React.useMemo(() => {
    return fullAssetList
      .filter(a => a.symbol !== asset.symbol)
      .map(a => {
        // Calculate dynamic correlation distance
        const isSameSector = a.sector === asset.sector;
        const correlation = a.correlation !== undefined 
          ? a.correlation 
          : (isSameSector ? 0.82 : 0.35);
        return { ...a, correlation };
      })
      .sort((a, b) => b.correlation - a.correlation)
      .slice(0, 6);
  }, [asset, fullAssetList]);

  // When a peer node is selected, show details
  const handleSelectPeer = (symbol) => {
    const peerAsset = fullAssetList.find(a => a.symbol === symbol);
    setSelectedPeer(peerAsset);
  };

  const triggerShock = (val) => {
    setShockVal(val);
    setTimeout(() => setShockVal(0), 150); // reset trigger
  };

  return (
    <div style={{ flex: 1, display: 'flex', height: '100%', overflow: 'hidden' }}>
      
      {/* Simulation Controls Panel (Left side) */}
      <div className="sidebar" style={{ borderRight: '1px solid var(--border-color)', borderLeft: 'none' }}>
        <div className="sidebar-header">
          <span className="sidebar-title">
            <Zap size={16} className="text-primary" />
            Shock Transmission Model
          </span>
        </div>

        <div className="sidebar-content">
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            Test the propagation of shocks through market correlations. The central node represents <strong>{asset.name}</strong>. Peers are tethered via structural correlation springs.
          </p>

          {/* Shock Controller Card */}
          <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span className="sidebar-section-title">Apply Financial Shock</span>
            
            <div className="select-wrapper">
              <span className="select-label">Shock Dimension</span>
              <select className="select-field" value={shockType} onChange={(e) => setShockType(e.target.value)}>
                <option value="earnings">Earnings Surprise Shock</option>
                <option value="regulatory">Regulatory/Risk Penalty</option>
                <option value="liquidity">Liquidity Crunch Shock</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1, background: 'linear-gradient(135deg, var(--danger), #b91c1c)', color: '#fff', boxShadow: 'none' }}
                onClick={() => triggerShock(-15)}
              >
                Negative Shock (-15%)
              </button>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1, background: 'linear-gradient(135deg, var(--success), #047857)', color: '#fff', boxShadow: 'none' }}
                onClick={() => triggerShock(15)}
              >
                Positive Shock (+15%)
              </button>
            </div>
          </div>

          {/* Model Parameters Card */}
          <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span className="sidebar-section-title">Transmission Parameters</span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Spring Elasticity (Stiffness)</span>
                <span className="text-primary">{elasticity} k</span>
              </div>
              <input 
                type="range" 
                className="timeline-slider"
                min="1" 
                max="10" 
                step="0.5" 
                value={elasticity} 
                onChange={(e) => setElasticity(parseFloat(e.target.value))}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>System Damping (Friction)</span>
                <span className="text-primary">{damping} c</span>
              </div>
              <input 
                type="range" 
                className="timeline-slider"
                min="0.5" 
                max="8" 
                step="0.5" 
                value={damping} 
                onChange={(e) => setDamping(parseFloat(e.target.value))}
              />
            </div>
          </div>

          {/* Play/Pause state */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setIsRunning(!isRunning)}>
              {isRunning ? 'Pause Simulation' : 'Resume Simulation'}
            </button>
            <button 
              className="btn btn-secondary btn-icon-only" 
              onClick={() => {
                // Trigger a scene reset by forcing nodes to snap back
                setShockVal(0);
                setIsRunning(false);
                setTimeout(() => setIsRunning(true), 50);
              }}
              title="Reset positions"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Canvas Space */}
      <div style={{ flex: 1, height: '100%', position: 'relative' }}>
        
        {/* Hover Tooltip Overlay */}
        {hoveredNode && (
          <div className="hud-card glass-panel-elevated" style={{ top: '20px', left: '20px', padding: '12px', zIndex: 10 }}>
            <span className="asset-badge stock" style={{ fontSize: '9px', marginBottom: '4px', display: 'inline-block' }}>
              {hoveredNode.assetClass}
            </span>
            <h4 style={{ fontSize: '14px', fontWeight: 'bold' }}>{hoveredNode.name}</h4>
            <div style={{ display: 'flex', gap: '10px', fontSize: '11px', marginTop: '4px', color: 'var(--text-secondary)' }}>
              <span>Price: ${hoveredNode.price || hoveredNode.baseMetrics.price}</span>
              <span>Correlation: {(hoveredNode.correlation || 1.0).toFixed(2)}</span>
            </div>
          </div>
        )}

        <Canvas camera={{ position: [0, 8, 12], fov: 50 }}>
          <color attach="background" args={['#050711']} />
          <SpringSimulationScene
            primaryAsset={asset}
            peers={peers}
            shockVal={shockVal}
            shockType={shockType}
            damping={damping}
            elasticity={elasticity}
            isRunning={isRunning}
            onNodeHover={setHoveredNode}
            selectedPeerSymbol={selectedPeer?.symbol}
            onSelectPeer={handleSelectPeer}
          />
          <OrbitControls enableDamping dampingFactor={0.05} maxDistance={20} minDistance={4} />
        </Canvas>
      </div>

      {/* Right Details Dock for Local Node Selection */}
      <div className="detail-dock glass-panel" style={{ borderLeft: '1px solid var(--border-color)', borderRight: 'none' }}>
        {selectedPeer ? (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="detail-header">
              <button className="detail-close" onClick={() => setSelectedPeer(null)}>
                <X size={16} />
              </button>
              <span className={`asset-badge ${selectedPeer.assetClass === 'Stock' ? 'stock' : 'crypto'}`}>
                {selectedPeer.assetClass}
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700 }}>
                {selectedPeer.name}
              </h3>
              <code style={{ alignSelf: 'flex-start', color: 'var(--primary)', fontSize: '11px' }}>
                {selectedPeer.symbol}
              </code>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span className="sidebar-section-title" style={{ display: 'block', marginBottom: '8px' }}>
                  Relative Connection Detail
                </span>
                <div className="metric-card" style={{ padding: '12px' }}>
                  <span className="metric-card-label">Correlation Coefficient</span>
                  <span className="metric-card-value" style={{ color: 'var(--success)' }}>
                    {selectedPeer.correlation.toFixed(3)}
                  </span>
                  <p style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.3 }}>
                    A correlation of {selectedPeer.correlation.toFixed(2)} implies that {selectedPeer.symbol} shares a {Math.round(selectedPeer.correlation * 100)}% structural price elasticity profile relative to {asset.symbol}.
                  </p>
                </div>
              </div>

              <div>
                <span className="sidebar-section-title" style={{ display: 'block', marginBottom: '8px' }}>
                  Key Metrics Comparison
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>PE Ratio</span>
                    <span>{selectedPeer.baseMetrics.peRatio} vs {asset.baseMetrics.peRatio}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Volatility</span>
                    <span>{selectedPeer.baseMetrics.volatility}% vs {asset.baseMetrics.volatility}%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Market Cap</span>
                    <span>${selectedPeer.baseMetrics.marketCap}B vs ${asset.baseMetrics.marketCap}B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '20px', textAlign: 'center', gap: '10px' }}>
            <Shield size={32} className="text-secondary" style={{ opacity: 0.3 }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>No Peer Node Selected</span>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Click on any peripheral node in the spring system to inspect its relative metrics and correlation distance.</p>
          </div>
        )}
      </div>

    </div>
  );
}

// X close button local definition
function X({ size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
