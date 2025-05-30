import type { Configuration } from '@/lib/types/configuration';
import { ref } from 'pdfkit';
import {createContext, type RefObject} from 'react';

type Modal = RefObject<HTMLDialogElement | null> | null;

interface ConfigrationModalsContextValue {
    configuration: Configuration | undefined,
    setConfiguration: (configuration: Configuration) => void,
    previewModal: Modal,
    configureModal: Modal
}

const ConfigrationModalsContext = createContext<ConfigrationModalsContextValue>({
    configuration: undefined,
    setConfiguration: () => {},
    previewModal: null,
    configureModal: null
});

export default ConfigrationModalsContext;