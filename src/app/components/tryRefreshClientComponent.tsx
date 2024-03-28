
/*
"use client" is used to declare a boundary between a Server and Client Component modules. This means that by defining a "use client" in a file, all other modules imported into it, including child components, are considered part of the client bundle 
By default, all components in the App Router are Server Components where "useState" "onClick" APIs are not available. By defining the "use client" directive, you can tell React to enter the client boundary where these APIs are available
*/
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Session from "supertokens-auth-react/recipe/session";
import SuperTokens from "supertokens-auth-react";

/* 
This component will be used to refresh the session if the user’s current session has expired
*/
export const TryRefreshComponent = () => {
    const router = useRouter();
    const [didError, setDidError] = useState(false);

    useEffect(() => {
        // to call the refresh endpoint
        void Session.attemptRefreshingSession()
            .then((hasSession) => {
                if (hasSession) {
                    router.refresh();
                } else {
                    // if the request fails we redirect back to the login route
                    SuperTokens.redirectToAuth();
                }
            })
            .catch(() => {
                setDidError(true);
            });
    }, []);

    if (didError) {
        return <div>Something went wrong, please reload the page</div>;
    }

    return <div>Loading...</div>;
};