import {
  ChartColumn,
  Copy,
  Plus,
  Search,
  SquareArrowOutUpRight,
  Trash,
} from 'lucide-react';
import styles from './LinksPage.module.css';
import Button from '../../shared/Button/Button';
import Input from '../../shared/Input/Input';

export default function LinksPage() {
  return (
    <>
      <div className={styles.managementSectionContainer}>
        <section className={`${styles.section} ${styles.managementSection}`}>
          <div className={styles.sectionDescriptionContainer}>
            <h1 className={styles.sectionHeader}>My Links</h1>
            <p className={styles.sectionDescription}>
              Manage and track all your shortened links
            </p>
          </div>
          <Button className={`${styles.createLinkButton}`}>
            <Plus className={styles.plus} />
            Create Short Link
          </Button>
        </section>
        <section className={`${styles.section} ${styles.searchSection}`}>
          <div className={`${styles.searchContainer}`}>
            <Input placeholder="Search links..." className={styles.search} />
            <Search className={styles.searchIcon} />
          </div>
        </section>

        <section className={`${styles.section} ${styles.linksSection}`}>
          <article className={styles.link}>
            <h1 className={styles.linkHeader}>Marketing Campaign 2024</h1>
            <div className={styles.linkInfoContainer}>
              <span className={styles.shortLink}>lnk.ly/abc123</span>
              <Button className={styles.copyButton}>
                <Copy style={{ color: 'var(--text-color-2)' }} />
              </Button>
            </div>
            <div className={styles.linkInfoContainer}>
              <SquareArrowOutUpRight
                style={{ width: '12px', color: 'var(--text-color-2)' }}
              />
              <a
                className={styles.fullUrl}
                href="https://example.com/very-long-url-that-needs-to-be-shortened"
              >
                https://example.com/very-long-url-that-needs-to-be-shortened
              </a>
            </div>
            <div className={styles.actions}>
              <div className={styles.clicksContainer}>
                <h2>1234</h2>
                <span
                  style={{ fontSize: '0.875rem', color: 'var(--text-color-2)' }}
                >
                  Clicks
                </span>
              </div>
              <Button className={styles.actionButton}>
                <ChartColumn className={styles.actionIcon} />
              </Button>
              <Button className={styles.actionButton}>
                <Trash className={styles.actionIcon} />
              </Button>
            </div>
          </article>
        </section>
      </div>
    </>
  );
}
