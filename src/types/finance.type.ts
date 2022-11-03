/**
 *
 */
export type ASMHealthStatus = "healthy" | "warning" | "danger";
/**
 *
 */
export type PlanSummary = {
    pid: string;
    title: string;
    in_use: boolean;
    income: number;
    col: number;
    asm: number;
    created_at: string;
    asm_health: ASMHealthStatus;
};
