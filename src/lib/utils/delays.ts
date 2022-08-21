const DEFAULT_DELAY = 2000;

/**
 * This function is a util to simulate delays for developing
 * feature such as Loading or pending state when running on localhost
 * @note please turn .env VITE_MOCK_DELAYS to false when running on E2E,
 * UAT or PROD to avoid from having unnessaries delays on any function call especially
 * on fetching or IO operational Function
 * @param cb
 * @param delay
 */
export const delayInvoke = (cb: Function, delay?: number) => {
  if (import.meta.env.VITE_MOCK_DELAYS === "true") {
    setTimeout(() => {
      cb();
    }, delay ?? DEFAULT_DELAY);
  } else {
    cb();
  }
};
