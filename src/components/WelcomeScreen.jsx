import React from 'react';
import { TEMPLATES } from '../data/mockData';
import { PlusCircle, Compass, Cpu, LineChart, ShieldAlert } from 'lucide-react';

export default function WelcomeScreen({ onSelectTemplate, onSelectBlank }) {
  const getIcon = (id) => {
    switch (id) {
      case 'stock-market': return <LineChart size={24} className="text-primary" />;
      case 'crypto-universe': return <Cpu size={24} style={{ color: 'var(--accent)' }} />;
      case 'portfolio-universe': return <ShieldAlert size={24} style={{ color: 'var(--warning)' }} />;
      default: return <Compass size={24} style={{ color: 'var(--success)' }} />;
    }
  };

  return (
    <div className="canvas-welcome">
      <div className="logo-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', marginBottom: '8px' }}>
        <Compass size={28} style={{ color: '#000' }} />
      </div>
      <h2 className="welcome-title">Finance Physics Operating System</h2>
      <p className="welcome-desc">
        Welcome to the next generation of financial exploration. Model markets as dynamic physical systems, define customized dimensions, construct custom financial universes, and explore mathematical relationships in three-dimensional space.
      </p>

      <div className="welcome-options">
        <button className="btn btn-primary" onClick={onSelectBlank}>
          <PlusCircle size={16} />
          Create Blank Canvas
        </button>
      </div>

      <div style={{ marginTop: '30px', width: '100%', maxWidth: '900px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '1px', marginBottom: '16px' }}>
          Select a Template Starter
        </h3>
        
        <div className="welcome-templates">
          {TEMPLATES.map((tpl) => (
            <div 
              key={tpl.id} 
              className="glass-panel glass-panel-interactive template-card"
              onClick={() => onSelectTemplate(tpl)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                {getIcon(tpl.id)}
                <span className="asset-badge stock" style={{ fontSize: '9px' }}>Template</span>
              </div>
              <span className="template-title">{tpl.name}</span>
              <p className="template-desc">{tpl.description}</p>
              
              <div style={{ marginTop: '12px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '9px', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                  X: {tpl.dimensions.x}
                </span>
                <span style={{ fontSize: '9px', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                  Y: {tpl.dimensions.y}
                </span>
                <span style={{ fontSize: '9px', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                  Z: {tpl.dimensions.z}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
