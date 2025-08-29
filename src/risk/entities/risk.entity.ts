// src/risk/entities/risk.entity.ts
import { v4 as uuidv4 } from "uuid"
import { RiskCategory } from "../enums/risk-category.enum"
import { type RiskLevel, calculateRiskLevel } from "../enums/risk-level.enum"

export class Risk {
  id: string
  title: string
  description?: string
  category: RiskCategory
  likelihood: number
  impact: number
  riskScore: number
  riskLevel: RiskLevel
  createdAt: Date
  updatedAt: Date

  constructor(data?: Partial<Risk>) {       // 👈 data ahora es opcional
    const d = data ?? {}                    // 👈 evita leer de undefined

    this.id = d.id ?? uuidv4()
    this.title = d.title ?? ""
    this.description = d.description
    this.category = d.category ?? RiskCategory.INVASION
    this.likelihood = d.likelihood ?? 1
    this.impact = d.impact ?? 1
    this.createdAt = d.createdAt ? new Date(d.createdAt as any) : new Date()
    this.updatedAt = d.updatedAt ? new Date(d.updatedAt as any) : new Date()

    this.calculateRiskMetrics()
  }

  private calculateRiskMetrics(): void {
    this.riskScore = this.likelihood * this.impact
    this.riskLevel = calculateRiskLevel(this.riskScore)
  }

  update(data: Partial<Risk>): void {
    if (data.title !== undefined) this.title = data.title
    if (data.description !== undefined) this.description = data.description
    if (data.category !== undefined) this.category = data.category
    if (data.likelihood !== undefined) this.likelihood = data.likelihood
    if (data.impact !== undefined) this.impact = data.impact
    this.updatedAt = new Date()
    this.calculateRiskMetrics()
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      category: this.category,
      likelihood: this.likelihood,
      impact: this.impact,
      riskScore: this.riskScore,
      riskLevel: this.riskLevel,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
