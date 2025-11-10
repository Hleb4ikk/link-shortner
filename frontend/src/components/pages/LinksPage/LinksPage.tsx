import styles from './LinksPage.module.css';

import CreateLinkAlert from '../../features/links/CreateLinkAlert/CreateLinkAlert';
import { useEffect, useState } from 'react';

import LinkCard from '../../features/links/LinkCard/LinkCard';
import LinksSectionContentSkeleton from '../../skeletons/LinksSectionContentSkeleton/LinksSectionSkeleton';
import {
  decrement,
  fetchLinks,
  increment,
  setCurrentPage,
} from '../../../app/storage/slices/linksSlice';
import { AppDispatch, RootState } from '../../../app/storage/storage';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../shared/Search/Search';
import Pagination from '../../shared/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

export default function LinksPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { pages, totalPages, currentPage, isLoading } = useSelector(
    (state: RootState) => state.links,
  );
  const [linksSearch, setLinksSearch] = useState<string | undefined>(undefined);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const rawSearch = searchParams.get('search')?.trim();
    const rawPage = Number(searchParams.get('page')?.trim());
    const page = !rawPage || isNaN(rawPage) ? 1 : rawPage;

    if (rawSearch !== linksSearch) {
      dispatch(fetchLinks({ currentPage: 1, searchQuery: rawSearch }));
      dispatch(setCurrentPage(1));
      setLinksSearch(rawSearch);
    } else {
      dispatch(fetchLinks({ currentPage: page, searchQuery: rawSearch }));
      dispatch(setCurrentPage(page));
    }
  }, [searchParams]);

  const pageContent = pages[currentPage];

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
          {!isLoading &&
            pageContent &&
            pageContent.map((link, index) => (
              <LinkCard link={link} key={index} />
            ))}
          {isLoading && <LinksSectionContentSkeleton />}
        </section>
        <section className={`${styles.section} ${styles.paginationSection} `}>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            increment={increment}
            decrement={decrement}
          />
        </section>
      </div>
    </>
  );
}
