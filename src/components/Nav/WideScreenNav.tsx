import NavLeft from './NavLeft';
import NavRight from './NavRight';

export default function WideScreenNav() {
    return (
        <nav className='hidden md:flex justify-between items-center px-4 p-1 bg-base-200 text-white sticky top-0'>
            <NavLeft />
            <NavRight />
        </nav>
    );
}
