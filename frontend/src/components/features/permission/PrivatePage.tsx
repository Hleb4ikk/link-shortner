import { useUser } from '../../features/user/UserProvider';
import ErrorPage from '../../pages/ErrorPagePage/ErrorPage';

export default function PrivatePage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUser();

  if (!user && !isLoading) {
    return (
      <ErrorPage
        statusCode={401}
        description={'Authorize to get access to this page.'}
      />
    );
  }
  return <>{children}</>;
}
