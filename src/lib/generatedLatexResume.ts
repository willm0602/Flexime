import type { GeneratedResume } from './generatedResume';
import Resume from './resume';
import latex from 'node-latex';

export type LatexBuilder = (resume: Resume) => string

const LatexResume = (latexBuilder: LatexBuilder) => {
  const generatedResume: GeneratedResume = async (resume: Resume) => {
    const latexContent: string = latexBuilder(resume);
    const stream = latex(latexContent);
    return Promise.resolve(stream);
  }
  return generatedResume;
};

export default LatexResume;
