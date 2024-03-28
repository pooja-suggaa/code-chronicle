
'use client'

import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useRouter } from 'next/navigation'
import Session from "supertokens-auth-react/recipe/session";

export const SignOut = () => {
    const session = useSessionContext();
    const router = useRouter();

    if (session.loading === true) {
        return null;
    }

    const signOut = async () => {
        await Session.signOut();
        /* refresh the page because we want to demonstrate that the user would get redirected to the login page. you can redirect to /auth directly if you prefer. */
        router.refresh();
    }

    return <button onClick={signOut}>Sign out</button>
}