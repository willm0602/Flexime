import type { Work } from './jsonResume';

export default interface CompanyExperience {
    companyName: string;
    positions: Work[];
}
