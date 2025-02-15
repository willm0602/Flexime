import { GeneratedResume } from '../generatedResume'
import Resume, { TogglableRole } from '@/lib/resume'
import {
    Document,
    Page,
    renderToStream,
    StyleSheet,
    Text,
    View,
    Link,
} from '@react-pdf/renderer'
import { Education, Profile, Project, Work } from '@/lib/jsonResume'
import Togglable, { getIncludedVals } from '../togglable'
import { UL } from '../reactPDFUtils'
import { TogglableProject } from '../resumeConfigTypes'

const styles = StyleSheet.create({
    flex: {
        display: 'flex',
        flexDirection: 'row',
    },
    page: {
        flexDirection: 'column',
        fontFamily: 'Times-Roman',
        padding: 32,
        fontSize: 12,
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
    },
    basics: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    work: {},
    divider: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        borderBottomStyle: 'solid',
    },
    sectionLabel: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Times-Bold',
    },
    subsectionLabel: {
        fontSize: 13,
        fontFamily: 'Times-Bold',
    },
    spaceEvenly: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    subsubheader: {
        fontSize: 13,
        fontFamily: 'Times-Italic',
        marginTop: 4,
        display: 'flex',
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 4,
    },
    boldItalics: {
        fontWeight: 'heavy',
        fontFamily: 'Times-Italic',
    },
    italics: {
        fontFamily: 'Times-Italic',
    },
    bold: {
        fontFamily: 'Times-Bold',
    },
    spacingTop: {
        marginTop: 12,
    },
})

const HR = () => {
    return <View style={styles.divider}></View>
}

const SectionLabel = (props: { sectionName: string }) => {
    return (
        <>
            <HR />
            <Text style={styles.sectionLabel}>{props.sectionName}</Text>
        </>
    )
}

const reformatDate = (datestr: string | undefined) => {
    if (!datestr) return ''
    const [year, month] = datestr.split('-')
    const abbreviatedYear = parseInt(year) % 100
    return `${month}/${abbreviatedYear}`
}

const RoleComponent = (props: { role: Work; highlights: string[] }) => {
    const { highlights, role } = props

    return (
        <View style={styles.spacingTop}>
            <View>
                <Text style={styles.bold}>{role.name}</Text>
            </View>
            <View style={styles.flex}>
                <Text style={styles.italics}>
                    {role.position} ({reformatDate(role.startDate)} -{' '}
                    {reformatDate(role.endDate)})
                </Text>
            </View>
            <UL items={highlights} />
        </View>
    )
}

const EducationComponent = (props: { school: Education }) => {
    const { school } = props
    return (
        <View>
            <Text style={styles.subsubheader}>
                {school.institution} ({reformatDate(school.startDate)} -{' '}
                {reformatDate(school.endDate)})
            </Text>
            <Text>
                {school.studyType} of {school.area}
            </Text>
        </View>
    )
}

const ProjectComponent = (props: { proj: Project; highlights: string[] }) => {
    const { proj, highlights } = props

    return (
        <View>
            <Text style={styles.subsubheader}>{proj.name}</Text>
            <UL items={highlights} />
        </View>
    )
}

const ResumeComponent = (props: { resume: Resume }) => {
    const { resume } = props

    const profiles: Profile[] = (
        resume.profiles.isOn ? resume.profiles.children || [] : []
    )
        .filter((togglableProfile) => {
            return togglableProfile.isOn
        })
        .map((togglableProfile) => togglableProfile.val)

    const workExperience = resume.workExperience.isOn
        ? (resume.workExperience.children || []).filter(
              (togglableRole) => togglableRole.isOn
          )
        : []

    const education = resume.education.isOn
        ? (resume.education.children || [])
              .filter((school) => school.isOn)
              .map((togglableSchool) => togglableSchool.val)
        : []

    const personalProjects: Togglable<TogglableProject, string>[] = resume
        .personalProjects.isOn
        ? (resume.personalProjects.children || []).filter((proj) => proj.isOn)
        : []

    const skills = (
        resume.skills.isOn ? resume.skills.children || [] : []
    ).filter((skill) => {
        return skill.isOn
    })

    return (
        <Document>
            <Page style={styles.page} size="A4">
                <View>
                    <Text style={styles.title}>{resume.name}</Text>
                    {resume.title.isOn && (
                        <Text style={styles.label}>{resume.title.val}</Text>
                    )}

                    {/* Basics */}
                    <View style={styles.basics}>
                        {/* Location */}
                        {resume.location && resume.location.isOn ? (
                            <Text>
                                {resume.location.val?.city}{' '}
                                {resume.location.val?.region}{' '}
                                {resume.location.val?.countryCode}
                            </Text>
                        ) : undefined}

                        {/* Contact info */}
                        {resume.phone.isOn && resume.phone.val && (
                            <Text>{resume.phone.val}</Text>
                        )}
                        {resume.email.isOn && resume.email.val && (
                            <Text>{resume.email.val}</Text>
                        )}

                        {profiles.map((profile, idx) => {
                            return (
                                <Link key={`profile-${idx}`} src={profile.url}>
                                    {profile.network}
                                </Link>
                            )
                        })}
                    </View>

                    {/* Work */}
                    {workExperience && (
                        <>
                            <SectionLabel sectionName="Work Experience" />
                            <View>
                                {workExperience.map(
                                    (togglableRole: TogglableRole, idx) => {
                                        const role = togglableRole.val
                                        const highlights =
                                            getIncludedVals(togglableRole)
                                        return (
                                            <RoleComponent
                                                key={`idx-${idx}`}
                                                role={role}
                                                highlights={highlights}
                                            />
                                        )
                                    }
                                )}
                            </View>
                        </>
                    )}

                    {/* Education */}
                    {resume.education && (
                        <SectionLabel sectionName="Education" />
                    )}
                    {education.map((school, idx) => {
                        return (
                            <EducationComponent
                                school={school}
                                key={`school-${idx}`}
                            />
                        )
                    })}

                    {/* Personal Projects */}
                    {resume.personalProjects.isOn && (
                        <SectionLabel sectionName="Personal Projects" />
                    )}
                    {personalProjects.map((togglableProj, idx) => {
                        // @ts-expect-error: Should expect Project
                        const proj: Project = togglableProj.val
                        const highlights = (togglableProj.children || [])
                            .filter((hl) => hl.isOn)
                            .map((hl) => hl.val)
                        console.log('PROJ HERE', proj, 'HL', highlights)
                        return (
                            <ProjectComponent
                                proj={proj}
                                highlights={highlights}
                                key={`proj-${idx}`}
                            />
                        )
                    })}

                    {/* Skills */}
                    <SectionLabel sectionName="Skills" />
                    <View>
                        <Text>
                            {skills
                                .map(
                                    (togglableSkill) => togglableSkill.val.name
                                )
                                .join(', ')}
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

const defaultTemplate: GeneratedResume = async (resume: Resume) => {
    return await renderToStream(<ResumeComponent resume={resume} />)
}

export default defaultTemplate
