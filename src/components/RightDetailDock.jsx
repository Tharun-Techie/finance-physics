import React from 'react';
import { X, LineChart, Sparkles, AlertCircle } from 'lucide-react';
import { METRICS, SECTORS } from '../data/mockData';
import { evaluateFormula } from '../utils/formulaParser';

export default function RightDetailDock({
  asset,
  formulas,
  onClose,
  onDrillDown
}) {
  if (!asset) return null;

  // Retrieve asset metrics
  const sectorInfo = SECTORS[asset.sector] || { name: asset.sector, color: 'var(--text-secondary)' };

  // Evaluate physics formula values for this asset
  const getEvaluatedPhysics = () => {
    const vars = { ...asset.baseMetrics };
    return {
      mass: evaluateFormula(formulas.mass, vars),
      velocity: evaluateFormula(formulas.velocity, vars),
      force: evaluateFormula(formulas.force, vars),
      gravity: evaluateFormula(formulas.gravity, vars),
      friction: evaluateFormula(formulas.friction, vars),
      entropy: evaluateFormula(formulas.entropy, vars),
      equilibrium: evaluateFormula(formulas.equilibrium, vars)
    };
  };

  const physicsVal = getEvaluatedPhysics();

  return (
    <div className="detail-dock glass-panel">
      <div className="detail-header">
        <button className="detail-close" onClick={onClose}>
          <X size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className={`asset-badge ${asset.assetClass === 'Stock' ? 'stock' : 'crypto'}`}>
            {asset.assetClass}
          </span>
          <span style={{ fontSize: '11px', color: sectorInfo.color, fontWeight: 600 }}>
            {sectorInfo.name}
          </span>
        </div>

        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, marginTop: '4px' }}>
          {asset.name}
        </h3>
        <code style={{ alignSelf: 'flex-start', color: 'var(--primary)', fontSize: '12px', background: 'rgba(0, 242, 254, 0.08)' }}>
          {asset.symbol}
        </code>

        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.4 }}>
          {asset.description}
        </p>

        <button 
          className="btn btn-primary btn-small" 
          style={{ marginTop: '12px', width: '100%' }}
          onClick={() => onDrillDown(asset)}
        >
          <LineChart size={12} />
          Drill-Down Analysis
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px 0' }}>
        {/* Core Financial Metrics */}
        <div style={{ padding: '0 20px' }}>
          <span className="sidebar-section-title" style={{ display: 'block', marginBottom: '10px' }}>
            Financial Metrics (Raw)
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {METRICS.map((metric) => {
              const val = asset.baseMetrics[metric.id];
              const exists = val !== undefined;
              return (
                <div key={metric.id} className="metric-card" title={metric.description}>
                  <span className="metric-card-label">{metric.name}</span>
                  <span className="metric-card-value">
                    {exists ? (metric.id === 'marketCap' ? `$${val}B` : metric.id === 'price' ? `$${val.toLocaleString()}` : val) : 'N/A'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Physics Mappings Evaluations */}
        <div style={{ padding: '0 20px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
          <span className="sidebar-section-title" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <Sparkles size={12} className="text-primary" />
            Evaluated Physics Profile
          </span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="metric-card" style={{ padding: '8px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="metric-card-label">Mass (M)</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Formula: {formulas.mass}</span>
              </div>
              <span className="metric-card-value" style={{ color: 'var(--primary)' }}>
                {physicsVal.mass.toFixed(2)} units
              </span>
            </div>

            <div className="metric-card" style={{ padding: '8px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="metric-card-label">Velocity (V)</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Formula: {formulas.velocity}</span>
              </div>
              <span className="metric-card-value" style={{ color: 'var(--primary)' }}>
                {physicsVal.velocity.toFixed(2)} units/s
              </span>
            </div>

            <div className="metric-card" style={{ padding: '8px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="metric-card-label">Force Strength (F)</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Formula: {formulas.force}</span>
              </div>
              <span className="metric-card-value" style={{ color: 'var(--accent-hover)' }}>
                {physicsVal.force.toFixed(2)} N
              </span>
            </div>

            <div className="metric-card" style={{ padding: '8px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="metric-card-label">Financial Gravity (G)</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Formula: {formulas.gravity}</span>
              </div>
              <span className="metric-card-value" style={{ color: 'var(--success)' }}>
                {physicsVal.gravity.toFixed(2)} G-units
              </span>
            </div>

            <div className="metric-card" style={{ padding: '8px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="metric-card-label">Friction / Liquidity</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Formula: {formulas.friction}</span>
              </div>
              <span className="metric-card-value" style={{ color: 'var(--warning)' }}>
                {physicsVal.friction.toFixed(3)} μ
              </span>
            </div>
            
            <div className="metric-card" style={{ padding: '8px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="metric-card-label">Equilibrium Target</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Formula: {formulas.equilibrium}</span>
              </div>
              <span className="metric-card-value" style={{ color: 'var(--text-primary)' }}>
                {physicsVal.equilibrium.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
