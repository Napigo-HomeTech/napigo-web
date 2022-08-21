import { useFeature } from "@growthbook/growthbook-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * This router hook is for restricting user to access a particular route directly by URL
 * when feature flag related to this routing is disabled
 * @param feature
 */
export const useFeatureRestrictRoute = (feature: string) => {
  const enable = useFeature(feature).on;
  const navigate = useNavigate();

  useEffect(() => {
    if (!enable) {
      navigate("/");
    }
  }, [enable, navigate]);
};
