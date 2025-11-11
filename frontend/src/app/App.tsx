import { Provider } from 'react-redux';
import './App.css';
import store from './storage/storage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import HomePage from '../components/pages/HomePage/HomePage';
import LinksPage from '../components/pages/LinksPage/LinksPage';
import UserProvider from '../components/features/user/UserProvider';
import { User } from '../components/features/user/user';
import { useEffect, useState } from 'react';
import { getMe } from '../components/features/user/api';
import PrivatePage from '../components/features/permission/PrivatePage';
import ErrorPage from '../components/pages/ErrorPage/ErrorPage';
import LinksDetailsPage from '../components/pages/LinkDetailsPage/LinkDetailsPage';

const routes = [
  { path: '/', element: <HomePage /> },
  {
    path: '/links',
    element: (
      <PrivatePage>
        <LinksPage />
      </PrivatePage>
    ),
  },
  { path: '/links/:id', element: <LinksDetailsPage /> },
  {
    path: '*',
    element: (
      <ErrorPage
        statusCode={404}
        description={
          <>
            Page <span className="notFoundPathName">{location.pathname}</span>
            was't found.
          </>
        }
      />
    ),
  },
];

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const responseData = await getMe();

        if (!('statusCode' in responseData)) {
          setUser(responseData);
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <Provider store={store}>
      <UserProvider initialValue={user} isLoading={isLoading}>
        <div className="App">
          <BrowserRouter>
            <AppLayout>
              <Routes>
                {routes.map(({ path, element }, index) => (
                  <Route key={index} path={path} element={element} />
                ))}
              </Routes>
            </AppLayout>
          </BrowserRouter>
        </div>
      </UserProvider>
    </Provider>
  );
}

export default App;
