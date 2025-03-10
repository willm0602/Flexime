import { GeneratedResume } from '@/lib/generatedResume'
import BoldClassic from '@/lib/templates/BoldClassic';
import DefaultTemplate from '@/lib/templates/Default'

const Templates: Record<string, GeneratedResume> = {
    DEFAULT: DefaultTemplate,
    BOLD_CLASSIC: BoldClassic
}

type Template = keyof typeof Templates;

const TemplateNames: Record<Template, string> = {
    DEFAULT: 'Default',
    BOLD_CLASSIC: 'Bold Clasic'
}

export default Templates
export { TemplateNames }
