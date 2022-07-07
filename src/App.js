import React, { Suspense } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import LoadingSpinner from './ui/LoadingSpinner';
import Registration from './components/auth/Registration';
import Auth from './components/auth/Auth';
import Logout from './components/auth/Logout';
import ChildrenCategories from './pages/ChildrenCategories';

const Categories = React.lazy(() => import('./pages/Categories'));
const Accounts = React.lazy(() => import('./pages/Accounts'));
const NotFound = React.lazy(() => import('./components/notFound/NotFound'));
const Login = React.lazy(() => import('./components/auth/Login'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className='centered'><LoadingSpinner /></div>}>
        <Routes>
          <Route path='/' element={<Navigate replace to='home' />} />
          <Route path='/home' element={<Home />} />
          <Route element={<Auth />}>
            <Route path='/categories' element={<Categories />} />
            <Route path='/children-categories/:id' element={<ChildrenCategories />} />
            <Route path='/accounts' element={<Accounts />} />
            <Route path='/logout' element={<Logout />} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
