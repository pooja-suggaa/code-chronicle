/* In this server side component, we try to fetch session information using getSSRSession and if the user has a session we render the user id (we wll change this later). If the user does not have a session but a token exists we try to refresh the session, if no token exists then we redirect the user to the /auth route */
/*
The reason it's considered a server-side component is because it's executed on the server-side during the initial render of the page
*/
import { getSSRSession } from '../sessionUtils';
import { TryRefreshComponent } from './tryRefreshClientComponent';
// import styles from '../../styles/Home.module.css';
import { redirect } from 'next/navigation'

export async function UserInformation() {
  const { session, hasToken } = await getSSRSession();

  if (!session) {
    if (!hasToken) {
      redirect('/auth');
    }
    return <TryRefreshComponent />;
  }

  return (
    // <p className={styles.description}>
    <p>
      userId: {session.getUserId()}
      Access token: {session.getAccessToken()}
    </p>
  );
}