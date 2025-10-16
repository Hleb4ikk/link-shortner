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
import {
  AlertRoot,
  AlertFooter,
  AlertContent,
  AlertHeader,
} from '../../shared/Alert/Alert';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../shared/Card/Card';
import Label from '../../shared/Label/Label';
import PrimaryButton from '../../shared/Button/PrimaryButton';
import Form from '../../shared/Form/Form';

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
          <AlertRoot
            alertTrigger={
              <PrimaryButton className={`${styles.createLinkButton}`}>
                <Plus className={styles.plus} />
                Create Short Link
              </PrimaryButton>
            }
          >
            <AlertHeader>
              <h1 className={styles.formHeader}>Create Short Link</h1>
              <p className={styles.formDescription}>
                Enter the URL you want to shorten and give it a title
              </p>
            </AlertHeader>

            <AlertContent>
              <Form>
                <Label htmlFor="title">Original Link</Label>
                <Input
                  placeholder="https://example.com/long-url"
                  className={styles.formField}
                  id="title"
                />
                <Label htmlFor="url">Title</Label>
                <Input
                  placeholder="My Campaign Link"
                  className={styles.formField}
                  id="url"
                ></Input>
              </Form>
            </AlertContent>
            <AlertFooter>
              <PrimaryButton className={styles.submitButton}>
                Create Link
              </PrimaryButton>
            </AlertFooter>
          </AlertRoot>
        </section>
        <section className={`${styles.section} ${styles.searchSection}`}>
          <div className={`${styles.searchContainer}`}>
            <Input placeholder="Search links..." className={styles.search} />
            <Search className={styles.searchIcon} />
          </div>
        </section>

        <section className={`${styles.section} ${styles.linksSection}`}>
          <Card>
            <CardHeader>Marketing Campaign 2024</CardHeader>
            <CardContent>
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
            </CardContent>
            <CardFooter>
              <div className={styles.actions}>
                <div className={styles.clicksContainer}>
                  <h2>1234</h2>
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
                <Button className={styles.actionButton}>
                  <Trash className={styles.actionIcon} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </section>
      </div>
    </>
  );
}
