package com.powercell.backend.controller;

import com.powercell.backend.entity.Bill;
import com.powercell.backend.service.BillingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bills")
@CrossOrigin(origins = "*")
public class BillingController {

    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    @GetMapping
    public List<Bill> getAllBills() {
        return billingService.getAllBills();
    }

    @PostMapping("/calculate")
    public Bill calculateBill(
            @RequestParam String consumerName,
            @RequestParam String meterSerial,
            @RequestParam double previousKwh,
            @RequestParam double currentKwh) {
        return billingService.generateInvoice(consumerName, meterSerial, previousKwh, currentKwh);
    }
}
