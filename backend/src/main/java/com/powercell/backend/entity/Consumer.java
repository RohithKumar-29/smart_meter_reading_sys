package com.powercell.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "consumers")
public class Consumer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "consumer_no", nullable = false, unique = true)
    private String consumerNo;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category; // RESIDENTIAL, COMMERCIAL, INDUSTRIAL

    private String address;
    private String phone;
    private String email;

    @Column(name = "meter_serial", nullable = false, unique = true)
    private String meterSerial;

    @Column(name = "sanctioned_load_kw")
    private Double sanctionedLoadKw;

    @Column(name = "connection_status")
    private String connectionStatus; // ACTIVE, DISCONNECTED, PENDING

    @Column(name = "current_balance")
    private BigDecimal currentBalance;

    @Column(name = "last_bill_date")
    private LocalDate lastBillDate;

    public Consumer() {}

    public Consumer(String consumerNo, String name, String category, String meterSerial, Double sanctionedLoadKw) {
        this.consumerNo = consumerNo;
        this.name = name;
        this.category = category;
        this.meterSerial = meterSerial;
        this.sanctionedLoadKw = sanctionedLoadKw;
        this.connectionStatus = "ACTIVE";
        this.currentBalance = BigDecimal.ZERO;
        this.lastBillDate = LocalDate.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getConsumerNo() { return consumerNo; }
    public void setConsumerNo(String consumerNo) { this.consumerNo = consumerNo; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMeterSerial() { return meterSerial; }
    public void setMeterSerial(String meterSerial) { this.meterSerial = meterSerial; }

    public Double getSanctionedLoadKw() { return sanctionedLoadKw; }
    public void setSanctionedLoadKw(Double sanctionedLoadKw) { this.sanctionedLoadKw = sanctionedLoadKw; }

    public String getConnectionStatus() { return connectionStatus; }
    public void setConnectionStatus(String connectionStatus) { this.connectionStatus = connectionStatus; }

    public BigDecimal getCurrentBalance() { return currentBalance; }
    public void setCurrentBalance(BigDecimal currentBalance) { this.currentBalance = currentBalance; }

    public LocalDate getLastBillDate() { return lastBillDate; }
    public void setLastBillDate(LocalDate lastBillDate) { this.lastBillDate = lastBillDate; }
}
