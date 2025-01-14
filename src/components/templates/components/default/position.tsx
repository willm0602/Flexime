import { Work } from '@/lib/resume';

export default function PositionComponent(props: { work: Work }) {
  const { work } = props;

  const reformatDate = (date: string | undefined) => {
    if (!date)
      return ''
    const [year, month] = date.split('-');
    const yearSuffix = parseInt(year) % 100;

    return `${month}/${yearSuffix}`
  }

  const startDate = reformatDate(work.startDate);
  const endDate = reformatDate(work.endDate);


  return <div>
    <h4 className='mt-2'>{work.position} ({startDate} - {endDate})</h4>
    <ul className='list-disc ml-8'>
      {work.highlights.map((highlight, idx) => {
        return <li key={`highlight-${idx}`}>{highlight}</li>
      })}
    </ul>
  </div>
}
