import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useGetCallerUserProfile';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Studies from './pages/Studies';
import Work from './pages/Work';
import Habits from './pages/Habits';
import Goals from './pages/Goals';
import ProfileSetup from './components/ProfileSetup';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Landing,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const studiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/studies',
  component: Studies,
});

const workRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/work',
  component: Work,
});

const habitsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/habits',
  component: Habits,
});

const goalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/goals',
  component: Goals,
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  dashboardRoute,
  studiesRoute,
  workRoute,
  habitsRoute,
  goalsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <>
      <RouterProvider router={router} />
      {showProfileSetup && <ProfileSetup />}
    </>
  );
}
