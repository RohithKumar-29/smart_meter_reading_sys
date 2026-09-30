import type { SmartMeter, Consumer, Substation, Bill, Alert, ForecastPoint, CoreSubjectItem } from '../types';

export const INITIAL_METERS: SmartMeter[] = [
  {
    id: 'm-101',
    meterSerial: 'SM-IND-89421',
    consumerId: 'c-001',
    consumerName: 'Apex Precision Engineering Corp',
    category: 'INDUSTRIAL',
    feederId: 'f-101',
    feederName: 'Feeder 11kV-A1',
    substationName: 'Substation Alpha (Metro Central)',
    model: 'Power Cell Pro 5000',
    status: 'ONLINE',
    signalStrengthDbm: -62,
    voltageV: 238.2,
    currentA: 84.6,
    powerFactor: 0.93,
    activePowerKw: 60.8,
    totalKwh: 148520,
    todayKwh: 342.5,
    lastPingTime: 'Just now',
    installDate: '2024-03-15',
    latitude: 28.6139,
    longitude: 77.2090,
    remoteBreakerState: 'CLOSED'
  },
  {
    id: 'm-102',
    meterSerial: 'SM-COM-44312',
    consumerId: 'c-002',
    consumerName: 'Hyperion Shopping Mall',
    category: 'COMMERCIAL',
    feederId: 'f-101',
    feederName: 'Feeder 11kV-A1',
    substationName: 'Substation Alpha (Metro Central)',
    model: 'Power Cell Commercial A18',
    status: 'ONLINE',
    signalStrengthDbm: -71,
    voltageV: 237.8,
    currentA: 62.4,
    powerFactor: 0.94,
    activePowerKw: 44.5,
    totalKwh: 92340,
    todayKwh: 218.0,
    lastPingTime: '1 min ago',
    installDate: '2024-06-20',
    latitude: 28.6180,
    longitude: 77.2150,
    remoteBreakerState: 'CLOSED'
  },
  {
    id: 'm-103',
    meterSerial: 'SM-RES-10892',
    consumerId: 'c-003',
    consumerName: 'Dr. Sarah Jenkins (Villa #14)',
    category: 'RESIDENTIAL',
    feederId: 'f-102',
    feederName: 'Feeder 11kV-A2 (Residential)',
    substationName: 'Substation Alpha (Metro Central)',
    model: 'Power Cell Smart Home 300',
    status: 'ONLINE',
    signalStrengthDbm: -55,
    voltageV: 238.5,
    currentA: 18.2,
    powerFactor: 0.98,
    activePowerKw: 4.21,
    totalKwh: 14210,
    todayKwh: 28.4,
    lastPingTime: '2 mins ago',
    installDate: '2025-01-10',
    latitude: 28.6210,
    longitude: 77.2180,
    remoteBreakerState: 'CLOSED'
  },
  {
    id: 'm-104',
    meterSerial: 'SM-RES-10893',
    consumerId: 'c-004',
    consumerName: 'Robert & Clara Vance',
    category: 'RESIDENTIAL',
    feederId: 'f-102',
    feederName: 'Feeder 11kV-A2 (Residential)',
    substationName: 'Substation Alpha (Metro Central)',
    model: 'Power Cell Smart Home 300',
    status: 'WARNING',
    signalStrengthDbm: -89,
    voltageV: 204.1,
    currentA: 24.5,
    powerFactor: 0.81,
    activePowerKw: 5.0,
    totalKwh: 18940,
    todayKwh: 36.2,
    lastPingTime: '4 mins ago',
    installDate: '2024-11-04',
    latitude: 28.6230,
    longitude: 77.2200,
    remoteBreakerState: 'CLOSED'
  },
  {
    id: 'm-105',
    meterSerial: 'SM-IND-99104',
    consumerId: 'c-005',
    consumerName: 'Titan Bio-Pharma Lab Complex',
    category: 'INDUSTRIAL',
    feederId: 'f-201',
    feederName: 'Feeder 33kV-B1 (Heavy Power)',
    substationName: 'Substation Beta (Tech Corridor)',
    model: 'Power Cell Heavy ION8',
    status: 'ONLINE',
    signalStrengthDbm: -58,
    voltageV: 238.0,
    currentA: 112.3,
    powerFactor: 0.99,
    activePowerKw: 80.9,
    totalKwh: 310500,
    todayKwh: 640.8,
    lastPingTime: 'Just now',
    installDate: '2023-09-01',
    latitude: 28.5900,
    longitude: 77.3100,
    remoteBreakerState: 'CLOSED'
  },
  {
    id: 'm-106',
    meterSerial: 'SM-COM-55190',
    consumerId: 'c-006',
    consumerName: 'Cyber Heights Tech Park - Tower C',
    category: 'COMMERCIAL',
    feederId: 'f-202',
    feederName: 'Feeder 11kV-B2',
    substationName: 'Substation Beta (Tech Corridor)',
    model: 'Power Cell Commercial A18',
    status: 'FAULT',
    signalStrengthDbm: -99,
    voltageV: 0.0,
    currentA: 0.0,
    powerFactor: 0.0,
    activePowerKw: 0.0,
    totalKwh: 88400,
    todayKwh: 12.1,
    lastPingTime: '42 mins ago',
    installDate: '2024-08-12',
    latitude: 28.5950,
    longitude: 77.3180,
    remoteBreakerState: 'OPEN'
  }
];

