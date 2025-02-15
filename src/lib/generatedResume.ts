import Resume from './resume'

type GeneratedResume = (resume: Resume) => Promise<NodeJS.ReadableStream>

export type { GeneratedResume }
