export enum RiskLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export function calculateRiskLevel(riskScore: number): RiskLevel {
  if (riskScore >= 1 && riskScore <= 4) return RiskLevel.LOW
  if (riskScore >= 5 && riskScore <= 9) return RiskLevel.MEDIUM
  if (riskScore >= 10 && riskScore <= 16) return RiskLevel.HIGH
  if (riskScore >= 17 && riskScore <= 25) return RiskLevel.CRITICAL

  // Fallback for edge cases
  return RiskLevel.LOW
}
