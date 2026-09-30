package com.powercell.backend.controller;

import com.powercell.backend.service.GridService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/grid")
@CrossOrigin(origins = "*")
public class GridWorkflowController {

    private final GridService gridService;

    public GridWorkflowController(GridService gridService) {
        this.gridService = gridService;
    }

    @GetMapping("/bfs")
    public List<String> runBFS(@RequestParam(defaultValue = "Substation-Alpha") String startNode) {
        return gridService.breadthFirstSearch(startNode);
    }

    @GetMapping("/dfs")
    public List<String> runDFS(@RequestParam(defaultValue = "Substation-Alpha") String startNode) {
        return gridService.depthFirstSearch(startNode);
    }
}
