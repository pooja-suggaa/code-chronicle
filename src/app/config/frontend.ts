import ThirdPartyEmailPasswordReact, {Google, Github, Apple, Facebook} from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import Session from 'supertokens-auth-react/recipe/session';
// import SessionReact from 'supertokens-auth-react/recipe/session'
import { appInfo } from './appinfo'
import { useRouter } from "next/navigation";
import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types'
import { ensureSuperTokensInit } from './backend';

// call ensureSuperTokensInit to make sure SuperTokens is always initialised when any of the SuperTokens API routes are called
ensureSuperTokensInit();

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } =
  {};

export function setRouter(
  router: ReturnType<typeof useRouter>,
  pathName: string,
) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        signInAndUpFeature: {
          providers: [
            Google.init(),
            Facebook.init(),
            Github.init(),
            Apple.init(),
          ],
        },
      }),
      Session.init(),
    ],
    windowHandler: (original) => ({
      ...original,
      location: {
        ...original.location,
        getPathName: () => routerInfo.pathName!,
        assign: (url) => routerInfo.router!.push(url.toString()),
        setHref: (url) => routerInfo.router!.push(url.toString()),
      },
    }),
  }
}