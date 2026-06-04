import React, { useState } from 'react';
import { 
  Folder, 
  Camera, 
  Sun, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  ChevronRight, 
  Globe,
  Grid
} from 'lucide-react';

export default function BlenderOutliner({
  assets,
  checkedAssets,
  onToggleVisibility,
  selectedAssetSymbol,
  onSelectAsset,
  sceneSettings,
  onUpdateSceneSettings
}) {
  const [expandedNodes, setExpandedNodes] = useState({
    scene: true,
    cameras: true,
    lights: true,
    grid: true,
    assets: true
  });

  const toggleExpand = (node) => {
    setExpandedNodes(prev => ({
      ...prev,
      [node]: !prev[node]
    }));
  };

  return (
    <div className="blender-outliner glass-panel">
      <div className="sidebar-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        <span className="sidebar-title" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Scene Outliner
        </span>
      </div>

      <div className="outliner-tree" style={{ padding: '10px', overflowY: 'auto', flex: 1, fontSize: '12px' }}>
        
        {/* ROOT: Scene Collection */}
        <div className="tree-node">
          <div className="tree-row" onClick={() => toggleExpand('scene')}>
            {expandedNodes.scene ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            <Folder size={12} className="text-primary" />
            <span style={{ fontWeight: 600 }}>Scene Collection</span>
          </div>

          {expandedNodes.scene && (
            <div className="tree-children" style={{ paddingLeft: '14px' }}>
              
              {/* Cameras Collection */}
              <div className="tree-node">
                <div className="tree-row" onClick={() => toggleExpand('cameras')}>
                  {expandedNodes.cameras ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <Camera size={12} style={{ color: 'var(--accent)' }} />
                  <span>Cameras</span>
                </div>
                {expandedNodes.cameras && (
                  <div className="tree-children" style={{ paddingLeft: '18px' }}>
                    <div className="tree-row leaf">
                      <Camera size={11} style={{ opacity: 0.7 }} />
                      <span>OrbitCamera</span>
                      <span className="outliner-badge">Active</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Lights Collection */}
              <div className="tree-node">
                <div className="tree-row" onClick={() => toggleExpand('lights')}>
                  {expandedNodes.lights ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <Sun size={12} style={{ color: 'var(--warning)' }} />
                  <span>Lights</span>
                </div>
                {expandedNodes.lights && (
                  <div className="tree-children" style={{ paddingLeft: '18px' }}>
                    <div className="tree-row leaf">
                      <Sun size={11} style={{ opacity: 0.7 }} />
                      <span>SunLight (Directional)</span>
                    </div>
                    <div className="tree-row leaf">
                      <Sun size={11} style={{ opacity: 0.5 }} />
                      <span>AmbientLight (Global)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Grid axes Collection */}
              <div className="tree-node">
                <div className="tree-row" onClick={() => toggleExpand('grid')}>
                  {expandedNodes.grid ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <Grid size={12} style={{ color: 'var(--success)' }} />
                  <span>Grids & Coordinate Axes</span>
                </div>
                {expandedNodes.grid && (
                  <div className="tree-children" style={{ paddingLeft: '18px' }}>
                    <div className="tree-row leaf outliner-interactive">
                      <Grid size={11} style={{ opacity: 0.7 }} />
                      <span>Floor Grid Plane</span>
                      <button 
                        className="outliner-eye-btn" 
                        onClick={() => onUpdateSceneSettings('gridVisible', !sceneSettings.gridVisible)}
                      >
                        {sceneSettings.gridVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Assets meshes Collection */}
              <div className="tree-node">
                <div className="tree-row" onClick={() => toggleExpand('assets')}>
                  {expandedNodes.assets ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <Globe size={12} style={{ color: 'var(--primary)' }} />
                  <span>Asset Collection (Meshes)</span>
                </div>
                
                {expandedNodes.assets && (
                  <div className="tree-children" style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {assets.map((asset) => {
                      const isSelected = selectedAssetSymbol === asset.symbol;
                      const isVisible = checkedAssets[asset.symbol];

                      return (
                        <div 
                          key={asset.symbol} 
                          className={`tree-row leaf outliner-interactive ${isSelected ? 'selected' : ''}`}
                          onClick={() => onSelectAsset(asset.symbol)}
                        >
                          <Globe size={11} style={{ opacity: 0.8, color: asset.assetClass === 'Stock' ? 'var(--primary)' : 'var(--accent)' }} />
                          <span style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
                            {asset.symbol} ({asset.name})
                          </span>
                          <button 
                            className="outliner-eye-btn" 
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleVisibility(asset.symbol);
                            }}
                          >
                            {isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
