import Pagination from '../../shared/Pagination/Pagination';
import styles from './LinkDetailsPage.module.css';

import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/storage/storage';
import { useEffect } from 'react';
import {
  decrement,
  getLinksDetails,
  increment,
  setCurrentPage,
} from '../../../app/storage/slices/linksDetailsSlice';
import SecondaryButton from '../../shared/Button/SecondaryButton';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteLink } from '../../../app/storage/slices/linksSlice';
import ErrorPage from '../ErrorPage/ErrorPage';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableData,
  TableHeader,
} from '../../shared/Table/Table';

export default function LinksDetailsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { pages, fetchError, currentPage, totalPages } = useSelector(
    (state: RootState) => state.linksDetails,
  );

  const params = useParams();
  const [searchParams] = useSearchParams();

  const linkId = params.id as string;

  useEffect(() => {
    const rawPage = Number(searchParams.get('page')?.trim());
    const page = !rawPage || isNaN(rawPage) ? 1 : rawPage;

    dispatch(getLinksDetails({ linkId, currentPage: page }));
    dispatch(setCurrentPage(page));
  }, [searchParams]);

  const pageContent = pages[currentPage];

  if (fetchError) {
    const isServerError = typeof fetchError === 'object';

    return (
      <ErrorPage
        statusCode={isServerError ? fetchError.statusCode : undefined}
        description={
          <>
            {isServerError
              ? fetchError.description || fetchError.message
              : fetchError}
          </>
        }
      />
    );
  }

  return (
    <>
      <div className={styles.managementSectionContainer}>
        <section className={`${styles.section} ${styles.managementSection}`}>
          <div className={styles.sectionDescriptionContainer}>
            <h1 className={styles.sectionHeader}>{params.id} details</h1>
            <p className={styles.sectionDescription}>
              Manage and track all your shortened links
            </p>
          </div>
          <div className={styles.actions}>
            <SecondaryButton className={styles.action}>
              Edit <Pencil size={16} />
            </SecondaryButton>
            <SecondaryButton
              className={`${styles.action} ${styles.squareAction} ${styles.trash}`}
              onClick={() => {
                dispatch(deleteLink({ linkId }));
                navigate('/links');
              }}
            >
              <Trash2 size={20} />
            </SecondaryButton>
          </div>
        </section>

        <section className={`${styles.section} ${styles.linksDetailsSection}`}>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>IP Address</TableHeader>
                <TableHeader>Region</TableHeader>
                <TableHeader>Browser</TableHeader>
                <TableHeader>OS</TableHeader>
                <TableHeader>Date of visit</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageContent &&
                pageContent.map((audit, index) => (
                  <TableRow key={index}>
                    <TableData>{audit.ip}</TableData>
                    <TableData>{audit.region}</TableData>
                    <TableData>{audit.browser}</TableData>
                    <TableData>{audit.os}</TableData>
                    <TableData>
                      {new Date(audit.followedAt).toLocaleString()}
                    </TableData>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
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
