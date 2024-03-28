import { UserInformation } from "./components/userInformation";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <UserInformation/>
    </main>
  );
}
