import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { runAnalyzeArchitectureTool } from "./analyzeArchitecture.js";
import { runGenerateArchitectureTool } from "./generateArchitecture.js";
import { runEvaluateArchitectureTool } from "./evaluateArchitecture.js";

export const mcpTools: Tool[] = [
  {
    name: "analyze_architecture",
    description: "Perform a comprehensive analysis of a software architecture",
    inputSchema: {
      type: "object",
      properties: {
        description: { type: "string" },
        requirements: { type: "array", items: { type: "string" } },
        constraints: { type: "array", items: { type: "string" } },
        domain: { type: "string" },
      },
      required: ["description", "requirements", "domain"],
    },
    handler: runAnalyzeArchitectureTool,
  },
  {
    name: "generate_architecture",
    description:
      "Generate a software architecture design based on requirements",
    inputSchema: {
      type: "object",
      properties: {
        requirements: { type: "array", items: { type: "string" } },
        style: {
          type: "string",
          enum: [
            "monolithic",
            "microservices",
            "layered",
            "event-driven",
            "serverless",
            "service-mesh",
            "multi-cloud",
            "hybrid-cloud",
            "edge-computing",
            "data-mesh",
            "ai-ml-centric",
            "hexagonal",
            "blockchain-based",
            "service-oriented-architecture",
            "reactive",
            "actor-based",
            "pipe-and-filter",
            "space-based",
          ],
        },
        domain: { type: "string" },
      },
      required: ["requirements", "domain"],
    },
    handler: runGenerateArchitectureTool,
  },
  {
    name: "evaluate_architecture",
    description: "Evaluate an architecture design against specific criteria",
    inputSchema: {
      type: "object",
      properties: {
        architecture: { type: "object" },
        criteria: { type: "array", items: { type: "string" } },
        domain: { type: "string" },
      },
      required: ["architecture", "criteria", "domain"],
    },
    handler: runEvaluateArchitectureTool,
  },
];
