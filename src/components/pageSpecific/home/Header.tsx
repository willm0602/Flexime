import JSONResume from '@/lib/jsonResume';
import Resume, { resumeFromJSONResume } from '@/lib/resume'
import resumeIsValid from '@/lib/validateResume'
import { InformationCircleIcon } from '@heroicons/react/16/solid'
import { ChangeEventHandler } from 'react'

type HomePageHeaderProps = {
    setResume: (resume: JSONResume) => void
    setConfiguredResume: (resume: Resume) => void
}

export default function HomePageHeader(props: HomePageHeaderProps) {
    const { setResume, setConfiguredResume } = props

    // const onResumeFileLoaded: ChangeEventHandler<HTMLInputElement> = (e) => {
    //     const files = e.target.files || []
    //     if (files.length) {
    //         const file: File = files[0]
    //         file.text().then((text) => {
    //             try {
    //                 const data = JSON.parse(text)
    //                 if (resumeIsValid(data)) {
    //                     const jsonResume = data as JSONResume;
    //                     const resume = resumeFromJSONResume(jsonResume)
    //                     setResume(jsonResume)
    //                     setConfiguredResume(resume);
    //                 } else {
    //                     console.error('Resume is not valid')
    //                 }
    //             } catch (e) {
    //                 console.error(e);
    //                 window.alert('file is invalid')
    //             }
    //         })
    //     }
    // }
    //
    return (
        <>
            <h1 className="text-5xl">Flexime</h1>
        </>
    )
}
