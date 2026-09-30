package com.powercell.backend;

import com.powercell.backend.controller.HealthController;
import com.powercell.backend.service.HealthService;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class HealthControllerTest {

    @Test
    void reportsDatabaseAvailability() {
        HealthService healthService = mock(HealthService.class);
        when(healthService.isDatabaseReachable()).thenReturn(true);

        ResponseEntity<Map<String, Object>> response = new HealthController(healthService).health();

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).containsEntry("status", "UP");
        assertThat(response.getBody()).containsEntry("database", "UP");
    }
}
