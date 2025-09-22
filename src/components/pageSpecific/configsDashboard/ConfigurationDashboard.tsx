import type { Configuration } from '@/lib/types/configuration';
import ConfigRow from './ConfigRow';
import { useState } from 'react';

interface ConfigurationDashboardProps {
    configurations: Configuration[];
}

export default function ConfigDashboard({
    configurations,
}: ConfigurationDashboardProps) {
    const [currConfigurations, setConfigurations] = useState(configurations);
    return (
        <table className='table table-zebra max-w-2/3 mx-auto'>
            <thead>
                <tr>
                    <th />
                    <th />
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {configurations.map((config, idx) => (
                    <ConfigRow
                        config={config}
                        key={config.id}
                        idx={idx}
                        configurations={currConfigurations}
                        setConfigurations={setConfigurations}
                    />
                ))}
            </tbody>
        </table>
    );
}
