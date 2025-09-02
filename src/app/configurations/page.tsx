'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import ConfigDashboard from '@/components/pageSpecific/configsDashboard/ConfigurationDashboard';
import getUser from '@/lib/auth/getUser';
import { getSavedConfigurationsForUser } from '@/lib/configurations';
import type { Configuration } from '@/lib/types/configuration';
import { useEffect, useState } from 'react';

/**
 * Page to allow users to manage any configurations
 * they have made
 */

export default function ConfigurationsDashboardPage() {
    const [configurations, setConfigurations] = useState<
        Configuration[] | undefined
    >();

    useEffect(() => {
        getUser().then((user) => {
            getSavedConfigurationsForUser(user).then((configs) => {
                setConfigurations(configs);
            });
        });
    }, []);

    if (configurations === undefined) {
        return <LoadingSpinner />;
    }
    return <ConfigDashboard configurations={configurations} />;
}
