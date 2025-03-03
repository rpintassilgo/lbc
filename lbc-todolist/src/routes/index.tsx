import { createHashRouter, RouterProvider } from 'react-router-dom';
import Todo from '../modules/todo';
import MainLayout from '../components/main-layout';

const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
        { path: "/", element: <Todo /> }
    ]
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
