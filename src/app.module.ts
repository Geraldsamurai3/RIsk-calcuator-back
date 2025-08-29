import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { RiskModule } from "./risk/risk.module"
import { HealthModule } from "./health/health.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    RiskModule,
    HealthModule,
  ],
})
export class AppModule {}