export const INITIAL_CONSUMERS: Consumer[] = [
  {
    id: 'c-001',
    consumerNo: 'CONS-IND-10091',
    name: 'Apex Precision Engineering Corp',
    category: 'INDUSTRIAL',
    address: 'Plot 42, Industrial Zone 3, Sector 62',
    phone: '+91 98100 28341',
    email: 'energy.ops@apexeng.com',
    meterSerial: 'SM-IND-89421',
    sanctionedLoadKw: 120,
    connectionStatus: 'ACTIVE',
    currentBalance: 77100.00,
    lastBillDate: '2026-09-01'
  },
  {
    id: 'c-002',
    consumerNo: 'CONS-COM-20411',
    name: 'Hyperion Shopping Mall',
    category: 'COMMERCIAL',
    address: 'Grand Avenue Mall Rd, Central Plaza',
    phone: '+91 98114 99812',
    email: 'billing@hyperionmall.org',
    meterSerial: 'SM-COM-44312',
    sanctionedLoadKw: 75,
    connectionStatus: 'ACTIVE',
    currentBalance: 46500.50,
    lastBillDate: '2026-09-01'
  },
  {
    id: 'c-003',
    consumerNo: 'CONS-RES-30912',
    name: 'Dr. Sarah Jenkins (Villa #14)',
    category: 'RESIDENTIAL',
    address: '14 Elmwood Drive, Green Park Estate',
    phone: '+91 98177 88220',
    email: 's.jenkins@medtech.org',
    meterSerial: 'SM-RES-10892',
    sanctionedLoadKw: 8,
    connectionStatus: 'ACTIVE',
    currentBalance: 6450.00,
    lastBillDate: '2026-09-01'
  },
  {
    id: 'c-004',
    consumerNo: 'CONS-RES-30913',
    name: 'Robert & Clara Vance',
    category: 'RESIDENTIAL',
    address: '19 Elmwood Drive, Green Park Estate',
    phone: '+91 98122 33445',
    email: 'robert.vance@gmail.com',
    meterSerial: 'SM-RES-10893',
    sanctionedLoadKw: 10,
    connectionStatus: 'ACTIVE',
    currentBalance: 8175.00,
    lastBillDate: '2026-09-01'
  },
  {
    id: 'c-005',
    consumerNo: 'CONS-IND-40915',
    name: 'Titan Bio-Pharma Lab Complex',
    category: 'INDUSTRIAL',
    address: 'Tech Corridor Phase II, Tower B',
    phone: '+91 98199 44321',
    email: 'facility@titanbiopharma.in',
    meterSerial: 'SM-IND-99104',
    sanctionedLoadKw: 250,
    connectionStatus: 'ACTIVE',
    currentBalance: 138375.00,
    lastBillDate: '2026-09-01'
  },
  {
    id: 'c-006',
    consumerNo: 'CONS-COM-50122',
    name: 'Cyber Heights Tech Park - Tower C',
    category: 'COMMERCIAL',
    address: 'Cyber Heights Expressway, Hub 4',
    phone: '+91 98188 77665',
    email: 'ops@cyberheights.com',
    meterSerial: 'SM-COM-55190',
    sanctionedLoadKw: 150,
    connectionStatus: 'DISCONNECTED',
    currentBalance: 40620.00,
    lastBillDate: '2026-09-01'
  }
];

