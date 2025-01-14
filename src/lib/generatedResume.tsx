import { JSX } from "react";
import Resume from "./resume"

export type GeneratedResumeProps = {
  resume: Resume
}

type GeneratedResume = (props: GeneratedResumeProps) => JSX.Element;

export type { GeneratedResume };
