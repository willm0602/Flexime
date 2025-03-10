import Resume from './jsonResume'

type GeneratedResume = (resume: Resume) => Promise<NodeJS.ReadableStream>

export type { GeneratedResume }
