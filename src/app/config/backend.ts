
import SuperTokens from "supertokens-node";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import { appInfo } from "./appinfo";

export const backendConfig = (): TypeInput => {
    return {
        appInfo,
        supertokens: {
            connectionURI: "https://st-dev-c0a369d0-ec39-11ee-a9f2-e50431af770e.aws.supertokens.io",
            apiKey: "wFqxUOpHjGs0-7Uy9KwlDEUvSq"
        },
        recipeList: [
			// ThirdPartyEmailPassword recipe adds email password and social login to our project
            ThirdPartyEmailPassword.init({
                /**
                 * These are development credentials provided by SuperTokens, make sure
                 * to use your own credentials when you deploy to production.
                 */
                providers: [
                    {
                        config: {
                            thirdPartyId: "google",
                            clients: [{
                                clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                                clientSecret: "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"
                            }]
                        }
                    }, 
                    {
                        config: {
                            thirdPartyId: "github",
                            clients: [{
                                clientId: "467101b197249757c71f",
                                clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd"
                            }]
                        }
                    }, 
                    {
                        config: {
                            thirdPartyId: "apple",
                            clients: [{
                                clientId: "4398792-io.supertokens.example.service",
                                additionalConfig: {
                                    keyId: "7M48Y4RYDL",
                                    privateKey:
                                        "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\nn-----END PRIVATE KEY-----",
                                    teamId: "YWQCXGJRJL",
                                }
                            }]
                        }
                    },
                ],
            }),
			// Session recipe adds the functionality of managing users sessions and refreshing their sessions
            // For cookie based auth, the access token is not available on the frontend by default. In order to expose it, you need to set the exposeAccessTokenToFrontendInCookieBasedAuth config to true
            Session.init({
                exposeAccessTokenToFrontendInCookieBasedAuth: true,
								/* adding custom claims to the JWT */
                override: {
                    functions: function (originalImplementation) {
                        return {
                            ...originalImplementation,
                            createNewSession: async function (input) {
                                input.accessTokenPayload = {
                                    ...input.accessTokenPayload,
                                    "https://hasura.io/jwt/claims": {
                                        "x-hasura-user-id": input.userId,
                                        "x-hasura-default-role": "user",
                                        "x-hasura-allowed-roles": ["user"],
                                    }
                                };
                                return originalImplementation.createNewSession(input);
                            },
                        };
                    }
                }
            }),
        ],
    };
}

let initialized = false;

// use ensureSuperTokensInit to make sure SuperTokens is initialised before we use any functionality from the SDK
export function ensureSuperTokensInit() {
  if (!initialized) {
    SuperTokens.init(backendConfig());
    initialized = true;
  }
}