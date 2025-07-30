// biome-ignore lint/style/useImportType: required for testing
import React from 'react';
import {
    renderToStream,
    View,
    Document,
    Text,
    Page,
    StyleSheet,
    Link,
} from '@react-pdf/renderer';
import type { GeneratedResume } from '../generatedResume';
import type Resume from '../jsonResume';

interface ResumeComponentProps {
    resume: Resume;
}

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Courier',
        padding: 40,
    },
    bold: {
        fontFamily: 'Courier-Bold',
    },
    name: {
        fontSize: 30,
    },
    title: {
        fontSize: 13,
    },
    links: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: 10,
        flexWrap: 'wrap',
        marginTop: 12,
    },
    link: {
        textDecoration: 'none',
    },
    linkBarrier: {
        marginLeft: 4,
        marginRight: 4,
    },
    header: {
        marginTop: 8,
        fontSize: 20,
        fontFamily: 'Courier-Bold',
    },
    summary: {
        fontSize: 10,
    },
    role: {
        marginBottom: 8,
    },
    position: {
        fontSize: 14,
    },
    hl: {
        fontSize: 10,
    },
    institution: {
        fontSize: 14,
    },
    degree: {
        fontSize: 10,
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
    },
    projLink: {
        marginRight: 24,
        fontSize: 10,
        textDecoration: 'none',
    },
    skills: {
        fontSize: 10,
    },
    spacingX: {
        marginRight: 10,
        marginLeft: 10,
    },
});

function ContactInfo(props: ResumeComponentProps) {
    const { resume } = props;
    const { basics } = resume;
    const { phone, email, location, profiles } = basics;

    type LinkData = {
        text: string;
        href?: string;
    };

    const links: LinkData[] = [];

    if (phone) {
        links.push({
            text: phone,
        });
    }

    if (email) {
        links.push({
            text: email,
            href: `mailto:${email}`,
        });
    }

    if (location) {
        links.push({
            text: `${location.city}, ${location.region} (${location.countryCode})`,
        });
    }

    const LinkOrSpan = ({ link, idx }: { link: LinkData; idx: number }) => {
        return (
            <>
                {link.href ? (
                    <Link href={link.href} style={styles.link}>
                        {link.text}
                    </Link>
                ) : (
                    <Text>{link.text}</Text>
                )}
                {idx < links.length - 1 ? (
                    <Text style={styles.spacingX}>|</Text>
                ) : (
                    <></>
                )}
            </>
        );
    };

    (profiles || []).map((profile) => {
        links.push({
            text: profile.network,
            href: profile.url,
        });
    });

    return (
        <View style={styles.links}>
            {links.map((link, idx) => {
                return (
                    <LinkOrSpan
                        link={link}
                        idx={idx}
                        key={`link-or-span-${link.text}`}
                    />
                );
            })}
        </View>
    );
}

function SummarySection(props: ResumeComponentProps) {
    const { resume } = props;

    if (!resume.basics.summary) {
        return;
    }

    return (
        <ResumeSection name='Personal Summary'>
            <Text style={styles.summary}>{resume.basics.summary}</Text>
        </ResumeSection>
    );
}

function AllWorkSection(props: ResumeComponentProps) {
    const { resume } = props;
    if (!resume.work || resume.work.length === 0) return;
    return (
        <ResumeSection name='Work Experience'>
            {resume.work.map((role) => {
                return (
                    <View
                        style={styles.role}
                        key={`role-${role.name}-${role.position}`}
                    >
                        <Text style={styles.position}>
                            {role.name} ({role.position})
                        </Text>
                        {(role.highlights || []).map((hl) => {
                            return (
                                <Text style={styles.hl} key={`highlight-${hl}`}>
                                    - {hl}
                                </Text>
                            );
                        })}
                    </View>
                );
            })}
        </ResumeSection>
    );
}

function AllEducationSection(props: ResumeComponentProps) {
    const { resume } = props;
    if (!resume.education || resume.education.length === 0) return;
    return (
        <ResumeSection name='Education'>
            {resume.education.map((education, idx) => {
                return (
                    <View
                        style={styles.role}
                        key={`${education.institution} ${education.area} ${education.studyType}`}
                    >
                        <Text style={styles.institution}>
                            {education.institution}
                        </Text>
                        <Text style={styles.degree}>
                            {education.studyType} in {education.area}
                        </Text>
                    </View>
                );
            })}
        </ResumeSection>
    );
}

function AllProjectsSection(props: ResumeComponentProps) {
    const { resume } = props;
    if (!resume.projects || resume.projects.length === 0) return;
    return (
        <ResumeSection name='Personal Projects'>
            {resume.projects.map((proj, idx) => {
                return (
                    <View style={styles.role} key={`proj-${proj.name}`}>
                        <Text style={styles.position}>{proj.name}</Text>
                        <View style={styles.flex}>
                            {proj.url && (
                                <Link href={proj.url} style={styles.projLink}>
                                    Project Available Here
                                </Link>
                            )}
                            {proj.repository && (
                                <Link
                                    href={proj.repository}
                                    style={styles.projLink}
                                >
                                    Source Code Available Here
                                </Link>
                            )}
                        </View>
                        {(proj.highlights || []).map((hl, hlidx) => {
                            return (
                                <Text key={`hl-${hl}`} style={styles.hl}>
                                    - {hl}
                                </Text>
                            );
                        })}
                    </View>
                );
            })}
        </ResumeSection>
    );
}

function SkillsSection(props: ResumeComponentProps) {
    const { resume } = props;
    const { skills } = resume;
    if (!skills || skills.length === 0) return;
    const skillNames = skills.map((skill) => skill.name);

    return (
        <ResumeSection name='Skills'>
            <Text style={styles.skills}>{skillNames.join(', ')}</Text>
        </ResumeSection>
    );
}

function ResumeSection(props: { name: string; children?: React.ReactNode }) {
    const { name, children } = props;
    return (
        <>
            <Text style={styles.header}>{name}</Text>
            {children}
        </>
    );
}

function ResumeComponent(props: ResumeComponentProps) {
    const { resume } = props;
    return (
        <Document>
            <Page style={[styles.page]} size='A4'>
                <Text style={[styles.bold, styles.name]}>
                    {resume.basics.name}
                </Text>
                <Text style={[styles.title]}>{resume.basics.label}</Text>
                <ContactInfo resume={resume} />
                <SummarySection resume={resume} />
                <AllWorkSection resume={resume} />
                <AllEducationSection resume={resume} />
                <AllProjectsSection resume={resume} />
                <SkillsSection resume={resume} />
            </Page>
        </Document>
    );
}

const boldClassic: GeneratedResume = async (resume: Resume) => {
    return await renderToStream(<ResumeComponent resume={resume} />);
};

export default boldClassic;
