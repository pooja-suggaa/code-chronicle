/* In this server side component, we try to fetch session information using getSSRSession and if the user has a session we render the user id (we wll change this later). If the user does not have a session but a token exists we try to refresh the session, if no token exists then we redirect the user to the /auth route */
/*
The reason it's considered a server-side component is because it's executed on the server-side during the initial render of the page
*/
import { getSSRSession } from '../sessionUtils';
import { TryRefreshComponent } from './tryRefreshClientComponent';
import styles from '../page.module.css';
import { redirect } from 'next/navigation'
import { SignOut } from './signOut';

export async function UserInformation() {
  const { session, hasToken } = await getSSRSession();

  if (!session) {
    if (!hasToken) {
      redirect('/auth');
    }
    return <TryRefreshComponent />;
  }

  /* make a network request to fetch the user’s email */
  const userEmailResponse = await fetch('http://localhost:3000/api/user', {
    headers: {
      Authorization: 'Bearer ' + session.getAccessToken(),
    },
  });

  let email = "";
  if (userEmailResponse.status !== 200) {
    email = "error with status " + userEmailResponse.status;
  } else {
    email = (await userEmailResponse.json()).email;
  }

  return (
    <div>
      <div>
        <p className={styles.description}>
          userId: {session.getUserId()}
          email: {email}
          Access token: {session.getAccessToken()}
        </p>
      </div>
      <SignOut/>
    </div>
  );
}