import { IsOptional, IsInt, Min, IsString, IsEnum } from "class-validator"
import { Type } from "class-transformer"
import { ApiPropertyOptional } from "@nestjs/swagger"
import { RiskCategory } from "../enums/risk-category.enum"
import { RiskLevel } from "../enums/risk-level.enum"

export class RiskQueryDto {
  @ApiPropertyOptional({
    description: "Page number (1-based)",
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1

  @ApiPropertyOptional({
    description: "Number of items per page",
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10

  @ApiPropertyOptional({
    description: "Search term for title and description",
    example: "invasion",
  })
  @IsOptional()
  @IsString()
  search?: string

  @ApiPropertyOptional({
    description: "Filter by risk category",
    enum: RiskCategory,
  })
  @IsOptional()
  @IsEnum(RiskCategory)
  category?: RiskCategory

  @ApiPropertyOptional({
    description: "Filter by risk level",
    enum: RiskLevel,
  })
  @IsOptional()
  @IsEnum(RiskLevel)
  level?: RiskLevel
}
