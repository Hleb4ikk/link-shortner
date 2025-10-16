import styles from './HomePage.module.css';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import {
  ArrowRight,
  ChartColumn,
  Link2,
  QrCode,
  Shield,
  Users,
  Zap,
} from 'lucide-react';
import PrimaryButton from '../../shared/Button/PrimaryButton';

export default function HomePage() {
  return (
    <>
      <div className={styles.shortenSectionContainer}>
        <section className={`${styles.section} ${styles.shortenSection}`}>
          <h1 className={styles.slogan}>
            Shorten Links,{' '}
            <span className={styles.sloganSecondPart}>Amplify Results</span>
          </h1>
          <p className={styles.sloganDescription}>
            Create short, memorable links in seconds. Track clicks, analyze
            traffic, and share links effortlessly.
          </p>
          <div className={styles.shortenContainer}>
            <Input
              className={styles.shortenInput}
              placeholder="Input your long url here..."
            />
            <PrimaryButton className={styles.shortenButton}>
              Shorten now <ArrowRight />
            </PrimaryButton>
          </div>
          <div className={styles.boastingContainer}>
            <div className={styles.boasting}>
              <Link2 style={{ color: 'var(--primary-color)' }} />
              <span style={{ marginLeft: '10px' }}>500K+ links shortened</span>
            </div>
            <span className={styles.boasting}>No credit card required</span>
          </div>
        </section>
      </div>
      <div className={styles.infoSectionContainer}>
        <section className={`${styles.section} ${styles.infoSection}`}>
          <div className={styles.infoSectionDescription}>
            <h1 className={styles.sectionHeader}>
              Everything You Need to Manage Links
            </h1>
            <p className={styles.sectionDescription}>
              Powerful features designed to help you create, track, and optimize
              your shortened links.
            </p>
          </div>
          <div className={styles.featuresContainer}>
            <article className={styles.feature}>
              <div className={styles.featureIconContainer}>
                <Link2 className={styles.featureIcon} />
              </div>
              <h2 className={styles.featureHeader}>Custom Short Links</h2>
              <p className={styles.featureDescription}>
                Create branded, memorable short links that reflect your identity
                and build trust with your audience.
              </p>
            </article>
            <article className={styles.feature}>
              <div className={styles.featureIconContainer}>
                <ChartColumn className={styles.featureIcon} />
              </div>
              <h2 className={styles.featureHeader}>Advanced Analytics</h2>
              <p className={styles.featureDescription}>
                Track clicks, geographic data, device types, and referral
                sources with detailed analytics dashboards.
              </p>
            </article>
            <article className={styles.feature}>
              <div className={styles.featureIconContainer}>
                <Shield className={styles.featureIcon} />
              </div>
              <h2 className={styles.featureHeader}>Secure & Reliable</h2>
              <p className={styles.featureDescription}>
                Enterprise-grade security with SSL encryption, link expiration,
                and password protection options.
              </p>
            </article>
            <article className={styles.feature}>
              <div className={styles.featureIconContainer}>
                <Zap className={styles.featureIcon} />
              </div>
              <h2 className={styles.featureHeader}>Lightning Fast</h2>
              <p className={styles.featureDescription}>
                Instant link generation and redirection with 99.9% uptime
                guaranteed for uninterrupted service.
              </p>
            </article>
            <article className={styles.feature}>
              <div className={styles.featureIconContainer}>
                <QrCode className={styles.featureIcon} />
              </div>
              <h2 className={styles.featureHeader}>QR Code Generation</h2>
              <p className={styles.featureDescription}>
                Automatically generate QR codes for every short link, perfect
                for print materials and offline marketing.
              </p>
            </article>
            <article className={styles.feature}>
              <div className={styles.featureIconContainer}>
                <Users className={styles.featureIcon} />
              </div>
              <h2 className={styles.featureHeader}>Team Collaboration</h2>
              <p className={styles.featureDescription}>
                Share links across your team, manage permissions, and
                collaborate on campaigns effortlessly.
              </p>
            </article>
          </div>
        </section>
      </div>
      <div className={styles.statisticsSectionContainer}>
        <section className={`${styles.section} ${styles.statisticsSection}`}>
          <div className={styles.dataBlock}>
            <h1 className={styles.dataBlockHeader}>500K+</h1>
            <p className={styles.dataBlockDescription}>Links Created</p>
          </div>
          <div className={styles.dataBlock}>
            <h1 className={styles.dataBlockHeader}>10M+</h1>
            <p className={styles.dataBlockDescription}>Clicks Tracked</p>
          </div>
          <div className={styles.dataBlock}>
            <h1 className={styles.dataBlockHeader}>50K+</h1>
            <p className={styles.dataBlockDescription}>Active Users</p>
          </div>
          <div className={styles.dataBlock}>
            <h1 className={styles.dataBlockHeader}>99.9%</h1>
            <p className={styles.dataBlockDescription}>Uptime</p>
          </div>
        </section>
      </div>
      <div className={styles.finalSectionContainer}>
        <section className={`${styles.section} ${styles.finalSection}`}>
          <h1 className={styles.finalSectionHeader}>
            Ready to Shorten Your Links?
          </h1>
          <p className={styles.finalSectionDescription}>
            Join thousands of users who trust Linkly for their link management
            needs. Start for free today.
          </p>
          <div className={styles.buttonsContainer}>
            <PrimaryButton className={styles.startButton}>
              Get Started Free <ArrowRight />
            </PrimaryButton>
            <Button className={styles.pricingButton}>View Pricing</Button>
          </div>
          <div className={styles.boastingContainer}>
            <span style={{ marginLeft: '10px' }} className={styles.boasting}>
              No credit card required
            </span>
            <span className={styles.boasting}>Free forever plan available</span>
          </div>
        </section>
      </div>
      {/* <Card></Card> */}

      {/* <Search></Search>
      <Alert></Alert>
      <Message></Message> */}
    </>
  );
}
