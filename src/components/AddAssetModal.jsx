import React, { useState } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';
import { METRICS, SECTORS } from '../data/mockData';

export default function AddAssetModal({ isOpen, onClose, onAddAsset }) {
  if (!isOpen) return null;

  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [assetClass, setAssetClass] = useState('Stock');
  const [sector, setSector] = useState('TECHNOLOGY');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Initial values for metrics
  const [metrics, setMetrics] = useState({
    price: 150,
    volume: 5000,
    marketCap: 200,
    peRatio: 25,
    revenueGrowth: 15,
    profitMargin: 12,
    volatility: 25,
    correlation: 0.7,
    momentum: 50,
    riskScore: 5,
    openInterest: 100
  });

  const handleMetricChange = (id, val) => {
    setMetrics({
      ...metrics,
      [id]: parseFloat(val) || 0
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!symbol.trim() || !name.trim()) {
      setError('Please fill in both Symbol and Name');
      return;
    }

    const uppercaseSymbol = symbol.trim().toUpperCase();

    // Build the final asset object
    const newAsset = {
      symbol: uppercaseSymbol,
      name: name.trim(),
      assetClass,
      sector,
      description: description.trim() || `User-constructed custom ${assetClass.toLowerCase()} asset in the ${sector.toLowerCase()} sector.`,
      baseMetrics: { ...metrics }
    };

    onAddAsset(newAsset);
    
    // Reset form
    setSymbol('');
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <div className="overlay-dialog">
      <div className="dialog-content glass-panel-elevated">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} className="text-primary" />
            Add Custom Entity
          </h3>
          <button className="detail-close" style={{ position: 'static' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--danger)', fontSize: '12px' }}>
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '70vh', overflowY: 'auto', paddingRight: '4px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Symbol</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. TSLA" 
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                maxLength={6}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Tesla Motors" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Asset Class</label>
              <select className="select-field" value={assetClass} onChange={(e) => setAssetClass(e.target.value)}>
                <option value="Stock">Stock (Equity)</option>
                <option value="Crypto">Cryptocurrency</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Sector</label>
              <select className="select-field" value={sector} onChange={(e) => setSector(e.target.value)}>
                {Object.keys(SECTORS).map(secId => (
                  <option key={secId} value={secId}>{SECTORS[secId].name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description (Optional)</label>
            <textarea 
              className="form-input" 
              style={{ minHeight: '60px', fontFamily: 'var(--font-sans)', resize: 'vertical' }}
              placeholder="Provide a brief summary of this company or digital token..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <span className="sidebar-section-title" style={{ display: 'block', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '4px' }}>
            Initial Metric Mappings
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {METRICS.map(m => (
              <div key={m.id} className="form-group" style={{ gap: '2px' }}>
                <label className="form-label" style={{ fontSize: '10px' }}>{m.name}</label>
                <input 
                  type="number" 
                  className="form-input"
                  style={{ height: '32px', fontSize: '12px' }}
                  step="any"
                  value={metrics[m.id]} 
                  onChange={(e) => handleMetricChange(m.id, e.target.value)}
                  min={m.id === 'riskScore' ? 1 : undefined}
                  max={m.id === 'riskScore' ? 10 : undefined}
                  required
                />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Plus size={14} />
              Add to Universe
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
