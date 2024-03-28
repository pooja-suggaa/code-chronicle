'use client';

import { useEffect } from 'react';
import { redirectToAuth } from 'supertokens-auth-react';
import SuperTokens from 'supertokens-auth-react/ui';
import { ThirdPartyEmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui';

export default function Auth() {
  // if the user visits a page that is not handled by us (like /auth/random), then we redirect them back to the auth page.
  useEffect(() => {
    if (
      // ThirdPartyEmailPasswordPreBuiltUI are all the pre built UI components that can handle a specific set of routes
      // SuperTokens.canHandleRoute returns true if SuperTokens exposes a component for the current browser url
      SuperTokens.canHandleRoute([ThirdPartyEmailPasswordPreBuiltUI]) === false
    ) {
      redirectToAuth({ redirectBack: false });
    }
  }, []);

  if (typeof window !== 'undefined') {
    // return the relevant component from SuperTokens using SuperTokens.getRoutingComponent
    return SuperTokens.getRoutingComponent([ThirdPartyEmailPasswordPreBuiltUI]);
  }

  return null;
}