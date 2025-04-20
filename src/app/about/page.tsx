const HR = () => {
    return <hr className='my-4' />;
};

export default function AboutPage() {
    return (
        <div className='flex px-8 py-12 max-w-7xl mx-auto gap-12'>
            <div className='w-48 sticky top-4 self-start hidden md:block'>
                <h2 className='text-lg font-semibold mb-2 mt-0'>FAQ</h2>
                <ul className='list-disc pl-5'>
                    <li>
                        <a
                            href='#whatisthis'
                            className='hover:underline no-underline'
                        >
                            What is this?
                        </a>
                    </li>
                    <li>
                        <a
                            href='#howtouse'
                            className='hover:underline no-underline'
                        >
                            How do I use this?
                        </a>
                    </li>
                    <li>
                        <a
                            href='#howtoload'
                            className='hover:underline no-underline'
                        >
                            How do I load in a resume?
                        </a>
                    </li>
                    <li>
                        <a
                            href='#signin'
                            className='hover:underline no-underline'
                        >
                            How do I sign in?
                        </a>
                    </li>
                    <li>
                        <a
                            href='#whyjobtitle'
                            className='hover:underline no-underline'
                        >
                            Why can I modify the job title on the configure
                            page?
                        </a>
                    </li>
                    <li>
                        <a
                            href='#atscompliance'
                            className='hover:underline no-underline'
                        >
                            Is this ATS compliant?
                        </a>
                    </li>
                    <li>
                        <a
                            href='#howsaved'
                            className='hover:underline no-underline'
                        >
                            How are resumes saved if I'm not signed in?
                        </a>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className='flex-1 prose'>
                <h1>About Flexime</h1>
                <HR />
                <h2 className='text-lg my-1' id='whatisthis'>
                    What is this?
                </h2>
                <p>
                    Flexime is a resume generator designed to allow users to
                    tailor resumes to certain job positions.
                </p>
                <HR />
                <h2 className='my-1 text-lg' id='howtouse'>
                    How do I use this?
                </h2>
                <p>
                    To start, you can create a sign-in using the signup button
                    in the top navigation bar. (NOTE: this step is optional, but
                    you can do this to use the same resume information on
                    multiple devices).
                </p>
                <p>
                    You can then go to "Modify Profile" from the topbar (or
                    click on the edit icon on the homepage) and modify your
                    profile. Here is where you can input any information you may
                    want to include in your resume.
                </p>
                <p>
                    Once you are done modifying your profile, you can go back to
                    the homepage and click on the "Configure Resume" button.
                    Here, you can select which information you want to include
                    in your resume.
                </p>
                <p>
                    Once you are done configuring your resume, you can fill out
                    a file name for the resume, click on the "Download Resume"
                    button to download your resume in PDF format. You may also
                    click on the refresh button to update the preview as you
                    turn different parts of the resume on and off.
                </p>
                <HR />
                <h2 className='my-1 text-lg' id='howtoload'>
                    How do I load a resume?
                </h2>
                <p>
                    You can load a resume by clicking on the "Load Resume"
                    button. This will allow you to select a{' '}
                    <a
                        href='https://jsonresume.org/'
                        target='_blank'
                        rel='noreferrer'
                    >
                        JSON Resume
                    </a>{' '}
                    , docx or pdf file from your computer. Once you select the
                    file, it will file and automatically load the resume and
                    refresh the page.
                </p>
                <p>
                    NOTE: The resume JSON file must be in the correct format. If
                    it is not, you will see an error message.
                </p>
                <HR />
                <h2 className='my-1 text-lg' id='signin'>
                    How do I sign in?
                </h2>
                <p>
                    You can sign in by clicking on the "Login" button in the top
                    navigation bar. This will take you to a login page where you
                    can enter your email and password.
                </p>
                <p>
                    If you don't have an account, you can click on the "Sign Up"
                    button to create an account.
                </p>
                <HR />
                <h2 className='my-1 text-lg' id='whyjobtitle'>
                    Why am I able to modify the job title on the configure page?
                </h2>
                <p>
                    The job title is a placeholder for the job you are applying
                    for. You can modify it to match the job you are applying
                    for. This will help you tailor your resume to the job you
                    are applying for. This doesn't save to your profile so it
                    will only apply for the current configuration.
                </p>
                <HR />
                <h2 className='my-1 text-lg' id='atscompliance'>
                    Is this ATS compliant?
                </h2>
                <p>
                    Flexime is designed to be ATS compliant, but some parts of
                    ATS compliance are not based on the format of the resume,
                    but rather the contents. We encourage you to use an ATS
                    checker such as{' '}
                    <a
                        href='https://www.careerwhiz.ai/'
                        target='_blank'
                        rel='noreferrer'
                    >
                        Career Whiz.
                    </a>
                </p>
                <HR />
                <h2 className='my-1 text-lg' id='howsaved'>
                    How is my resume saved if I'm not signed in?
                </h2>
                <p>
                    Your resume is saved in your browser's local storage. This
                    means that if you clear your browser's cookies or switch to
                    a different browser, your resume will be lost.
                </p>
                <p>
                    Because of this, we recommend frequently downloading your
                    profile as Resume JSON in the event that something goes
                    wrong and you lose your resume.
                </p>
            </div>
        </div>
    );
}
