-- Smart Meter Readings System - Pre-populated Seed Data
-- Standard Tariff: ₹7.50 / kWh

BEGIN;

-- 1. Consumers Seed Data
INSERT INTO consumers (consumer_code, name, email, phone, address, connection_type, status) VALUES
('CONS-IND-10091', 'Apex Precision Engineering Corp', 'energy.ops@apexeng.com', '+91 98100 28341', 'Plot 42, Industrial Zone 3, Sector 62', 'INDUSTRIAL', 'ACTIVE'),
('CONS-COM-20411', 'Hyperion Shopping Mall', 'billing@hyperionmall.org', '+91 98114 99812', 'Grand Avenue Mall Rd, Central Plaza', 'COMMERCIAL', 'ACTIVE'),
('CONS-RES-30912', 'Dr. Sarah Jenkins', 's.jenkins@medtech.org', '+91 98177 88220', '14 Elmwood Drive, Green Park Estate', 'RESIDENTIAL', 'ACTIVE'),
('CONS-RES-30913', 'Robert & Clara Vance', 'robert.vance@gmail.com', '+91 98122 33445', '19 Elmwood Drive, Green Park Estate', 'RESIDENTIAL', 'ACTIVE'),
('CONS-IND-40915', 'Titan Bio-Pharma Lab Complex', 'facility@titanbiopharma.in', '+91 98199 44321', 'Tech Corridor Phase II, Tower B', 'INDUSTRIAL', 'ACTIVE');

-- 2. Substations Seed Data
INSERT INTO substations (substation_code, name, location, capacity_kw, status) VALUES
('SUB-ALPHA-33KV', 'Substation Alpha (Metro Central)', 'Sector 62 Metro Hub', 50000.00, 'ACTIVE'),
('SUB-BETA-66KV', 'Substation Beta (Tech Corridor)', 'Tech Corridor Gate 1', 80000.00, 'ACTIVE');

-- 3. Feeders Seed Data
INSERT INTO feeders (feeder_code, name, substation_id, capacity_kw, status) VALUES
('FDR-A1-11KV', 'Feeder 11kV-A1 (Industrial/Commercial)', 1, 22000.00, 'ACTIVE'),
('FDR-A2-11KV', 'Feeder 11kV-A2 (Residential North)', 1, 20000.00, 'ACTIVE'),
('FDR-B1-33KV', 'Feeder 33kV-B1 (Heavy Power)', 2, 40000.00, 'ACTIVE');

-- 4. Meters Seed Data
INSERT INTO meters (meter_number, consumer_id, feeder_id, meter_type, installation_date, status) VALUES
('SM-IND-89421', 1, 1, 'Power Cell Pro 5000', '2024-03-15', 'ONLINE'),
('SM-COM-44312', 2, 1, 'Power Cell Commercial A18', '2024-06-20', 'ONLINE'),
('SM-RES-10892', 3, 2, 'Power Cell Smart Home 300', '2025-01-10', 'ONLINE'),
('SM-RES-10893', 4, 2, 'Power Cell Smart Home 300', '2024-11-04', 'ONLINE'),
('SM-IND-99104', 5, 3, 'Power Cell Heavy ION8', '2023-09-01', 'ONLINE');

-- 5. Bills Seed Data (Calculated at ₹7.50 per kWh tariff rate)
INSERT INTO bills (consumer_id, meter_id, billing_period_start, billing_period_end, previous_reading, current_reading, units_consumed, energy_charge, other_charges, total_amount, status) VALUES
(1, 1, '2026-08-01', '2026-08-31', 138240.00, 148520.00, 10280.00, 77100.00, 9702.00, 86802.00, 'PAID'),
(2, 2, '2026-08-01', '2026-08-31', 86140.00, 92340.00, 6200.00, 46500.00, 5830.00, 52330.00, 'PAID'),
(3, 3, '2026-08-01', '2026-08-31', 13350.00, 14210.00, 860.00, 6450.00, 799.00, 7249.00, 'PAID'),
(4, 4, '2026-08-01', '2026-08-31', 17850.00, 18940.00, 1090.00, 8175.00, 1011.00, 9186.00, 'GENERATED');

-- 6. Alerts Seed Data
INSERT INTO alerts (type, severity, title, description, related_entity_type, related_entity_id, status) VALUES
('METER', 'CRITICAL', 'Meter Tamper / Voltage Collapse Alert', 'Meter SM-COM-55190 reported line voltage collapse (0.0V). Breaker tripped.', 'METER', 2, 'OPEN'),
('METER', 'WARNING', 'Low Voltage & Power Factor Warning', 'Meter SM-RES-10893 registered low line voltage (204.1V) and power factor drop (0.81 pf).', 'METER', 4, 'OPEN'),
('CONSUMPTION', 'WARNING', 'High Consumption Anomaly Alert', 'Meter SM-IND-99104 registered a peak active load spike of 80.9 kW (> 2.5σ above baseline).', 'METER', 5, 'OPEN');

COMMIT;
