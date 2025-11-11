import styles from './PopUpMessage.module.css';

import { createPortal } from 'react-dom';
import { Message } from '../Message/Message';

export default function PopUpMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {createPortal(
        <Message className={styles.popup}>{children}</Message>,
        document.body,
      )}
    </>
  );
}
