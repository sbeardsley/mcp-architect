import { z } from "zod";
import { architectAgent } from "../agents/softwareArchitectAgent.js";

export const generateArchitectureToolName = "generate_architecture";
export const generateArchitectureToolDescription =
  "Generate a software architecture design based on requirements";

/*************************************************************
 * GenerateArchitectureToolSchema is the zod schema for the generateArchitecture tool.
 * It validates the input to the tool.
 * *****************************************************
 Explanation of the Styles
    - monolithic: A single, unified codebase where all components are interconnected.
    - microservices: An architecture where functionality is broken into small, independent services.
    - layered: Also known as n-tier, this style separates concerns into layers (e.g., presentation, business logic, data access).
    - event-driven: An architecture focused on the production, detection, and consumption of events.
    - serverless: An approach where the cloud provider manages the server infrastructure, and you write functions that are triggered by events.
    - service-mesh: A dedicated infrastructure layer that controls service-to-service communications, often used with microservices.
    - multi-cloud: Architectures that span across multiple cloud providers for resilience and flexibility.
    - hybrid-cloud: Combines on-premises infrastructure with public clouds.
    - edge-computing: Distributes computation closer to data sources or end users to reduce latency.
    - data-mesh: Emphasizes decentralized data ownership and architecture, treating data as a product.
    - ai-ml-centric: Architectures that are specifically designed to integrate AI/ML pipelines and workflows.
    - hexagonal: Also known as Ports and Adapters, it isolates the core logic from external influences through defined interfaces.
    - blockchain-based: Leverages blockchain technology for decentralized, secure, and immutable systems.
    - service-oriented-architecture: Service-Oriented Architecture emphasizes loosely coupled, reusable services. It's similar in spirit to microservices but with a broader focus on enterprise integration.
    - reactive: This style focuses on building systems that are responsive, resilient, and scalable by embracing asynchronous, event-driven communication.
    - actor-based: Architectures built around the actor model for managing concurrency and state isolation, which is especially useful in distributed systems.
    - pipe-and-filter: This style structures applications as a series of processing steps (filters) connected by pipelines, ideal for stream processing.
    - space-based: Designed for high scalability and performance by partitioning processing and storage across a distributed "space" of nodes.
 */
export const GenerateArchitectureToolSchema = z.object({
  requirements: z.array(z.string()),
  style: z
    .enum([
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
    ])
    .optional(),
  domain: z.string(),
});

type GenerateArchitectureInput = z.infer<typeof GenerateArchitectureToolSchema>;

// Define Zod schema for the architecture design output
export const ArchitectureDesignSchema = z.object({
  overview: z.object({
    style: z.string(),
    principles: z.array(z.string()),
    constraints: z.array(z.string()),
  }),
  components: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      type: z.string(),
      description: z.string(),
      responsibilities: z.array(z.string()),
      interfaces: z.object({
        input: z.array(z.string()),
        output: z.array(z.string()),
      }),
    })
  ),
  relationships: z.array(
    z.object({
      source: z.string(),
      target: z.string(),
      type: z.string(),
      description: z.string(),
    })
  ),
  patterns: z.array(
    z.object({
      name: z.string(),
      context: z.string(),
      benefits: z.array(z.string()),
      tradeoffs: z.array(z.string()),
    })
  ),
  deploymentStrategy: z.object({
    environment: z.string(),
    requirements: z.array(z.string()),
    steps: z.array(z.string()),
  }),
  qualityAttributes: z.object({}).catchall(
    z
      .object({
        description: z.string(),
        measures: z.array(z.string()),
      })
      .strict()
  ),
});

export type ArchitectureDesign = z.infer<typeof ArchitectureDesignSchema>;

export async function runGenerateArchitectureTool(
  input: GenerateArchitectureInput
) {
  const { requirements, style = "microservices", domain } = input;

  try {
    const prompt = `Please generate an architecture design with these requirements:
Requirements: ${requirements.join(", ")}
Style: ${style}
Domain: ${domain}

Please provide a complete architecture design with:
1. Overview (style, principles, constraints)
2. Components (each with id, name, type, description, responsibilities, interfaces)
3. Relationships between components
4. Design patterns used
5. Deployment strategy
6. Quality attributes`;

    const result = await architectAgent<ArchitectureDesign>(
      prompt,
      ArchitectureDesignSchema
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      isError: true,
      content: [
        {
          type: "text",
          text: `Error generating architecture: ${
            error instanceof Error ? error.message : "Unknown error occurred"
          }`,
        },
      ],
    };
  }
}
