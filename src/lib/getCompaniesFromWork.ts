import { Work } from "./resume";

export default function getCompaniesFromWork(work: Work[]): Record<string, Work[]> {
  const companies: Record<string, Work[]> = {};
  work.forEach((position: Work) => {
    const companyName: string = position.name;
    const existingRoles: Work[] = companies[companyName] || [];
    const newRoles = [...existingRoles, position];
    companies[companyName] = newRoles;
  })
  return companies;
}
