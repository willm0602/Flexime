import type CompanyExperience from './companyExperience';
import type { Work } from './jsonResume';

export default function getCompaniesFromWork(
    work: Work[] | undefined,
): CompanyExperience[] {
    const companyNames: Record<string, Work[]> = {};
    (work || []).forEach((position: Work) => {
        const companyName: string = position.name;
        const existingRoles: Work[] = companyNames[companyName] || [];
        const newRoles = [...existingRoles, position];
        companyNames[companyName] = newRoles;
    });
    const companies = Object.entries(companyNames).map(
        ([companyName, roles]) => {
            const company: CompanyExperience = {
                companyName,
                positions: roles,
            };

            return company;
        },
    );

    return companies;
}
