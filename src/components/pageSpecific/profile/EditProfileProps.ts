/**
 * Standard props to use for each section of modifying a profile
*/
import Resume from '@/lib/jsonResume'

interface EditProfileProps {
    resume: Resume
    dispatchResume: (newResume: Resume) => void
}

export default EditProfileProps