export const INITIAL_SUBSTATIONS: Substation[] = [
  {
    id: 'sub-01',
    code: 'SUB-ALPHA-33KV',
    name: 'Substation Alpha (Metro Central)',
    capacityMva: 50,
    currentLoadMw: 36.4,
    peakLoadMw: 44.8,
    status: 'HEAVY_LOAD',
    feedersCount: 6,
    transformerCount: 3,
    voltageKv: 33.0,
    loadPercentage: 72.8,
    feeders: [
      {
        id: 'f-101',
        substationId: 'sub-01',
        feederCode: 'FDR-A1-11KV',
        name: 'Feeder 11kV-A1 (Industrial/Commercial)',
        voltageKv: 11.0,
        connectedMetersCount: 420,
        currentLoadMw: 18.2,
        capacityMw: 22.0,
        status: 'WARNING'
      },
      {
        id: 'f-102',
        substationId: 'sub-01',
        feederCode: 'FDR-A2-11KV',
        name: 'Feeder 11kV-A2 (Residential North)',
        voltageKv: 11.0,
        connectedMetersCount: 1850,
        currentLoadMw: 12.8,
        capacityMw: 20.0,
        status: 'NORMAL'
      }
    ]
  },
  {
    id: 'sub-02',
    code: 'SUB-BETA-66KV',
    name: 'Substation Beta (Tech Corridor)',
    capacityMva: 80,
    currentLoadMw: 42.1,
    peakLoadMw: 68.2,
    status: 'NORMAL',
    feedersCount: 8,
    transformerCount: 4,
    voltageKv: 66.0,
    loadPercentage: 52.6,
    feeders: [
      {
        id: 'f-201',
        substationId: 'sub-02',
        feederCode: 'FDR-B1-33KV',
        name: 'Feeder 33kV-B1 (Heavy Power)',
        voltageKv: 33.0,
        connectedMetersCount: 65,
        currentLoadMw: 24.5,
        capacityMw: 40.0,
        status: 'NORMAL'
      }
    ]
  }
];

