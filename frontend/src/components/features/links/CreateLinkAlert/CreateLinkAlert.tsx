import styles from './CreateLinkAlert.module.css';

import {
  AlertRoot,
  AlertHeader,
  AlertContent,
} from '../../../shared/Alert/Alert';

import PrimaryButton from '../../../shared/Button/PrimaryButton';

import CreateLinkForm from '../CreateLinkForm/CreateLinkForm';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CreateLinkAlert() {
  const [triggerText, setTriggerText] = useState('Create Short Link');

  function chooseTextVariant() {
    if (window.innerWidth >= 640) {
      setTriggerText('Create Short Link');
    } else {
      setTriggerText('Create');
    }
  }
  useEffect(() => {
    chooseTextVariant();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', chooseTextVariant);
    return () => {
      window.removeEventListener('resize', chooseTextVariant);
    };
  }, []);

  return (
    <AlertRoot
      alertTrigger={
        <PrimaryButton className={`${styles.createLinkButton}`}>
          <Plus className={styles.plus} />
          <span>{triggerText}</span>
        </PrimaryButton>
      }
    >
      <AlertHeader>
        <h1 className={styles.formHeader}>Create Short Link</h1>
        <p className={styles.formDescription}>
          Enter the URL you want to shorten and give it a title
        </p>
      </AlertHeader>
      <AlertContent className={styles.alertContent}>
        <CreateLinkForm />
      </AlertContent>
    </AlertRoot>
  );
}
