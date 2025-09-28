// import { usePage } from "./layout/PageContext";

import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import Error404 from "./Error404.jsx";
import { Route } from "react-router";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/" element={<ActivitiesPage />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
    </>
  )
}
