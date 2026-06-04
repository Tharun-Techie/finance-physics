import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle, Info, Hash, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { METRICS } from '../data/mockData';
import { validateFormula } from '../utils/formulaParser';

export default function PhysicsFormulaPanel({ 
  formulas, 
  onUpdateFormula, 
  onResetDefaultPhysics 
}) {
  const [activeSubTab, setActiveSubTab] = useState('code'); // 'code' | 'visual'
  const [selectedParam, setSelectedParam] = useState('gravity');
  const [visualChain, setVisualChain] = useState([]); // array of tokens
  const [errors, setErrors] = useState({});
  const [customConstant, setCustomConstant] = useState('');

  const physicsParams = [
    { id: 'mass', name: 'Mass', description: 'Governs momentum and gravitational attraction.' },
    { id: 'velocity', name: 'Velocity', description: 'Rate of movement and vector trails.' },
    { id: 'force', name: 'Buying/Selling Force', description: 'Pushes objects away or pulls them in.' },
    { id: 'gravity', name: 'Financial Gravity', description: 'Strength of attraction between objects.' },
    { id: 'friction', name: 'Friction / Liquidity', description: 'Resistance that slows objects down.' },
    { id: 'entropy', name: 'Entropy / Disorder', description: 'Random jitteriness or market noise.' },
    { id: 'equilibrium', name: 'Equilibrium State', description: 'Target resting coordinates for assets.' }
  ];

  // Validate all formulas on mount and when they change
  useEffect(() => {
    const newErrors = {};
    Object.keys(formulas).forEach(param => {
      const val = formulas[param];
      const validation = validateFormula(val, METRICS);
      if (validation !== true) {
        newErrors[param] = validation;
      }
    });
    setErrors(newErrors);
  }, [formulas]);

  // Handle manual code edits
  const handleCodeChange = (param, value) => {
    onUpdateFormula(param, value);
  };

  // Append token to visual chain
  const appendToken = (token) => {
    setVisualChain([...visualChain, token]);
  };

  // Remove last token from chain
  const undoLastToken = () => {
    setVisualChain(visualChain.slice(0, -1));
  };

  // Clear visual chain
  const clearChain = () => {
    setVisualChain([]);
  };

  // Quick preset constant append
  const handleAddConstant = () => {
    if (customConstant && !isNaN(customConstant)) {
      appendToken({ type: 'number', val: customConstant });
      setCustomConstant('');
    }
  };

  // Compile visual chain to string formula and apply
  const applyVisualFormula = () => {
    if (visualChain.length === 0) return;
    
    // Map tokens back to formula string
    const formulaString = visualChain.map(t => {
      if (t.type === 'metric') return t.val;
      if (t.type === 'operator') return t.val;
      if (t.type === 'number') return t.val;
      return '';
    }).join(' ');

    const validation = validateFormula(formulaString, METRICS);
    if (validation === true) {
      onUpdateFormula(selectedParam, formulaString);
      // Success indicator
      alert(`Applied formula for ${selectedParam} successfully:\n${formulaString}`);
    } else {
      alert(`Invalid visual chain configuration:\n${validation}`);
    }
  };

  // Load active parameter's formula into visual builder chain
  const loadExistingIntoChain = () => {
    const formula = formulas[selectedParam];
    if (!formula) return;

    // Simple tokenizer for display
    const tokens = formula.split(/\s+/).map(t => {
      const isMetric = METRICS.some(m => m.id.toLowerCase() === t.toLowerCase());
      if (isMetric) {
        return { type: 'metric', val: t };
      }
      const isOperator = ['+', '-', '*', '/', '(', ')'].includes(t);
      if (isOperator) {
        return { type: 'operator', val: t };
      }
      if (!isNaN(t)) {
        return { type: 'number', val: t };
      }
      return { type: 'operator', val: t }; // fallback
    });

    setVisualChain(tokens);
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="sidebar-header">
        <span className="sidebar-title">
          <Info size={16} className="text-primary" />
          Financial Physics Engine
        </span>
        <button className="btn btn-secondary btn-small" onClick={onResetDefaultPhysics}>
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      <div style={{ padding: '0 16px', marginTop: '12px' }}>
        <div className="tabs-container">
          <div 
            className={`tab-nav-item ${activeSubTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('code')}
          >
            Formula Editor
          </div>
          <div 
            className={`tab-nav-item ${activeSubTab === 'visual' ? 'active' : ''}`}
            onClick={() => {
              setActiveSubTab('visual');
              loadExistingIntoChain();
            }}
          >
            Visual Builder
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {activeSubTab === 'code' ? (
          <div className="formula-editor-card" style={{ padding: 0, overflow: 'visible', maxHeight: 'none' }}>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
              Define mathematical mappings from market variables to custom physical forces. Hovering nodes will display active evaluated variables.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {physicsParams.map((param) => {
                const isError = !!errors[param.id];
                return (
                  <div key={param.id} className="formula-row">
                    <div className="formula-meta">
                      <span className="formula-name">{param.name}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px' }}>
                        {isError ? (
                          <span style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                            <AlertTriangle size={10} /> Invalid
                          </span>
                        ) : (
                          <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                            <CheckCircle size={10} /> Active
                          </span>
                        )}
                      </span>
                    </div>

                    <div className="formula-input-container">
                      <input
                        type="text"
                        className={`formula-input ${isError ? 'error' : ''}`}
                        value={formulas[param.id] || ''}
                        onChange={(e) => handleCodeChange(param.id, e.target.value)}
                        placeholder={`Formula for ${param.name.toLowerCase()}`}
                      />
                    </div>

                    {isError && (
                      <span style={{ fontSize: '9px', color: 'var(--danger)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                        {errors[param.id]}
                      </span>
                    )}
                    
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: '1.2' }}>
                      {param.description}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>
                Available Variables
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {METRICS.map(m => (
                  <code 
                    key={m.id} 
                    style={{ fontSize: '10px', padding: '2px 5px', cursor: 'copy', background: 'rgba(255,255,255,0.05)', color: 'var(--primary)' }}
                    title={m.description}
                    onClick={() => alert(`Variables helper: Copy "${m.id}" and paste it into any parameter box.`)}
                  >
                    {m.id}
                  </code>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Visual Formula Builder Screen */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="select-wrapper">
              <span className="select-label">Select Physics Concept</span>
              <select 
                className="select-field" 
                value={selectedParam}
                onChange={(e) => {
                  setSelectedParam(e.target.value);
                  // Load that parameter's tokens
                  setTimeout(() => {
                    const formula = formulas[e.target.value];
                    if (formula) {
                      const tokens = formula.split(/\s+/).filter(Boolean).map(t => {
                        const isMetric = METRICS.some(m => m.id.toLowerCase() === t.toLowerCase());
                        if (isMetric) return { type: 'metric', val: t };
                        const isOperator = ['+', '-', '*', '/', '(', ')'].includes(t);
                        if (isOperator) return { type: 'operator', val: t };
                        return { type: 'number', val: t };
                      });
                      setVisualChain(tokens);
                    }
                  }, 10);
                }}
              >
                {physicsParams.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Construct formula nodes by clicking variables and operators below, then hit Apply.
            </span>

            {/* Visual drag-and-drop / node field */}
            <div className="visual-builder-canvas">
              {visualChain.length === 0 ? (
                <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Formula is empty. Click elements below to add.</span>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {visualChain.map((token, idx) => (
                    <React.Fragment key={idx}>
                      <div className={`formula-node ${token.type === 'operator' ? 'operator' : ''}`}>
                        {token.type === 'number' && <Hash size={10} />}
                        <span>{token.val}</span>
                      </div>
                      {idx < visualChain.length - 1 && <div className="formula-node-connector" />}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {/* Visual controls */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary btn-small" onClick={clearChain}>
                <Trash2 size={12} /> Clear
              </button>
              <button className="btn btn-secondary btn-small" onClick={undoLastToken}>
                Undo
              </button>
              <button className="btn btn-primary btn-small" onClick={applyVisualFormula} disabled={visualChain.length === 0}>
                Compile & Apply
              </button>
            </div>

            {/* Categories */}
            <div className="sidebar-section">
              <span className="sidebar-section-title">Variables</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {METRICS.map(metric => (
                  <button
                    key={metric.id}
                    className="btn btn-secondary btn-small"
                    style={{ justifyContent: 'flex-start', height: '30px', fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    onClick={() => appendToken({ type: 'metric', val: metric.id })}
                    title={metric.description}
                  >
                    <Plus size={10} />
                    {metric.id}
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <span className="sidebar-section-title">Operators</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['+', '-', '*', '/', '(', ')'].map(op => (
                  <button
                    key={op}
                    className="btn btn-secondary btn-small"
                    style={{ minWidth: '32px', height: '30px', fontWeight: 'bold' }}
                    onClick={() => appendToken({ type: 'operator', val: op })}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <span className="sidebar-section-title">Constants</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['0.1', '0.5', '1', '2', '5', '10', '50', '100'].map(num => (
                    <button
                      key={num}
                      className="btn btn-secondary btn-small"
                      style={{ height: '28px', fontSize: '10px' }}
                      onClick={() => appendToken({ type: 'number', val: num })}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input
                    type="number"
                    className="form-input"
                    style={{ flex: 1, height: '30px', fontSize: '11px', padding: '0 8px' }}
                    placeholder="Custom value..."
                    value={customConstant}
                    onChange={(e) => setCustomConstant(e.target.value)}
                  />
                  <button className="btn btn-secondary btn-small" onClick={handleAddConstant} style={{ height: '30px' }}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
