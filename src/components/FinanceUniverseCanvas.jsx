import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { SECTORS } from '../data/mockData';
import { evaluateFormula } from '../utils/formulaParser';

// Component to handle dynamic coordinate updates and camera defaults
function SceneSetup({ fov }) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }, [fov, camera]);

  return null;
}

// Axis lines and grid labels
function CoordinateAxes({ xName, yName, zName, ranges, visible }) {
  if (!visible) return null;

  return (
    <group>
      {/* Grids */}
      {/* Bottom Grid (X-Z plane) */}
      <gridHelper args={[24, 24, '#1e293b', '#0f172a']} position={[0, -10, 0]} />
      {/* Back Grid (X-Y plane) */}
      <gridHelper args={[24, 24, '#1e293b', '#0f172a']} position={[0, 0, -12]} rotation={[Math.PI / 2, 0, 0]} />
      
      {/* X Axis (Cyan) */}
      <Line 
        points={[[-12, -10, -12], [12, -10, -12]]} 
        color="#00f2fe" 
        lineWidth={2} 
      />
      {/* Y Axis (Green) */}
      <Line 
        points={[[-12, -10, -12], [-12, 10, -12]]} 
        color="#10b981" 
        lineWidth={2} 
      />
      {/* Z Axis (Vivid Pink) */}
      <Line 
        points={[[-12, -10, -12], [-12, -10, 12]]} 
        color="#d946ef" 
        lineWidth={2} 
      />

      {/* Axis Labels */}
      <Text
        position={[0, -11, -12.5]}
        color="#00f2fe"
        fontSize={0.7}
        font="https://fonts.gstatic.com/s/outfit/v11/o7glCpwuz7To7Twy6Nf7.woff"
        anchorX="center"
        anchorY="middle"
      >
        {`X: ${xName}`}
      </Text>

      <Text
        position={[-13.5, 0, -12]}
        color="#10b981"
        fontSize={0.7}
        font="https://fonts.gstatic.com/s/outfit/v11/o7glCpwuz7To7Twy6Nf7.woff"
        rotation={[0, Math.PI / 4, 0]}
        anchorX="center"
        anchorY="middle"
      >
        {`Y: ${yName}`}
      </Text>

      <Text
        position={[-12.5, -11, 0]}
        color="#d946ef"
        fontSize={0.7}
        font="https://fonts.gstatic.com/s/outfit/v11/o7glCpwuz7To7Twy6Nf7.woff"
        rotation={[0, -Math.PI / 2, 0]}
        anchorX="center"
        anchorY="middle"
      >
        {`Z: ${zName}`}
      </Text>

      {/* Ticks on axes */}
      {[-10, -5, 0, 5, 10].map((tickVal) => {
        const getLabel = (axis) => {
          if (!ranges[axis]) return '';
          const ratio = (tickVal + 10) / 20;
          const actualVal = ranges[axis].min + ratio * (ranges[axis].max - ranges[axis].min);
          if (ranges[axis].max > 1000) {
            return (actualVal / 1000).toFixed(1) + 'k';
          }
          return actualVal.toFixed(1);
        };

        return (
          <group key={tickVal}>
            {/* X-ticks */}
            <Line 
              points={[[-12 + (tickVal + 10), -10, -12], [-12 + (tickVal + 10), -10.3, -12]]} 
              color="#00f2fe" 
              lineWidth={1}
            />
            <Text
              position={[-12 + (tickVal + 10), -10.6, -12]}
              color="#94a3b8"
              fontSize={0.4}
              anchorX="center"
            >
              {getLabel('x')}
            </Text>

            {/* Y-ticks */}
            <Line 
              points={[[-12, tickVal, -12], [-12.3, tickVal, -12]]} 
              color="#10b981" 
              lineWidth={1}
            />
            <Text
              position={[-12.6, tickVal, -12]}
              color="#94a3b8"
              fontSize={0.4}
              anchorX="right"
            >
              {getLabel('y')}
            </Text>

            {/* Z-ticks */}
            <Line 
              points={[[-12, -10, -12 + (tickVal + 10)], [-12.3, -10, -12 + (tickVal + 10)]]} 
              color="#d946ef" 
              lineWidth={1}
            />
            <Text
              position={[-12.6, -10, -12 + (tickVal + 10)]}
              color="#94a3b8"
              fontSize={0.4}
              rotation={[0, -Math.PI / 2, 0]}
              anchorX="center"
            >
              {getLabel('z')}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

// Single asset point component with Blender shading configuration
function AssetSphere({
  asset,
  pos,
  color,
  size,
  opacity,
  isSelected,
  onClick,
  onHover,
  showVectorLines,
  velocityVec,
  forceVec,
  shadingMode,
  materials
}) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      if (isSelected) {
        const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.08;
        meshRef.current.scale.set(size * pulse, size * pulse, size * pulse);
      } else {
        meshRef.current.scale.set(size, size, size);
      }
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    onHover(asset);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover(null);
    document.body.style.cursor = 'default';
  };

  // Adjust material specs based on Blender Viewport shading mode
  const isWireframe = shadingMode === 'wireframe';
  const isSolid = shadingMode === 'solid';

  const finalRoughness = isSolid ? 0.9 : materials.roughness;
  const finalMetalness = isSolid ? 0.1 : materials.metalness;
  const finalEmissive = isSolid ? '#000000' : color;
  const finalEmissiveIntensity = isSolid ? 0.0 : (hovered || isSelected ? materials.emissiveIntensity * 1.5 : materials.emissiveIntensity);

  return (
    <group position={pos}>
      {/* Selected Indicator Ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.5, size * 1.6, 32]} />
          <meshBasicMaterial color="#00f2fe" side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
      )}

      {/* Outer Glow Halo */}
      {shadingMode === 'rendered' && (hovered || isSelected) && (
        <mesh>
          <sphereGeometry args={[size * 1.3, 16, 16]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.15} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Main Sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(asset);
        }}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={finalRoughness}
          metalness={finalMetalness}
          transparent={opacity < 1 || materials.opacity < 1}
          opacity={opacity * materials.opacity}
          emissive={finalEmissive}
          emissiveIntensity={finalEmissiveIntensity}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Asset Label Text */}
      <Text
        position={[0, size + 0.5, 0]}
        color="#f8fafc"
        fontSize={0.45}
        font="https://fonts.gstatic.com/s/outfit/v11/o7glCpwuz7To7Twy6Nf7.woff"
        anchorX="center"
        anchorY="bottom"
        backgroundColor="rgba(9, 11, 23, 0.75)"
        padding={[0.08, 0.16]}
        borderRadius={0.08}
      >
        {asset.symbol}
      </Text>

      {/* Drop Lines to Coordinate Planes */}
      {isSelected && (
        <group>
          {/* To Floor (Y = -10) */}
          <Line 
            points={[[0, 0, 0], [0, -10 - pos[1], 0]]} 
            color="#94a3b8" 
            lineWidth={1.2} 
            dashed 
            dashSize={0.2} 
            gapSize={0.2} 
          />
          {/* To Back wall (Z = -12) */}
          <Line 
            points={[[0, 0, 0], [0, 0, -12 - pos[2]]]} 
            color="#94a3b8" 
            lineWidth={1.2} 
            dashed 
            dashSize={0.2} 
            gapSize={0.2} 
          />
          {/* To Left wall (X = -12) */}
          <Line 
            points={[[0, 0, 0], [-12 - pos[0], 0, 0]]} 
            color="#94a3b8" 
            lineWidth={1.2} 
            dashed 
            dashSize={0.2} 
            gapSize={0.2} 
          />
        </group>
      )}

      {/* Physics Vector Arrows (Velocity & Force) */}
      {isSelected && showVectorLines && (
        <group>
          {/* Velocity Vector (Cyan) */}
          {velocityVec && (velocityVec.x !== 0 || velocityVec.y !== 0 || velocityVec.z !== 0) && (
            <arrowHelper
              args={[
                new THREE.Vector3(velocityVec.x, velocityVec.y, velocityVec.z).normalize(),
                new THREE.Vector3(0, 0, 0),
                Math.min(3, Math.max(1.2, new THREE.Vector3(velocityVec.x, velocityVec.y, velocityVec.z).length() * 1.5)),
                '#00f2fe',
                0.3,
                0.15
              ]}
            />
          )}
          {/* Net Force Vector (Vivid Pink) */}
          {forceVec && (forceVec.x !== 0 || forceVec.y !== 0 || forceVec.z !== 0) && (
            <arrowHelper
              args={[
                new THREE.Vector3(forceVec.x, forceVec.y, forceVec.z).normalize(),
                new THREE.Vector3(0, 0, 0),
                Math.min(3, Math.max(1.2, new THREE.Vector3(forceVec.x, forceVec.y, forceVec.z).length() * 1.5)),
                '#d946ef',
                0.3,
                0.15
              ]}
            />
          )}
        </group>
      )}
    </group>
  );
}

// Draw connection lines representing correlations
function CorrelationConnections({ assets, positions, selectedAssetSymbol }) {
  const selectedIndex = assets.findIndex(a => a.symbol === selectedAssetSymbol);
  if (selectedIndex === -1) return null;

  const selectedAsset = assets[selectedIndex];
  const selectedPos = positions[selectedIndex];

  return (
    <group>
      {assets.map((asset, idx) => {
        if (asset.symbol === selectedAssetSymbol) return null;

        const isSameSector = asset.sector === selectedAsset.sector;
        const correlationVal = asset.correlation !== undefined 
          ? asset.correlation 
          : (isSameSector ? 0.8 : 0.3);

        if (correlationVal < 0.5) return null;

        const targetPos = positions[idx];
        const color = correlationVal > 0.8 ? '#00f2fe' : '#aa3bff';
        const opacity = (correlationVal - 0.5) * 2;

        return (
          <Line
            key={asset.symbol}
            points={[selectedPos, targetPos]}
            color={color}
            lineWidth={correlationVal * 3}
            transparent
            opacity={opacity * 0.5}
          />
        );
      })}
    </group>
  );
}

// Starfield Background with dynamic count settings
function Starfield({ count }) {
  const pointsRef = useRef();
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 55;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 55;
    }
    return pos;
  }, [count]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#94a3b8"
        size={0.05}
        transparent
        opacity={0.25}
        sizeAttenuation
      />
    </points>
  );
}

