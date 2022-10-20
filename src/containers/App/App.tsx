import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { AuthRoutes } from "@/routers/AuthRoutes";
import { PreAuthRoutes } from "@/routers/PreAuthRoutes";
import { UserRoutes } from "@/routers/UserRoutes";

const auth = getAuth();

export const App: React.FC = () => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const [isAuthing, setIsAuththing] = useState<boolean>(true);
    const [emailNeedConfirmation, setEmailNeedConfirmation] = useState<boolean>(false);

    useEffect(() => {
        const authCheck = onAuthStateChanged(auth, (user: User | null) => {
            setIsAuththing(false);
            if (user) {
                setAuthenticated(true);
                if (!user.emailVerified) {
                    setEmailNeedConfirmation(true);
                }
            }
            if (user === null) {
                setAuthenticated(false);
                setEmailNeedConfirmation(false);
            }
        });

        return () => {
            authCheck();
        };
    }, []);

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
