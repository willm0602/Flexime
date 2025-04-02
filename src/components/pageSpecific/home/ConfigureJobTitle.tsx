import { useContext } from 'react';
import ResumeContext from './ResumeContext';

export default function ConfigureJobTitle() {
    const { resume, setResume } = useContext(ResumeContext);

    return (
        <div className='prose mt-4'>
            <input
                className='input input-bordered'
                placeholder='Job Title'
                value={resume.title.val}
                onChange={(e) => {
                    const val = e.target.value;
                    setResume({
                        ...resume,
                        title: {
                            ...resume.title,
                            val,
                        },
                    });
                }}
            />
        </div>
    );
}
