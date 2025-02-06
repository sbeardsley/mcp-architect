import { z } from "zod";
import { architectAgent } from "../agents/softwareArchitectAgent.js";

export const evaluateArchitectureToolName = "evaluate_architecture";
export const evaluateArchitectureToolDescription =
  "Evaluate an architecture design against specific criteria";

export const EvaluateArchitectureToolSchema = z.object({
  architecture: z.record(z.unknown()),
  criteria: z.array(z.string()),
  domain: z.string(),
});

type EvaluateArchitectureInput = z.infer<typeof EvaluateArchitectureToolSchema>;

// Define Zod schema for the evaluation result
export const ArchitectureEvaluationSchema = z.object({
  summary: z.object({
    overallScore: z.number(),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    criticalFindings: z.array(z.string()),
  }),
  metrics: z.array(
    z.object({
      name: z.string(),
      score: z.number(),
      description: z.string(),
      findings: z.array(z.string()),
      recommendations: z.array(z.string()),
    })
  ),
  risks: z.array(
    z.object({
      level: z.enum(["low", "medium", "high"]),
      description: z.string(),
      mitigations: z.array(z.string()),
    })
  ),
  compliance: z.array(
    z.object({
      standard: z.string(),
      compliant: z.boolean(),
      gaps: z.array(z.string()),
      remediation: z.array(z.string()),
    })
  ),
  recommendations: z.object({
    shortTerm: z.array(z.string()),
    longTerm: z.array(z.string()),
  }),
});

export type ArchitectureEvaluation = z.infer<
  typeof ArchitectureEvaluationSchema
>;

export async function runEvaluateArchitectureTool(
  input: EvaluateArchitectureInput
) {
  const { architecture, criteria, domain } = input;

  try {
    const prompt = `Please evaluate this architecture:
Architecture: ${JSON.stringify(architecture, null, 2)}
Evaluation Criteria: ${criteria.join(", ")}
Domain: ${domain}

Please provide a comprehensive evaluation with:
1. Summary (overall score, strengths, weaknesses, critical findings)
2. Detailed metrics (with scores, findings, and recommendations)
3. Risk assessment
4. Compliance checks
5. Short-term and long-term recommendations`;

    const result = await architectAgent<ArchitectureEvaluation>(
      prompt,
      ArchitectureEvaluationSchema
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
          text: `Error evaluating architecture: ${
            error instanceof Error ? error.message : "Unknown error occurred"
          }`,
        },
      ],
    };
  }
}
