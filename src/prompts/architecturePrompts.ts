export const PROMPTS: {
  [key: string]: {
    name: string;
    description?: string;
    arguments?: {
      name: string;
      description?: string;
      required?: boolean;
    }[];
  };
} = {
  "software-architecture-design": {
    name: "software-architecture-design",
    description: "Generate a comprehensive software architecture design.",
    arguments: [
      {
        name: "requirements",
        description: "A list of functional and non-functional requirements.",
        required: true,
      },
      {
        name: "constraints",
        description:
          "Any constraints or limitations (e.g., budget, technology stack).",
        required: false,
      },
    ],
  },
  "cloud-architecture-design": {
    name: "cloud-architecture-design",
    description:
      "Design a cloud architecture for high availability and scalability.",
    arguments: [
      {
        name: "requirements",
        description:
          "Requirements including scalability, availability, and security.",
        required: true,
      },
      {
        name: "region",
        description: "Preferred geographic region or regions.",
        required: false,
      },
    ],
  },
  "ai-architecture-design": {
    name: "ai-architecture-design",
    description:
      "Outline an AI/ML-centric architecture including data pipelines and model management.",
    arguments: [
      {
        name: "requirements",
        description:
          "Requirements for data ingestion, processing, and model deployment.",
        required: true,
      },
      {
        name: "dataSources",
        description: "A list of primary data sources to be integrated.",
        required: false,
      },
    ],
  },
  "microservices-architecture-design": {
    name: "microservices-architecture-design",
    description:
      "Generate a microservices architecture design with emphasis on service decomposition and communication patterns.",
    arguments: [
      {
        name: "requirements",
        description: "List of service requirements and interactions.",
        required: true,
      },
    ],
  },
  "event-driven-architecture-design": {
    name: "event-driven-architecture-design",
    description:
      "Design an event-driven architecture focusing on asynchronous processing and real-time data flows.",
    arguments: [
      {
        name: "requirements",
        description: "A list of events and expected responses.",
        required: true,
      },
    ],
  },
  "serverless-architecture-design": {
    name: "serverless-architecture-design",
    description:
      "Create a serverless architecture design that leverages FaaS and managed services.",
    arguments: [
      {
        name: "requirements",
        description:
          "Requirements that favor on-demand scalability and cost efficiency.",
        required: true,
      },
    ],
  },
  // Additional prompts for other specialized domains...
  "service-mesh-architecture-design": {
    name: "service-mesh-architecture-design",
    description:
      "Generate a design that incorporates service mesh for managing microservices communications.",
    arguments: [
      {
        name: "requirements",
        description: "Communication, security, and observability requirements.",
        required: true,
      },
    ],
  },
  "multi-cloud-architecture-design": {
    name: "multi-cloud-architecture-design",
    description:
      "Generate a multi-cloud architecture design that spans across different cloud providers.",
    arguments: [
      {
        name: "requirements",
        description:
          "Requirements regarding resilience and performance across clouds.",
        required: true,
      },
    ],
  },
  "hybrid-cloud-architecture-design": {
    name: "hybrid-cloud-architecture-design",
    description:
      "Design a hybrid cloud architecture combining on-premises and public cloud solutions.",
    arguments: [
      {
        name: "requirements",
        description: "Requirements for integrating on-prem and cloud systems.",
        required: true,
      },
    ],
  },
  "edge-computing-architecture-design": {
    name: "edge-computing-architecture-design",
    description:
      "Generate an edge computing architecture design for low-latency and distributed processing.",
    arguments: [
      {
        name: "requirements",
        description:
          "Requirements for real-time data processing and localized compute.",
        required: true,
      },
    ],
  },
  "data-mesh-architecture-design": {
    name: "data-mesh-architecture-design",
    description:
      "Design a data mesh architecture that decentralizes data ownership and enables data as a product.",
    arguments: [
      {
        name: "requirements",
        description: "Requirements for data governance and integration.",
        required: true,
      },
    ],
  },
  "hexagonal-architecture-design": {
    name: "hexagonal-architecture-design",
    description:
      "Generate a hexagonal (ports and adapters) architecture design to isolate core business logic.",
    arguments: [
      {
        name: "requirements",
        description:
          "Requirements that emphasize testability and separation of concerns.",
        required: true,
      },
    ],
  },
  "blockchain-architecture-design": {
    name: "blockchain-architecture-design",
    description:
      "Generate a blockchain-based architecture design focusing on decentralization and immutability.",
    arguments: [
      {
        name: "requirements",
        description: "Requirements for security, trust, and data integrity.",
        required: true,
      },
    ],
  },
  "soa-architecture-design": {
    name: "soa-architecture-design",
    description:
      "Generate a service-oriented architecture design with loosely coupled, reusable services.",
    arguments: [
      {
        name: "requirements",
        description:
          "Requirements for service integration and interoperability.",
        required: true,
      },
    ],
  },
  "reactive-architecture-design": {
    name: "reactive-architecture-design",
    description:
      "Design a reactive architecture that emphasizes responsiveness, resilience, and scalability.",
    arguments: [
      {
        name: "requirements",
        description:
          "Requirements for asynchronous communication and responsiveness.",
        required: true,
      },
    ],
  },
  "actor-based-architecture-design": {
    name: "actor-based-architecture-design",
    description:
      "Generate an actor-based architecture design for managing concurrency and distributed state.",
    arguments: [
      {
        name: "requirements",
        description:
          "Requirements for parallel processing and state isolation.",
        required: true,
      },
    ],
  },
  "pipe-and-filter-architecture-design": {
    name: "pipe-and-filter-architecture-design",
    description:
      "Generate a pipe-and-filter architecture design for stream processing.",
    arguments: [
      {
        name: "requirements",
        description:
          "Requirements that focus on sequential data processing steps.",
        required: true,
      },
    ],
  },
  "space-based-architecture-design": {
    name: "space-based-architecture-design",
    description:
      "Design a space-based architecture that partitions processing and storage for high scalability.",
    arguments: [
      {
        name: "requirements",
        description: "Requirements for distributed processing and scalability.",
        required: true,
      },
    ],
  },
};

