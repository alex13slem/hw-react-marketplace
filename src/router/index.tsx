import { createBrowserRouter } from 'react-router-dom';

import BaseLayout from '../layouts/base';

import HomePage from '../pages/home';
import ProfilePage from '../pages/profile';
import SignInPage from '../pages/signin';
import ProductPage from '../pages/product';

import loaderProduct from '../pages/product/loader';
import loaderHome from '../pages/home/loader';
import protectRoutesLoader from './protectRoutesLoader';

import actionSignOut from '../pages/profile/signout/action';
import BasketPage from '../pages/basket';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    loader: protectRoutesLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: loaderHome,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,

        children: [
          {
            path: 'signout',
            action: actionSignOut,
          },
        ],
      },
      {
        path: 'product/:id',
        element: <ProductPage />,
        loader: loaderProduct,
      },
      {
        path: 'basket',
        element: <BasketPage />,
      },
    ],
  },
]);

export default router;
