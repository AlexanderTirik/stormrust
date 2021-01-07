import React from 'react';
import { env } from '../../env';
import styles from './styles.module.sass';

const { server } = env.urls;

const App = () => (
  <div className={styles.App}>
    <header>
      <p>Storm Rust</p>
    </header>
    <a href={`${server}/api/auth/login`}>Login</a>
  </div>
);

export default App;
