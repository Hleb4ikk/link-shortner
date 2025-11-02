import styles from './LinksPage.module.css';

import CreateLinkAlert from '../../features/links/CreateLinkAlert/CreateLinkAlert';
import { useEffect } from 'react';

import LinkCard from '../../features/links/LinkCard/LinkCard';
import LinksSectionContentSkeleton from '../../skeletons/LinksSectionContentSkeleton/LinksSectionSkeleton';
import { fetchLinks } from '../../../app/storage/slices/linksSlice';
import { AppDispatch, RootState } from '../../../app/storage/storage';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../shared/Search/Search';

export default function LinksPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useSelector((state: RootState) => state.links);

  useEffect(() => {
    dispatch(fetchLinks());
  }, [dispatch]);

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
          <Search placeholder="Search links..." />
        </section>

        <section className={`${styles.section} ${styles.linksSection}`}>
          {data &&
            data.map((link, index) => <LinkCard link={link} key={index} />)}
          {isLoading && <LinksSectionContentSkeleton />}
        </section>
      </div>
    </>
  );
}
