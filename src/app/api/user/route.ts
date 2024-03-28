
import { NextResponse, NextRequest } from 'next/server';
import { withSession } from '../../sessionUtils';
import SuperTokens from 'supertokens-node';

/* 
Creating a GET api route for /user
This API calls withSession because we need an active session to be able to fetch the user’s information. If a session does not exist we return with status 401
*/
export function GET(request: NextRequest) {
  /* 
  The withSession helper function will pass the session object in the callback which we can use to read user information
  The withSession guard will return Status 401 if the session does not exist or has expired, Stauts 403 if the session claims fail their validation
  */
  return withSession(request, async (session) => {
    if (!session) {
      return new NextResponse('Authentication required', { status: 401 });
    }

    const userId = session.getUserId();
    const user = await SuperTokens.getUser(userId);
    
    if (user === undefined) {
        return NextResponse.json({
            email: "not found",
        })
    }

    return NextResponse.json({
      email: user.emails[0],
    });
  })
}