import { Module } from "@nestjs/common";
import { RiskService } from "./risk.service";
import { RiskController } from "./risk.controller";
import { RISK_REPOSITORY } from "./repositories/risk.repository.interface";
import { InMemoryRiskRepository } from "./repositories/in-memory-risk.repository";

@Module({
  controllers: [RiskController],
  providers: [
    RiskService,
    {
      provide: RISK_REPOSITORY,
      useClass: InMemoryRiskRepository,
    },
  ],
  exports: [RiskService, RISK_REPOSITORY],
})
export class RiskModule {}
