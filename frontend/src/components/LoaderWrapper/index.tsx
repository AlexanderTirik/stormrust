import React, { FunctionComponent } from 'react';

import styles from './styles.module.scss';

interface IProps {
    loading: boolean;
    transparent?: boolean;
}

export const LoaderWrapper: FunctionComponent<IProps> = ({ loading, transparent, children }) => (
  loading
    ? (
      <>
        {transparent ? children : null}
        <div className={styles.loader}>
          Loading...
        </div>
      </>
    ) : (
      <>
        {children}
      </>
    )
);
