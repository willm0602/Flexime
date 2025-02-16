import { LatexBuilder } from "../generatedLatexResume";
import LatexResume from "../generatedLatexResume";
import Resume from "../resume";

const latexBuilder: LatexBuilder = (resume: Resume) => {
  return `
%------------------------------
Sample Resume Template
Author: Will Migdol
%------------------------------

\\documentclass{article}
\\usepackage{graphicx} % Required for inserting images

\\title{Sample Resume 1}
\\author{Will Migdol}
\\date{February 2025}

\\begin{document}

\\maketitle

\\section{Introduction}

\\end{document}
`
}

const latexResume = LatexResume(latexBuilder);

export default latexResume;
