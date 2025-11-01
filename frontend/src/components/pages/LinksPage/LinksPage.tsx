import { Search } from 'lucide-react';
import styles from './LinksPage.module.css';
import Input from '../../shared/Input/Input';

import CreateLinkAlert from '../../features/links/CreateLinkAlert/CreateLinkAlert';
import { useEffect, useState } from 'react';
import { ApiData } from '../../../types/ApiData';
import { GetLinksResponse } from '../../features/links/types/LinksResponse';
import { getUserLinks } from '../../features/links/api';
import LinkCard from '../../features/links/LinkCard/LinkCard';
import LinksSectionContentSkeleton from '../../skeletons/LinksSectionContentSkeleton/LinksSectionSkeleton';

export default function LinksPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [messageData, setMessageData] =
    useState<ApiData<GetLinksResponse> | null>(null);
  useEffect(() => {
    async function fetchLinks() {
      setMessageData(await getUserLinks());
      setIsLoading(false);
    }
    fetchLinks();
  }, []);

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
          <CreateLinkAlert />
        </section>
        <section className={`${styles.section} ${styles.searchSection}`}>
          <div className={`${styles.searchContainer}`}>
            <Input placeholder="Search links..." className={styles.search} />
            <Search className={styles.searchIcon} />
          </div>
        </section>

        <section className={`${styles.section} ${styles.linksSection}`}>
          {messageData?.successFetch &&
            !('statusCode' in messageData.fetchData) &&
            messageData.fetchData.links.map((link, index) => (
              <LinkCard link={link} key={index} />
            ))}
          {isLoading && <LinksSectionContentSkeleton />}
        </section>
      </div>
    </>
  );
}
