import styles from './LogOutButton.module.css';

import { LogOut } from 'lucide-react';
import Button from '../../../shared/Button/Button';
import { logout } from '../api';
import { useEffect, useState } from 'react';
import { ApiData } from '../../../../types/ApiData';
import { AuthApiResponseData } from '../types';

export default function LogOutButton({ className }: { className?: string }) {
  const [messageData, setMessageData] =
    useState<ApiData<AuthApiResponseData> | null>(null);

  async function handleClick() {
    setMessageData(await logout());
  }

  useEffect(() => {
    if (messageData?.successFetch && !('statusCode' in messageData.fetchData)) {
      window.location.reload();
    }
  }, [messageData]);

  return (
    <Button onClick={handleClick} className={`${styles.logout} ${className}`}>
      <LogOut size={16} />
      Log Out
    </Button>
  );
}
