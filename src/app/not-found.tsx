import Link from "next/link";

const NotFound = () => {
    return (
        <div className='w-screen p-0 md:p-20'>
            <h1 className='text-xl md:text-5xl'>Page Not Found</h1>
            <Link className='btn btn-primary no-underline md:w-40' href='/'>
                Return Home
            </Link>
        </div>
    );
};

export default NotFound;