export function getPromptResponse(request: {
  params: { name: string; arguments?: Record<string, string> };
}) {
  const { name, arguments: args } = request.params;
  const prompt = PROMPTS[name];
  if (!prompt) {
    throw new Error(`Prompt not found: ${name}`);
  }

  switch (name) {
    case "software-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Generate a comprehensive software architecture design based on the following requirements:\n\n${
                request.params.arguments?.requirements
              }\n\nConstraints: ${
                request.params.arguments?.constraints || "None"
              }`,
            },
          },
        ],
      };

    case "cloud-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Design a cloud architecture for the following requirements:\n\n${
                request.params.arguments?.requirements
              }\n\nPreferred Region: ${
                request.params.arguments?.region || "Not specified"
              }`,
            },
          },
        ],
      };

    case "ai-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Outline an AI/ML-centric architecture design based on the following requirements:\n\n${
                args?.requirements
              }\n\nData Sources: ${args?.dataSources || "Not specified"}`,
            },
          },
        ],
      };

    case "microservices-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Generate a microservices architecture design with an emphasis on service decomposition and inter-service communication. Requirements:\n\n${args?.requirements}`,
            },
          },
        ],
      };

    case "event-driven-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Design an event-driven architecture focusing on asynchronous processing and real-time data flows. Requirements:\n\n${args?.requirements}`,
            },
          },
        ],
      };

    case "serverless-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Create a serverless architecture design that leverages FaaS and managed services for on-demand scalability and cost efficiency. Requirements:\n\n${args?.requirements}`,
            },
          },
        ],
      };

    case "service-mesh-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Generate a design that incorporates a service mesh to manage microservices communications, security, and observability. Requirements:\n\n${args?.requirements}`,
            },
          },
        ],
      };

    case "multi-cloud-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Generate a multi-cloud architecture design that spans across different cloud providers to ensure resilience and performance. Requirements:\n\n${args?.requirements}`,
            },
          },
        ],
      };

    case "hybrid-cloud-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Design a hybrid cloud architecture that combines on-premises infrastructure with public cloud solutions. Requirements:\n\n${args?.requirements}`,
            },
          },
        ],
      };

    case "edge-computing-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Generate an edge computing architecture design optimized for low-latency and distributed processing. Requirements:\n\n${args?.requirements}`,
            },
          },
        ],
      };

    case "data-mesh-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Design a data mesh architecture that decentralizes data ownership and treats data as a product. Requirements:\n\n${args?.requirements}`,
            },
          },
        ],
      };

    case "hexagonal-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Generate a hexagonal (ports and adapters) architecture design that isolates core business logic from external systems. Requirements:\n\n${args?.requirements}`,
            },
          },
        ],
      };

    case "blockchain-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Generate a blockchain-based architecture design focusing on decentralization, security, and immutability. Requirements:\n\n${args?.requirements}`,
            },
          },
        ],
      };

    case "soa-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Generate a service-oriented architecture (SOA) design that emphasizes loosely coupled, reusable services. Requirements:\n\n${args?.requirements}`,
            },
          },
        ],
      };

    case "reactive-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Design a reactive architecture that emphasizes responsiveness, resilience, and scalability through asynchronous communication. Requirements:\n\n${args?.requirements}`,
            },
          },
        ],
      };

    case "actor-based-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Generate an actor-based architecture design suitable for managing concurrency and distributed state. Requirements:\n\n${args?.requirements}`,
            },
          },
        ],
      };

    case "pipe-and-filter-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Generate a pipe-and-filter architecture design tailored for sequential, stream-based data processing. Requirements:\n\n${args?.requirements}`,
            },
          },
        ],
      };

    case "space-based-architecture-design":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Design a space-based architecture that partitions processing and storage across distributed nodes for high scalability. Requirements:\n\n${args?.requirements}`,
            },
          },
        ],
      };

    default:
      throw new Error(`No dynamic prompt response implementation for: ${name}`);
  }

  // You can add additional cases for other prompts as needed.

  throw new Error(`No implementation for prompt: ${request.params.name}`);
}