// Invoices calculated at ₹7.50 per kWh tariff rate
export const INITIAL_BILLS: Bill[] = [
  {
    id: 'bill-1001',
    invoiceNo: 'INV-2026-0901',
    consumerId: 'c-001',
    consumerNo: 'CONS-IND-10091',
    consumerName: 'Apex Precision Engineering Corp',
    category: 'INDUSTRIAL',
    meterSerial: 'SM-IND-89421',
    billingPeriod: 'Aug 01 - Aug 31, 2026',
    issueDate: '2026-09-01',
    dueDate: '2026-09-20',
    previousReadingKwh: 138240,
    currentReadingKwh: 148520,
    unitsConsumedKwh: 10280,
    fixedCharge: 450.00,
    energyCharge: 77100.00, // 10280 units * ₹7.50
    taxesAndDuties: 9252.00,
    totalAmount: 86802.00,
    status: 'PAID'
  },
  {
    id: 'bill-1002',
    invoiceNo: 'INV-2026-0902',
    consumerId: 'c-002',
    consumerNo: 'CONS-COM-20411',
    consumerName: 'Hyperion Shopping Mall',
    category: 'COMMERCIAL',
    meterSerial: 'SM-COM-44312',
    billingPeriod: 'Aug 01 - Aug 31, 2026',
    issueDate: '2026-09-01',
    dueDate: '2026-09-20',
    previousReadingKwh: 86140,
    currentReadingKwh: 92340,
    unitsConsumedKwh: 6200,
    fixedCharge: 250.00,
    energyCharge: 46500.00, // 6200 units * ₹7.50
    taxesAndDuties: 5580.00,
    totalAmount: 52330.00,
    status: 'PAID'
  },
  {
    id: 'bill-1003',
    invoiceNo: 'INV-2026-0903',
    consumerId: 'c-003',
    consumerNo: 'CONS-RES-30912',
    consumerName: 'Dr. Sarah Jenkins',
    category: 'RESIDENTIAL',
    meterSerial: 'SM-RES-10892',
    billingPeriod: 'Aug 01 - Aug 31, 2026',
    issueDate: '2026-09-01',
    dueDate: '2026-09-25',
    previousReadingKwh: 13350,
    currentReadingKwh: 14210,
    unitsConsumedKwh: 860,
    fixedCharge: 25.00,
    energyCharge: 6450.00, // 860 units * ₹7.50
    taxesAndDuties: 774.00,
    totalAmount: 7249.00,
    status: 'PAID'
  },
  {
    id: 'bill-1004',
    invoiceNo: 'INV-2026-0904',
    consumerId: 'c-004',
    consumerNo: 'CONS-RES-30913',
    consumerName: 'Robert & Clara Vance',
    category: 'RESIDENTIAL',
    meterSerial: 'SM-RES-10893',
    billingPeriod: 'Aug 01 - Aug 31, 2026',
    issueDate: '2026-09-01',
    dueDate: '2026-09-25',
    previousReadingKwh: 17850,
    currentReadingKwh: 18940,
    unitsConsumedKwh: 1090,
    fixedCharge: 30.00,
    energyCharge: 8175.00, // 1090 units * ₹7.50
    taxesAndDuties: 981.00,
    totalAmount: 9186.00,
    status: 'UNPAID'
  },
  {
    id: 'bill-1005',
    invoiceNo: 'INV-2026-0905',
    consumerId: 'c-005',
    consumerNo: 'CONS-IND-40915',
    consumerName: 'Titan Bio-Pharma Lab Complex',
    category: 'INDUSTRIAL',
    meterSerial: 'SM-IND-99104',
    billingPeriod: 'Aug 01 - Aug 31, 2026',
    issueDate: '2026-09-01',
    dueDate: '2026-09-20',
    previousReadingKwh: 292050,
    currentReadingKwh: 310500,
    unitsConsumedKwh: 18450,
    fixedCharge: 600.00,
    energyCharge: 138375.00, // 18450 units * ₹7.50
    taxesAndDuties: 16605.00,
    totalAmount: 155580.00,
    status: 'UNPAID'
  },
  {
    id: 'bill-1006',
    invoiceNo: 'INV-2026-0906',
    consumerId: 'c-006',
    consumerNo: 'CONS-COM-50122',
    consumerName: 'Cyber Heights Tech Park - Tower C',
    category: 'COMMERCIAL',
    meterSerial: 'SM-COM-55190',
    billingPeriod: 'Aug 01 - Aug 31, 2026',
    issueDate: '2026-09-01',
    dueDate: '2026-09-15',
    previousReadingKwh: 83600,
    currentReadingKwh: 88400,
    unitsConsumedKwh: 4800,
    fixedCharge: 300.00,
    energyCharge: 36000.00, // 4800 units * ₹7.50
    taxesAndDuties: 4320.00,
    totalAmount: 40620.00,
    status: 'OVERDUE'
  }
];

