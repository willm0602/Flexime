import type { GeneratedResume } from '../generatedResume';
import type Resume from '@/lib/jsonResume';
import {
    Document,
    Page,
    renderToStream,
    StyleSheet,
    Text,
    View,
    Link,
} from '@react-pdf/renderer';
import type { Education, Profile, Project, Work } from '@/lib/jsonResume';
import { UL } from '../reactPDFUtils';

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
    smallLabel: {
        fontSize: 10,
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
});

const HR = () => {
    return <View style={styles.divider}></View>;
};

const SectionLabel = (props: { sectionName: string }) => {
    return (
        <>
            <HR />
            <Text style={styles.sectionLabel}>{props.sectionName}</Text>
        </>
    );
};

const reformatDate = (datestr: string | undefined) => {
    if (!datestr) return '';
    const [year, month] = datestr.split('-');
    const abbreviatedYear = Number.parseInt(year) % 100;
    return `${month}/${abbreviatedYear}`;
};

const RoleComponent = (props: { role: Work; highlights: string[] }) => {
    const { highlights, role } = props;

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
    );
};

const EducationComponent = (props: { school: Education }) => {
    const { school } = props;
    return (
        <View>
            <Text style={styles.subsubheader}>
                {school.institution} ({reformatDate(school.startDate)} -{' '}
                {reformatDate(school.endDate)})
            </Text>
            <Text>
                {school.studyType} in {school.area}
            </Text>
        </View>
    );
};

const ProjectComponent = (props: {
    proj: Project;
    highlights: React.ReactNode[];
}) => {
    const { proj, highlights } = props;

    if (proj.repository) {
        highlights.push(
            <View>
                <Text>
                    Source code available{' '}
                    <Link href={proj.repository}>here</Link>
                </Text>
            </View>,
        );
    }

    if (proj.url) {
        highlights.push(
            <View>
                <Text>
                    Project available <Link href={proj.url}>here</Link>
                </Text>
            </View>,
        );
    }
    return (
        <View>
            <Text style={styles.subsubheader}>{proj.name}</Text>
            <UL items={highlights} />
        </View>
    );
};

const ResumeComponent = (props: { resume: Resume }) => {
    const { resume } = props;

    const profiles: Profile[] = resume.basics.profiles;

    const workExperience = resume.work || [];

    const education = resume.education || [];

    return (
        <Document>
            <Page style={styles.page} size='A4'>
                <View>
                    <Text style={styles.title}>{resume.basics.name}</Text>
                    <Text style={styles.smallLabel}>
                        {resume.basics.summary}
                    </Text>
                    <Text style={styles.smallLabel}>{resume.basics.label}</Text>

                    {/* Basics */}
                    <View style={styles.basics}>
                        {/* Location */}
                        {resume.basics.location && (
                            <Text>
                                {resume.basics.location.city}
                                {', '}
                                {resume.basics.location.region} (
                                {resume.basics.location.countryCode})
                            </Text>
                        )}

                        {/* Contact info */}
                        {resume.basics.phone && (
                            <Text>{resume.basics.phone}</Text>
                        )}
                        {resume.basics.email && (
                            <Text>{resume.basics.email}</Text>
                        )}

                        {profiles.map((profile, idx) => {
                            return (
                                <Link key={`profile-${idx}`} href={profile.url}>
                                    {profile.network}
                                </Link>
                            );
                        })}
                    </View>

                    {/* Work */}
                    {workExperience.length && (
                        <>
                            <SectionLabel sectionName='Work Experience' />
                            <View>
                                {workExperience.map((role: Work, idx) => {
                                    try {
                                        return (
                                            <RoleComponent
                                                key={`idx-${idx}`}
                                                role={role}
                                                highlights={role.highlights}
                                            />
                                        );
                                    } catch {
                                        return <></>;
                                    }
                                })}
                            </View>
                        </>
                    )}

                    {/* Education */}
                    {resume.education?.length && (
                        <SectionLabel sectionName='Education' />
                    )}
                    {education.map((school, idx) => {
                        return (
                            <EducationComponent
                                school={school}
                                key={`school-${idx}`}
                            />
                        );
                    })}

                    {/* Personal Projects */}
                    {resume.projects?.length && (
                        <SectionLabel sectionName='Personal Projects' />
                    )}
                    {(resume.projects || []).map((proj, idx) => {
                        return (
                            <ProjectComponent
                                proj={proj}
                                highlights={proj.highlights}
                                key={`proj-${idx}`}
                            />
                        );
                    })}

                    {/* Skills */}
                    {resume.skills?.length && (
                        <SectionLabel sectionName='Skills' />
                    )}
                    <View>
                        <Text>
                            {resume.skills &&
                                resume.skills
                                    .map(
                                        (togglableSkill) => togglableSkill.name,
                                    )
                                    .join(', ')}
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

const defaultTemplate: GeneratedResume = async (resume: Resume) => {
    return await renderToStream(<ResumeComponent resume={resume} />);
};

export default defaultTemplate;
