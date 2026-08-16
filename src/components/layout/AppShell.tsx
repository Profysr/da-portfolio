import { Outlet } from "react-router-dom";
import { Layout } from "./Layout";

/* ------------------------------------------------------------------ */
/*  AppShell — route wrapper that mounts chrome once for all routes   */
/*                                                                     */
/*  In App.tsx:                                                        */
/*    <Route element={<AppShell />}>          ← chrome renders here   */
/*      <Route path="/" element={<HomePage />} />   ← via <Outlet />  */
/*    </Route>                                                         */
/* ------------------------------------------------------------------ */
export function AppShell() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