export const INITIAL_ALERTS: Alert[] = [
  {
    id: 'alt-901',
    severity: 'CRITICAL',
    code: 'MTR-FAULT-01',
    title: 'Meter Tamper / Voltage Collapse Alert',
    message: 'Meter SM-COM-55190 reported total line voltage collapse (0.0V). Remote breaker tripped automatically.',
    meterSerial: 'SM-COM-55190',
    substationId: 'sub-02',
    timestamp: '19:14:02',
    status: 'ACTIVE'
  },
  {
    id: 'alt-902',
    severity: 'WARNING',
    code: 'VOLT-LOW-02',
    title: 'Low Voltage & Power Factor Warning',
    message: 'Meter SM-RES-10893 registered low line voltage (204.1V) and power factor drop (0.81 pf). Substation Alpha notified.',
    meterSerial: 'SM-RES-10893',
    substationId: 'sub-01',
    timestamp: '18:42:15',
    status: 'ACTIVE'
  },
  {
    id: 'alt-903',
    severity: 'WARNING',
    code: 'LOAD-SPIKE-03',
    title: 'High Consumption Anomaly Alert',
    message: 'Meter SM-IND-99104 registered a peak active load spike of 80.9 kW (> 2.5σ above baseline). Potential overload.',
    meterSerial: 'SM-IND-99104',
    substationId: 'sub-02',
    timestamp: '17:05:30',
    status: 'ACTIVE'
  },
  {
    id: 'alt-904',
    severity: 'INFO',
    code: 'BREAKER-STATE-04',
    title: 'Remote Breaker Operation Audit Log',
    message: 'Remote disconnect signal sent to meter SM-COM-55190 following overdue unpaid invoice INV-2026-0906.',
    meterSerial: 'SM-COM-55190',
    substationId: 'sub-02',
    timestamp: '15:20:11',
    status: 'RESOLVED'
  }
];

export const LOAD_FORECAST_DATA: ForecastPoint[] = [
  { time: '00:00', actualMw: 45.2, predictedMw: 44.8, baselineMw: 42.0, upperBoundMw: 48.0, lowerBoundMw: 41.0 },
  { time: '04:00', actualMw: 34.1, predictedMw: 35.0, baselineMw: 34.0, upperBoundMw: 38.0, lowerBoundMw: 32.0 },
  { time: '08:00', actualMw: 72.4, predictedMw: 74.0, baselineMw: 68.0, upperBoundMw: 79.0, lowerBoundMw: 69.0 },
  { time: '12:00', actualMw: 94.2, predictedMw: 95.1, baselineMw: 90.0, upperBoundMw: 101.0, lowerBoundMw: 89.0 },
  { time: '16:00', actualMw: 92.5, predictedMw: 93.8, baselineMw: 88.0, upperBoundMw: 99.0, lowerBoundMw: 88.0 },
  { time: '20:00', actualMw: 112.4, predictedMw: 111.0, baselineMw: 100.0, upperBoundMw: 118.0, lowerBoundMw: 104.0 }
];

