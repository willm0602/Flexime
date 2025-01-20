import PositionComponent from '@/components/templates/components/default/Position';
import CompanyExperience from "@/lib/companyExperience";

export default function WorkComponent(props: { company: CompanyExperience }) {
  const { company } = props;
  const work = company.positions || [];
  console.log(company);

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
