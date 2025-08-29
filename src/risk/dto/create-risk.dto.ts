import { IsString, IsEnum, IsInt, Min, Max, IsOptional, Length } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { RiskCategory } from "../enums/risk-category.enum"

export class CreateRiskDto {
  @ApiProperty({ description: "Risk title", example: "Mothership detected", minLength: 1, maxLength: 200 })
  @IsString()
  @Length(1, 200)
  title!: string

  @ApiPropertyOptional({
    description: "Detailed risk description",
    example: "Large alien vessel…",
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @Length(0, 1000)
  description?: string

  @ApiProperty({ description: "Risk category", enum: RiskCategory, example: RiskCategory.INVASION })
  @IsEnum(RiskCategory)
  category!: RiskCategory

  @ApiProperty({ description: "Likelihood (1-5)", minimum: 1, maximum: 5, example: 4 })
  @Type(() => Number)     // 👈 convierte "4" → 4
  @IsInt()
  @Min(1)
  @Max(5)
  likelihood!: number

  @ApiProperty({ description: "Impact (1-5)", minimum: 1, maximum: 5, example: 5 })
  @Type(() => Number)     // 👈 convierte "5" → 5
  @IsInt()
  @Min(1)
  @Max(5)
  impact!: number
}
