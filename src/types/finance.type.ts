/**
 *
 */
export type ASMHealthStatus = "HEALTHY" | "WARNING" | "DANGER";
/**
 *
 */

export enum PlanStatus {
  in_queue = "IN-QUEUE",
  in_used = "IN-USE",
  draft = "DRAFT",
}

export type PlanSummary = Pick<
  PlanForm,
  | "_id"
  | "title"
  | "net_income"
  | "col"
  | "asm_amount"
  | "asm_percent"
  | "created_at"
  | "updated_at"
  | "status"
  | "health_status"
>;

export interface PlanForm {
  _id: string;
  title: string;
  net_income: string;
  owner_id: string;
  esm_percent: number;
  esm_amount: string;
  asm_percent: number;
  asm_amount: string;
  col: string;
  created_at: string;
  updated_at: null | string;
  deleted: 0 | 1;
  status: PlanStatus;
  active_on: null | string;
  health_status: ASMHealthStatus | null;
  categories: string[];
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

export interface PlanFormUpdateRequest {
  _id: string;
  title: string;
  net_income: string;
  asm_percent: number;
  asm_amount: string;
  esm_percent: number;
  esm_amount: string;
  col: string;
  categories: string[];
  items: PlanItem[];
}
