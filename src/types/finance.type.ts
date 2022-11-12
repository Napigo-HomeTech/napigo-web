/**
 *
 */
export type ASMHealthStatus = "HEALTHY" | "WARNING" | "DANGER";
/**
 *
 */
export type PlanSummary = {
  pid: string;
  title: string;
  in_use: boolean;
  net_income: number;
  col: number;
  asm_amount: number;
  asm_percent: number;
  created_at: string;
  health_status: ASMHealthStatus;
};
