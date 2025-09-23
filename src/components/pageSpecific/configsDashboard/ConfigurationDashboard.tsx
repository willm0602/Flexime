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
        <div className='overflow-x-auto mx-auto'>
            <table className='table table-zebra'>
                <thead>
                    <tr>
                        <th />
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
        </div>
    );
}
