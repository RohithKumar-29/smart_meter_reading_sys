package com.powercell.backend.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GridService {

    private final Map<String, List<String>> adjacencyList = new HashMap<>();

    public GridService() {
        // Initialize Electricity Grid Graph G = (V, E) in Java
        adjacencyList.put("Substation-Alpha", Arrays.asList("Feeder-11kV-A1", "Feeder-11kV-A2"));
        adjacencyList.put("Feeder-11kV-A1", Arrays.asList("Transformer-TR01"));
        adjacencyList.put("Feeder-11kV-A2", Arrays.asList("Transformer-TR02"));
        adjacencyList.put("Transformer-TR01", Arrays.asList("SM-IND-89421", "SM-COM-44312"));
        adjacencyList.put("Transformer-TR02", Arrays.asList("SM-RES-10892", "SM-RES-10893", "SM-COM-55190"));
    }

    // Java BFS Traversal Algorithm
    public List<String> breadthFirstSearch(String startNode) {
        List<String> visitedOrder = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        Queue<String> queue = new LinkedList<>();

        queue.add(startNode);
        visited.add(startNode);

        while (!queue.isEmpty()) {
            String current = queue.poll();
            visitedOrder.add(current);

            for (String neighbor : adjacencyList.getOrDefault(current, Collections.emptyList())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }
        }
        return visitedOrder;
    }

    // Java DFS Traversal Algorithm
    public List<String> depthFirstSearch(String startNode) {
        List<String> visitedOrder = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        dfsHelper(startNode, visited, visitedOrder);
        return visitedOrder;
    }

    private void dfsHelper(String node, Set<String> visited, List<String> visitedOrder) {
        visited.add(node);
        visitedOrder.add(node);

        for (String neighbor : adjacencyList.getOrDefault(node, Collections.emptyList())) {
            if (!visited.contains(neighbor)) {
                dfsHelper(neighbor, visited, visitedOrder);
            }
        }
    }
}
