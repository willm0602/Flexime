const NotFound = () => {
    return (
        <div className='w-screen p-0 md:p-20'>
            <h1 className='text-xl md:text-5xl'>Page Not Found</h1>
            <a className='btn btn-primary no-underline md:w-40' href='/'>
                Return Home
            </a>
        </div>
    );
};

export default NotFound;
