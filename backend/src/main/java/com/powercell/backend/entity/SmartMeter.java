package com.powercell.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "smart_meters")
public class SmartMeter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "meter_serial", nullable = false, unique = true)
    private String meterSerial;

    @Column(name = "consumer_id")
    private String consumerId;

    @Column(name = "consumer_name")
    private String consumerName;

    private String category; // RESIDENTIAL, COMMERCIAL, INDUSTRIAL
    private String feederName;
    private String substationName;
    private String model;
    private String status; // ONLINE, OFFLINE, WARNING, FAULT

    @Column(name = "voltage_v")
    private Double voltageV;

    @Column(name = "current_a")
    private Double currentA;

    @Column(name = "power_factor")
    private Double powerFactor;

    @Column(name = "active_power_kw")
    private Double activePowerKw;

    @Column(name = "total_kwh")
    private Double totalKwh;

    @Column(name = "today_kwh")
    private Double todayKwh;

    @Column(name = "remote_breaker_state")
    private String remoteBreakerState; // CLOSED, OPEN

    public SmartMeter() {}

    public SmartMeter(String meterSerial, String consumerName, String category, Double totalKwh) {
        this.meterSerial = meterSerial;
        this.consumerName = consumerName;
        this.category = category;
        this.totalKwh = totalKwh;
        this.status = "ONLINE";
        this.voltageV = 238.2;
        this.currentA = 18.5;
        this.powerFactor = 0.93;
        this.activePowerKw = 4.1;
        this.remoteBreakerState = "CLOSED";
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMeterSerial() { return meterSerial; }
    public void setMeterSerial(String meterSerial) { this.meterSerial = meterSerial; }

    public String getConsumerId() { return consumerId; }
    public void setConsumerId(String consumerId) { this.consumerId = consumerId; }

    public String getConsumerName() { return consumerName; }
    public void setConsumerName(String consumerName) { this.consumerName = consumerName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getFeederName() { return feederName; }
    public void setFeederName(String feederName) { this.feederName = feederName; }

    public String getSubstationName() { return substationName; }
    public void setSubstationName(String substationName) { this.substationName = substationName; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getVoltageV() { return voltageV; }
    public void setVoltageV(Double voltageV) { this.voltageV = voltageV; }

    public Double getCurrentA() { return currentA; }
    public void setCurrentA(Double currentA) { this.currentA = currentA; }

    public Double getPowerFactor() { return powerFactor; }
    public void setPowerFactor(Double powerFactor) { this.powerFactor = powerFactor; }

    public Double getActivePowerKw() { return activePowerKw; }
    public void setActivePowerKw(Double activePowerKw) { this.activePowerKw = activePowerKw; }

    public Double getTotalKwh() { return totalKwh; }
    public void setTotalKwh(Double totalKwh) { this.totalKwh = totalKwh; }

    public Double getTodayKwh() { return todayKwh; }
    public void setTodayKwh(Double todayKwh) { this.todayKwh = todayKwh; }

    public String getRemoteBreakerState() { return remoteBreakerState; }
    public void setRemoteBreakerState(String remoteBreakerState) { this.remoteBreakerState = remoteBreakerState; }
}
