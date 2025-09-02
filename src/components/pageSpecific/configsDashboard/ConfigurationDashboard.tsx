import type { Configuration } from '@/lib/types/configuration';
import ConfigRow from './ConfigRow';

interface ConfigurationDashboardProps {
    configurations: Configuration[];
}

export default function ConfigDashboard({
    configurations,
}: ConfigurationDashboardProps) {
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
                        configurations={configurations}
                    />
                ))}
            </tbody>
        </table>
    );
}
