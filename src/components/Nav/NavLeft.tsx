'use client';

import { usePathname } from 'next/navigation';
import NavLinks from './NavLinks';
import NavLink from './NavLink';

export default function NavLeft() {
    const route = usePathname();

    return (
        <div className='flex items-center'>
            <span className='text-xl font-bold mr-4'>Flexime</span>
            {NavLinks.map((link) => {
                return (
                    <NavLink key={link.route} route={link.route}>
                        <span
                            className={`btn ${link.route === route ? 'underline underline-offset-4 btn-secondary' : ''}`}
                        >
                            {link.text}
                        </span>
                    </NavLink>
                );
            })}
        </div>
    );
}