// 60FPS Physics solver engine component
function SimulationSolver({
  assets,
  dimensions,
  ranges,
  formulas,
  mode,
  onUpdatePhysics,
  activePositions,
  setActivePositions,
  gravityConstant = 1.0
}) {
  const physicsStateRef = useRef({});
  const throttleCountRef = useRef(0);

  // Initialize/Reset physics positions based on mapped metric targets
  const getMappedCoordinates = (asset) => {
    const xVal = asset.baseMetrics[dimensions.x] || 0;
    const yVal = asset.baseMetrics[dimensions.y] || 0;
    const zVal = asset.baseMetrics[dimensions.z] || 0;

    const xRange = ranges[dimensions.x] || { min: 0, max: 100 };
    const yRange = ranges[dimensions.y] || { min: 0, max: 100 };
    const zRange = ranges[dimensions.z] || { min: 0, max: 100 };

    const norm = (val, range) => {
      const min = range.min;
      const max = range.max;
      if (min === max) return 0;
      const clamped = Math.max(min, Math.min(max, val));
      return -10 + ((clamped - min) / (max - min)) * 20; // range [-10, 10]
    };

    return new THREE.Vector3(
      norm(xVal, xRange),
      norm(yVal, yRange),
      norm(zVal, zRange)
    );
  };

  useEffect(() => {
    // Reset positions whenever dimension mappings change, or assets load
    const initial = {};
    assets.forEach(asset => {
      const targetPos = getMappedCoordinates(asset);
      const existing = physicsStateRef.current[asset.symbol];
      initial[asset.symbol] = {
        pos: existing ? existing.pos.clone() : targetPos.clone(),
        vel: existing ? existing.vel.clone() : new THREE.Vector3(0, 0, 0),
        force: new THREE.Vector3(0, 0, 0)
      };
    });
    physicsStateRef.current = initial;
  }, [assets, dimensions, ranges]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05); // cap frame jump time
    const activeState = physicsStateRef.current;
    
    // 1. If in visualization mode, smoothly attract positions to target coordinates
    if (mode === 'visualization') {
      let changed = false;
      const nextPositions = {};

      assets.forEach(asset => {
        const stateNode = activeState[asset.symbol];
        if (!stateNode) return;

        const target = getMappedCoordinates(asset);
        stateNode.pos.lerp(target, 0.1);
        stateNode.vel.set(0, 0, 0);
        stateNode.force.set(0, 0, 0);

        nextPositions[asset.symbol] = {
          x: stateNode.pos.x,
          y: stateNode.pos.y,
          z: stateNode.pos.z
        };
      });

      // Periodically update app state
      throttleCountRef.current++;
      if (throttleCountRef.current % 3 === 0) {
        setActivePositions(nextPositions);
      }
      return;
    }

    // 2. Simulation Mode: Calculate dynamic physical forces
    if (mode === 'simulation') {
      const forceAcc = {};
      const physicsStats = {};

      // Initialize net forces
      assets.forEach(asset => {
        forceAcc[asset.symbol] = new THREE.Vector3(0, 0, 0);
        
        const vars = { ...asset.baseMetrics };
        physicsStats[asset.symbol] = {
          mass: Math.max(0.1, evaluateFormula(formulas.mass, vars)),
          velocity: evaluateFormula(formulas.velocity, vars),
          force: evaluateFormula(formulas.force, vars),
          gravity: evaluateFormula(formulas.gravity, vars),
          friction: Math.max(0, Math.min(1, evaluateFormula(formulas.friction, vars))),
          entropy: Math.max(0, evaluateFormula(formulas.entropy, vars)),
          equilibrium: evaluateFormula(formulas.equilibrium, vars)
        };
      });

      // Force A: Harmonic attraction to mapped target coordinate (Equilibrium Restoring force)
      assets.forEach(asset => {
        const node = activeState[asset.symbol];
        const stats = physicsStats[asset.symbol];
        if (!node || !stats) return;

        const target = getMappedCoordinates(asset);
        const diff = new THREE.Vector3().subVectors(target, node.pos);
        const eqForce = diff.clone().multiplyScalar(0.4); 
        forceAcc[asset.symbol].add(eqForce);
      });

      // Force B: Financial Gravity (Attraction between assets based on correlation)
      for (let i = 0; i < assets.length; i++) {
        for (let j = i + 1; j < assets.length; j++) {
          const assetA = assets[i];
          const assetB = assets[j];
          
          const nodeA = activeState[assetA.symbol];
          const nodeB = activeState[assetB.symbol];
          const statA = physicsStats[assetA.symbol];
          const statB = physicsStats[assetB.symbol];

          if (!nodeA || !nodeB || !statA || !statB) continue;

          const correlationVal = assetA.correlation !== undefined 
            ? assetA.correlation 
            : (assetA.sector === assetB.sector ? 0.8 : 0.35);

          if (correlationVal <= 0) continue; 

          const diff = new THREE.Vector3().subVectors(nodeB.pos, nodeA.pos);
          const distSq = diff.lengthSq();

          if (distSq < 1.0) continue; 

          const G = (statA.gravity + statB.gravity) * 0.2 * correlationVal * gravityConstant;
          const forceMag = G * (statA.mass * statB.mass) / (distSq + 2.0);
          
          const gravityForce = diff.clone().normalize().multiplyScalar(forceMag);
          
          forceAcc[assetA.symbol].add(gravityForce);
          forceAcc[assetB.symbol].sub(gravityForce);
        }
      }

      // Force C: Market Entropy (random jitter noise)
      assets.forEach(asset => {
        const stats = physicsStats[asset.symbol];
        if (!stats || stats.entropy <= 0) return;

        const jitter = new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ).normalize().multiplyScalar(stats.entropy * 0.2);

        forceAcc[asset.symbol].add(jitter);
      });

      // Force D: Buying/Selling Pressure pushes
      assets.forEach(asset => {
        const stats = physicsStats[asset.symbol];
        if (!stats || stats.force <= 0) return;

        const node = activeState[asset.symbol];
        if (node) {
          const push = new THREE.Vector3(0, stats.force * 0.05, 0); 
          forceAcc[asset.symbol].add(push);
        }
      });

      // Boundary restoration
      assets.forEach(asset => {
        const node = activeState[asset.symbol];
        if (!node) return;
        
        if (Math.abs(node.pos.x) > 13) {
          forceAcc[asset.symbol].x += node.pos.x > 0 ? -2.0 : 2.0;
        }
        if (node.pos.y > 11 || node.pos.y < -11) {
          forceAcc[asset.symbol].y += node.pos.y > 0 ? -2.0 : 2.0;
        }
        if (Math.abs(node.pos.z) > 13) {
          forceAcc[asset.symbol].z += node.pos.z > 0 ? -2.0 : 2.0;
        }
      });

      // Apply updates
      const nextPositions = {};
      const currentVelocities = {};
      const currentForces = {};

      assets.forEach(asset => {
        const node = activeState[asset.symbol];
        const stats = physicsStats[asset.symbol];
        if (!node || !stats) return;

        const netForce = forceAcc[asset.symbol];
        node.force.copy(netForce);

        const acc = netForce.clone().divideScalar(stats.mass);
        node.vel.addScaledVector(acc, dt);
        node.vel.multiplyScalar(Math.max(0, 1 - stats.friction * dt * 2.0));

        const speed = node.vel.length();
        if (speed > 8.0) {
          node.vel.normalize().multiplyScalar(8.0);
        }

        node.pos.addScaledVector(node.vel, dt);

        nextPositions[asset.symbol] = { x: node.pos.x, y: node.pos.y, z: node.pos.z };
        currentVelocities[asset.symbol] = { x: node.vel.x, y: node.vel.y, z: node.vel.z };
        currentForces[asset.symbol] = { x: node.force.x, y: node.force.y, z: node.force.z };
      });

      // Sync state back
      throttleCountRef.current++;
      if (throttleCountRef.current % 3 === 0) {
        setActivePositions(nextPositions);
        onUpdatePhysics(currentVelocities, currentForces);
      }
    }
  });

  return null;
}

