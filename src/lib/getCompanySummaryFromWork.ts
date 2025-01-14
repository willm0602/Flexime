import { Work } from "./resume";

export default function getCompanySummaryFromWork(work: Work[]): string | undefined {
  let summary: string | undefined = undefined;
  work.forEach((position: Work) => {
    if (summary != position.summary && summary !== undefined) {
      return undefined;
    } else if (position.summary) {
      summary = position.summary;
    }
  });

  return summary;
}
