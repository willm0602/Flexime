import CompanyExperience from "./companyExperience";
import { Skill, Work } from "./jsonResume";

export default function getCompaniesFromWork(work: Work[] | undefined): CompanyExperience[] {
  const companyNames: Record<string, Work[]> = {};
  (work || []).forEach((position: Work) => {
    const companyName: string = position.name;
    const existingRoles: Work[] = companyNames[companyName] || [];
    const newRoles = [...existingRoles, position];
    companyNames[companyName] = newRoles;
  })
  const companies = Object.entries(companyNames).map(([companyName, roles]) => {
    const skills = new Set<Skill>();
    for(const role of roles){
      const roleSkills = role.summary?.split(' ') || [];
      for(const skill of roleSkills){
        skills.add({
          name: skill
        });
      }
    }
    const company: CompanyExperience = {
      companyName,
      positions: roles,
      skills: ([...skills])
    }

    return company;
  });

  return companies;
}
