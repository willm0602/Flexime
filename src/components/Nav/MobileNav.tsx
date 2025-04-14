import getUser from "@/lib/auth/getUser";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";

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
            <Link href="/" className="no-underline">Configure Resume</Link>
          </li>
          <li>
            <Link href="/profile" className="no-underline">Modify Profile</Link>
          </li>
          <li>
            <Link href="/about" className="no-underline">About</Link>
          </li>
          { user ?
          <li>
            <Link className="no-underline" href="/signout">Signout</Link>
          </li>
          :
          <>
            <li>
              <Link className="no-underline" href="/login">Login</Link>
            </li>
            <li>
              <Link className="no-underline" href="/signup">Sign Up</Link>
            </li>
          </>
        }
        </ul>
      </div>
    </nav>
  );
}