// Timescale datasets matching the Power Cell reference screenshots with ₹ currency
export const TIMESCALE_DATASETS = {
  week: {
    totalValue: '58.3',
    unit: 'MWh',
    subtitle: 'over 7 days',
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [8.2, 11.4, 9.8, 9.2, 11.9, 4.2, 3.6],
    completedBarsCount: 5,
    powerQuality: '238V | 0.93pf | 49.9Hz',
    extraBadge: '2 supply interruptions · 4.2 h lost'
  },
  month: {
    totalValue: '251',
    unit: 'MWh',
    subtitle: 'this billing cycle',
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    values: [
      7.8, 8.4, 9.1, 8.9, 7.2, 6.8, 5.4,
      8.9, 9.4, 10.2, 9.8, 8.1, 7.5, 9.2,
      8.6, 9.1, 10.5, 9.4, 8.8, 6.9, 5.9,
      8.7, 9.6, 10.1, 9.9, 8.4, 7.8, 9.1,
      8.5, 9.3
    ],
    completedBarsCount: 30,
    powerQuality: '238V | 0.93pf | 49.9Hz',
    extraBadge: 'Bill tracking to ₹5.51L · 0% variance so far'
  },
  day: {
    totalValue: '4.2',
    unit: 'MWh',
    subtitle: 'today (24 hours)',
    labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    values: [0.18, 0.14, 0.12, 0.22, 0.45, 0.58, 0.62, 0.59, 0.52, 0.68, 0.74, 0.36],
    completedBarsCount: 10,
    powerQuality: '238V | 0.93pf | 49.9Hz',
    extraBadge: 'Instant Peak: 740 kW at 20:15'
  },
  live: {
    totalValue: '842',
    unit: 'kW',
    subtitle: 'real-time panel load (1 sec)',
    labels: ['15s', '14s', '13s', '12s', '11s', '10s', '9s', '8s', '7s', '6s', '5s', '4s', '3s', '2s', '1s'],
    values: [810, 825, 830, 818, 835, 840, 838, 842, 845, 840, 839, 841, 843, 842, 842],
    completedBarsCount: 15,
    powerQuality: '238V | 0.93pf | 49.9Hz',
    extraBadge: '1-sec sampling active &bull; Loss 0.0%'
  },
  year: {
    totalValue: '3.12',
    unit: 'GWh',
    subtitle: 'annual electricity consumption (12 months)',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [210, 225, 260, 285, 310, 340, 355, 330, 295, 270, 235, 250],
    completedBarsCount: 9,
    powerQuality: '238V | 0.94pf | 50.0Hz',
    extraBadge: 'Annual Grid Total: 3,120 MWh · System Efficiency 99.9%'
  }
};