export default function FinanceUniverseCanvas({
  assets,
  dimensions,
  mappings,
  mode,
  selectedAsset,
  onSelectAsset,
  onHoverAsset,
  formulas,
  ranges,
  onUpdatePhysics,
  activePositions,
  setActivePositions,
  velocities,
  forces,
  showVectorLines = true,
  sceneSettings,
  materials
}) {
  // Translate visual mappings (colors, size, opacity) based on the asset's active variables
  const assetVisuals = assets.map((asset) => {
    let color = 'hsl(200, 100%, 50%)';
    if (mappings.color === 'sector') {
      color = SECTORS[asset.sector]?.color || color;
    } else if (mappings.color === 'assetClass') {
      color = asset.assetClass === 'Stock' ? 'hsl(190, 100%, 50%)' : 'hsl(275, 100%, 60%)';
    } else {
      const val = asset.baseMetrics[mappings.color] || 0;
      const range = ranges[mappings.color] || { min: 0, max: 100 };
      const ratio = (val - range.min) / ((range.max - range.min) || 1);
      color = `hsl(${190 + ratio * 100}, 100%, 55%)`; 
    }

    let size = 0.55;
    const sizeVal = asset.baseMetrics[mappings.size] || 0;
    const sizeRange = ranges[mappings.size] || { min: 0, max: 100 };
    const sizeRatio = (sizeVal - sizeRange.min) / ((sizeRange.max - sizeRange.min) || 1);
    size = 0.3 + sizeRatio * 0.75; 

    let opacity = 0.85;
    const opacVal = asset.baseMetrics[mappings.opacity] || 0;
    const opacRange = ranges[mappings.opacity] || { min: 0, max: 100 };
    const opacRatio = (opacVal - opacRange.min) / ((opacRange.max - opacRange.min) || 1);
    opacity = 0.4 + opacRatio * 0.6; 

    return { color, size, opacity };
  });

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [12, 10, 16], fov: sceneSettings.cameraFov }}
        gl={{ antialias: true }}
        onPointerMissed={() => onSelectAsset(null)}
      >
        <color attach="background" args={['#04060f']} />
        
        {/* Sync Camera FOV */}
        <SceneSetup fov={sceneSettings.cameraFov} />
        
        {/* Environment Lights dynamically linked to World settings */}
        <ambientLight intensity={sceneSettings.ambientLight} />
        <pointLight position={[20, 20, 20]} intensity={sceneSettings.sunIntensity} decay={1} />
        <pointLight position={[-20, -20, -20]} intensity={0.5} color="#00f2fe" decay={1} />
        <directionalLight position={[0, 10, 0]} intensity={sceneSettings.sunIntensity * 0.5} />

        {/* Ambient star particles */}
        <Starfield count={sceneSettings.starCount} />

        {/* Dynamic 60FPS Simulation Physics Solver Hook */}
        <SimulationSolver
          assets={assets}
          dimensions={dimensions}
          ranges={ranges}
          formulas={formulas}
          mode={mode}
          onUpdatePhysics={onUpdatePhysics}
          activePositions={activePositions}
          setActivePositions={setActivePositions}
          gravityConstant={sceneSettings.gravityConstant}
        />

        {/* Coordinate grids & axes */}
        <CoordinateAxes
          xName={dimensions.x}
          yName={dimensions.y}
          zName={dimensions.z}
          ranges={ranges}
          visible={sceneSettings.gridVisible}
        />

        {/* Relationship lines connecting strongly correlated assets */}
        {selectedAsset && (
          <CorrelationConnections
            assets={assets}
            positions={assets.map(a => {
              const pos = activePositions[a.symbol];
              return pos ? [pos.x, pos.y, pos.z] : [0, 0, 0];
            })}
            selectedAssetSymbol={selectedAsset}
          />
        )}

        {/* Render Asset Nodes */}
        {assets.map((asset, index) => {
          const { color, size, opacity } = assetVisuals[index];
          const posData = activePositions[asset.symbol] || { x: 0, y: 0, z: 0 };
          const pos = [posData.x, posData.y, posData.z];
          const isSelected = selectedAsset === asset.symbol;
          
          const vel = velocities && velocities[asset.symbol] ? velocities[asset.symbol] : null;
          const forc = forces && forces[asset.symbol] ? forces[asset.symbol] : null;

          return (
            <AssetSphere
              key={asset.symbol}
              asset={asset}
              pos={pos}
              color={color}
              size={size}
              opacity={opacity}
              isSelected={isSelected}
              onClick={onSelectAsset}
              onHover={onHoverAsset}
              showVectorLines={sceneSettings.vectorsVisible}
              velocityVec={vel}
              forceVec={forc}
              shadingMode={sceneSettings.shadingMode}
              materials={materials}
            />
          );
        })}

        {/* Camera interaction controls */}
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05} 
          maxDistance={35} 
          minDistance={4} 
        />
      </Canvas>
    </div>
  );
}
