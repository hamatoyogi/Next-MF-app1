import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Exposed from '../components/Exposed';
import add from 'lib/add';
import multiply from 'lib/multiply';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>App 1</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>App1</h1>
        <h2>
          Public path: <code>{process.env.NEXT_PUBLIC_PATH}</code>
        </h2>
        <Exposed />
        <span>Adding 1: {add(1)}</span>
        <span>Multuplying 2: {multiply(2)}</span>
      </main>
    </div>
  );
}
