import { usePrompt } from "@/elements/Prompt";
import { RootState } from "@/lib/Redux/store";
import React from "react";
import { useSelector } from "react-redux";

export const PlanFormExit: React.FC = () => {
  const { eventCounts, onSaving } = useSelector(
    (state: RootState) => state.planformStore
  );
  return <MemoPlanformExit when={Boolean(eventCounts > 0 || onSaving)} />;
};

/**
 *
 */
type MemoizedPlanformExit = {
  when: boolean;
};
const MemoizedPlanformExit = ({ when }: MemoizedPlanformExit) => {
  usePrompt({
    header: "Are you sure you want to leave ?",
    message: "Changes that you made may not be saved",
    when: when,
  });
  return null;
};

const MemoPlanformExit = React.memo(MemoizedPlanformExit);
