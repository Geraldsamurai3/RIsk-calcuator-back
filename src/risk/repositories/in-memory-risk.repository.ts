import { Injectable } from "@nestjs/common"
import type { Risk } from "../entities/risk.entity"
import type { RiskRepository, PaginatedResult } from "./risk.repository.interface"
import type { RiskQueryDto } from "../dto/risk-query.dto"

@Injectable()
export class InMemoryRiskRepository implements RiskRepository {
  private risks = new Map<string, Risk>()

  async create(risk: Risk): Promise<Risk> {
    this.risks.set(risk.id, risk)
    return risk
  }

  async findById(id: string): Promise<Risk | null> {
    return this.risks.get(id) || null
  }

  async findAll(query: RiskQueryDto): Promise<PaginatedResult<Risk>> {
    let risks = Array.from(this.risks.values())

    // Apply filters
    if (query.search) {
      const searchTerm = query.search.toLowerCase()
      risks = risks.filter(
        (risk) => risk.title.toLowerCase().includes(searchTerm) || risk.description?.toLowerCase().includes(searchTerm),
      )
    }

    if (query.category) {
      risks = risks.filter((risk) => risk.category === query.category)
    }

    if (query.level) {
      risks = risks.filter((risk) => risk.riskLevel === query.level)
    }

    // Sort by creation date (newest first)
    risks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    // Apply pagination
    const total = risks.length
    const page = query.page || 1
    const limit = query.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const paginatedRisks = risks.slice(startIndex, endIndex)

    return {
      data: paginatedRisks,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  async update(id: string, updateData: Partial<Risk>): Promise<Risk | null> {
    const risk = this.risks.get(id)
    if (!risk) return null

    risk.update(updateData)
    this.risks.set(id, risk)
    return risk
  }

  async delete(id: string): Promise<boolean> {
    return this.risks.delete(id)
  }

  async count(): Promise<number> {
    return this.risks.size
  }

  // TODO: Replace with PrismaRiskRepository when adding database
  // TODO: Implement proper transaction support
  // TODO: Add database indexes for search performance
}
