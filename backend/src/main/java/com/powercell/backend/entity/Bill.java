package com.powercell.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "bills")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "invoice_no", nullable = false, unique = true)
    private String invoiceNo;

    @Column(name = "consumer_no")
    private String consumerNo;

    @Column(name = "consumer_name")
    private String consumerName;

    private String category;

    @Column(name = "meter_serial")
    private String meterSerial;

    @Column(name = "billing_period")
    private String billingPeriod;

    @Column(name = "issue_date")
    private LocalDate issueDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "previous_reading_kwh")
    private Double previousReadingKwh;

    @Column(name = "current_reading_kwh")
    private Double currentReadingKwh;

    @Column(name = "units_consumed_kwh")
    private Double unitsConsumedKwh;

    @Column(name = "fixed_charge")
    private BigDecimal fixedCharge;

    @Column(name = "energy_charge")
    private BigDecimal energyCharge;

    @Column(name = "taxes_and_duties")
    private BigDecimal taxesAndDuties;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    private String status; // PAID, UNPAID, OVERDUE

    public Bill() {}

    public Bill(String invoiceNo, String consumerName, String meterSerial, Double prev, Double curr, double tariffRatePerKwh) {
        this.invoiceNo = invoiceNo;
        this.consumerName = consumerName;
        this.meterSerial = meterSerial;
        this.previousReadingKwh = prev;
        this.currentReadingKwh = curr;
        this.unitsConsumedKwh = Math.max(0.0, curr - prev);
        
        double energyChargeVal = this.unitsConsumedKwh * tariffRatePerKwh; // units * ₹7.50
        this.energyCharge = BigDecimal.valueOf(energyChargeVal);
        this.fixedCharge = BigDecimal.valueOf(250.00);
        this.taxesAndDuties = BigDecimal.valueOf(energyChargeVal * 0.12);
        this.totalAmount = this.energyCharge.add(this.fixedCharge).add(this.taxesAndDuties);
        this.status = "UNPAID";
        this.issueDate = LocalDate.now();
        this.dueDate = LocalDate.now().plusDays(20);
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getInvoiceNo() { return invoiceNo; }
    public void setInvoiceNo(String invoiceNo) { this.invoiceNo = invoiceNo; }

    public String getConsumerNo() { return consumerNo; }
    public void setConsumerNo(String consumerNo) { this.consumerNo = consumerNo; }

    public String getConsumerName() { return consumerName; }
    public void setConsumerName(String consumerName) { this.consumerName = consumerName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getMeterSerial() { return meterSerial; }
    public void setMeterSerial(String meterSerial) { this.meterSerial = meterSerial; }

    public String getBillingPeriod() { return billingPeriod; }
    public void setBillingPeriod(String billingPeriod) { this.billingPeriod = billingPeriod; }

    public LocalDate getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDate issueDate) { this.issueDate = issueDate; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public Double getPreviousReadingKwh() { return previousReadingKwh; }
    public void setPreviousReadingKwh(Double previousReadingKwh) { this.previousReadingKwh = previousReadingKwh; }

    public Double getCurrentReadingKwh() { return currentReadingKwh; }
    public void setCurrentReadingKwh(Double currentReadingKwh) { this.currentReadingKwh = currentReadingKwh; }

    public Double getUnitsConsumedKwh() { return unitsConsumedKwh; }
    public void setUnitsConsumedKwh(Double unitsConsumedKwh) { this.unitsConsumedKwh = unitsConsumedKwh; }

    public BigDecimal getFixedCharge() { return fixedCharge; }
    public void setFixedCharge(BigDecimal fixedCharge) { this.fixedCharge = fixedCharge; }

    public BigDecimal getEnergyCharge() { return energyCharge; }
    public void setEnergyCharge(BigDecimal energyCharge) { this.energyCharge = energyCharge; }

    public BigDecimal getTaxesAndDuties() { return taxesAndDuties; }
    public void setTaxesAndDuties(BigDecimal taxesAndDuties) { this.taxesAndDuties = taxesAndDuties; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
