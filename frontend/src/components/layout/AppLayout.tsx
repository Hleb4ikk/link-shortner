import Header from './Header/Header';
import Main from './Main/Main';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
