import getCompanySummaryFromWork from "@/lib/getCompanySummaryFromWork";
import PositionComponent from '@/components/templates/components/default/position';
import { Work } from "@/lib/resume";

export default function WorkComponent(props: { work: Work[], company: string }) {
  const { company, work } = props;

  const companySummary: string | undefined = getCompanySummaryFromWork(work);

  return <div>
    <div className='flex justify-between'>
      <h3 className='font-semibold'>{company}</h3>
      <span className='italic'>{companySummary}</span>
    </div>
    {work.map((position: Work, idx: number) => {
      return <PositionComponent work={position} key={`position-${idx}`} />
    })}
  </div>
}
