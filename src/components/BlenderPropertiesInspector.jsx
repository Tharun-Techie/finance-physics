import React, { useState } from 'react';
import { 
  Camera, 
  Globe, 
  Box, 
  Layers,
  Settings
} from 'lucide-react';
import { METRICS } from '../data/mockData';

export default function BlenderPropertiesInspector({
  selectedAsset,
  sceneSettings,
  onUpdateSceneSettings,
  materials,
  onUpdateMaterials,
  onUpdateAssetMetrics,
  dimensions,
  onUpdateDimensions,
  mappings,
  onUpdateMappings
}) {
  const [activePropertyTab, setActivePropertyTab] = useState('scene'); // 'scene' | 'world' | 'object' | 'material'

  const propertyTabs = [
    { id: 'scene', icon: <Camera size={14} />, label: 'Scene Properties' },
    { id: 'world', icon: <Globe size={14} />, label: 'World Properties' },
    { id: 'object', icon: <Box size={14} />, label: 'Object Properties' },
    { id: 'material', icon: <Layers size={14} />, label: 'Material Properties' }
  ];

  return (
    <div className="blender-inspector glass-panel">
      {/* Tab bar (Left vertical strip) */}
      <div className="inspector-tabs">
        {propertyTabs.map(t => (
          <button 
            key={t.id} 
            className={`inspector-tab-btn ${activePropertyTab === t.id ? 'active' : ''}`}
            onClick={() => setActivePropertyTab(t.id)}
            title={t.label}
          >
            {t.icon}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="inspector-content">
        
        {/* TAB 1: SCENE SETTINGS & AXES MAPPINGS */}
        {activePropertyTab === 'scene' && (
          <div className="inspector-section" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span className="sidebar-section-title uppercase">Scene Mapping Nodes</span>

            {/* Dimensions mappings */}
            <div className="glass-panel" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(0,0,0,0.2)' }}>
              <div className="select-wrapper">
                <span className="select-label">X Axis Mapping</span>
                <select 
                  className="select-field" 
                  value={dimensions.x}
                  onChange={(e) => onUpdateDimensions('x', e.target.value)}
                >
                  {METRICS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>

              <div className="select-wrapper">
                <span className="select-label">Y Axis Mapping</span>
                <select 
                  className="select-field" 
                  value={dimensions.y}
                  onChange={(e) => onUpdateDimensions('y', e.target.value)}
                >
                  {METRICS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>

              <div className="select-wrapper">
                <span className="select-label">Z Axis Mapping</span>
                <select 
                  className="select-field" 
                  value={dimensions.z}
                  onChange={(e) => onUpdateDimensions('z', e.target.value)}
                >
                  {METRICS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
            </div>

            {/* Aesthetics mappings */}
            <span className="sidebar-section-title uppercase" style={{ marginTop: '8px' }}>Visual Aesthetics</span>
            <div className="glass-panel" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(0,0,0,0.2)' }}>
              <div className="select-wrapper">
                <span className="select-label">Color Code Channel</span>
                <select 
                  className="select-field" 
                  value={mappings.color}
                  onChange={(e) => onUpdateMappings('color', e.target.value)}
                >
                  <option value="sector">Industry Sectors</option>
                  <option value="assetClass">Asset Classes (Stocks vs Crypto)</option>
                  {METRICS.map(m => <option key={m.id} value={m.id}>{m.name} Gradient</option>)}
                </select>
              </div>

              <div className="select-wrapper">
                <span className="select-label">Mesh Sphere Size</span>
                <select 
                  className="select-field" 
                  value={mappings.size}
                  onChange={(e) => onUpdateMappings('size', e.target.value)}
                >
                  {METRICS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>

              <div className="select-wrapper">
                <span className="select-label">Mesh Opacity</span>
                <select 
                  className="select-field" 
                  value={mappings.opacity}
                  onChange={(e) => onUpdateMappings('opacity', e.target.value)}
                >
                  {METRICS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
            </div>

            {/* Viewport Settings */}
            <span className="sidebar-section-title uppercase" style={{ marginTop: '8px' }}>Render Settings</span>
            
            <div className="property-group">
              <span className="property-label">Viewport Shading</span>
              <div className="mode-toggle" style={{ margin: '4px 0' }}>
                <button 
                  className={`mode-btn ${sceneSettings.shadingMode === 'wireframe' ? 'active' : ''}`}
                  onClick={() => onUpdateSceneSettings('shadingMode', 'wireframe')}
                >
                  Wireframe
                </button>
                <button 
                  className={`mode-btn ${sceneSettings.shadingMode === 'solid' ? 'active' : ''}`}
                  onClick={() => onUpdateSceneSettings('shadingMode', 'solid')}
                >
                  Solid
                </button>
                <button 
                  className={`mode-btn ${sceneSettings.shadingMode === 'rendered' ? 'active' : ''}`}
                  onClick={() => onUpdateSceneSettings('shadingMode', 'rendered')}
                >
                  Rendered
                </button>
              </div>
            </div>

            <div className="property-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="property-label">Camera FOV</span>
                <span className="property-value">{sceneSettings.cameraFov}°</span>
              </div>
              <input 
                type="range" 
                className="timeline-slider"
                min="30" 
                max="90" 
                value={sceneSettings.cameraFov}
                onChange={(e) => onUpdateSceneSettings('cameraFov', parseInt(e.target.value))}
              />
            </div>

            <div className="property-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="property-label">Bloom Glow Strength</span>
                <span className="property-value">{(sceneSettings.bloomIntensity || 1).toFixed(1)}x</span>
              </div>
              <input 
                type="range" 
                className="timeline-slider"
                min="0" 
                max="3" 
                step="0.1" 
                value={sceneSettings.bloomIntensity}
                onChange={(e) => onUpdateSceneSettings('bloomIntensity', parseFloat(e.target.value))}
              />
            </div>

            <div className="property-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="property-label">Floor Grid Plane</span>
              <input 
                type="checkbox" 
                checked={sceneSettings.gridVisible}
                onChange={(e) => onUpdateSceneSettings('gridVisible', e.target.checked)}
              />
            </div>

            <div className="property-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="property-label">Velocity Vector Trails</span>
              <input 
                type="checkbox" 
                checked={sceneSettings.vectorsVisible}
                onChange={(e) => onUpdateSceneSettings('vectorsVisible', e.target.checked)}
              />
            </div>
          </div>
        )}

        {/* TAB 2: WORLD SETTINGS */}
        {activePropertyTab === 'world' && (
          <div className="inspector-section">
            <span className="sidebar-section-title uppercase">Environment Settings</span>
            
            <div className="property-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="property-label">Ambient Lighting</span>
                <span className="property-value">{(sceneSettings.ambientLight || 0.4).toFixed(1)}</span>
              </div>
              <input 
                type="range" 
                className="timeline-slider"
                min="0" 
                max="1.5" 
                step="0.1" 
                value={sceneSettings.ambientLight}
                onChange={(e) => onUpdateSceneSettings('ambientLight', parseFloat(e.target.value))}
              />
            </div>

            <div className="property-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="property-label">Sun Intensity</span>
                <span className="property-value">{(sceneSettings.sunIntensity || 1.0).toFixed(1)}</span>
              </div>
              <input 
                type="range" 
                className="timeline-slider"
                min="0" 
                max="2.5" 
                step="0.1" 
                value={sceneSettings.sunIntensity}
                onChange={(e) => onUpdateSceneSettings('sunIntensity', parseFloat(e.target.value))}
              />
            </div>

            <div className="property-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="property-label">Star Density</span>
                <span className="property-value">{sceneSettings.starCount || 250}</span>
              </div>
              <input 
                type="range" 
                className="timeline-slider"
                min="50" 
                max="1000" 
                step="50" 
                value={sceneSettings.starCount}
                onChange={(e) => onUpdateSceneSettings('starCount', parseInt(e.target.value))}
              />
            </div>

            <div className="property-group">
              <span className="property-label">World Gravity Constant</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>F_grav Coefficient</span>
                <span className="property-value">{sceneSettings.gravityConstant || 1.0}</span>
              </div>
              <input 
                type="range" 
                className="timeline-slider"
                min="0" 
                max="5" 
                step="0.1" 
                value={sceneSettings.gravityConstant}
                onChange={(e) => onUpdateSceneSettings('gravityConstant', parseFloat(e.target.value))}
              />
            </div>
          </div>
        )}

        {/* TAB 3: OBJECT TRANSFORM PROPERTIES */}
        {activePropertyTab === 'object' && (
          <div className="inspector-section">
            <span className="sidebar-section-title uppercase">Selected Object Properties</span>
            {selectedAsset ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  <span className={`asset-badge ${selectedAsset.assetClass === 'Stock' ? 'stock' : 'crypto'}`}>{selectedAsset.assetClass}</span>
                  <span style={{ fontWeight: 'bold' }}>{selectedAsset.name} ({selectedAsset.symbol})</span>
                </div>

                {/* Blender-style Transform Coordinates (Overrides location axes) */}
                <div>
                  <span className="property-label" style={{ display: 'block', marginBottom: '6px' }}>Transform Locations</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#00f2fe', fontWeight: 'bold', fontSize: '11px', width: '12px' }}>X</span>
                      <input 
                        type="number" 
                        className="form-input" 
                        style={{ flex: 1, height: '26px', fontSize: '11px', padding: '2px 6px' }}
                        value={selectedAsset.baseMetrics.price} 
                        onChange={(e) => onUpdateAssetMetrics(selectedAsset.symbol, 'price', e.target.value)}
                      />
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Price</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '11px', width: '12px' }}>Y</span>
                      <input 
                        type="number" 
                        className="form-input" 
                        style={{ flex: 1, height: '26px', fontSize: '11px', padding: '2px 6px' }}
                        value={selectedAsset.baseMetrics.volume} 
                        onChange={(e) => onUpdateAssetMetrics(selectedAsset.symbol, 'volume', e.target.value)}
                      />
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Volume</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#d946ef', fontWeight: 'bold', fontSize: '11px', width: '12px' }}>Z</span>
                      <input 
                        type="number" 
                        className="form-input" 
                        style={{ flex: 1, height: '26px', fontSize: '11px', padding: '2px 6px' }}
                        value={selectedAsset.baseMetrics.volatility} 
                        onChange={(e) => onUpdateAssetMetrics(selectedAsset.symbol, 'volatility', e.target.value)}
                      />
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Volat</span>
                    </div>
                  </div>
                </div>

                {/* Specific metrics editing */}
                <div>
                  <span className="property-label" style={{ display: 'block', marginBottom: '6px' }}>Metrics Properties</span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Market Cap ($B)</span>
                      <input 
                        type="number" 
                        className="form-input" 
                        style={{ height: '26px', fontSize: '11px' }}
                        value={selectedAsset.baseMetrics.marketCap}
                        onChange={(e) => onUpdateAssetMetrics(selectedAsset.symbol, 'marketCap', e.target.value)}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>P/E Ratio</span>
                      <input 
                        type="number" 
                        className="form-input" 
                        style={{ height: '26px', fontSize: '11px' }}
                        value={selectedAsset.baseMetrics.peRatio}
                        onChange={(e) => onUpdateAssetMetrics(selectedAsset.symbol, 'peRatio', e.target.value)}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Revenue Growth</span>
                      <input 
                        type="number" 
                        className="form-input" 
                        style={{ height: '26px', fontSize: '11px' }}
                        value={selectedAsset.baseMetrics.revenueGrowth}
                        onChange={(e) => onUpdateAssetMetrics(selectedAsset.symbol, 'revenueGrowth', e.target.value)}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Correlation</span>
                      <input 
                        type="number" 
                        className="form-input" 
                        style={{ height: '26px', fontSize: '11px' }}
                        value={selectedAsset.baseMetrics.correlation}
                        onChange={(e) => onUpdateAssetMetrics(selectedAsset.symbol, 'correlation', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '11px' }}>
                Select an entity in the outliner or viewport to inspect properties.
              </div>
            )}
          </div>
        )}

        {/* TAB 4: MATERIAL PROPERTIES */}
        {activePropertyTab === 'material' && (
          <div className="inspector-section">
            <span className="sidebar-section-title uppercase">Shader Material Customizer</span>
            
            <div className="property-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="property-label">Material Roughness</span>
                <span className="property-value">{materials.roughness}</span>
              </div>
              <input 
                type="range" 
                className="timeline-slider"
                min="0" 
                max="1" 
                step="0.05" 
                value={materials.roughness}
                onChange={(e) => onUpdateMaterials('roughness', parseFloat(e.target.value))}
              />
            </div>

            <div className="property-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="property-label">Material Metalness</span>
                <span className="property-value">{materials.metalness}</span>
              </div>
              <input 
                type="range" 
                className="timeline-slider"
                min="0" 
                max="1" 
                step="0.05" 
                value={materials.metalness}
                onChange={(e) => onUpdateMaterials('metalness', parseFloat(e.target.value))}
              />
            </div>

            <div className="property-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="property-label">Emissive Intensity</span>
                <span className="property-value">{materials.emissiveIntensity}</span>
              </div>
              <input 
                type="range" 
                className="timeline-slider"
                min="0" 
                max="2" 
                step="0.1" 
                value={materials.emissiveIntensity}
                onChange={(e) => onUpdateMaterials('emissiveIntensity', parseFloat(e.target.value))}
              />
            </div>

            <div className="property-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="property-label">Material Opacity</span>
                <span className="property-value">{materials.opacity}</span>
              </div>
              <input 
                type="range" 
                className="timeline-slider"
                min="0.2" 
                max="1" 
                step="0.05" 
                value={materials.opacity}
                onChange={(e) => onUpdateMaterials('opacity', parseFloat(e.target.value))}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
