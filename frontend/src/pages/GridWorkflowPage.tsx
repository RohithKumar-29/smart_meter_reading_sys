import React, { useState } from 'react';
import { INITIAL_METERS, INITIAL_BILLS } from '../data/mockData';
import {
  Network,
  Zap,
  Cpu,
  CheckCircle2,
  ArrowRight,
  GitBranch,
  Play,
  Code2,
  Activity,
  AlertCircle,
  Database,
  Binary,
  Sparkles,
  Search,
  BarChart3,
  Sliders,
  ShieldAlert
} from 'lucide-react';

// Adjacency List Graph Definition G = (V, E)
interface GridGraphEdge {
  to: string;
  distanceMeters: number;
  capacityKva: number;
  status: 'ACTIVE' | 'DISCONNECTED';
}

export const GridWorkflowPage: React.FC = () => {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'architecture' | 'graph_demo' | 'execution_stages' | 'analytics' | 'faults_academic'>('architecture');
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const [graphOutput, setGraphOutput] = useState<string | null>(null);

  // Adjacency List for the Grid Network Graph G = (V, E)
  const gridAdjacencyList: Record<string, GridGraphEdge[]> = {
    'Substation-Alpha': [
      { to: 'Feeder-11kV-A1', distanceMeters: 1200, capacityKva: 2500, status: 'ACTIVE' },
      { to: 'Feeder-11kV-A2', distanceMeters: 1800, capacityKva: 2000, status: 'ACTIVE' }
    ],
    'Feeder-11kV-A1': [
      { to: 'Transformer-TR01', distanceMeters: 450, capacityKva: 800, status: 'ACTIVE' }
    ],
    'Feeder-11kV-A2': [
      { to: 'Transformer-TR02', distanceMeters: 600, capacityKva: 500, status: 'ACTIVE' }
    ],
    'Transformer-TR01': [
      { to: 'SM-IND-89421', distanceMeters: 50, capacityKva: 200, status: 'ACTIVE' },
      { to: 'SM-COM-44312', distanceMeters: 80, capacityKva: 150, status: 'ACTIVE' }
    ],
    'Transformer-TR02': [
      { to: 'SM-RES-10892', distanceMeters: 30, capacityKva: 25, status: 'ACTIVE' },
      { to: 'SM-RES-10893', distanceMeters: 45, capacityKva: 25, status: 'ACTIVE' },
      { to: 'SM-COM-55190', distanceMeters: 120, capacityKva: 100, status: 'DISCONNECTED' } // Simulated fault node
    ]
  };

  // BFS Traversal Algorithm
  const runBFS = (startNode: string) => {
    const queue = [startNode];
    const visited = new Set<string>([startNode]);
    const traversalPath: string[] = [];

    while (queue.length > 0) {
      const current = queue.shift()!;
      traversalPath.push(current);

      const neighbors = gridAdjacencyList[current] || [];
      for (const edge of neighbors) {
        if (!visited.has(edge.to) && edge.status === 'ACTIVE') {
          visited.add(edge.to);
          queue.push(edge.to);
        }
      }
    }

    setGraphOutput(
      `[Breadth-First Search (BFS) Traversal Result]\n` +
      `Root Node: ${startNode}\n` +
      `Reachable Active Grid Nodes (${traversalPath.length} total):\n` +
      `➔ ${traversalPath.join(' ➔ ')}\n\n` +
      `Algorithm Complexity: Time O(V + E) | Space O(V)`
    );
  };

  // DFS Traversal Algorithm
  const runDFS = (startNode: string) => {
    const visited = new Set<string>();
    const path: string[] = [];

    function dfsHelper(node: string) {
      visited.add(node);
      path.push(node);

      const neighbors = gridAdjacencyList[node] || [];
      for (const edge of neighbors) {
        if (!visited.has(edge.to) && edge.status === 'ACTIVE') {
          dfsHelper(edge.to);
        }
      }
    }

    dfsHelper(startNode);

    setGraphOutput(
      `[Depth-First Search (DFS) Traversal Result]\n` +
      `Root Node: ${startNode}\n` +
      `Explored Network Path:\n` +
      `➔ ${path.join(' ➔ ')}\n\n` +
      `Algorithm Complexity: Time O(V + E) | Space O(V)`
    );
  };

  // Path Connectivity Verification (Transformer-TR01 to SM-IND-89421)
  const verifyPath = (source: string, target: string) => {
    const queue = [[source]];
    const visited = new Set<string>([source]);
    let foundPath: string[] | null = null;

    while (queue.length > 0) {
      const currentPath = queue.shift()!;
      const lastNode = currentPath[currentPath.length - 1];

      if (lastNode === target) {
        foundPath = currentPath;
        break;
      }

      for (const edge of (gridAdjacencyList[lastNode] || [])) {
        if (!visited.has(edge.to)) {
          visited.add(edge.to);
          queue.push([...currentPath, edge.to]);
        }
      }
    }

    if (foundPath) {
      setGraphOutput(
        `[Path Trace & Connectivity Check SUCCESS]\n` +
        `Path from ${source} to ${target}:\n` +
        `➔ ${foundPath.join(' ➔ ')}\n` +
        `Connection Status: 100% ACTIVE | Physical Distance: ~1,700 meters\n` +
        `Result: Grid link verified intact.`
      );
    } else {
      setGraphOutput(
        `[Path Trace FAILED]\n` +
        `No active connection route found between ${source} and ${target}.`
      );
    }
  };

  // Scan Disconnected / Unreachable Nodes
  const scanFaults = () => {
    const disconnectedNodes: { node: string; reason: string }[] = [];

    Object.entries(gridAdjacencyList).forEach(([parent, edges]) => {
      edges.forEach((edge) => {
        if (edge.status === 'DISCONNECTED') {
          disconnectedNodes.push({ node: edge.to, reason: `Edge connection from ${parent} is DISCONNECTED (0.0V Line Failure)` });
        }
      });
    });

    const faultMeters = INITIAL_METERS.filter((m) => m.status === 'FAULT' || m.voltageV === 0);
    faultMeters.forEach((m) => {
      if (!disconnectedNodes.some((d) => d.node === m.meterSerial)) {
        disconnectedNodes.push({ node: m.meterSerial, reason: `Meter reported Voltage Collapse (0.0V) & Breaker Open` });
      }
    });

    setGraphOutput(
      `[Grid Fault & Disconnected Node Diagnostic Scan]\n` +
      `Scan Complete: Found ${disconnectedNodes.length} Isolated/Faulty Nodes:\n` +
      disconnectedNodes.map((d, i) => `${i + 1}. [FAULT] ${d.node}: ${d.reason}`).join('\n') +
      `\n\nAction Triggered: Maintenance ticket auto-dispatched to SCADA dispatch team.`
    );
  };

  // 10 Logical Execution Workflow Stages Example Scenario
  const TEN_EXECUTION_STAGES = [
    {
      stage: 1,
      title: '1. Identify Consumer & Associated Smart Meter',
      concept: 'DBMS Foreign Key Lookup',
      input: 'Consumer No: CONS-IND-10091 (Apex Precision Corp)',
      processing: 'Query Consumer database table using primary key "CONS-IND-10091" and fetch associated foreign key meter serial.',
      output: 'Smart Meter Serial: SM-IND-89421 (Power Cell Pro 5000)',
      subject: 'DBMS & Data Modeling'
    },
    {
      stage: 2,
      title: "2. Find Meter's Connected Grid Node",
      concept: 'Graph Adjacency Mapping',
      input: 'Meter Serial: SM-IND-89421',
      processing: 'Scan grid topology graph G = (V, E) to map meter node SM-IND-89421 to its upstream distribution parent node.',
      output: 'Parent Transformer: Transformer-TR01 (Feeder 11kV-A1)',
      subject: 'Discrete Mathematics (Graph Theory)'
    },
    {
      stage: 3,
      title: '3. Trace Path from Transformer to Meter',
      concept: 'BFS Path Traversal',
      input: 'Source: Substation-Alpha | Target: SM-IND-89421',
      processing: 'Execute Breadth-First Search (BFS) algorithm to trace physical power distribution path across grid nodes.',
      output: 'Path: Substation-Alpha ➔ Feeder-11kV-A1 ➔ Transformer-TR01 ➔ SM-IND-89421',
      subject: 'DSA & Graph Algorithms'
    },
    {
      stage: 4,
      title: '4. Check Connection & Status Rules',
      concept: 'Boolean Logic Validation',
      input: 'Grid Edges Status: [ACTIVE, ACTIVE, ACTIVE], Voltage = 238.2V, PF = 0.93',
      processing: 'Evaluate Boolean formula: isValid = (voltage >= 210) AND (pf >= 0.85) AND NOT(tampered) AND ALL_EDGES_ACTIVE.',
      output: 'Result: TRUE (Grid link 100% operational)',
      subject: 'Discrete Math & Logic'
    },
    {
      stage: 5,
      title: '5. Capture Previous & Current Meter Readings',
      concept: 'Telemetry Data Ingestion',
      input: 'Meter SM-IND-89421 Telemetry Register Poll',
      processing: 'Retrieve previous billed register (138,240 kWh) and record current 1-sec cellular telemetry register (148,520 kWh).',
      output: 'Previous: 138,240 kWh | Current: 148,520 kWh',
      subject: 'System Architecture & Telemetry'
    },
    {
      stage: 6,
      title: '6. Calculate Electricity Consumption (kWh)',
      concept: 'Arithmetic Unit Delta',
      input: 'Previous = 138,240.00 kWh | Current = 148,520.00 kWh',
      processing: 'Calculate energy delta: Delta kWh = Math.max(0, CurrentReading - PreviousReading). Verify non-negative condition.',
      output: 'Units Consumed: 10,280.00 kWh',
      subject: 'DSA & Mathematical Rules'
    },
    {
      stage: 7,
      title: '7. Associate Consumption with Grid Node',
      concept: 'Relational Billing Mapping',
      input: 'Delta = 10,280 kWh, Node = Transformer-TR01',
      processing: 'Store consumption record in LocalStorage/Database and map 10,280 kWh to Transformer-TR01 total load ledger.',
      output: 'Ledger Record: Transformer-TR01 +10,280 kWh',
      subject: 'DBMS & Relational Tables'
    },
    {
      stage: 8,
      title: '8. Aggregate Transformer-Level Consumption',
      concept: 'Array Reduction & Aggregation',
      input: 'Transformer-TR01 Meters: SM-IND-89421 (10,280 kWh) + SM-COM-44312 (6,200 kWh)',
      processing: 'Sum consumed kWh across all smart meters connected to Transformer-TR01 using Array.reduce().',
      output: 'Total TR01 Consumption: 16,480.00 kWh (2 connected consumers)',
      subject: 'DSA & Functional Programming'
    },
    {
      stage: 9,
      title: '9. Identify Disconnected Meters / Invalid Readings',
      concept: 'Statistical & Fault Filtering',
      input: 'Grid Meter Telemetry Registers',
      processing: 'Filter meters with voltage 0.0V or missing RF pings. Flag SM-COM-55190 as disconnected node.',
      output: 'Alert Flag: SM-COM-55190 (Fault/Disconnected, 0.0V collapse)',
      subject: 'DSA & Outlier Filtering'
    },
    {
      stage: 10,
      title: '10. Aggregate Grid Load Data for Planning',
      concept: 'Python ML Load Forecasting',
      input: 'Feeder 11kV-A1 Aggregate Load: 25.4 MWh',
      processing: 'Pass aggregate historical daily kWh totals into 7-day Moving Average forecast model to project next-day peak demand kW.',
      output: 'Next-Day Peak Forecast: 26.2 MWh (Capacity Usage: 72.8%)',
      subject: 'Python Machine Learning'
    }
  ];

  // Grid Load Analysis Calculations using actual project data
  const tr01Bills = INITIAL_BILLS.filter((b) => b.category === 'INDUSTRIAL' || b.category === 'COMMERCIAL');
  const totalTr01Kwh = tr01Bills.reduce((acc, b) => acc + b.unitsConsumedKwh, 0); // 10,280 + 6,200 = 16,480 kWh
  const avgKwhPerConsumer = totalTr01Kwh / (tr01Bills.length || 1); // 8,240 kWh
  const highestConsumer = INITIAL_METERS.reduce((prev, curr) => (curr.totalKwh > prev.totalKwh ? curr : prev));
  const faultyMetersList = INITIAL_METERS.filter((m) => m.status === 'FAULT' || m.voltageV === 0);

  // Time-based Average Power calculation (30 days billing period = 720 hours)
  const billingHours = 30 * 24; // 720 hours
  const avgPowerKwTr01 = (totalTr01Kwh / billingHours).toFixed(2); // 16,480 / 720 = 22.89 kW

  return (
    <div className="space-y-8 animate-fadeIn font-sans text-slate-800">
      {/* Top Problem & Context Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-md space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider font-mono">
            Grid Topology & Telemetry Architecture
          </span>
          <span className="text-xs text-slate-400 font-mono">&bull; B.Tech Capstone Syllabus</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Smart Meter Electricity Distribution Network & Grid Workflow
        </h2>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Understand how electrical power flows physically from high-voltage substations through 11kV distribution feeders down to smart meters, while digital IoT cellular telemetry streams voltage, power factor, and kWh consumption registers to the utility monitoring center.
        </p>
      </div>

      {/* Main Grid Workflow Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
        <button
          onClick={() => setActiveWorkflowTab('architecture')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeWorkflowTab === 'architecture'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Network className="w-4 h-4 text-emerald-400" />
          <span>1. Physical vs Digital Workflow</span>
        </button>

        <button
          onClick={() => setActiveWorkflowTab('graph_demo')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeWorkflowTab === 'graph_demo'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <GitBranch className="w-4 h-4 text-emerald-300" />
          <span>2. Interactive Grid Graph (BFS / DFS)</span>
        </button>

        <button
          onClick={() => setActiveWorkflowTab('execution_stages')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeWorkflowTab === 'execution_stages'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sliders className="w-4 h-4 text-emerald-400" />
          <span>3. 10-Stage Grid Workflow</span>
        </button>

        <button
          onClick={() => setActiveWorkflowTab('analytics')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeWorkflowTab === 'analytics'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          <span>4. Grid Load & Power Math</span>
        </button>

        <button
          onClick={() => setActiveWorkflowTab('faults_academic')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeWorkflowTab === 'faults_academic'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>5. Fault Diagnostics & 5 Core CS Subjects</span>
        </button>
      </div>

      {/* TAB 1: PHYSICAL VS DIGITAL ELECTRICITY DISTRIBUTION WORKFLOW */}
      {activeWorkflowTab === 'architecture' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Complete 7-Stage Distribution Pipeline */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-extrabold text-emerald-600 uppercase tracking-widest">
                  End-to-End Power & Data Flow
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  7-Stage Electricity Distribution & Telemetry Process
                </h3>
              </div>
              <span className="hidden sm:inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-100">
                Physical Power + Digital Telemetry
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[10px] font-mono font-extrabold text-emerald-600 uppercase">Stage 01: Generation</span>
                <h4 className="text-sm font-extrabold text-slate-900">1. Generation & Transmission</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">Bulk power generated at power stations and transmitted at ultra-high voltages (220kV/400kV) over long distances.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[10px] font-mono font-extrabold text-emerald-600 uppercase">Stage 02: Primary Substation</span>
                <h4 className="text-sm font-extrabold text-slate-900">2. High-Voltage Substations</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">Substation Alpha (33kV/66kV) steps down bulk transmission voltage for city distribution networks.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[10px] font-mono font-extrabold text-emerald-600 uppercase">Stage 03: Distribution</span>
                <h4 className="text-sm font-extrabold text-slate-900">3. Distribution Transformers</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">Pole-mounted & kiosk transformers (TR-01, TR-02) step down 11kV lines to 240V/415V consumer voltage.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[10px] font-mono font-extrabold text-emerald-600 uppercase">Stage 04: Feeders</span>
                <h4 className="text-sm font-extrabold text-slate-900">4. Distribution Feeders</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">Feeder 11kV-A1 & Feeder 11kV-A2 carry medium-voltage power along residential and commercial streets.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[10px] font-mono font-extrabold text-emerald-600 uppercase">Stage 05: Consumer Supply</span>
                <h4 className="text-sm font-extrabold text-slate-900">5. Service Connection</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">Armored service drop cables bring 240V single-phase or 415V 3-phase AC power to consumer premises.</p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <span className="text-[10px] font-mono font-extrabold text-emerald-700 uppercase">Stage 06: Smart Measurement</span>
                <h4 className="text-sm font-extrabold text-slate-900">6. Smart Meter Nodes</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">Power Cell smart meters continuously measure active power kW, voltage, current, and accumulated kWh.</p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 lg:col-span-2">
                <span className="text-[10px] font-mono font-extrabold text-emerald-700 uppercase">Stage 07: Digital Processing</span>
                <h4 className="text-sm font-extrabold text-slate-900">7. Telemetry Collection & Ingestion</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">Cellular NB-IoT modems transmit encrypted JSON packets to the utility server for automated billing and load analytics.</p>
              </div>
            </div>

            {/* Clear Technical Distinction Box */}
            <div className="p-6 rounded-3xl bg-slate-900 text-slate-100 space-y-3 border border-slate-800">
              <h4 className="text-xs font-mono font-extrabold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" /> Technical Distinction: Physical Flow vs Digital Telemetry
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-1">
                  <strong className="text-emerald-300 font-bold block text-sm">Physical Electricity Flow (Hardware Layer)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    High-voltage AC electrical current generated at power stations, transmitted via aluminum conductors, stepped down at substations/transformers, and consumed by resistive/inductive appliances. Obeying Kirchhoff’s and Ohm’s laws.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-1">
                  <strong className="text-emerald-300 font-bold block text-sm">Digital Telemetry Flow (Data Layer)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Digital binary data sampling voltage, current, power factor, and cumulative kWh. Transmitted as encrypted cellular packets over RF modems to LocalStorage/Databases for billing calculation and load forecasting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE GRID NETWORK GRAPH & JAVASCRIPT ALGORITHMS */}
      {activeWorkflowTab === 'graph_demo' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-extrabold text-emerald-600 uppercase tracking-widest">
                  Graph Data Structure G = (V, E)
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  JavaScript Grid Adjacency List & Algorithm Execution
                </h3>
              </div>

              {/* Execution Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => runBFS('Substation-Alpha')}
                  className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Run BFS Traversal
                </button>
                <button
                  onClick={() => runDFS('Substation-Alpha')}
                  className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Run DFS Traversal
                </button>
                <button
                  onClick={() => verifyPath('Substation-Alpha', 'SM-IND-89421')}
                  className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" /> Trace Path to Meter
                </button>
                <button
                  onClick={() => scanFaults()}
                  className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5" /> Scan Grid Faults
                </button>
              </div>
            </div>

            {/* Live JS Execution Output Screen */}
            {graphOutput && (
              <div className="p-5 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs leading-relaxed space-y-2 border border-slate-800 shadow-inner animate-fadeIn">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-300">
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" /> Graph Algorithm Live Output Buffer
                  </span>
                  <span className="text-[10px] text-emerald-400">Execution Status: OK (200)</span>
                </div>
                <pre className="whitespace-pre-wrap font-mono text-emerald-300 font-bold leading-relaxed">{graphOutput}</pre>
              </div>
            )}

            {/* Adjacency List Structure Explanation */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 font-mono text-xs">
              <span className="text-emerald-700 font-extrabold uppercase text-[10px]">Grid Adjacency List Structure in JavaScript</span>
              <pre className="text-slate-800 leading-relaxed overflow-x-auto p-4 bg-white rounded-xl border border-slate-200">
{`const gridAdjacencyList = {
  'Substation-Alpha': [
    { to: 'Feeder-11kV-A1', distanceMeters: 1200, capacityKva: 2500, status: 'ACTIVE' },
    { to: 'Feeder-11kV-A2', distanceMeters: 1800, capacityKva: 2000, status: 'ACTIVE' }
  ],
  'Feeder-11kV-A1': [{ to: 'Transformer-TR01', distanceMeters: 450, capacityKva: 800, status: 'ACTIVE' }],
  'Transformer-TR01': [
    { to: 'SM-IND-89421', distanceMeters: 50, capacityKva: 200, status: 'ACTIVE' },
    { to: 'SM-COM-44312', distanceMeters: 80, capacityKva: 150, status: 'ACTIVE' }
  ],
  'Transformer-TR02': [
    { to: 'SM-RES-10892', distanceMeters: 30, capacityKva: 25, status: 'ACTIVE' },
    { to: 'SM-COM-55190', distanceMeters: 120, capacityKva: 100, status: 'DISCONNECTED' }
  ]
};`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 10-STAGE GRID WORKFLOW EXECUTION */}
      {activeWorkflowTab === 'execution_stages' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
            <div>
              <span className="text-xs font-mono font-extrabold text-emerald-600 uppercase tracking-widest">
                Sequential Processing Flow
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                10-Stage Grid Workflow Execution Scenario
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Scenario: Processing Consumer "Apex Precision Engineering" connected to Meter <code className="text-emerald-700 font-mono font-bold">SM-IND-89421</code> via Transformer <code className="text-emerald-700 font-mono font-bold">TR-01</code>.
              </p>
            </div>

            {/* Stepper Buttons 1 to 10 */}
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
              {TEN_EXECUTION_STAGES.map((st, idx) => (
                <button
                  key={st.stage}
                  onClick={() => setSelectedStageIndex(idx)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                    selectedStageIndex === idx
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20 font-bold scale-[1.03]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-slate-100'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-black ${selectedStageIndex === idx ? 'text-emerald-100' : 'text-slate-400'}`}>
                    STAGE {st.stage < 10 ? `0${st.stage}` : st.stage}
                  </span>
                  <span className="text-[11px] line-clamp-1 font-extrabold">{st.title.split('.')[1] || st.title}</span>
                </button>
              ))}
            </div>

            {/* Stage Detail Card */}
            {(() => {
              const currentStage = TEN_EXECUTION_STAGES[selectedStageIndex];
              return (
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest">
                        {currentStage.subject} &bull; Concept: {currentStage.concept}
                      </span>
                      <h4 className="text-xl font-extrabold text-slate-900">{currentStage.title}</h4>
                    </div>

                    <span className="px-4 py-1.5 rounded-full bg-white text-slate-800 text-xs font-mono font-extrabold border border-slate-200 shadow-sm">
                      Stage {currentStage.stage} of 10
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    <strong>Processing Logic: </strong>{currentStage.processing}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/70 space-y-2">
                      <span className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-500" /> Stage Input
                      </span>
                      <p className="text-slate-900 font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {currentStage.input}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200/70 space-y-2">
                      <span className="text-[10px] font-mono font-extrabold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Stage Output
                      </span>
                      <p className="text-emerald-700 font-extrabold bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                        {currentStage.output}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB 4: GRID CONSUMPTION AND POWER MATH ANALYSIS */}
      {activeWorkflowTab === 'analytics' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
            <div>
              <span className="text-xs font-mono font-extrabold text-emerald-600 uppercase tracking-widest">
                Grid Consumption & Load Aggregation
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Transformer & Feeder Level Load Metrics
              </h3>
            </div>

            {/* Calculated Grid Aggregation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-2">
                <span className="text-[10px] font-mono font-extrabold text-emerald-700 uppercase">Transformer-TR01 Load</span>
                <h4 className="text-2xl font-black text-slate-900">{totalTr01Kwh.toLocaleString()} kWh</h4>
                <p className="text-xs text-slate-600">Aggregated across 2 commercial/industrial smart meters.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-mono font-extrabold text-slate-500 uppercase">Average / Consumer</span>
                <h4 className="text-2xl font-black text-slate-900">{avgKwhPerConsumer.toLocaleString()} kWh</h4>
                <p className="text-xs text-slate-600">Mean monthly usage per connected consumer.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-mono font-extrabold text-slate-500 uppercase">Highest Consumer Node</span>
                <h4 className="text-lg font-extrabold text-slate-900 line-clamp-1">{highestConsumer.consumerName}</h4>
                <p className="text-xs font-mono text-emerald-600 font-bold">{highestConsumer.totalKwh.toLocaleString()} kWh ({highestConsumer.meterSerial})</p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-100 space-y-2">
                <span className="text-[10px] font-mono font-extrabold text-rose-700 uppercase">Invalid / Disconnected</span>
                <h4 className="text-2xl font-black text-rose-600">{faultyMetersList.length} Nodes</h4>
                <p className="text-xs text-rose-700 font-semibold">{faultyMetersList[0]?.meterSerial} (0.0V collapse)</p>
              </div>
            </div>

            {/* Power Math Distinction Box */}
            <div className="p-6 rounded-3xl bg-slate-900 text-slate-100 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-extrabold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Energy (kWh) vs Power (kW) Mathematical Formula
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                  Formula: P = E / t
                </span>
              </div>

              <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 text-xs font-mono space-y-3">
                <div className="text-emerald-300 font-bold">Calculation for Transformer-TR01 Average Power (kW):</div>
                <div className="text-slate-300">Total Energy Consumed (E) = 16,480 kWh</div>
                <div className="text-slate-300">Billing Period Duration (t) = 30 days &times; 24 hours = 720 hours</div>
                <div className="text-emerald-400 font-extrabold text-sm p-3 bg-slate-900 rounded-xl border border-slate-700">
                  Average Power (kW) = 16,480 kWh / 720 hours = {avgPowerKwTr01} kW
                </div>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                <strong>Important Technical Note:</strong> Kilowatt-hour (kWh) represents cumulative electrical energy consumed over time. Kilowatt (kW) represents instantaneous or average power flow. Without sub-hourly interval timestamps, instantaneous peak kW cannot be calculated from cumulative kWh meter registers alone.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FAULT DIAGNOSTICS & ACADEMIC CS SUBJECT CONNECTIONS */}
      {activeWorkflowTab === 'faults_academic' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Grid Fault Monitoring Scenarios */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
            <div>
              <span className="text-xs font-mono font-extrabold text-emerald-600 uppercase tracking-widest">
                Educational Fault Scenarios
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Grid Connectivity & Fault Monitoring Scenarios
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <strong className="text-amber-900 font-bold text-sm block">1. Communication Fault vs Physical Power Outage</strong>
                <p className="text-amber-800 leading-relaxed">
                  A <em>Communications Fault</em> occurs when cellular RSSI drops (-99 dBm) but line voltage remains 238V. A <em>Physical Power Outage</em> causes immediate line voltage collapse (0.0V) and trips the remote circuit breaker.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <strong className="text-rose-900 font-bold text-sm block">2. Disconnected Edge Topology Impact</strong>
                <p className="text-rose-800 leading-relaxed">
                  When a distribution edge connection status is set to <code className="font-mono">DISCONNECTED</code>, graph traversal algorithms (BFS/DFS) isolate all downstream smart meters as unreachable nodes.
                </p>
              </div>
            </div>
          </div>

          {/* Academic 5 Core Subject Connections */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
            <div>
              <span className="text-xs font-mono font-extrabold text-emerald-600 uppercase tracking-widest">
                Academic Curriculum Integration
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Grid Workflow Connection to 5 Core Computer Science Subjects
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium text-slate-700">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-mono font-bold uppercase text-[10px]">
                  <Database className="w-4 h-4" /> 1. DBMS
                </div>
                <strong className="text-slate-900 block font-bold text-sm">Relational Schemas & Keys</strong>
                <p className="text-slate-600 leading-relaxed">Stores Substations, Feeders, Transformers, and Smart Meters in 3NF relational tables linked via foreign keys <code className="text-emerald-700 font-mono">feeder_id</code> and <code className="text-emerald-700 font-mono">consumer_id</code>.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-mono font-bold uppercase text-[10px]">
                  <Binary className="w-4 h-4" /> 2. DSA
                </div>
                <strong className="text-slate-900 block font-bold text-sm">Adjacency Lists & Traversal</strong>
                <p className="text-slate-600 leading-relaxed">Represents grid topology using Adjacency Lists. Executes BFS and DFS in <code className="text-emerald-700 font-mono">O(V + E)</code> time complexity for path tracing.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-mono font-bold uppercase text-[10px]">
                  <Network className="w-4 h-4" /> 3. DMT
                </div>
                <strong className="text-slate-900 block font-bold text-sm">Graph Theory G = (V, E)</strong>
                <p className="text-slate-600 leading-relaxed">Models power grids as connected graphs $G=(V,E)$. Evaluates Boolean validity: <code className="text-emerald-700 font-mono">(Voltage &gt;= 210) &amp;&amp; (PF &gt;= 0.85)</code>.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-mono font-bold uppercase text-[10px]">
                  <Cpu className="w-4 h-4" /> 4. OOP Java
                </div>
                <strong className="text-slate-900 block font-bold text-sm">Class Structure & Encapsulation</strong>
                <p className="text-slate-600 leading-relaxed">Models <code className="text-emerald-700 font-mono">Substation</code>, <code className="text-emerald-700 font-mono">Transformer</code>, and <code className="text-emerald-700 font-mono">SmartMeter</code> classes with private fields and polymorphic methods.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 lg:col-span-2">
                <div className="flex items-center gap-2 text-emerald-600 font-mono font-bold uppercase text-[10px]">
                  <Sparkles className="w-4 h-4" /> 5. Python / Machine Learning
                </div>
                <strong className="text-slate-900 block font-bold text-sm">Grid Load Forecasting & Anomaly Detection</strong>
                <p className="text-slate-600 leading-relaxed">Aggregates historical transformer-level kWh consumption and executes 7-day Moving Average forecasting models to project peak demand and prevent overloading.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
