import { ApiProperty } from "@nestjs/swagger"
import type { Risk } from "../entities/risk.entity"

export class RiskResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty({ required: false })
  description?: string

  @ApiProperty()
  category: string

  @ApiProperty()
  likelihood: number

  @ApiProperty()
  impact: number

  @ApiProperty()
  riskScore: number

  @ApiProperty()
  riskLevel: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  static fromEntity(risk: Risk): RiskResponseDto {
    return {
      id: risk.id,
      title: risk.title,
      description: risk.description,
      category: risk.category,
      likelihood: risk.likelihood,
      impact: risk.impact,
      riskScore: risk.riskScore,
      riskLevel: risk.riskLevel,
      createdAt: risk.createdAt,
      updatedAt: risk.updatedAt,
    }
  }
}

export class PaginatedRiskResponseDto {
  @ApiProperty({ type: [RiskResponseDto] })
  data: RiskResponseDto[]

  @ApiProperty()
  total: number

  @ApiProperty()
  page: number

  @ApiProperty()
  limit: number

  @ApiProperty()
  totalPages: number
}
