import type { Project } from "@/lib/jsonResume";

export default function ProjectComponent(
  props: { project: Project }
) {
  const { project } = props;

  return <div>
    <span className='flex w-full justify-between'>
      <h3 className='font-semibold'>{project.name}</h3>
      <span className='italic'>{project.description}</span>
    </span>
    <ul className='list-disc ml-8'>
      {(project.highlights || []).map((highlight: string, idx: number) => {
        return <li key={`highlight-${idx}`}>{highlight}</li>
      })}
    </ul>
  </div>
}
