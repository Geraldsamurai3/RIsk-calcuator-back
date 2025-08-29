import { Controller, Get, Post, Patch, Param, Delete, Query, HttpCode,   Body, HttpStatus} from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger"
import { RiskService } from "./risk.service"
import type { CreateRiskDto } from "./dto/create-risk.dto"
import type { UpdateRiskDto } from "./dto/update-risk.dto"
import { RiskQueryDto } from "./dto/risk-query.dto"
import { RiskResponseDto, PaginatedRiskResponseDto } from "./dto/risk-response.dto"

@ApiTags("risks")
@Controller("risks")
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  @Post()
  @ApiOperation({ summary: "Create a new risk assessment" })
  @ApiResponse({
    status: 201,
    description: "Risk created successfully",
    type: RiskResponseDto,
  })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  async create(@Body() createRiskDto: CreateRiskDto): Promise<RiskResponseDto> {
    const risk = await this.riskService.create(createRiskDto)
    return RiskResponseDto.fromEntity(risk)
  }

  @Get()
  @ApiOperation({ summary: 'Get all risks with pagination and filtering' })
  @ApiResponse({  
    status: 200,
    description: 'Risks retrieved successfully',
    type: PaginatedRiskResponseDto,
  })
  async findAll(@Query() query: RiskQueryDto): Promise<PaginatedRiskResponseDto> {
    const result = await this.riskService.findAll(query)
    return {
      data: result.data.map(RiskResponseDto.fromEntity),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    }
  }

  @Get("stats")
  @ApiOperation({ summary: "Get risk statistics and analytics" })
  @ApiResponse({ status: 200, description: "Statistics retrieved successfully" })
  async getStats() {
    return await this.riskService.getStats()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific risk by ID' })
  @ApiParam({ name: 'id', description: 'Risk ID' })
  @ApiResponse({
    status: 200,
    description: 'Risk retrieved successfully',
    type: RiskResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Risk not found' })
  async findOne(@Param('id') id: string): Promise<RiskResponseDto> {
    const risk = await this.riskService.findOne(id)
    return RiskResponseDto.fromEntity(risk)
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a specific risk" })
  @ApiParam({ name: "id", description: "Risk ID" })
  @ApiResponse({
    status: 200,
    description: "Risk updated successfully",
    type: RiskResponseDto,
  })
  @ApiResponse({ status: 404, description: "Risk not found" })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  async update(@Param('id') id: string, updateRiskDto: UpdateRiskDto): Promise<RiskResponseDto> {
    const risk = await this.riskService.update(id, updateRiskDto)
    return RiskResponseDto.fromEntity(risk)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a specific risk' })
  @ApiParam({ name: 'id', description: 'Risk ID' })
  @ApiResponse({ status: 204, description: 'Risk deleted successfully' })
  @ApiResponse({ status: 404, description: 'Risk not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.riskService.remove(id)
  }
}
