import type { Risk } from "../entities/risk.entity";
import type { RiskQueryDto } from "../dto/risk-query.dto";

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ✅ Token de inyección en runtime
export const RISK_REPOSITORY = Symbol("RISK_REPOSITORY");

// ✅ Interfaz (solo tipo)
export interface RiskRepository {
  create(risk: Risk): Promise<Risk>;
  findById(id: string): Promise<Risk | null>;
  findAll(query: RiskQueryDto): Promise<PaginatedResult<Risk>>;
  update(id: string, risk: Partial<Risk>): Promise<Risk | null>;
  delete(id: string): Promise<boolean>;
  count(): Promise<number>;
}
