/**
 *
 */
export type ASMHealthStatus = "HEALTHY" | "WARNING" | "DANGER";
/**
 *
 */

export enum EnumPlanStatus {
  in_queue = "IN-QUEUE",
  in_used = "IN-USE",
  draft = "DRAFT",
}

export type PlanSummary = {
  _id: string;
  title: string;
  in_use: boolean;
  net_income: number;
  col: number;
  asm_amount: number;
  asm_percent: number;
  created_at: string;
  health_status: ASMHealthStatus;
};

export interface PlanForm {
  _id?: string;
  owner_id: string;
  title: string;
  net_income: number;
  esm_percent: number;
  esm_amount: number;
  asm_percent: number;
  asm_amount: number;
  col: number;
  created_at: string;
  updated_at: null | string;
  deleted: 0 | 1;
  status: EnumPlanStatus;
  active_on: null | string;
  health_status: ASMHealthStatus | null;
  items: PlanItem[];
}

export interface PlanItem {
  name: string;
  category: string;
  amount: number;
}

export interface PlanIdResponse {
  plan_id: string;
}
