import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Zap, Play, Check } from 'lucide-react';
import { METRICS } from '../data/mockData';

// Types of nodes available in our Blender-style Finance Node Editor
const NODE_TYPES = {
  INPUT: 'input',
  MATH: 'math',
  OUTPUT: 'output'
};

const MATH_OPERATORS = [
  { id: 'add', name: 'Add (+)', symbol: '+' },
  { id: 'sub', name: 'Subtract (-)', symbol: '-' },
  { id: 'mul', name: 'Multiply (*)', symbol: '*' },
  { id: 'div', name: 'Divide (/)', symbol: '/' },
  { id: 'scale', name: 'Scale (x)', symbol: '*' }
];

export default function BlenderNodeEditor({ 
  onCompileFormulas,
  initialNodes = [],
  initialLinks = []
}) {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [draggedNode, setDraggedNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [activeConnection, setActiveConnection] = useState(null); // { nodeId, socketId, isOutput, x, y }
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [editorScale, setEditorScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef(null);
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  // Initialize nodes and links
  useEffect(() => {
    if (initialNodes.length > 0) {
      setNodes(initialNodes);
      setLinks(initialLinks);
    } else {
      // Default node layout: Connect Market Cap directly to Mass, Volatility to Entropy, etc.
      const defaultNodes = [
        { id: 'in-marketCap', type: NODE_TYPES.INPUT, name: 'Market Cap', metric: 'marketCap', x: 50, y: 50 },
        { id: 'in-volatility', type: NODE_TYPES.INPUT, name: 'Volatility', metric: 'volatility', x: 50, y: 180 },
        { id: 'in-momentum', type: NODE_TYPES.INPUT, name: 'Momentum', metric: 'momentum', x: 50, y: 310 },
        
        { id: 'math-scale-vol', type: NODE_TYPES.MATH, name: 'Scale Volatility', operator: 'scale', operand: '0.01', x: 260, y: 150 },
        { id: 'math-scale-mom', type: NODE_TYPES.MATH, name: 'Scale Momentum', operator: 'scale', operand: '0.1', x: 260, y: 330 },

        { id: 'out-mass', type: NODE_TYPES.OUTPUT, name: 'Mass (M)', param: 'mass', x: 500, y: 50 },
        { id: 'out-entropy', type: NODE_TYPES.OUTPUT, name: 'Entropy (Jitter)', param: 'entropy', x: 500, y: 180 },
        { id: 'out-velocity', type: NODE_TYPES.OUTPUT, name: 'Velocity (V)', param: 'velocity', x: 500, y: 310 }
      ];

      const defaultLinks = [
        { fromNode: 'in-marketCap', fromSocket: 'out', toNode: 'out-mass', toSocket: 'in' },
        { fromNode: 'in-volatility', fromSocket: 'out', toNode: 'math-scale-vol', toSocket: 'in' },
        { fromNode: 'math-scale-vol', fromSocket: 'out', toNode: 'out-entropy', toSocket: 'in' },
        { fromNode: 'in-momentum', fromSocket: 'out', toNode: 'math-scale-mom', toSocket: 'in' },
        { fromNode: 'math-scale-mom', fromSocket: 'out', toNode: 'out-velocity', toSocket: 'in' }
      ];

      setNodes(defaultNodes);
      setLinks(defaultLinks);
    }
  }, [initialNodes, initialLinks]);

  // Handle node compile whenever links or operand inputs change
  const compileGraph = (currentNodes = nodes, currentLinks = links) => {
    const formulas = {
      mass: '1.0',
      velocity: '0.1',
      force: '1.0',
      gravity: '1.0',
      friction: '0.1',
      entropy: '0.0',
      equilibrium: '30'
    };

    // Helper to traverse back from output node
    const getExprForSocket = (nodeId) => {
      const node = currentNodes.find(n => n.id === nodeId);
      if (!node) return '0';

      if (node.type === NODE_TYPES.INPUT) {
        return node.metric;
      }

      if (node.type === NODE_TYPES.MATH) {
        // Find what's connected to input of this math node
        const link = currentLinks.find(l => l.toNode === nodeId && l.toSocket === 'in');
        const lhs = link ? getExprForSocket(link.fromNode) : '0';
        
        const op = MATH_OPERATORS.find(o => o.id === node.operator);
        const symbol = op ? op.symbol : '*';
        const rhs = node.operand || '1';
        
        return `(${lhs} ${symbol} ${rhs})`;
      }

      return '0';
    };

    // Compile each output param
    const outputs = currentNodes.filter(n => n.type === NODE_TYPES.OUTPUT);
    outputs.forEach(outNode => {
      const link = currentLinks.find(l => l.toNode === outNode.id && l.toSocket === 'in');
      if (link) {
        formulas[outNode.param] = getExprForSocket(link.fromNode);
      } else {
        // Fallbacks
        if (outNode.param === 'mass') formulas.mass = '1.0';
        else if (outNode.param === 'friction') formulas.friction = '0.1';
        else formulas[outNode.param] = '0.0';
      }
    });

    onCompileFormulas(formulas, currentNodes, currentLinks);
  };

  // Add inputs and math nodes dynamically
  const addNode = (type, subType = '') => {
    const id = `node-${Date.now()}`;
    let newNode = {
      id,
      type,
      x: 100 - panOffset.x,
      y: 100 - panOffset.y
    };

    if (type === NODE_TYPES.INPUT) {
      newNode.name = subType;
      newNode.metric = subType;
    } else if (type === NODE_TYPES.MATH) {
      newNode.name = `Math (${subType.toUpperCase()})`;
      newNode.operator = subType;
      newNode.operand = '2.0';
    }

    const updated = [...nodes, newNode];
    setNodes(updated);
    compileGraph(updated, links);
  };

  // Delete node
  const deleteNode = (id) => {
    // Protect output nodes from deletion
    const node = nodes.find(n => n.id === id);
    if (node && node.type === NODE_TYPES.OUTPUT) return;

    const remainingNodes = nodes.filter(n => n.id !== id);
    const remainingLinks = links.filter(l => l.fromNode !== id && l.toNode !== id);

    setNodes(remainingNodes);
    setLinks(remainingLinks);
    compileGraph(remainingNodes, remainingLinks);
  };

  // Mouse handlers for node dragging
  const handleNodeMouseDown = (e, node) => {
    if (e.target.closest('.socket')) return; // ignore socket clicks
    setDraggedNode(node);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: (e.clientX - rect.left) / editorScale,
      y: (e.clientY - rect.top) / editorScale
    });
    e.stopPropagation();
  };

  const handleMouseMove = (e) => {
    if (draggedNode) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const nextX = Math.round((e.clientX - containerRect.left) / editorScale - dragOffset.x - panOffset.x);
      const nextY = Math.round((e.clientY - containerRect.top) / editorScale - dragOffset.y - panOffset.y);
      
      setNodes(nodes.map(n => n.id === draggedNode.id ? { ...n, x: nextX, y: nextY } : n));
    } else if (activeConnection) {
      const containerRect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - containerRect.left) / editorScale,
        y: (e.clientY - containerRect.top) / editorScale
      });
    } else if (isPanningRef.current) {
      const dx = (e.clientX - panStartRef.current.x) / editorScale;
      const dy = (e.clientY - panStartRef.current.y) / editorScale;
      setPanOffset({
        x: panStartRef.current.panX + dx,
        y: panStartRef.current.panY + dy
      });
    }
  };

  const handleMouseUp = (e) => {
    setDraggedNode(null);
    setActiveConnection(null);
    isPanningRef.current = false;
  };

  // Pan canvas control
  const handleCanvasMouseDown = (e) => {
    if (e.button === 0) { // left click canvas to pan
      isPanningRef.current = true;
      panStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        panX: panOffset.x,
        panY: panOffset.y
      };
    }
  };

  // Socket connection trigger
  const handleSocketMouseDown = (e, nodeId, socketId, isOutput) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const x = (rect.left + rect.width / 2 - containerRect.left) / editorScale;
    const y = (rect.top + rect.height / 2 - containerRect.top) / editorScale;

    setActiveConnection({
      nodeId,
      socketId,
      isOutput,
      x,
      y
    });
    setMousePos({ x, y });
  };

  const handleSocketMouseUp = (e, toNodeId, toSocketId, toIsOutput) => {
    if (activeConnection) {
      const from = activeConnection;
      // Connect only Output -> Input, never Output -> Output or same node
      if (from.isOutput !== toIsOutput && from.nodeId !== toNodeId) {
        const fromNode = from.isOutput ? from.nodeId : toNodeId;
        const fromSocket = from.isOutput ? from.socketId : toSocketId;
        const toNode = from.isOutput ? toNodeId : from.nodeId;
        const toSocket = from.isOutput ? toSocketId : from.socketId;

        // Ensure single link per input socket
        let nextLinks = links.filter(l => !(l.toNode === toNode && l.toSocket === toSocket));
        
        nextLinks.push({
          fromNode,
          fromSocket,
          toNode,
          toSocket
        });

        setLinks(nextLinks);
        compileGraph(nodes, nextLinks);
      }
    }
    setActiveConnection(null);
  };

  // Update constant operand values
  const handleOperandChange = (nodeId, val) => {
    const updated = nodes.map(n => n.id === nodeId ? { ...n, operand: val } : n);
    setNodes(updated);
    compileGraph(updated, links);
  };

  // Draw smooth bezier wires
  const getCurvePath = (x1, y1, x2, y2) => {
    const dx = Math.abs(x2 - x1) * 0.5;
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  };

  return (
    <div className="node-editor-container">
      {/* Node Menu header */}
      <div className="node-editor-header">
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          <Zap size={14} className="text-primary" />
          Blender-Node editor (Physics Logic compiler)
        </span>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Add input selector */}
          <div className="dropdown-menu-container">
            <button className="btn btn-secondary btn-small">
              <Plus size={11} /> Add Variable
            </button>
            <div className="dropdown-menu">
              {METRICS.map(m => (
                <button key={m.id} onClick={() => addNode(NODE_TYPES.INPUT, m.id)}>{m.name}</button>
              ))}
            </div>
          </div>

          {/* Add Math selector */}
          <div className="dropdown-menu-container">
            <button className="btn btn-secondary btn-small">
              <Plus size={11} /> Add Math Block
            </button>
            <div className="dropdown-menu">
              {MATH_OPERATORS.map(op => (
                <button key={op.id} onClick={() => addNode(NODE_TYPES.MATH, op.id)}>{op.name}</button>
              ))}
            </div>
          </div>

          <button className="btn btn-primary btn-small" onClick={() => compileGraph()}>
            <Check size={11} /> Force Compile
          </button>
        </div>
      </div>

      {/* Editor Canvas workspace */}
      <div 
        ref={containerRef}
        className="node-canvas"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseDown={handleCanvasMouseDown}
        style={{ cursor: isPanningRef.current ? 'grabbing' : 'grab' }}
      >
        <div 
          className="node-zoom-pane"
          style={{ 
            transform: `scale(${editorScale}) translate(${panOffset.x}px, ${panOffset.y}px)`,
            transformOrigin: '0 0'
          }}
        >
          {/* Vector connection wires (SVG) */}
          <svg className="node-svg-overlay">
            {links.map((link, idx) => {
              const fromN = nodes.find(n => n.id === link.fromNode);
              const toN = nodes.find(n => n.id === link.toNode);
              if (!fromN || !toN) return null;

              // Node dimensions to compute socket center
              const x1 = fromN.x + 180;
              const y1 = fromN.y + 40;
              const x2 = toN.x;
              const y2 = toN.y + 40;

              return (
                <g key={idx}>
                  <path 
                    d={getCurvePath(x1, y1, x2, y2)} 
                    stroke="var(--primary)" 
                    strokeWidth="2.5" 
                    fill="none"
                    style={{ filter: 'drop-shadow(0 0 3px rgba(0, 242, 254, 0.4))' }}
                  />
                  {/* Wire deletion helper on double click */}
                  <path
                    d={getCurvePath(x1, y1, x2, y2)}
                    stroke="transparent"
                    strokeWidth="10"
                    fill="none"
                    style={{ cursor: 'pointer' }}
                    onDoubleClick={() => {
                      const next = links.filter((_, i) => i !== idx);
                      setLinks(next);
                      compileGraph(nodes, next);
                    }}
                    title="Double click link to delete connection"
                  />
                </g>
              );
            })}

            {/* Current dragging wire */}
            {activeConnection && (
              <path
                d={getCurvePath(
                  activeConnection.x,
                  activeConnection.y,
                  mousePos.x,
                  mousePos.y
                )}
                stroke="var(--accent)"
                strokeWidth="2"
                strokeDasharray="4,4"
                fill="none"
              />
            )}
          </svg>

          {/* Render individual node cards */}
          {nodes.map((node) => {
            return (
              <div 
                key={node.id} 
                className={`node-card ${node.type}`}
                style={{ left: node.x, top: node.y }}
                onMouseDown={(e) => handleNodeMouseDown(e, node)}
              >
                <div className="node-title">
                  <span>{node.name}</span>
                  {node.type !== NODE_TYPES.OUTPUT && (
                    <button className="node-delete-btn" onClick={() => deleteNode(node.id)}>
                      <Trash2 size={10} />
                    </button>
                  )}
                </div>

                <div className="node-sockets">
                  {/* Left sockets (Inputs) */}
                  <div className="socket-column left">
                    {node.type !== NODE_TYPES.INPUT && (
                      <div className="socket-wrapper">
                        <div 
                          className="socket in" 
                          onMouseDown={(e) => handleSocketMouseDown(e, node.id, 'in', false)}
                          onMouseUp={(e) => handleSocketMouseUp(e, node.id, 'in', false)}
                        />
                        <span>Input</span>
                      </div>
                    )}
                  </div>

                  {/* Math node fields */}
                  {node.type === NODE_TYPES.MATH && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', margin: '8px 12px', flex: 1 }}>
                      <span style={{ fontSize: '9px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Operand</span>
                      <input
                        type="number"
                        className="form-input"
                        style={{ height: '22px', fontSize: '10px', padding: '2px 6px', background: '#000' }}
                        step="any"
                        value={node.operand || '1'}
                        onChange={(e) => handleOperandChange(node.id, e.target.value)}
                        onMouseDown={(e) => e.stopPropagation()} // prevent dragging node on typing
                      />
                    </div>
                  )}

                  {/* Right sockets (Outputs) */}
                  <div className="socket-column right">
                    {node.type !== NODE_TYPES.OUTPUT && (
                      <div className="socket-wrapper" style={{ flexDirection: 'row-reverse' }}>
                        <div 
                          className="socket out" 
                          onMouseDown={(e) => handleSocketMouseDown(e, node.id, 'out', true)}
                          onMouseUp={(e) => handleSocketMouseUp(e, node.id, 'out', true)}
                        />
                        <span>Output</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
