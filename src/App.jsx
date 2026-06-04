import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Compass, 
  Layers, 
  Settings, 
  Play, 
  Pause, 
  Plus, 
  RefreshCw, 
  FolderOpen, 
  Activity, 
  Eye, 
  EyeOff, 
  Database,
  BarChart2,
  TrendingUp,
  X,
  PlusCircle
} from 'lucide-react';

import { SECTORS, METRICS, RAW_ASSETS, TIMELINE_LABELS, TEMPLATES } from './data/mockData';
import { evaluateFormula } from './utils/formulaParser';
import WelcomeScreen from './components/WelcomeScreen';
import RightDetailDock from './components/RightDetailDock';
import AddAssetModal from './components/AddAssetModal';
import PhysicsFormulaPanel from './components/PhysicsFormulaPanel';
import DrillDownAnalysisTab from './components/DrillDownAnalysisTab';
import FinanceUniverseCanvas from './components/FinanceUniverseCanvas';
import BlenderNodeEditor from './components/BlenderNodeEditor';
import BlenderOutliner from './components/BlenderOutliner';
import BlenderPropertiesInspector from './components/BlenderPropertiesInspector';

export default function App() {
  // Current active template or custom configuration state
  const [activeUniverseId, setActiveUniverseId] = useState(null); // null represents Welcome Screen
  const [activeUniverseName, setActiveUniverseName] = useState('Stock Market Universe');
  
  // Workspace tabs management
  const [tabs, setTabs] = useState([{ id: 'global', name: 'Global Universe' }]);
  const [activeTabId, setActiveTabId] = useState('global');

  // Universe state (axes and mapping selections)
  const [dimensions, setDimensions] = useState({ x: 'peRatio', y: 'revenueGrowth', z: 'marketCap' });
  const [mappings, setMappings] = useState({ color: 'sector', size: 'marketCap', opacity: 'riskScore' });

  // Custom Physics formulas
  const [formulas, setFormulas] = useState({
    mass: 'marketCap',
    velocity: 'momentum * 0.1',
    force: 'volume / 1000',
    gravity: 'correlation * 2.0',
    friction: '0.1 + riskScore * 0.05',
    entropy: 'volatility / 100',
    equilibrium: '30'
  });

  // Assets list (can be customized by checking/unchecking or adding new ones)
  const [assets, setAssets] = useState([]);
  const [checkedAssets, setCheckedAssets] = useState({});
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState(null);
  const [hoveredAsset, setHoveredAsset] = useState(null);

  // Time & Playback engine
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [timelineIndex, setTimelineIndex] = useState(19); // default to latest Q4 2024
  const [isPlayingPlayback, setIsPlayingPlayback] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000); // ms per step

  // Blender UI Workspace customization state
  const [sceneSettings, setSceneSettings] = useState({
    gridVisible: true,
    vectorsVisible: true,
    cameraFov: 50,
    bloomIntensity: 1.0,
    ambientLight: 0.4,
    sunIntensity: 1.0,
    starCount: 250,
    shadingMode: 'rendered', // 'wireframe' | 'solid' | 'rendered'
    gravityConstant: 1.0
  });

  const [materials, setMaterials] = useState({
    roughness: 0.2,
    metalness: 0.8,
    emissiveIntensity: 0.5,
    opacity: 1.0
  });

  const [showNodeEditor, setShowNodeEditor] = useState(true);
  const [nodeGraphState, setNodeGraphState] = useState({ nodes: [], links: [] });

  const handleUpdateSceneSettings = (key, val) => {
    setSceneSettings(prev => ({ ...prev, [key]: val }));
  };

  const handleUpdateMaterials = (key, val) => {
    setMaterials(prev => ({ ...prev, [key]: val }));
  };

  const handleUpdateAssetMetrics = (symbol, metric, value) => {
    const valFloat = parseFloat(value);
    if (isNaN(valFloat)) return;
    setAssets(prev => prev.map(a => {
      if (a.symbol === symbol) {
        return {
          ...a,
          baseMetrics: {
            ...a.baseMetrics,
            [metric]: valFloat
          }
        };
      }
      return a;
    }));
  };

  const handleUpdateDimensions = (axis, value) => {
    setDimensions(prev => ({ ...prev, [axis]: value }));
  };

  const handleUpdateMappings = (channel, value) => {
    setMappings(prev => ({ ...prev, [channel]: value }));
  };

  const handleCompileFormulas = (newFormulas, newNodes, newLinks) => {
    setFormulas(newFormulas);
    setNodeGraphState({ nodes: newNodes, links: newLinks });
  };

  // Visual options
  const [mode, setMode] = useState('visualization'); // 'visualization' | 'simulation'

  // Physics statistics (velocities, forces, positions) synced from ThreeJS Canvas
  const [activePositions, setActivePositions] = useState({});
  const [velocities, setVelocities] = useState({});
  const [forces, setForces] = useState({});

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Flasher state for real-time live ticker updates (symbol -> 'up' | 'down')
  const [tickerFlash, setTickerFlash] = useState({});

  // Initialize assets list on start
  useEffect(() => {
    // Clone RAW_ASSETS so they have independent states
    const initialAssets = RAW_ASSETS.map(asset => ({ ...asset }));
    setAssets(initialAssets);
    
    // Check all assets by default
    const checked = {};
    initialAssets.forEach(a => {
      checked[a.symbol] = true;
    });
    setCheckedAssets(checked);
  }, []);

  // Compute metric ranges (min and max) dynamically for axis scaling
  const ranges = useMemo(() => {
    const rangeData = {};
    METRICS.forEach(metric => {
      // Look at all available assets to compute bounds
      const values = assets.map(a => a.baseMetrics[metric.id]).filter(v => v !== undefined);
      if (values.length > 0) {
        rangeData[metric.id] = {
          min: Math.min(...values),
          max: Math.max(...values)
        };
      } else {
        rangeData[metric.id] = { min: metric.min, max: metric.max };
      }
    });
    return rangeData;
  }, [assets]);

  // Load template details
  const handleSelectTemplate = (tpl) => {
    setDimensions({ ...tpl.dimensions });
    setMappings({ ...tpl.mappings });
    setFormulas({ ...tpl.formulas });
    setActiveUniverseId(tpl.id);
    setActiveUniverseName(tpl.name);
    // Reset positions and simulation variables
    setMode('visualization');
    setTimelineIndex(19); // start at latest
    setIsLiveMode(false);
  };

  // Start with a blank canvas configuration
  const handleSelectBlank = () => {
    setDimensions({ x: 'price', y: 'volume', z: 'volatility' });
    setMappings({ color: 'assetClass', size: 'marketCap', opacity: 'momentum' });
    setFormulas({
      mass: 'marketCap',
      velocity: 'momentum * 0.1',
      force: 'volume / 1000',
      gravity: 'correlation * 2.0',
      friction: '0.1 + riskScore * 0.05',
      entropy: 'volatility / 100',
      equilibrium: '50'
    });
    setActiveUniverseId('blank-canvas');
    setActiveUniverseName('Custom Financial Universe');
    setMode('visualization');
    setTimelineIndex(19);
    setIsLiveMode(false);
  };

  // Sync asset metrics with either the timeline slider or real-time simulation
  useEffect(() => {
    if (isLiveMode || assets.length === 0) return;

    // Load matching quarter data from each asset's timeseries
    setAssets(prevAssets => {
      return prevAssets.map(asset => {
        const historyPoint = asset.timeseries?.[timelineIndex];
        if (historyPoint) {
          return {
            ...asset,
            baseMetrics: { ...historyPoint }
          };
        }
        return asset;
      });
    });
  }, [timelineIndex, isLiveMode]);

  // Playback timer loop for History timeline
  useEffect(() => {
    let timer = null;
    if (isPlayingPlayback && !isLiveMode) {
      timer = setInterval(() => {
        setTimelineIndex(prev => {
          if (prev >= TIMELINE_LABELS.length - 1) {
            setIsPlayingPlayback(false); // stop at the end
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlayingPlayback, isLiveMode, playbackSpeed]);

  // Live Mode: Fluctuates market prices and stats dynamically every 2 seconds
  useEffect(() => {
    let interval = null;
    if (isLiveMode) {
      interval = setInterval(() => {
        setAssets(prevAssets => {
          const flashes = {};
          const updated = prevAssets.map(asset => {
            // Price fluctuation (+/- 0.5% to 2.2%)
            const priceChangePercent = (Math.random() - 0.5) * 0.04;
            const oldPrice = asset.baseMetrics.price;
            const newPrice = Math.max(0.1, oldPrice * (1 + priceChangePercent));

            // Set up flash triggers
            flashes[asset.symbol] = priceChangePercent >= 0 ? 'up' : 'down';

            // Other metric updates
            const volumeChange = (Math.random() - 0.5) * 50; // volume flux
            const vol = Math.max(1, asset.baseMetrics.volume + volumeChange);
            
            const momentumChange = (Math.random() - 0.5) * 8;
            const mom = Math.max(1, Math.min(100, asset.baseMetrics.momentum + momentumChange));

            return {
              ...asset,
              baseMetrics: {
                ...asset.baseMetrics,
                price: parseFloat(newPrice.toFixed(2)),
                volume: parseFloat(vol.toFixed(1)),
                momentum: parseFloat(mom.toFixed(1))
              }
            };
          });

          setTickerFlash(flashes);
          // Clear flashes after 900ms
          setTimeout(() => setTickerFlash({}), 900);

          return updated;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLiveMode]);

  // List of active assets filtered by checklist selection
  const activeAssets = useMemo(() => {
    return assets.filter(a => checkedAssets[a.symbol]);
  }, [assets, checkedAssets]);

  // Handle adding custom assets from modal form
  const handleAddCustomAsset = (newAsset) => {
    setAssets(prev => [...prev, newAsset]);
    setCheckedAssets(prev => ({
      ...prev,
      [newAsset.symbol]: true
    }));
    // Position it at central coordinates initially
    setActivePositions(prev => ({
      ...prev,
      [newAsset.symbol]: { x: 0, y: 0, z: 0 }
    }));
  };

  // Close tab callback
  const handleCloseTab = (tabId) => {
    setTabs(prev => prev.filter(t => t.id !== tabId));
    if (activeTabId === tabId) {
      setActiveTabId('global');
    }
  };

  // Add a dedicated drill-down tab for the selected asset
  const handleDrillDown = (assetObj) => {
    const tabId = `drilldown-${assetObj.symbol}`;
    const exists = tabs.find(t => t.id === tabId);
    if (!exists) {
      setTabs(prev => [...prev, {
        id: tabId,
        name: `${assetObj.symbol} Analysis`,
        asset: assetObj
      }]);
    }
    setActiveTabId(tabId);
  };

  // Update specific physical formula
  const handleUpdateFormula = (param, value) => {
    setFormulas(prev => ({
      ...prev,
      [param]: value
    }));
  };

  // Reset physics formulas to default template settings
  const handleResetDefaultPhysics = () => {
    const currentTemplate = TEMPLATES.find(t => t.id === activeUniverseId);
    if (currentTemplate) {
      setFormulas({ ...currentTemplate.formulas });
    } else {
      // standard default
      setFormulas({
        mass: 'marketCap',
        velocity: 'momentum * 0.1',
        force: 'volume / 1000',
        gravity: 'correlation * 2.0',
        friction: '0.1 + riskScore * 0.05',
        entropy: 'volatility / 100',
        equilibrium: '30'
      });
    }
  };

  // Find active selected asset details
  const selectedAsset = useMemo(() => {
    return assets.find(a => a.symbol === selectedAssetSymbol);
  }, [assets, selectedAssetSymbol]);

  // Render welcome template page if no universe is loaded
  if (activeUniverseId === null) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Simple Clean Header */}
        <header className="app-header">
          <div className="logo-container">
            <div className="logo-icon">
              <Compass size={20} style={{ color: '#000' }} />
            </div>
            <span className="logo-text">
              Finance Physics <span className="logo-tag">MVP</span>
            </span>
          </div>
        </header>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'radial-gradient(circle at center, #0b0f26 0%, #04060f 100%)' }}>
          <WelcomeScreen 
            onSelectTemplate={handleSelectTemplate} 
            onSelectBlank={handleSelectBlank} 
          />
        </div>
      </div>
    );
  }

  // Active tab details
  const activeTab = tabs.find(t => t.id === activeTabId);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* 1. Dashboard Header */}
      <header className="app-header">
        <div className="logo-container">
          <div className="logo-icon">
            <Compass size={20} style={{ color: '#000' }} />
          </div>
          <span className="logo-text">
            Finance Physics <span className="logo-tag">Engine</span>
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            / <FolderOpen size={12} /> {activeUniverseName}
          </span>
        </div>

        <div className="header-actions">
          {/* Live vs History Ticker indicator */}
          <div className="live-ticker">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className={`live-indicator`} style={{ backgroundColor: isLiveMode ? 'var(--success)' : 'var(--warning)', boxShadow: isLiveMode ? '0 0 8px var(--success)' : 'none' }} />
              <span style={{ fontWeight: 600 }}>{isLiveMode ? 'LIVE TICKER ACTIVE' : 'HISTORICAL MODE'}</span>
            </div>
            <span style={{ color: 'var(--text-muted)', marginLeft: '12px' }}>
              {isLiveMode ? 'Mock Feed Connected' : TIMELINE_LABELS[timelineIndex]}
            </span>
          </div>

          <button className="btn btn-secondary btn-small" onClick={() => setActiveUniverseId(null)}>
            Universe Library
          </button>
        </div>
      </header>

      {/* 2. Workspace Tabs bar */}
      <div className="tab-bar">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button 
              key={tab.id} 
              className={`tab-button ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.name}
              {tab.id !== 'global' && (
                <span 
                  className="tab-close" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseTab(tab.id);
                  }}
                >
                  &times;
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Main Split container */}
      <div className="workspace-container">
        
        {/* Render Left Blender Outliner Sidebar only on Global Tab */}
        {activeTabId === 'global' ? (
          <aside className="sidebar" style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '0', background: 'rgba(9, 11, 23, 0.85)' }}>
            <BlenderOutliner
              assets={assets}
              checkedAssets={checkedAssets}
              onToggleVisibility={(sym) => setCheckedAssets(prev => ({ ...prev, [sym]: !prev[sym] }))}
              selectedAssetSymbol={selectedAssetSymbol}
              onSelectAsset={setSelectedAssetSymbol}
              sceneSettings={sceneSettings}
              onUpdateSceneSettings={handleUpdateSceneSettings}
            />
            {/* Add scene entity button */}
            <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(0,0,0,0.2)' }}>
              <button className="btn btn-primary" style={{ width: '100%', gap: '6px' }} onClick={() => setIsAddModalOpen(true)}>
                <PlusCircle size={14} /> Add Scene Entity
              </button>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                * Click entity node names in Outliner to select, toggle eye icons to hide/show in 3D viewport.
              </div>
            </div>
          </aside>
        ) : null}

        {/* Center Panel: Viewport + Node Editor */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          
          <div style={{ flex: 1, height: '100%', position: 'relative', display: 'flex' }}>
            {activeTabId === 'global' ? (
              /* Global Canvas 3D Space */
              <div style={{ flex: 1, height: '100%', position: 'relative' }}>
                
                {/* Floating Top controls */}
                <div className="hud-card hud-top-center glass-panel" style={{ padding: '8px 12px', alignItems: 'center' }}>
                  
                  {/* Operating Mode switcher */}
                  <div className="mode-toggle">
                    <button 
                      className={`mode-btn ${mode === 'visualization' ? 'active' : ''}`}
                      onClick={() => setMode('visualization')}
                    >
                      <Eye size={12} />
                      Visualization Mode
                    </button>
                    <button 
                      className={`mode-btn simulation ${mode === 'simulation' ? 'active' : ''}`}
                      onClick={() => setMode('simulation')}
                    >
                      <Activity size={12} />
                      Simulation Mode
                    </button>
                  </div>

                  <div style={{ width: '1px', height: '20px', background: 'var(--border-color)', margin: '0 8px' }} />

                  {/* Toggle Node Editor button (Blender style!) */}
                  <button 
                    className="btn btn-secondary btn-small"
                    onClick={() => setShowNodeEditor(!showNodeEditor)}
                    style={{ gap: '4px', border: showNodeEditor ? '1px solid var(--accent)' : '1px solid var(--border-color)' }}
                  >
                    Shader Node Editor: {showNodeEditor ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* Hover Tooltip Overlay */}
                {hoveredAsset && (
                  <div className="hud-card glass-panel-elevated" style={{ top: '20px', left: '20px', padding: '14px', maxWidth: '280px', pointerEvents: 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className={`asset-badge ${hoveredAsset.assetClass === 'Stock' ? 'stock' : 'crypto'}`}>{hoveredAsset.assetClass}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{hoveredAsset.symbol}</span>
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 700, marginTop: '4px' }}>{hoveredAsset.name}</h4>
                    
                    <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '8px', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>X ({dimensions.x}):</span>
                        <span>{hoveredAsset.baseMetrics[dimensions.x]}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Y ({dimensions.y}):</span>
                        <span>{hoveredAsset.baseMetrics[dimensions.y]}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Z ({dimensions.z}):</span>
                        <span>{hoveredAsset.baseMetrics[dimensions.z]}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3D R3F Canvas Render */}
                <FinanceUniverseCanvas
                  assets={activeAssets}
                  dimensions={dimensions}
                  mappings={mappings}
                  mode={mode}
                  selectedAsset={selectedAssetSymbol}
                  onSelectAsset={setSelectedAssetSymbol}
                  onHoverAsset={setHoveredAsset}
                  formulas={formulas}
                  ranges={ranges}
                  activePositions={activePositions}
                  setActivePositions={setActivePositions}
                  onUpdatePhysics={(v, f) => {
                    setVelocities(v);
                    setForces(f);
                  }}
                  velocities={velocities}
                  forces={forces}
                  sceneSettings={sceneSettings}
                  materials={materials}
                />

                {/* Bottom Playback HUD Panel */}
                <div className="hud-card hud-bottom-center glass-panel-elevated" style={{ pointerEvents: 'auto' }}>
                  <div className="simulation-panel">
                    
                    <div className="timeline-row">
                      {/* Live vs History toggler */}
                      <div className="mode-toggle" style={{ marginRight: '8px' }}>
                        <button 
                          className={`mode-btn ${!isLiveMode ? 'active' : ''}`}
                          onClick={() => {
                            setIsLiveMode(false);
                            setIsPlayingPlayback(false);
                          }}
                        >
                          <Database size={11} />
                          History
                        </button>
                        <button 
                          className={`mode-btn simulation ${isLiveMode ? 'active' : ''}`}
                          onClick={() => {
                            setIsLiveMode(true);
                            setIsPlayingPlayback(false);
                          }}
                        >
                          <RefreshCw size={11} />
                          Real-time
                        </button>
                      </div>

                      {!isLiveMode ? (
                        /* History Timeline Controls */
                        <React.Fragment>
                          <button 
                            className="btn btn-secondary btn-icon-only btn-small"
                            onClick={() => setIsPlayingPlayback(!isPlayingPlayback)}
                            title={isPlayingPlayback ? 'Pause historical playback' : 'Play historical playback'}
                          >
                            {isPlayingPlayback ? <Pause size={12} /> : <Play size={12} />}
                          </button>

                          <div className="timeline-slider-container">
                            <input 
                              type="range"
                              className="timeline-slider"
                              min="0"
                              max={TIMELINE_LABELS.length - 1}
                              value={timelineIndex}
                              onChange={(e) => {
                                setTimelineIndex(parseInt(e.target.value));
                                setIsPlayingPlayback(false); // stop playing on manual drag
                              }}
                            />
                            <div className="timeline-tooltip">
                              Active Step: {TIMELINE_LABELS[timelineIndex]} (2020 - 2024 Timeline)
                            </div>
                          </div>

                          {/* Speed select */}
                          <select 
                            className="select-field" 
                            style={{ height: '30px', padding: '0 8px', fontSize: '11px', width: '70px' }}
                            value={playbackSpeed}
                            onChange={(e) => setPlaybackSpeed(parseInt(e.target.value))}
                          >
                            <option value="1500">0.5x</option>
                            <option value="1000">1.0x</option>
                            <option value="400">2.0x</option>
                            <option value="200">5.0x</option>
                          </select>
                        </React.Fragment>
                      ) : (
                        /* Live mode ticker explanation */
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                          <span className="live-indicator" />
                          <span>Live simulated asset feed is active. Values fluctuate slightly on a 2s interval to demonstrate continuous updates.</span>
                        </div>
                      )}

                    </div>

                  </div>
                </div>

              </div>
            ) : (
              /* Local Asset Drill Down Tab screen */
              <DrillDownAnalysisTab 
                asset={activeTab.asset} 
                fullAssetList={assets} 
                onCloseTab={() => handleCloseTab(activeTab.id)}
              />
            )}

            {/* Right Selected Asset Details Dock */}
            {activeTabId === 'global' && selectedAssetSymbol && (
              <RightDetailDock
                asset={selectedAsset}
                formulas={formulas}
                onClose={() => setSelectedAssetSymbol(null)}
                onDrillDown={handleDrillDown}
              />
            )}
          </div>

          {/* Bottom Split Blender Node Editor */}
          {activeTabId === 'global' && showNodeEditor && (
            <BlenderNodeEditor 
              onCompileFormulas={handleCompileFormulas}
              initialNodes={nodeGraphState.nodes}
              initialLinks={nodeGraphState.links}
            />
          )}

        </div>

        {/* Right Blender Properties Inspector only on Global Tab */}
        {activeTabId === 'global' && (
          <BlenderPropertiesInspector
            selectedAsset={selectedAsset}
            sceneSettings={sceneSettings}
            onUpdateSceneSettings={handleUpdateSceneSettings}
            materials={materials}
            onUpdateMaterials={handleUpdateMaterials}
            onUpdateAssetMetrics={handleUpdateAssetMetrics}
            dimensions={dimensions}
            onUpdateDimensions={handleUpdateDimensions}
            mappings={mappings}
            onUpdateMappings={handleUpdateMappings}
          />
        )}

      </div>

      {/* Add Custom Asset modal */}
      <AddAssetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddAsset={handleAddCustomAsset}
      />

    </div>
  );
}
