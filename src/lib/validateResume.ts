import Resume from './jsonResume'

function resumeHasValidBasics(resume: Resume) {
    // all resumes need to have some of the basics fields filled out
    if (!resume.basics) {
        return false
    }

    if (!resume.basics.name) {
        return false
    }

    if (!resume.basics.email) {
        return false
    }

    if (!resume.basics.phone) {
        return false
    }
    return true
}

export default function resumeIsValid(resume: Resume) {
    if (!resumeHasValidBasics(resume)) return false
    return true
}
