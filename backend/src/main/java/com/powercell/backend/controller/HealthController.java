package com.powercell.backend.controller;

import java.util.Map;

import com.powercell.backend.service.HealthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final HealthService healthService;

    public HealthController(HealthService healthService) {
        this.healthService = healthService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> health() {
        boolean databaseReachable = healthService.isDatabaseReachable();
        Map<String, Object> response = Map.of(
                "status", databaseReachable ? "UP" : "DEGRADED",
                "database", databaseReachable ? "UP" : "DOWN"
        );
        return ResponseEntity.status(databaseReachable ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE)
                .body(response);
    }
}
