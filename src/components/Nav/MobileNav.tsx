import getUser from "@/lib/auth/getUser";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default async function MobileNav() {
  const user = await getUser();
  return (
    <nav className="flex flex-col md:hidden">
      <div className="dropdown">
        <button type="button" className="btn btn-ghost btn-circle">
          <Bars3Icon className="h-6 w-6" />
        </button>
        <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <a href="/" className="no-underline">Configure Resume</a>
          </li>
          <li>
            <a href="/profile" className="no-underline">Modify Profile</a>
          </li>
          { user ?
          <li>
            <a className="no-underline" href="/signout">Signout</a>
          </li>
          :
          <>
            <li>
              <a className="no-underline" href="/login">Login</a>
            </li>
            <li>
              <a className="no-underline" href="/signup">Sign Up</a>
            </li>
          </>
        }
        </ul>
      </div>
    </nav>
  );
}
