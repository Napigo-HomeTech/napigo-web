import { getAuth, User } from "firebase/auth";
import { freezePage } from "@/lib/Dom";
import { accountStore } from "@/lib/Firestore";
import { AccountActions, AppContextActions } from "@/lib/Redux";
import { RootState } from "@/lib/Redux/store";
import { delayInvoke } from "@/lib/utils/delays";
import React, { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Account } from "@/types";
import { AppLoader } from "./AppLoader";

const auth = getAuth();

type AppUserContextProps = {
  children: React.ReactNode;
};
export const AppUserContext: React.FC<AppUserContextProps> = ({ children }) => {
  const { loading } = useSelector((state: RootState) => state.appContextStore);
  const dispatch = useDispatch();

  useInitDataLoadingListener();

  const initializeAppData = useCallback(
    async (user: User) => {
      dispatch(AppContextActions.loading(true));
      try {
        /**
         * Set The User Account information
         */
        const acc: Account = (await accountStore.getAccount(
          user.uid
        )) as Account;

        delayInvoke(() => {
          dispatch(AccountActions.setAccount(acc));
          dispatch(AppContextActions.accountReady(true));
        }, 3000);
      } catch (err) {
        dispatch(
          AppContextActions.error("Error initializing / loading app data ...")
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      initializeAppData(currentUser);
    }
  }, [initializeAppData]);

  return (
    <Fragment>
      {loading && <AppLoader />}
      {children}
    </Fragment>
  );
};

/**
 * The hook listener to listen for change in every attribute of the
 * app to be ready, and will dispatch loading to false when all attr are TRUE
 * This is to ensure component will safely rendered
 *
 */
const useInitDataLoadingListener = () => {
  const dispatch = useDispatch();
  const { accountReady } = useSelector(
    (state: RootState) => state.appContextStore
  );
  useEffect(() => {
    const moduleStates = [accountReady];
    let appReady = true;
    moduleStates.forEach((mod) => {
      if (!mod) {
        appReady = false;
        return;
      }
    });
    if (appReady) {
      dispatch(AppContextActions.loading(false));
      freezePage(false);
    }
  }, [accountReady, dispatch]);
};
