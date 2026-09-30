package com.powercell.backend.service;

import com.powercell.backend.entity.Bill;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BillingService {

    public static final double TARIFF_RATE_PER_KWH = 7.50; // Standard Tariff: ₹7.50 / kWh

    private final List<Bill> mockBills = new ArrayList<>();

    public BillingService() {
        // Pre-populate sample bills matching project data in ₹
        Bill b1 = new Bill("INV-2026-0901", "Apex Precision Engineering Corp", "SM-IND-89421", 138240.0, 148520.0, TARIFF_RATE_PER_KWH);
        b1.setStatus("PAID");
        mockBills.add(b1);

        Bill b2 = new Bill("INV-2026-0902", "Hyperion Shopping Mall", "SM-COM-44312", 86140.0, 92340.0, TARIFF_RATE_PER_KWH);
        b2.setStatus("PAID");
        mockBills.add(b2);

        Bill b3 = new Bill("INV-2026-0903", "Dr. Sarah Jenkins", "SM-RES-10892", 1250.0, 1385.0, TARIFF_RATE_PER_KWH);
        b3.setStatus("UNPAID");
        mockBills.add(b3);
    }

    public List<Bill> getAllBills() {
        return mockBills;
    }

    public Bill generateInvoice(String consumerName, String meterSerial, double previousKwh, double currentKwh) {
        String invoiceNo = "INV-2026-" + (1000 + (int)(Math.random() * 9000));
        Bill bill = new Bill(invoiceNo, consumerName, meterSerial, previousKwh, currentKwh, TARIFF_RATE_PER_KWH);
        mockBills.add(bill);
        return bill;
    }
}
