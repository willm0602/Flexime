import { Education } from "@/lib/resume";

export default function EducationComponent(props: {
  school: Education
}) {
  const { school } = props;

  const formatDate = (jsonResumeDate: string | undefined) => {
    if (!jsonResumeDate)
      return '';
    const [year, month] = jsonResumeDate.split('-');
    return `${month}/${year}`;
  }

  return <div className='mb-4'>
    <h3 className='w-full font-semibold'>{school.institution} <span className='font-normal'>({formatDate(school.startDate)}) - ({formatDate(school.endDate)})</span></h3>
    <span>{school.studyType} of {school.area}</span>
  </div>
}
