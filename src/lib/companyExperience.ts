import { Work } from "./jsonResume"
import { Skill } from "./jsonResume"

export default interface CompanyExperience {
    companyName: string,
    positions: Work[]
}