// Five Core Subjects Data updated with B.Tech syllabus matters
export const FIVE_CORE_SUBJECTS: CoreSubjectItem[] = [
  {
    id: 'dbms',
    code: 'SUBJECT 01',
    title: '1. DBMS – Database Management Systems',
    subtitle: 'Consumer, SmartMeter, MeterReading & Bill Entities',
    iconName: 'Database',
    color: 'emerald',
    summary: 'A utility company requires structured storage for electricity consumers, smart meters, reading logs, and invoices. DBMS concepts ensure 3NF data normalization, relational integrity, and transaction safety.',
    topics: [
      'Entities & Schemas: Consumer (consumer_id PK), SmartMeter (meter_id PK, consumer_id FK), MeterReading (reading_id PK, meter_id FK), Bill (invoice_id PK, consumer_id FK).',
      'Normalization (3NF): Eliminating redundant consumer names and meter specifications into dedicated relational tables.',
      'Data Integrity & Constraints: NOT NULL on meter readings, CHECK (current_reading >= previous_reading), and UNIQUE on meter serials.',
      'SQL Queries & JS LocalStorage Equivalents: INSERT INTO Consumer, SELECT JOIN Consumer c JOIN MeterReading r ON c.meter_id = r.meter_id.',
      'ACID Database Transactions: Preventing duplicate meter readings and inconsistent billing calculations during concurrent submissions.'
    ],
    techStack: ['PostgreSQL', '3NF Normalization', 'SQL JOIN Queries', 'ACID Transactions', 'LocalStorage Cache']
  },
  {
    id: 'dsa',
    code: 'SUBJECT 02',
    title: '2. DSA – Data Structures & Algorithms',
    subtitle: 'Search, Merge Sort, Queue Buffers & Stack History',
    iconName: 'Binary',
    color: 'cyan',
    summary: 'Optimized data structures and algorithm executions in JavaScript for consumer lookup, meter reading sorting, queue-based bill processing, and stack-based undo history.',
    topics: [
      'Arrays & Objects: Storing consumer accounts, meter objects, and time-series reading arrays.',
      'Linear Search O(N) vs Binary Search O(log N): Finding consumers by meter ID in sorted array records.',
      'Merge Sort O(N log N): Sorting meter readings chronologically by timestamp or energy consumption.',
      'Max / Min Consumption Algorithm: Finding peak demand kW spikes and minimum baselines in linear time O(N).',
      'Queue Data Structure: FIFO queue for processing pending billing calculation tasks sequentially.',
      'Stack Data Structure: LIFO stack maintaining operator breaker actions and undo history.'
    ],
    techStack: ['Binary Search', 'Merge Sort', 'FIFO Queues', 'LIFO Stacks', 'Time Complexity O(log N)']
  },
  {
    id: 'dmt',
    code: 'SUBJECT 03',
    title: '3. DMT – Discrete Mathematics & Graph Theory',
    subtitle: 'Graph Representation G = (V, E), Traversal & Boolean Logic',
    iconName: 'Network',
    color: 'indigo',
    summary: 'Modeling electricity distribution networks as a connected graph G = (V, E), where vertices V represent substations, transformers, and meters, and edges E represent transmission lines.',
    topics: [
      'Graph Representation G = (V, E): Vertices V = {Substations, Feeders, Meters}, Edges E = Distribution lines.',
      'Adjacency List in JS: Representing power grid connections efficiently in memory.',
      'Breadth-First Search (BFS) & Depth-First Search (DFS): Traversing grid nodes to trace power flow and locate fault isolation points.',
      'Boolean Logic & Truth Tables: Validating meter health conditions: IsActive AND (Voltage >= 210) AND (PowerFactor >= 0.85).',
      'Set Theory: Grouping consumers into sets by region, tariff category (Residential, Commercial, Industrial), or consumption tier.',
      'Shortest Path Algorithm: Identifying optimal electricity distribution paths and low-loss feeder lines.'
    ],
    techStack: ['Graph G=(V,E)', 'Adjacency Lists', 'BFS & DFS Traversal', 'Boolean Logic', 'Set Theory']
  },
  {
    id: 'oop',
    code: 'SUBJECT 04',
    title: '4. OOP – Object-Oriented Programming (Java Concepts)',
    subtitle: 'Encapsulation, Inheritance, Polymorphism & Abstraction',
    iconName: 'Cpu',
    color: 'amber',
    summary: 'Modeling smart metering domains using Java OOP principles. Encapsulation protects private readings, inheritance defines specialized meter classes, and polymorphism enables custom tariff calculations.',
    topics: [
      'Classes & Objects: Consumer, SmartMeter, MeterReading, and Bill classes with private fields and getters/setters.',
      'Encapsulation: Restricting direct access to sensitive meter registers and financial balance fields.',
      'Inheritance: Subclassing SmartMeter into IndustrialMeter, CommercialMeter, and ResidentialMeter.',
      'Polymorphism: Overriding calculateBill() method to apply standard tariff rate of ₹7.50 per kWh across different tariff classes.',
      'Abstraction: Hiding internal cellular modem framing details behind simple readConsumption() interface.',
      'Java Educational Snippets: Demonstrating OOP bill generation in Java alongside JavaScript frontend runtime.'
    ],
    techStack: ['Java OOP', 'Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction']
  },
  {
    id: 'ml',
    code: 'SUBJECT 05',
    title: '5. Python / Machine Learning',
    subtitle: 'Time-Series Data Preprocessing, Moving Average & Load Forecasting',
    iconName: 'Sparkles',
    color: 'rose',
    summary: 'Applying Python statistical data analysis and machine learning concepts to historical meter readings. Demonstrating moving-average load forecasting directly in frontend JavaScript.',
    topics: [
      'Data Preprocessing: Handling missing meter readings, imputing null values, and removing voltage spikes.',
      'Statistical Analysis: Calculating mean, median, and standard deviation of daily electricity usage.',
      'Moving-Average Load Forecasting: Calculating 7-day moving averages to predict next-day kWh consumption.',
      'Linear Regression Concept: Fitting y = mx + c line on peak load trends to estimate future demand.',
      'Anomaly Detection: Flagging unusually high consumption (> 2.5 std dev) as potential meter tampering or power leakage.',
      'Frontend JS Execution: Pure JavaScript implementation of moving-average load forecasting running live in the browser.'
    ],
    techStack: ['Python ML Concepts', 'Moving Average', 'Linear Regression', 'Statistical Analysis', 'JS Frontend Predictor']
  }
];

