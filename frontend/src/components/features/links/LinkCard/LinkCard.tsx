import styles from './LinkCard.module.css';

import { ChartColumn, Copy, SquareArrowOutUpRight, Trash } from 'lucide-react';
import Button from '../../../shared/Button/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../../shared/Card/Card';
import { Link } from '../types/Link';
import { appConfig } from '../../../../configuration/appConfig';
import { deleteLink } from '../../../../app/storage/slices/linksSlice';
import { AppDispatch } from '../../../../app/storage/storage';
import { useDispatch } from 'react-redux';

export default function LinkCard({ link }: { link: Link }) {
  const dispatch = useDispatch<AppDispatch>();

  const shortLinkUrl = `${appConfig.serverUrl}/links/${link.shortLinkId}`;

  return (
    <Card>
      <CardHeader>{link.title || 'Untitled'}</CardHeader>
      <CardContent>
        <div className={styles.linkInfoContainer}>
          <span className={styles.shortLink}>{shortLinkUrl}</span>
          <Button
            onClick={() => {
              window.navigator.clipboard.writeText(shortLinkUrl);
            }}
            className={styles.copyButton}
          >
            <Copy style={{ color: 'var(--text-color-2)' }} />
          </Button>
        </div>
        <div className={styles.linkInfoContainer}>
          <SquareArrowOutUpRight
            style={{ width: '12px', color: 'var(--text-color-2)' }}
          />
          <a className={styles.fullUrl} href={link.url}>
            {link.url}
          </a>
        </div>
      </CardContent>
      <CardFooter>
        <div className={styles.actions}>
          <div className={styles.clicksContainer}>
            <h2>{link.audienceCount}</h2>
            <span
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-color-2)',
              }}
            >
              Clicks
            </span>
          </div>
          <Button className={styles.actionButton}>
            <ChartColumn className={styles.actionIcon} />
          </Button>
          <Button
            onClick={() => dispatch(deleteLink(link.shortLinkId))}
            className={styles.actionButton}
          >
            <Trash className={styles.actionIcon} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
