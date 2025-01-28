import PositionComponent from '@/components/templates/components/default/Position';
import CompanyExperience from "@/lib/companyExperience";
import Togglable from '@/lib/togglable';
import type { Work } from '@/lib/jsonResume';

export default function WorkComponent(props: { company: Togglable<CompanyExperience> }) {
  const { company } = props;
  const work: Togglable<Work, string>[] = (company.children || []).filter(togglableRole => togglableRole.isOn);

  return <div>
    <div className='flex justify-between'>
      <h3 className='font-semibold'>{company.companyName}</h3>
      <span className='italic'>{company.skills?.join(',')}</span>
    </div>
    {work.map((position: Work, idx: number) => {
      return <PositionComponent work={position} key={`position-${idx}`} />
    })}
  </div>
}