// 8-stage Academic Project Execution Workflow steps
export const ACADEMIC_EXECUTION_STAGES = [
  {
    stage: 1,
    title: 'Register Consumer & Associate Smart Meter',
    subject: 'DBMS & OOP',
    description: 'Create a consumer record (Consumer ID, Name, Sanctioned Load) and bind a unique SmartMeter serial number in 3NF relational structure.',
    sampleInput: 'Name: "Apex Precision Engineering", Sanctioned Load: 120 kW, Meter Serial: "SM-IND-89421"',
    sampleOutput: 'Consumer record stored in LocalStorage DB with primary key CONS-IND-10091 linked to meter SM-IND-89421.'
  },
  {
    stage: 2,
    title: 'Validate Meter ID & Signal Security',
    subject: 'CN & DSA',
    description: 'Perform O(1) hash lookup or O(log N) binary search to verify meter registration and test NB-IoT cellular signal RSSI (-62 dBm).',
    sampleInput: 'Meter ID: "SM-IND-89421"',
    sampleOutput: 'Validation Passed: Meter status ONLINE, RSSI -62 dBm, Voltage 238.2 V, Power Factor 0.93.'
  },
  {
    stage: 3,
    title: 'Capture Previous & Current Meter Readings',
    subject: 'OS & DSA',
    description: 'Retrieve previous reading register (138,240 kWh) and record current meter reading (148,520 kWh) via 1-sec telemetry event polling.',
    sampleInput: 'Previous Reading = 138,240 kWh | Current Reading = 148,520 kWh',
    sampleOutput: 'Telemetry Reading Captured: Delta = 10,280 kWh over 30-day billing window.'
  },
  {
    stage: 4,
    title: 'Calculate Consumed Electricity Units (kWh)',
    subject: 'DSA & Discrete Math',
    description: 'Execute unit calculation formula: Units = CurrentReading - PreviousReading. Verify non-negative condition (Units >= 0).',
    sampleInput: '148,520 kWh - 138,240 kWh',
    sampleOutput: 'Total Consumed Units = 10,280 kWh.'
  },
  {
    stage: 5,
    title: 'Generate Electricity Bill (Tariff Rate: ₹7.50 per kWh)',
    subject: 'OOP & DBMS',
    description: 'Calculate itemized electricity invoice using sample tariff rate of ₹7.50 per kWh: Energy Charge = Units * ₹7.50. Add fixed capacity charge & 12% duties.',
    sampleInput: '10,280 units * ₹7.50/kWh + Fixed Charge (₹450) + Tax (₹9,252)',
    sampleOutput: 'Energy Charge = ₹77,100.00 | Total Invoice Payable = ₹86,802.00.'
  },
  {
    stage: 6,
    title: 'Store Reading & Billing Records in LocalStorage',
    subject: 'DBMS & OS',
    description: 'Persist the generated invoice and updated meter register into LocalStorage with ACID-equivalent atomic transaction lock.',
    sampleInput: 'Invoice INV-2026-0901 payload JSON',
    sampleOutput: 'Invoice stored in LocalStorage database under key "bills". Status: PAID.'
  },
  {
    stage: 7,
    title: 'Analyze Historical Consumption Trends',
    subject: 'DSA & Python Analytics',
    description: 'Compute statistical mean, median, and standard deviation across past 30 days of daily consumption registers.',
    sampleInput: 'Daily MWh usage array over 30 days',
    sampleOutput: 'Mean Daily Usage = 8.36 MWh | Standard Deviation = 1.12 MWh.'
  },
  {
    stage: 8,
    title: 'Estimate Future Demand Using 7-Day Moving Average',
    subject: 'Machine Learning / Python',
    description: 'Execute 7-day moving average time-series forecasting algorithm to predict next-day kilowatt peak demand.',
    sampleInput: 'Last 7 days usage: [8.2, 11.4, 9.8, 9.2, 11.9, 4.2, 3.6] MWh',
    sampleOutput: 'Predicted Next-Day Load Demand = 8.33 MWh.'
  }
];
