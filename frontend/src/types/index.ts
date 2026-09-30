export type MeterStatus = 'ONLINE' | 'OFFLINE' | 'WARNING' | 'FAULT';
export type ConsumerCategory = 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL';
export type ConnectionStatus = 'ACTIVE' | 'DISCONNECTED' | 'PENDING';
export type SubstationStatus = 'NORMAL' | 'HEAVY_LOAD' | 'CRITICAL';
export type BillStatus = 'PAID' | 'UNPAID' | 'OVERDUE';
export type AlertSeverity = 'CRITICAL' | 'WARNING' | 'INFO';
export type AlertStatus = 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
export type TimeScale = 'live' | 'day' | 'week' | 'month' | 'year';

export interface SmartMeter {
  id: string;
  meterSerial: string;
  consumerId: string;
  consumerName: string;
  category: ConsumerCategory;
  feederId: string;
  feederName: string;
  substationName: string;
  model: string;
  status: MeterStatus;
  signalStrengthDbm: number;
  voltageV: number;
  currentA: number;
  powerFactor: number;
  activePowerKw: number;
  totalKwh: number;
  todayKwh: number;
  lastPingTime: string;
  installDate: string;
  latitude: number;
  longitude: number;
  remoteBreakerState: 'CLOSED' | 'OPEN';
}

export interface Consumer {
  id: string;
  consumerNo: string;
  name: string;
  category: ConsumerCategory;
  address: string;
  phone: string;
  email: string;
  meterSerial: string;
  sanctionedLoadKw: number;
  connectionStatus: ConnectionStatus;
  currentBalance: number;
  lastBillDate: string;
}

export interface MeterReading {
  id: string;
  meterSerial: string;
  timestamp: string;
  voltageV: number;
  currentA: number;
  activePowerKw: number;
  reactivePowerKvar: number;
  powerFactor: number;
  frequencyHz: number;
}

export interface Substation {
  id: string;
  code: string;
  name: string;
  capacityMva: number;
  currentLoadMw: number;
  peakLoadMw: number;
  status: SubstationStatus;
  feedersCount: number;
  transformerCount: number;
  voltageKv: number;
  loadPercentage: number;
  feeders: Feeder[];
}

export interface Feeder {
  id: string;
  substationId: string;
  feederCode: string;
  name: string;
  voltageKv: number;
  connectedMetersCount: number;
  currentLoadMw: number;
  capacityMw: number;
  status: 'NORMAL' | 'WARNING' | 'OVERLOAD';
}

export interface Bill {
  id: string;
  invoiceNo: string;
  consumerId: string;
  consumerNo: string;
  consumerName: string;
  category: ConsumerCategory;
  meterSerial: string;
  billingPeriod: string;
  issueDate: string;
  dueDate: string;
  previousReadingKwh: number;
  currentReadingKwh: number;
  unitsConsumedKwh: number;
  fixedCharge: number;
  energyCharge: number;
  taxesAndDuties: number;
  totalAmount: number;
  status: BillStatus;
}

export interface Alert {
  id: string;
  severity: AlertSeverity;
  code: string;
  title: string;
  message: string;
  meterSerial?: string;
  substationId?: string;
  timestamp: string;
  status: AlertStatus;
}

export interface ForecastPoint {
  time: string;
  actualMw?: number;
  predictedMw: number;
  baselineMw: number;
  upperBoundMw: number;
  lowerBoundMw: number;
}

export interface CoreSubjectItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  summary: string;
  topics: string[];
  techStack: string[];
}
