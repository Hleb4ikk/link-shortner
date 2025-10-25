import { Provider } from 'react-redux';
import './App.css';
import store from './storage/storage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import HomePage from '../components/pages/HomePage/HomePage';
import LinksPage from '../components/pages/LinksPage/LinksPage';
import AudiencePage from '../components/pages/AudiencePage/AudiencePage';
import NotFoundPage from '../components/pages/NotFoundPage/NotFoundPage';
import UserProvider, { User } from '../components/features/user/UserProvider';
import { useEffect, useState } from 'react';
import { getMe } from '../components/features/user/api';

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/links', element: <LinksPage /> },
  { path: '/links/:id', element: <AudiencePage /> },
  { path: '*', element: <NotFoundPage /> },
];

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getMe();
      setUser(user);
    }
    fetchUser();
  }, []);

  return (
    <Provider store={store}>
      <UserProvider initialValue={user}>
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
