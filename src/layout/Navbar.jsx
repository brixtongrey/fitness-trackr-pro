import { useAuth } from "../auth/AuthContext";
import { NavLink } from "react-router";

const navClass = ({ isActive }) => "link" + (isActive ? " active" : "");

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <NavLink to="/activities" className={navClass}>
          Activities
        </NavLink>

      <NavLink to="/routines" className={navClass}>
      Routines
      </NavLink>

        {token ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <>
            <NavLink to="/register" className={navClass}>
              Register
            </NavLink>
            <NavLink to="/login" className={navClass}>
              Login
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
