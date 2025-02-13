import { GeneratedResume } from "../generatedResume";
import Resume, { TogglableCompany } from "@/lib/resume";
import { Document, Page, renderToStream, StyleSheet, Text, View, Link } from "@react-pdf/renderer";
import { Education, Profile, Work } from "@/lib/jsonResume";
import Togglable from "../togglable";
import { UL } from "../reactPDFUtils";

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row'
  },
  page: {
    flexDirection: 'column',
    fontFamily: 'Times-Roman',
    padding: 32,
    fontSize: 12
  },
  title: {
    textAlign: 'center',
    fontSize: 16
  },
  basics: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  work: {
  },
  divider: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    borderBottomStyle: 'solid'
  },
  sectionLabel: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Times-Bold'
  },
  subsectionLabel: {
    fontSize: 13,
    fontFamily: 'Times-Bold'
  },
  spaceEvenly: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  subsubheader: {
    fontSize: 13,
    fontFamily: 'Times-Italic',
    marginTop: 4,
    display: 'flex',
    alignItems: 'center'
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  }
});

const HR = () => {
  return <View style={styles.divider}></View>
}

const SectionLabel = (props: { sectionName: string }) => {
  return <>
    <HR />
    <Text style={styles.sectionLabel} >{props.sectionName}</Text>
  </>
}

const reformatDate = (datestr: string | undefined) => {
  if (!datestr)
    return '';
  const [year, month] = datestr.split('-');
  const abbreviatedYear = parseInt(year) % 100;
  return `${month}/${abbreviatedYear}`
}

const RoleComponent = (props: { highlights: Togglable<string>[], title: string, work: Work }) => {
  const { highlights, title, work } = props;
  const { startDate, endDate } = work;

  const usedHighlights = highlights.filter((hl) => hl.isOn).map((hl) => hl.val)

  return <View>
    <Text style={styles.subsubheader}>{title} ({reformatDate(startDate)} - {reformatDate(endDate)})</Text>
    <UL items={usedHighlights} />
  </View>
}

const WorkComponent = (props: { company: TogglableCompany }) => {
  const { company } = props;
  const roles = (company.children || []).filter((child) => child.isOn)
  return <View>
    <View style={styles.spaceEvenly}>
      <Text style={styles.subsectionLabel}>{company.title}</Text>
      {roles.map((togglableRole, roleIdx) => {
        return <RoleComponent key={`Company ${company} ROLE ${roleIdx}`}
          // @ts-expect-error ignoring for now
          highlights={togglableRole.children || []}
          // @ts-expect-error ignoring for now
          title={togglableRole.title} work={togglableRole.val} />
      })}
    </View>
  </View>
}

const EducationComponent = (props: { school: Education }) => {
  const { school } = props;
  return <View>
    <Text style={styles.subsubheader}>{school.institution} ({reformatDate(school.startDate)} - {reformatDate(school.endDate)})</Text>
    <Text>{school.studyType} of {school.area}</Text>
  </View>
}

const ProjectComponent = (props: { proj: Togglable<string[], string> }) => {
  const { proj } = props;
  const highlights = (proj.children || []).filter((togglable) => togglable.isOn).map((togglable) => togglable.val);

  return <View>
    <Text style={styles.subsubheader}>{proj.title}</Text>
    <UL items={highlights} />
  </View>
}

const ResumeComponent = (props: { resume: Resume }) => {
  const { resume } = props;

  const profiles: Profile[] = (resume.profiles.isOn ? (resume.profiles.children || []) : []).filter((togglableProfile) => {
    return togglableProfile.isOn
  }).map((togglableProfile) => togglableProfile.val);

  const workExperience = (resume.workExperience.isOn) ? ((resume.workExperience.children || []).filter((company) => company.isOn)) : []

  const education = (resume.education.isOn) ? (resume.education.children || []).filter((school) => school.isOn).map((togglableSchool) => togglableSchool.val) : []

  const personalProjects = (resume.personalProjects.isOn) ? (resume.personalProjects.children || []).filter((proj) => proj.isOn) : [];

  const skills = ((resume.skills.isOn) ? resume.skills.children || [] : []).filter((skill) => {
    return skill.isOn
  });

  return <Document>
    <Page style={styles.page} size='A4'>
      <View>
        <Text style={styles.title}>{resume.name}</Text>
        {resume.title.isOn && <Text style={styles.label}>{resume.title.val}</Text>}

        {/* Basics */}
        <View style={styles.basics} >
          {/* Location */}
          {(resume.location && resume.location.isOn) ? <Text>
            {resume.location.val?.city} {resume.location.val?.region} {resume.location.val?.countryCode}
          </Text> : undefined}

          {/* Contact info */}
          {resume.phone.isOn && resume.phone.val && <Text>{resume.phone.val}</Text>}
          {resume.email.isOn && resume.email.val && <Text>{resume.email.val}</Text>}

          {profiles.map((profile, idx) => {
            return <Link key={`profile-${idx}`} src={profile.url}>{profile.network}</Link>
          })}
        </View>

        {/* Work */}
        {workExperience && <> <SectionLabel sectionName="Work Experience" /><View>
          {workExperience.map((togglableCompany, companyIdx) => {
            return <View key={`company-${companyIdx}`} style={{ marginTop: 12 }}>
              {/* @ts-expect-error ignoring for now, going to migrate to a LaTex system in the future */}
              <WorkComponent company={togglableCompany} />
            </View>
          })}
        </View></>}

        {/* Education */}
        {resume.education && <SectionLabel sectionName='Education' />}
        {education.map((school, idx) => {
          return <EducationComponent school={school} key={`school-${idx}`} />
        })}

        {/* Personal Projects */}
        {resume.personalProjects.isOn && <SectionLabel sectionName='Personal Projects' />}
        {personalProjects.map((proj, idx) => {
          // @ts-expect-error "ignoring for now"
          return <ProjectComponent proj={proj} key={`proj-${idx}`} />
        })}

        {/* Skills */}
        <SectionLabel sectionName="Skills" />
        <View><Text>{skills.map((togglableSkill) => togglableSkill.val.name).join(', ')}</Text></View>
      </View>
    </Page>

  </Document>
}

const defaultTemplate: GeneratedResume = async (resume: Resume) => {
  return await renderToStream(<ResumeComponent resume={resume} />)
};

export default defaultTemplate;
