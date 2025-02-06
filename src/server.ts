import express from "express";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { mcpTools } from "./tools/mcpTools.js";
import {
  runAnalyzeArchitectureTool,
  AnalyzeArchitectureToolSchema,
} from "./tools/analyzeArchitecture.js";
import {
  runGenerateArchitectureTool,
  GenerateArchitectureToolSchema,
} from "./tools/generateArchitecture.js";
import {
  runEvaluateArchitectureTool,
  EvaluateArchitectureToolSchema,
} from "./tools/evaluateArchitecture.js";
import { PROMPTS, getPromptResponse } from "./prompts/architecturePrompts.js";

const app = express();
app.use(express.json());

// Create MCP server instance
const server = new Server(
  {
    name: "architect-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      //   resources: {},
      tools: {},
      prompts: {},
    },
  }
);

// Define available prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: Object.values(PROMPTS),
  };
});

// Implement prompt get logic
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  return getPromptResponse(request);
});

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: mcpTools,
  };
});

// Implement tool call logic
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  if (!args) throw new Error("Arguments are required");

  try {
    switch (name) {
      case "analyze_architecture": {
        const validArgs = AnalyzeArchitectureToolSchema.parse(args);
        const result = await runAnalyzeArchitectureTool(validArgs);
        return result;
      }
      case "generate_architecture": {
        const validArgs = GenerateArchitectureToolSchema.parse(args);
        const result = await runGenerateArchitectureTool(validArgs);
        return result;
      }
      case "evaluate_architecture": {
        const validArgs = EvaluateArchitectureToolSchema.parse(args);
        const result = await runEvaluateArchitectureTool(validArgs);
        return result;
      }
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Tool execution failed: ${error.message}`,
          },
        ],
      };
    }
    throw error;
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Architect MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
