// backend/src/risk/risk.service.ts
import { Inject, Injectable, NotFoundException } from "@nestjs/common"
import { Risk } from "./entities/risk.entity"
import type { CreateRiskDto } from "./dto/create-risk.dto"
import type { UpdateRiskDto } from "./dto/update-risk.dto"
import type { RiskQueryDto } from "./dto/risk-query.dto"
import { RISK_REPOSITORY, type RiskRepository, type PaginatedResult } from "./repositories/risk.repository.interface"

@Injectable()
export class RiskService {
  constructor(
    @Inject(RISK_REPOSITORY)               // ⬅️ importante
    private readonly riskRepository: RiskRepository,
  ) {}

  async create(createRiskDto: CreateRiskDto): Promise<Risk> {
    const risk = new Risk(createRiskDto)
    return this.riskRepository.create(risk)
  }

  async findAll(query: RiskQueryDto): Promise<PaginatedResult<Risk>> {
    return this.riskRepository.findAll(query)
  }

  async findOne(id: string): Promise<Risk> {
    const risk = await this.riskRepository.findById(id)
    if (!risk) throw new NotFoundException(`Risk with ID ${id} not found`)
    return risk
  }

  async update(id: string, updateRiskDto: UpdateRiskDto): Promise<Risk> {
    const updated = await this.riskRepository.update(id, updateRiskDto)
    if (!updated) throw new NotFoundException(`Risk with ID ${id} not found`)
    return updated
  }

  async remove(id: string): Promise<void> {
    const ok = await this.riskRepository.delete(id)
    if (!ok) throw new NotFoundException(`Risk with ID ${id} not found`)
  }

  async getStats() {
    const total = await this.riskRepository.count()
    const all = await this.riskRepository.findAll({ page: 1, limit: 1000 })

    const stats = {
      total,
      byLevel: { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 },
      byCategory: { INVASION: 0, ABDUCTION: 0, VIRUS_XENO: 0, UFO_CRASH: 0, MIND_CONTROL: 0, QUANTUM_ANOMALY: 0 },
      averageRiskScore: 0,
    }

    if (all.data.length) {
      let totalScore = 0
      for (const r of all.data) {
        stats.byLevel[r.riskLevel]++
        stats.byCategory[r.category]++
        totalScore += r.riskScore
      }
      stats.averageRiskScore = Math.round((totalScore / all.data.length) * 100) / 100
    }
    return stats
  }
}
