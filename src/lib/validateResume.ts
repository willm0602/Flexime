function resumeHasValidBasics(resume: any) {
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

export default function resumeIsValid(resume: any) {
    if (!resumeHasValidBasics(resume)) return false
    return true
}
