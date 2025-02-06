import { z } from "zod";
import { architectAgent } from "../agents/softwareArchitectAgent.js";

export const analyzeArchitectureToolName = "analyze_architecture";
export const analyzeArchitectureToolDescription =
  "Analyze an architecture design based on requirements and constraints";

export const AnalyzeArchitectureToolSchema = z.object({
  description: z.string(),
  requirements: z.array(z.string()),
  constraints: z.array(z.string()).optional(),
  domain: z.string(),
});

type AnalyzeArchitectureInput = z.infer<typeof AnalyzeArchitectureToolSchema>;

// Define Zod schema for the analysis result
export const AnalysisResultSchema = z.object({
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  recommendations: z.array(z.string()),
  complianceScore: z.number(),
  qualityMetrics: z.object({
    maintainability: z.number(),
    scalability: z.number(),
    reliability: z.number(),
    security: z.number(),
    performance: z.number(),
  }),
});

export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;

export async function runAnalyzeArchitectureTool(
  input: AnalyzeArchitectureInput
) {
  const { description, requirements, constraints = [], domain } = input;

  try {
    const prompt = `Please analyze this architecture:
Description: ${description}
Requirements: ${requirements.join(", ")}
Constraints: ${constraints.join(", ")}
Domain: ${domain}

Please provide a structured analysis with:
1. Key strengths
2. Potential weaknesses
3. Specific recommendations
4. A compliance score (0-1)
5. Quality metrics for:
   - Maintainability
   - Scalability
   - Reliability
   - Security
   - Performance`;

    const result = await architectAgent<AnalysisResult>(
      prompt,
      AnalysisResultSchema
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
          text: `Error analyzing architecture: ${
            error instanceof Error ? error.message : "Unknown error occurred"
          }`,
        },
      ],
    };
  }
}
