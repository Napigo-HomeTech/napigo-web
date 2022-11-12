import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { AuthRoutes } from "@/routers/AuthRoutes";
import { PreAuthRoutes } from "@/routers/PreAuthRoutes";
import { UserRoutes } from "@/routers/UserRoutes";
import { getCSRFToken } from "@/lib/Auth";
import { useDispatch } from "react-redux";
import { AccountActions } from "@/lib/Redux";

const auth = getAuth();

export const App: React.FC = () => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [isAuthing, setIsAuththing] = useState<boolean>(true);
  const [emailNeedConfirmation, setEmailNeedConfirmation] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const authCheck = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        if (!user.emailVerified) {
          setEmailNeedConfirmation(true);
        }
        /** -----------------------------------------------------------
         *  Authorize user to the backend services
         * -------------------------------------------------------------*/
        try {
          /**
           * @todo calling the crsf endpoint to get the crsf token
           */
          const idToken = await user.getIdToken();
          const resp = await getCSRFToken(idToken);
          dispatch(AccountActions.setCSRF(resp.csrfToken));
          setAuthenticated(true);
        } catch (err) {
          /**
           * for now lets sign out the user
           */
          auth.signOut();
        }
      }
      if (user === null) {
        setAuthenticated(false);
        setEmailNeedConfirmation(false);
      }
      setIsAuththing(false);
    });

    return () => {
      authCheck();
    };
  }, [dispatch]);

  switch (true) {
    case isAuthing:
      return <></>;
    case !isAuthenticated:
      return <AuthRoutes />;
    case isAuthenticated && emailNeedConfirmation:
      return <PreAuthRoutes />;
    case isAuthenticated && !emailNeedConfirmation:
      return <UserRoutes />;
    default:
      return <></>;
  }
};
