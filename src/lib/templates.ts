import { GeneratedResume } from '@/lib/generatedResume'
import BoldClassic from '@/lib/templates/BoldClassic';
import DefaultTemplate from '@/lib/templates/Default'

const Templates: Record<string, GeneratedResume> = {
    DEFAULT: DefaultTemplate,
    BOLD_CLASSIC: BoldClassic
}

export default Templates
