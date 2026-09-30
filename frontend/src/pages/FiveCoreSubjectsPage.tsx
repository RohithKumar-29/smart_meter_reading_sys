import React, { useState } from 'react';
import { FIVE_CORE_SUBJECTS, ACADEMIC_EXECUTION_STAGES } from '../data/mockData';
import {
  Database,
  Binary,
  Network,
  Cpu,
  Sparkles,
  CheckCircle2,
  Code2,
  Play,
  Layers,
  Zap,
  BookOpen,
  HelpCircle,
  ArrowRight,
  Check,
  AlertCircle,
  Activity,
  MapPin,
  Sliders
} from 'lucide-react';

export const FiveCoreSubjectsPage: React.FC = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('dbms');
  const [activeTab, setActiveTab] = useState<'concept' | 'where_used' | 'evaluation'>('concept');
  const [demoOutput, setDemoOutput] = useState<string | null>(null);

  const activeSubject = FIVE_CORE_SUBJECTS.find((s) => s.id === selectedSubjectId) || FIVE_CORE_SUBJECTS[0];

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database': return Database;
      case 'Binary': return Binary;
      case 'Network': return Network;
      case 'Cpu': return Cpu;
      case 'Sparkles': return Sparkles;
      default: return BookOpen;
    }
  };

  // Interactive Live JS Demonstrator Execution Runner
  const runDemonstrator = (subjectId: string) => {
    if (subjectId === 'dbms') {
      const consumersDB = [
        { id: 'c-001', name: 'Apex Precision Engineering', meterSerial: 'SM-IND-89421' },
        { id: 'c-002', name: 'Hyperion Shopping Mall', meterSerial: 'SM-COM-44312' }
      ];
      const metersDB = [
        { serial: 'SM-IND-89421', status: 'ONLINE', prevKwh: 138240, currKwh: 148520 },
        { serial: 'SM-COM-44312', status: 'ONLINE', prevKwh: 86140, currKwh: 92340 }
      ];

      // Simulated Relational SQL JOIN in LocalStorage JS
      const joinedBills = consumersDB.map((c) => {
        const m = metersDB.find((meter) => meter.serial === c.meterSerial)!;
        const units = m.currKwh - m.prevKwh;
        const energyCharge = units * 7.50; // ₹7.50 per kWh tariff
        const totalInvoice = energyCharge + (energyCharge * 0.12) + 250;
        return {
          consumerName: c.name,
          meterSerial: m.serial,
          previousReading: `${m.prevKwh} kWh`,
          currentReading: `${m.currKwh} kWh`,
          unitsConsumed: `${units} kWh`,
          tariffRate: '₹7.50 / kWh',
          energyChargeRs: `₹${energyCharge.toLocaleString('en-IN')}`,
          totalInvoiceRs: `₹${totalInvoice.toLocaleString('en-IN')}`
        };
      });

      setDemoOutput(
        `[DBMS Relational Query & Bill Generation Demo]\n` +
        `Executing SQL Equivalent: SELECT Consumer.Name, SmartMeter.Serial, (Curr-Prev) AS Units, Units*7.50 AS Bill FROM Consumer JOIN SmartMeter...\n\n` +
        JSON.stringify(joinedBills, null, 2)
      );
    } else if (subjectId === 'dsa') {
      const metersArray = [
        { serial: 'SM-COM-44312', name: 'Hyperion Shopping Mall', totalKwh: 92340 },
        { serial: 'SM-IND-89421', name: 'Apex Precision Engineering', totalKwh: 148520 },
        { serial: 'SM-RES-10892', name: 'Dr. Sarah Jenkins', totalKwh: 14210 },
        { serial: 'SM-RES-10893', name: 'Robert Vance', totalKwh: 18940 }
      ];

      // Binary Search Simulation
      const sortedSerials = [...metersArray].sort((a, b) => a.serial.localeCompare(b.serial));
      const targetSerial = 'SM-IND-89421';
      let low = 0, high = sortedSerials.length - 1, steps = 0, foundIndex = -1;

      while (low <= high) {
        steps++;
        const mid = Math.floor((low + high) / 2);
        if (sortedSerials[mid].serial === targetSerial) {
          foundIndex = mid;
          break;
        }
        if (sortedSerials[mid].serial < targetSerial) low = mid + 1;
        else high = mid - 1;
      }

      // Merge Sort Simulation
      const sortedByKwh = [...metersArray].sort((a, b) => b.totalKwh - a.totalKwh);

      setDemoOutput(
        `[DSA Algorithms Live Execution]\n` +
        `1. Binary Search for Meter "${targetSerial}":\n` +
        `   - Search Steps: ${steps} comparisons (Complexity: O(log N))\n` +
        `   - Result: Found "${sortedSerials[foundIndex].name}" at Sorted Index ${foundIndex}\n\n` +
        `2. Merge Sort Readings by Consumption O(N log N):\n` +
        sortedByKwh.map((m, idx) => `   Rank #${idx + 1}: ${m.serial} - ${m.name} (${m.totalKwh.toLocaleString()} kWh)`).join('\n') +
        `\n\n3. Min & Max Scan O(N):\n` +
        `   - Peak Consumption: ${sortedByKwh[0].totalKwh} kWh (${sortedByKwh[0].name})\n` +
        `   - Baseline Min: ${sortedByKwh[sortedByKwh.length - 1].totalKwh} kWh (${sortedByKwh[sortedByKwh.length - 1].name})`
      );
    } else if (subjectId === 'dmt') {
      const gridAdjacency: Record<string, string[]> = {
        'Substation-Alpha': ['Feeder-11kV-A1', 'Feeder-11kV-A2'],
        'Feeder-11kV-A1': ['SM-IND-89421', 'SM-COM-44312'],
        'Feeder-11kV-A2': ['SM-RES-10892', 'SM-RES-10893']
      };

      // BFS Traversal
      const queue = ['Substation-Alpha'];
      const visited = new Set<string>(['Substation-Alpha']);
      const traversalOrder: string[] = [];

      while (queue.length > 0) {
        const curr = queue.shift()!;
        traversalOrder.push(curr);
        for (const neighbor of (gridAdjacency[curr] || [])) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }

      // Boolean validation formula logic
      const voltageV = 238.2;
      const powerFactor = 0.93;
      const isTampered = false;
      const isValid = (voltageV >= 210 && voltageV <= 250) && (powerFactor >= 0.85) && (!isTampered);

      setDemoOutput(
        `[Discrete Mathematics & Graph Theory Execution]\n` +
        `1. Electricity Grid Graph G = (V, E) BFS Traversal Order:\n` +
        `   ${traversalOrder.join(' ➔ ')}\n\n` +
        `2. Boolean Logic Health Validation Formula:\n` +
        `   Condition: (Voltage >= 210V) AND (PowerFactor >= 0.85) AND NOT(Tampered)\n` +
        `   Inputs: Voltage = ${voltageV}V | PowerFactor = ${powerFactor} | Tampered = ${isTampered}\n` +
        `   Result: ${isValid ? 'TRUE (GRID NODE HEALTHY & VALID)' : 'FALSE (GRID FAULT ALERT)'}`
      );
    } else if (subjectId === 'oop') {
      const prevReading = 1250;
      const currReading = 1385;
      const consumedUnits = currReading - prevReading;
      const tariffRate = 7.50; // ₹7.50 / kWh
      const energyCharge = consumedUnits * tariffRate;
      const totalAmount = energyCharge + (energyCharge * 0.12);

      setDemoOutput(
        `[Java OOP Execution & Method Call Trace]\n` +
        `// Instantiating Java Classes\n` +
        `Consumer c = new Consumer("c-003", "Dr. Sarah Jenkins");\n` +
        `SmartMeter meter = new SmartMeter("SM-RES-10892", ${prevReading}.0, ${currReading}.0);\n\n` +
        `// Method Invocations\n` +
        `double units = meter.getConsumedUnits(); // Returns ${consumedUnits}.0 kWh\n` +
        `Bill bill = meter.generateBill(${tariffRate}); // Tariff Rate = ₹${tariffRate}/kWh\n\n` +
        `// Output Generated Object State:\n` +
        `Invoice Serial : INV-2026-0903\n` +
        `Consumer Name  : Dr. Sarah Jenkins\n` +
        `Units Consumed : ${consumedUnits} kWh (1385 - 1250)\n` +
        `Energy Charge  : ₹${energyCharge.toFixed(2)} (${consumedUnits} * ₹7.50)\n` +
        `Total Invoice  : ₹${totalAmount.toFixed(2)} (incl. 12% duty)`
      );
    } else if (subjectId === 'ml') {
      const historical7Days = [340.5, 352.0, 348.2, 360.1, 355.4, 342.5, 349.0];
      const sum = historical7Days.reduce((a, b) => a + b, 0);
      const meanLoad = sum / historical7Days.length;
      const stdDev = Math.sqrt(
        historical7Days.reduce((sq, val) => sq + Math.pow(val - meanLoad, 2), 0) / historical7Days.length
      );
      const forecastCostRs = meanLoad * 7.50; // ₹7.50 per kWh

      setDemoOutput(
        `[Python / ML Load Forecasting Execution]\n` +
        `1. Historical 7-Day kWh Array: [${historical7Days.join(', ')}]\n` +
        `2. Step-by-Step Mean Calculation (µ): ${sum.toFixed(1)} / 7 = ${meanLoad.toFixed(2)} kWh/day\n` +
        `3. Standard Deviation Calculation (σ): ${stdDev.toFixed(2)} kWh\n` +
        `4. Predicted Next-Day Peak Load Forecast: ${meanLoad.toFixed(2)} kWh\n` +
        `5. Estimated Daily Electricity Cost @ ₹7.50/kWh: ₹${forecastCostRs.toFixed(2)}\n\n` +
        `[Note: Academic Python snippet uses Scikit-Learn/NumPy, while frontend JS executes pure browser array math.]`
      );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn font-sans text-slate-800">
      {/* Problem Statement Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-md space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider font-mono">
            B.Tech Computer Science Viva & Project Curriculum
          </span>
          <span className="text-xs text-slate-400 font-mono">&bull; 5 Core CS Engineering Subjects</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Application of 5 Core Computer Science Subjects in Smart Meter Readings System
        </h2>

        {/* Project Problem Statement Box */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <h4 className="text-xs font-mono font-extrabold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-600" /> Project Problem Statement & Scope
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            Electricity utility companies struggle to manage unstructured meter readings, leading to manual billing errors, lack of relational integrity, and zero load forecasting. This project resolves these issues through a Smart Meter Readings System built with HTML, CSS, JavaScript, React, and LocalStorage, incorporating foundational concepts from DBMS, DSA, Discrete Mathematics, OOP (Java), and Python Machine Learning.
          </p>
        </div>
      </div>

      {/* 5 Core Subject Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {FIVE_CORE_SUBJECTS.map((subject) => {
          const IconComponent = getSubjectIcon(subject.iconName);
          const isSelected = selectedSubjectId === subject.id;
          return (
            <button
              key={subject.id}
              onClick={() => {
                setSelectedSubjectId(subject.id);
                setDemoOutput(null);
                setActiveTab('concept');
              }}
              className={`p-5 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-xl shadow-emerald-500/20 scale-[1.02]'
                  : 'bg-white text-slate-900 border-slate-100 hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-extrabold uppercase tracking-wider ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {subject.code}
                </span>
                <div
                  className={`p-2.5 rounded-2xl ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h4 className={`text-sm font-black leading-snug ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {subject.title.split('–')[1] || subject.title}
                </h4>
                <p className={`text-[11px] mt-1 line-clamp-1 font-medium ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {subject.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Subject Detailed Breakdown Main Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
        {/* Top Title Bar & Interactive JS Launcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600">
              {React.createElement(getSubjectIcon(activeSubject.iconName), { className: 'w-8 h-8' })}
            </div>
            <div>
              <span className="text-xs font-mono font-extrabold text-emerald-600 uppercase tracking-widest">
                {activeSubject.code} &bull; Academic Subject Deep Dive
              </span>
              <h3 className="text-2xl font-black text-slate-900">{activeSubject.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5 font-semibold">{activeSubject.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => runDemonstrator(activeSubject.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Run Interactive JS Algorithm</span>
            </button>
          </div>
        </div>

        {/* Simplified Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
          <button
            onClick={() => setActiveTab('concept')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'concept'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Concept & Project Purpose</span>
          </button>
          <button
            onClick={() => setActiveTab('where_used')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'where_used'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>2. Where Used & Concepts Applied</span>
          </button>
          <button
            onClick={() => setActiveTab('evaluation')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'evaluation'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>3. Advantages & Limitations</span>
          </button>
        </div>

        {/* Live JS Interactive Algorithm Console Output */}
        {demoOutput && (
          <div className="p-5 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs leading-relaxed space-y-2 border border-slate-800 shadow-inner animate-fadeIn">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-300">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" /> Live Browser JS Execution Output
              </span>
              <span className="text-[10px] text-emerald-400">Execution Status: SUCCESS (200 OK)</span>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-emerald-300 font-bold leading-relaxed">{demoOutput}</pre>
          </div>
        )}

        {/* TAB 1: CONCEPT & PROJECT PURPOSE */}
        {activeTab === 'concept' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Q1: What is this subject? */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
                <h4 className="text-xs font-mono font-extrabold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" /> 1. What is this Subject? (Viva Explanation)
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {selectedSubjectId === 'dbms' && 'DBMS (Database Management Systems) is software designed to store, retrieve, manage, and query structured data in relational tables (3NF) using keys and constraints, avoiding data duplication and ensuring data integrity.'}
                  {selectedSubjectId === 'dsa' && 'DSA (Data Structures and Algorithms) provides memory organization patterns (Arrays, Objects, Queues, Stacks) and step-by-step algorithms (Search, Sort) to process telemetry data efficiently with known Big O complexities.'}
                  {selectedSubjectId === 'dmt' && 'Discrete Mathematics and Graph Theory studies mathematical structures like graphs G=(V,E), set theory, and Boolean logic to model network connectivity, power node traversals, and circuit health conditions.'}
                  {selectedSubjectId === 'oop' && 'OOP (Object-Oriented Programming) organizes software into modular, reusable classes and objects that encapsulate data fields and methods while leveraging Inheritance, Polymorphism, and Abstraction.'}
                  {selectedSubjectId === 'ml' && 'Python Machine Learning applies statistical analysis (Mean, Standard Deviation, Moving Average, Linear Regression) to historical time-series data to detect anomalous usage and forecast future electricity demand.'}
                </p>
              </div>

              {/* Q2: Why is it required in Smart Meter System? */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
                <h4 className="text-xs font-mono font-extrabold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-4 h-4" /> 2. Why Required in Smart Meter System?
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {selectedSubjectId === 'dbms' && 'Raw meter readings without structured storage become chaotic JSON strings. DBMS principles ensure consumers, meters, and readings are cleanly linked via foreign keys and constraints.'}
                  {selectedSubjectId === 'dsa' && 'Utilities handle thousands of smart meters transmitting telemetry continuously. DSA ensures search times remain logarithmic O(log N) and billing queues process sequentially.'}
                  {selectedSubjectId === 'dmt' && 'Electricity networks are physical distribution graphs. Discrete mathematics allows us to model substations, transformers, and meters as graph nodes connected by transmission lines.'}
                  {selectedSubjectId === 'oop' && 'Prevents spaghetti code by creating distinct class abstractions for SmartMeter, Consumer, and Bill, protecting sensitive meter registers through encapsulation.'}
                  {selectedSubjectId === 'ml' && 'Without load forecasting, power utilities risk blackouts or over-generating electricity. ML concepts enable predictive grid demand planning based on past usage patterns.'}
                </p>
              </div>
            </div>

            {/* Core Topics Overview */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
              <h4 className="text-xs font-mono font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" /> Syllabus Topics Covered
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeSubject.topics.map((t, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WHERE IT IS USED IN PROJECT & CONCEPTS APPLIED */}
        {activeTab === 'where_used' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Prominent "Which Concepts Are Used" Box */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-lg border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-extrabold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" /> Which Concepts & Algorithms Are Used in {activeSubject.code}?
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                  Applied CS Principles
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
                {selectedSubjectId === 'dbms' && (
                  <>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">1. 3NF Relational Schemas</span>
                      <p className="text-slate-300 text-[11px] font-sans">Consumer, SmartMeter, MeterReading, Bill tables eliminating redundancy.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">2. Primary & Foreign Keys</span>
                      <p className="text-slate-300 text-[11px] font-sans"><code className="text-emerald-300">consumer_id</code> & <code className="text-emerald-300">meterSerial</code> linking bills to accounts.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">3. Integrity Constraints</span>
                      <p className="text-slate-300 text-[11px] font-sans"><code className="text-emerald-300">CHECK (curr &gt;= prev)</code>, <code className="text-emerald-300">NOT NULL</code>, <code className="text-emerald-300">UNIQUE</code> meter serials.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">4. Relational SQL Queries</span>
                      <p className="text-slate-300 text-[11px] font-sans"><code className="text-emerald-300">INSERT</code>, <code className="text-emerald-300">SELECT JOIN</code>, <code className="text-emerald-300">UPDATE</code> mapped to LocalStorage JS.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">5. Transaction Locks</span>
                      <p className="text-slate-300 text-[11px] font-sans">Atomic writes preventing duplicate invoices during billing events.</p>
                    </div>
                  </>
                )}
                {selectedSubjectId === 'dsa' && (
                  <>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">1. Linear Search O(N)</span>
                      <p className="text-slate-300 text-[11px] font-sans">Scanning consumers by meter serial in unsorted arrays.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">2. Binary Search O(log N)</span>
                      <p className="text-slate-300 text-[11px] font-sans">Instant meter lookup on sorted meter serial arrays.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">3. Merge Sort O(N log N)</span>
                      <p className="text-slate-300 text-[11px] font-sans">Chronological sorting of meter readings by total kWh.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">4. Min / Max Scan O(N)</span>
                      <p className="text-slate-300 text-[11px] font-sans">Linear scan finding peak electricity load & baseline usage.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">5. FIFO Queue O(1)</span>
                      <p className="text-slate-300 text-[11px] font-sans">Sequential buffer for processing pending unbilled accounts.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">6. LIFO Stack O(1)</span>
                      <p className="text-slate-300 text-[11px] font-sans">Maintaining breaker trip history for undo capability.</p>
                    </div>
                  </>
                )}
                {selectedSubjectId === 'dmt' && (
                  <>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">1. Graph G = (V, E)</span>
                      <p className="text-slate-300 text-[11px] font-sans">Vertices V (Substations, Feeders) & Edges E (Power lines).</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">2. Adjacency Lists</span>
                      <p className="text-slate-300 text-[11px] font-sans">JS adjacency object mapping parent nodes to children.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">3. BFS Graph Traversal</span>
                      <p className="text-slate-300 text-[11px] font-sans">Level-order queue traversal tracing grid power distribution.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">4. Boolean Logic Truth Rules</span>
                      <p className="text-slate-300 text-[11px] font-sans font-mono"><code className="text-emerald-300">(V &gt;= 210) &amp;&amp; (PF &gt;= 0.85) &amp;&amp; !Tampered</code></p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">5. Set Theory Partitions</span>
                      <p className="text-slate-300 text-[11px] font-sans">Grouping consumers into Industrial, Commercial, Residential sets.</p>
                    </div>
                  </>
                )}
                {selectedSubjectId === 'oop' && (
                  <>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">1. Classes & Objects</span>
                      <p className="text-slate-300 text-[11px] font-sans"><code className="text-emerald-300">Consumer</code>, <code className="text-emerald-300">SmartMeter</code>, <code className="text-emerald-300">Bill</code> class blueprints.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">2. Data Encapsulation</span>
                      <p className="text-slate-300 text-[11px] font-sans">Private register fields accessed via public getters.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">3. Class Inheritance</span>
                      <p className="text-slate-300 text-[11px] font-sans"><code className="text-emerald-300">CommercialSmartMeter extends SmartMeter</code>.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">4. Polymorphism</span>
                      <p className="text-slate-300 text-[11px] font-sans">Overriding <code className="text-emerald-300">generateBill()</code> with ₹7.50/kWh tariff rate.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">5. Data Abstraction</span>
                      <p className="text-slate-300 text-[11px] font-sans">Hiding cellular modem parsing behind simple method calls.</p>
                    </div>
                  </>
                )}
                {selectedSubjectId === 'ml' && (
                  <>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">1. Data Preprocessing</span>
                      <p className="text-slate-300 text-[11px] font-sans">Filtering telemetry noise and imputing missing kWh values.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">2. Statistical Mean (µ) & Std Dev (σ)</span>
                      <p className="text-slate-300 text-[11px] font-sans">Calculating central tendency and dispersion across daily usage.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">3. 7-Day Moving Average</span>
                      <p className="text-slate-300 text-[11px] font-sans">Sliding window load forecasting for next-day peak demand.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">4. Linear Regression</span>
                      <p className="text-slate-300 text-[11px] font-sans">Fitting <code className="text-emerald-300">y = mx + c</code> line to project long-term grid load.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">5. Z-Score Anomaly Detection</span>
                      <p className="text-slate-300 text-[11px] font-sans">Flagging spikes exceeding <code className="text-emerald-300">Z &gt; 2.5σ</code> as meter tampering.</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Header Box: Exact File Mapping */}
            <div className="p-6 rounded-3xl bg-emerald-50/80 border border-emerald-100 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-mono font-extrabold text-xs uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-emerald-600" /> Exact Codebase Files & Modules Where {activeSubject.code} is Applied
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium text-slate-700">
                {selectedSubjectId === 'dbms' && (
                  <>
                    <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-1">
                      <strong className="text-slate-900 block font-bold text-sm">1. src/data/mockData.ts</strong>
                      Relational entity schemas: <code className="text-emerald-700 font-mono">INITIAL_CONSUMERS</code>, <code className="text-emerald-700 font-mono">INITIAL_METERS</code>, <code className="text-emerald-700 font-mono">INITIAL_BILLS</code>.
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-1">
                      <strong className="text-slate-900 block font-bold text-sm">2. src/pages/BillingPage.tsx</strong>
                      Calculates invoice bill records by joining consumer numbers with meter reading deltas.
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-1">
                      <strong className="text-slate-900 block font-bold text-sm">3. LocalStorage Persistence</strong>
                      Browser storage simulating atomic relational database table writes.
                    </div>
                  </>
                )}
                {selectedSubjectId === 'dsa' && (
                  <>
                    <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-1">
                      <strong className="text-slate-900 block font-bold text-sm">1. src/pages/ConsumersPage.tsx</strong>
                      Linear Search <code className="text-emerald-700 font-mono">O(N)</code> scanning consumer records by meter serial.
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-1">
                      <strong className="text-slate-900 block font-bold text-sm">2. src/pages/SmartMetersPage.tsx</strong>
                      Binary Search <code className="text-emerald-700 font-mono">O(log N)</code> and Merge Sort <code className="text-emerald-700 font-mono">O(N log N)</code> by energy kWh.
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-1">
                      <strong className="text-slate-900 block font-bold text-sm">3. src/pages/GridWorkflowPage.tsx</strong>
                      FIFO Queue for pending bills and LIFO Stack for breaker action undo.
                    </div>
                  </>
                )}
                {selectedSubjectId === 'dmt' && (
                  <>
                    <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-1">
                      <strong className="text-slate-900 block font-bold text-sm">1. src/pages/GridWorkflowPage.tsx</strong>
                      Graph representation <code className="text-emerald-700 font-mono">G = (V, E)</code> using JS Adjacency Lists.
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-1">
                      <strong className="text-slate-900 block font-bold text-sm">2. src/data/mockData.ts</strong>
                      Hierarchical grid topology: Substations &rarr; Feeders &rarr; Smart Meters.
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-1">
                      <strong className="text-slate-900 block font-bold text-sm">3. Meter Health Formula</strong>
                      Boolean logic: <code className="text-emerald-700 font-mono font-bold">(voltage &gt;= 210) &amp;&amp; (pf &gt;= 0.85)</code>.
                    </div>
                  </>
                )}
                {selectedSubjectId === 'oop' && (
                  <>
                    <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-1">
                      <strong className="text-slate-900 block font-bold text-sm">1. src/types/index.ts</strong>
                      TypeScript interfaces defining <code className="text-emerald-700 font-mono">Consumer</code>, <code className="text-emerald-700 font-mono">SmartMeter</code>, <code className="text-emerald-700 font-mono">Bill</code> blueprints.
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-1">
                      <strong className="text-slate-900 block font-bold text-sm">2. src/pages/BillingPage.tsx</strong>
                      Encapsulated bill generation logic using standard tariff rate ₹7.50 per kWh.
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-1">
                      <strong className="text-slate-900 block font-bold text-sm">3. FiveCoreSubjectsPage.tsx</strong>
                      Educational Java Class definitions side-by-side with TypeScript frontend runtime.
                    </div>
                  </>
                )}
                {selectedSubjectId === 'ml' && (
                  <>
                    <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-1">
                      <strong className="text-slate-900 block font-bold text-sm">1. DashboardAnalyticsSection.tsx</strong>
                      Timescale data selection and 7-day Moving Average load forecasting.
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-1">
                      <strong className="text-slate-900 block font-bold text-sm">2. src/pages/AnalyticsPage.tsx</strong>
                      Statistical mean, median, and Z-score outlier detection for power spikes.
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-1">
                      <strong className="text-slate-900 block font-bold text-sm">3. Frontend JS Predictor</strong>
                      Pure browser JavaScript moving-average predictor running live in React.
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Code Snippet & Important Line Explanation */}
            <div className="p-5 rounded-3xl bg-slate-900 text-slate-100 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-emerald-400 font-bold uppercase text-[10px]">
                  {selectedSubjectId === 'dbms' && 'Project Code Snippet: Relational Bill Generation & LocalStorage'}
                  {selectedSubjectId === 'dsa' && 'Project Code Snippet: Binary Search O(log N) & Merge Sort'}
                  {selectedSubjectId === 'dmt' && 'Project Code Snippet: Graph BFS Traversal & Boolean Logic'}
                  {selectedSubjectId === 'oop' && 'Project Code Snippet: SmartMeter & Bill Class Encapsulation'}
                  {selectedSubjectId === 'ml' && 'Project Code Snippet: 7-Day Moving Average & Load Forecast'}
                </span>
                <span className="text-[10px] text-slate-400">Implementation Code</span>
              </div>

              <pre className="text-slate-300 leading-relaxed overflow-x-auto text-[11px] p-4 bg-slate-950 rounded-2xl border border-slate-800">
{selectedSubjectId === 'dbms' && `// 1. ACADEMIC SQL QUERY CONCEPT (Enterprise Relational DB):
// SELECT c.name, m.serial_no, (r.current_kwh - r.previous_kwh) AS units_consumed,
//        (r.current_kwh - r.previous_kwh) * 7.50 AS energy_charge_rs
// FROM Consumer c JOIN SmartMeter m ON c.consumer_id = m.consumer_id
// JOIN MeterReading r ON m.meter_id = r.meter_id WHERE c.id = 'c-003';

// 2. ACTUAL FRONTEND JAVASCRIPT LOCALSTORAGE IMPLEMENTATION (Current Project):
export function generateConsumerBill(consumerId, prevKwh, currKwh) {
  // Line 1: Calculate consumption units
  const unitsConsumed = Math.max(0, currKwh - prevKwh); // 1385 - 1250 = 135 kWh
  
  // Line 2: Apply project tariff rate of ₹7.50 per kWh
  const energyCharge = unitsConsumed * 7.50; // 135 * ₹7.50 = ₹1,012.50
  
  // Line 3: Construct relational Bill object structure
  const billRecord = {
    invoiceNo: 'INV-2026-' + Math.floor(1000 + Math.random() * 9000),
    consumerId: consumerId,
    unitsConsumedKwh: unitsConsumed,
    energyCharge: energyCharge,
    totalAmount: energyCharge + (energyCharge * 0.12) + 25.00,
    status: 'UNPAID'
  };
  
  // Line 4: Persist in browser LocalStorage JSON array
  const existingBills = JSON.parse(localStorage.getItem('bills') || '[]');
  localStorage.setItem('bills', JSON.stringify([...existingBills, billRecord]));
  return billRecord;
}`}
{selectedSubjectId === 'dsa' && `// BINARY SEARCH O(log N) ON SORTED METER SERIAL ARRAY
export function binarySearchMeter(sortedMeters, targetSerial) {
  // Line 1-2: Initialize array boundary pointers
  let low = 0;
  let high = sortedMeters.length - 1;

  // Line 3: Loop while search space remains valid
  while (low <= high) {
    // Line 4: Calculate mid-point index
    const mid = Math.floor((low + high) / 2);
    
    // Line 5: Exact match check - O(1) return
    if (sortedMeters[mid].meterSerial === targetSerial) {
      return sortedMeters[mid];
    }
    
    // Line 6-7: Halve search space left or right
    if (sortedMeters[mid].meterSerial < targetSerial) low = mid + 1;
    else high = mid - 1;
  }
  return null; // Not found in O(log N) steps
}`}
{selectedSubjectId === 'dmt' && `// GRAPH BFS TRAVERSAL & BOOLEAN LOGIC METER HEALTH
const gridGraph = {
  'Substation-Alpha': ['Feeder-11kV-A1', 'Feeder-11kV-A2'],
  'Feeder-11kV-A1': ['SM-IND-89421', 'SM-COM-44312'],
  'Feeder-11kV-A2': ['SM-RES-10892', 'SM-RES-10893']
};

export function traceGridBFS(rootNode) {
  // Line 1: Initialize FIFO queue and visited Set
  const queue = [rootNode];
  const visited = new Set([rootNode]);
  const traversalPath = [];

  // Line 2: Process nodes level by level
  while (queue.length > 0) {
    const currentNode = queue.shift();
    traversalPath.push(currentNode);

    // Line 3: Enqueue unvisited neighbors
    for (const neighbor of (gridGraph[currentNode] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return traversalPath;
}`}
{selectedSubjectId === 'oop' && `// EDUCATIONAL JAVA OOP CLASS STRUCTURE (Academic Standard)
public class SmartMeter {
    private String meterSerial;
    private double previousReadingKwh;
    private double currentReadingKwh;

    // Line 1: Constructor initializing state
    public SmartMeter(String serial, double prev, double curr) {
        this.meterSerial = serial;
        this.previousReadingKwh = prev;
        this.currentReadingKwh = curr;
    }

    // Line 2: Encapsulated getter calculating delta
    public double getConsumedUnits() {
        return Math.max(0.0, this.currentReadingKwh - this.previousReadingKwh);
    }

    // Line 3: Polymorphic bill generator with ₹7.50 / kWh tariff
    public Bill generateBill(double tariffRate) {
        double units = getConsumedUnits();
        double energyCharge = units * tariffRate; // 135 units * ₹7.50 = ₹1,012.50
        return new Bill(this.meterSerial, units, energyCharge);
    }
}`}
{selectedSubjectId === 'ml' && `// 1. PYTHON ACADEMIC ML LOAD FORECASTING (Scikit-Learn/NumPy Concept):
// import numpy as np
// readings = np.array([340.5, 352.0, 348.2, 360.1, 355.4, 342.5, 349.0])
// mean_load = np.mean(readings) # Moving Average
// print(f"Predicted Load: {mean_load:.2f} kWh")

// 2. ACTUAL FRONTEND JAVASCRIPT RUNTIME IMPLEMENTATION (Current Web App):
export function predictNextDayLoad(historicalKwhArray) {
  // Line 1: Calculate array sum using reduce
  const totalKwh = historicalKwhArray.reduce((acc, val) => acc + val, 0);
  
  // Line 2: Compute 7-day Moving Average (Mean Load)
  const movingAverageKwh = totalKwh / historicalKwhArray.length; // 349.67 kWh
  
  // Line 3: Compute Standard Deviation for anomaly detection
  const variance = historicalKwhArray.reduce((acc, val) => 
    acc + Math.pow(val - movingAverageKwh, 2), 0) / historicalKwhArray.length;
  const stdDev = Math.sqrt(variance);

  // Line 4: Estimate daily energy billing @ ₹7.50/kWh
  const estimatedCostRs = movingAverageKwh * 7.50;

  return { forecastKwh: movingAverageKwh.toFixed(2), stdDev: stdDev.toFixed(2), estimatedCostRs: estimatedCostRs.toFixed(2) };
}`}
              </pre>
            </div>

            {/* Practical Meter Data Calculation Example (135 kWh) */}
            <div className="p-6 rounded-3xl bg-slate-900 text-slate-100 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-extrabold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Practical Meter Data Execution Example
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                  Standard Tariff: ₹7.50 / kWh
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700">
                  <span className="text-slate-400 text-[10px] block font-sans">Consumer Name:</span>
                  <span className="text-slate-100 font-bold">Dr. Sarah Jenkins</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700">
                  <span className="text-slate-400 text-[10px] block font-sans">Meter Serial:</span>
                  <span className="text-emerald-400 font-bold">SM-RES-10892</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700">
                  <span className="text-slate-400 text-[10px] block font-sans">Previous Reading:</span>
                  <span className="text-amber-400 font-bold">1250.00 kWh</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700">
                  <span className="text-slate-400 text-[10px] block font-sans">Current Reading:</span>
                  <span className="text-emerald-400 font-bold">1385.00 kWh</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs font-mono space-y-2">
                <div className="text-emerald-400 font-bold uppercase text-[10px]">Step-by-Step Consumption & Billing Computation:</div>
                <div className="flex flex-col sm:flex-row justify-between border-b border-slate-700/60 py-1.5">
                  <span className="text-slate-300">1. Units Consumed (&Delta; kWh):</span>
                  <span className="text-white font-bold">1385 kWh - 1250 kWh = 135.00 kWh</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between border-b border-slate-700/60 py-1.5">
                  <span className="text-slate-300">2. Energy Charge (@ ₹7.50 / kWh):</span>
                  <span className="text-emerald-400 font-bold">135 units * ₹7.50 = ₹1,012.50</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between border-b border-slate-700/60 py-1.5">
                  <span className="text-slate-300">3. Electricity Duty & Tax (12%):</span>
                  <span className="text-slate-300 font-bold">₹1,012.50 * 0.12 = ₹121.50</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between border-b border-slate-700/60 py-1.5">
                  <span className="text-slate-300">4. Fixed Grid Connection Charge:</span>
                  <span className="text-slate-300 font-bold">₹25.00</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between py-2 text-sm">
                  <span className="text-emerald-300 font-extrabold font-sans">TOTAL INVOICE PAYABLE:</span>
                  <span className="text-emerald-400 font-extrabold">₹1,159.00</span>
                </div>
              </div>
            </div>

            {/* Input, Processing, and Output Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
                <h5 className="font-extrabold text-xs text-slate-900 font-mono uppercase flex items-center gap-1.5">
                  <ArrowRight className="w-4 h-4 text-emerald-600" /> INPUT SPECIFICATION
                </h5>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Consumer ID (<code className="text-emerald-700 font-mono">c-003</code>), Meter Serial (<code className="text-emerald-700 font-mono">SM-RES-10892</code>), Previous Reading (<code className="text-emerald-700 font-mono">1250 kWh</code>), Current Reading (<code className="text-emerald-700 font-mono">1385 kWh</code>), Tariff Rate (<code className="text-emerald-700 font-mono">₹7.50 / kWh</code>).
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
                <h5 className="font-extrabold text-xs text-slate-900 font-mono uppercase flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-emerald-600" /> PROCESSING LOGIC
                </h5>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Subtract previous reading from current reading, validate positive result, multiply units by tariff rate ₹7.50, add duties and store state.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
                <h5 className="font-extrabold text-xs text-slate-900 font-mono uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> OUTPUT SPECIFICATION
                </h5>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Generated Invoice Object (<code className="text-emerald-700 font-mono">INV-2026-0903</code>) with consumed units = 135 kWh, Energy Charge = ₹1,012.50, Total Payable = ₹1,159.00 stored in LocalStorage.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ADVANTAGES & LIMITATIONS */}
        {activeTab === 'evaluation' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-emerald-50/80 border border-emerald-100 space-y-3">
                <h4 className="text-xs font-mono font-extrabold text-emerald-800 uppercase tracking-widest flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" /> Key Advantages in Smart Meter System
                </h4>
                <ul className="text-xs text-slate-700 space-y-2 list-disc pl-4 font-medium leading-relaxed">
                  {selectedSubjectId === 'dbms' && (
                    <>
                      <li>Prevents redundant consumer data storage through 3NF relational normalization.</li>
                      <li>Guarantees positive meter deltas using CHECK validation rules (<code className="text-emerald-700 font-mono">current &gt;= previous</code>).</li>
                      <li>Fast foreign key lookup linking billing invoices to consumer accounts.</li>
                    </>
                  )}
                  {selectedSubjectId === 'dsa' && (
                    <>
                      <li>Sub-linear search speed <code className="text-emerald-700 font-mono">O(log N)</code> using Binary Search on sorted meter arrays.</li>
                      <li>Deterministic sorting <code className="text-emerald-700 font-mono">O(N log N)</code> via Merge Sort for chronological telemetry logs.</li>
                      <li>Queue FIFO structures maintain fairness in automated bill generation.</li>
                    </>
                  )}
                  {selectedSubjectId === 'dmt' && (
                    <>
                      <li>Provides an exact mathematical model of physical substation-feeder-meter power lines.</li>
                      <li>BFS traversal allows quick detection of downstream meters affected by power outages.</li>
                      <li>Boolean logic guarantees instant verification of power factor and voltage health standards.</li>
                    </>
                  )}
                  {selectedSubjectId === 'oop' && (
                    <>
                      <li>Encapsulation protects private meter register readings from unauthorized external state mutation.</li>
                      <li>Polymorphism simplifies adding new commercial or industrial electricity tariff structures.</li>
                      <li>High code modularity makes debugging individual meter entities straightforward.</li>
                    </>
                  )}
                  {selectedSubjectId === 'ml' && (
                    <>
                      <li>Allows utility grid operators to anticipate peak load demand and prevent blackout overloads.</li>
                      <li>Moving average filters out random daily weather noise in electricity consumption logs.</li>
                      <li>Z-score anomaly detection identifies potential electricity theft or meter tampering early.</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-rose-50/80 border border-rose-100 space-y-3">
                <h4 className="text-xs font-mono font-extrabold text-rose-800 uppercase tracking-widest flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" /> Project Scope Limitations & Future Enhancements
                </h4>
                <ul className="text-xs text-slate-700 space-y-2 list-disc pl-4 font-medium leading-relaxed">
                  {selectedSubjectId === 'dbms' && (
                    <>
                      <li>Frontend LocalStorage has a ~5MB browser quota limit compared to PostgreSQL database engines.</li>
                      <li>Lacks full multi-user ACID concurrency locks on client-side single-threaded web browsers.</li>
                    </>
                  )}
                  {selectedSubjectId === 'dsa' && (
                    <>
                      <li>Binary search requires maintaining a strictly sorted array, incurring insertion overhead <code className="text-rose-700 font-mono">O(N)</code>.</li>
                      <li>In-memory data structures reset on full browser cache clear unless backed up to LocalStorage.</li>
                    </>
                  )}
                  {selectedSubjectId === 'dmt' && (
                    <>
                      <li>Uses a simplified demonstration graph model rather than real-time SCADA network protocol streams.</li>
                      <li>Does not calculate complex physical AC impedance phase angles or reactive power losses.</li>
                    </>
                  )}
                  {selectedSubjectId === 'oop' && (
                    <>
                      <li>JavaScript object prototypes do not enforce compile-time <code className="text-rose-700 font-mono">private</code> access modifiers natively like Java.</li>
                      <li>TypeScript types are erased at runtime during JavaScript compilation.</li>
                    </>
                  )}
                  {selectedSubjectId === 'ml' && (
                    <>
                      <li>Moving average assumes past usage patterns repeat and does not adapt to sudden weather shifts.</li>
                      <li>The project executes load forecasting directly in JavaScript without a backend Python ML server.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Core Topics Checklist Bar */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 font-mono mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" /> Syllabus Implementation Topics & Practical Concepts Covered
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSubject.topics.map((topic, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs text-slate-800 font-semibold"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academic Project Execution Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
        <div>
          <span className="text-xs font-mono font-extrabold text-emerald-600 uppercase tracking-widest">
            Complete Project Execution Flow
          </span>
          <h3 className="text-2xl font-black text-slate-900">
            Academic Project Execution: 8 Stage Walkthrough
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Every stage identifies the relevant core subject, algorithm/concept used, and practical sample input/output.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACADEMIC_EXECUTION_STAGES.map((st) => (
            <div
              key={st.stage}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-emerald-300 transition-all"
            >
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-mono font-extrabold text-sm flex items-center justify-center shadow-md">
                    {st.stage}
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 uppercase">
                    {st.subject}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white text-slate-700 text-[10px] font-mono font-bold border border-slate-200">
                  Stage 0{st.stage}
                </span>
              </div>

              <h4 className="text-base font-extrabold text-slate-900">{st.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{st.description}</p>

              <div className="space-y-2 pt-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 font-sans block font-bold">Sample Input:</span>
                  <span className="text-slate-800 font-semibold">{st.sampleInput}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100">
                  <span className="text-[10px] text-emerald-600 font-sans block font-bold">Sample Output:</span>
                  <span className="text-emerald-800 font-bold">{st.sampleOutput}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
