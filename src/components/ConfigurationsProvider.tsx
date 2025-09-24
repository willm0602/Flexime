'use client';

import type { Configuration } from '@/lib/types/configuration';
import { createContext } from 'react';

type ConfigurationsContextValue = {
    configs: Configuration[];
    setConfigs: (configs: Configuration[]) => unknown;
    activeConfig: Configuration | undefined;
    setActiveConfig: ((config: Configuration) => unknown) | undefined;
};

const ConfigsContext = createContext<ConfigurationsContextValue>({
    configs: [],
    setConfigs: () => {
        console.error('Unimplemented for setting configs');
    },
    activeConfig: undefined,
    setActiveConfig: undefined,
});

export default ConfigsContext;
