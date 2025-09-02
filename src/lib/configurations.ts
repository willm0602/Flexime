import type { User } from '@supabase/supabase-js';
import type { Configuration } from './types/configuration';
import { createClient } from './supabase/client';
import type Resume from './resume';
import getUser from './auth/getUser';

const LSKey = 'resume-configurations';

function getConfigurationsFromLS(): Configuration[] {
    const unparsed = window.localStorage.getItem(LSKey);
    if (!unparsed) return [];
    return JSON.parse(unparsed);
}

export async function getSavedConfigurationsForUser(
    user: User | undefined | null = undefined,
): Promise<Configuration[]> {
    if (!user) return getConfigurationsFromLS();
    const supabase = createClient();
    if (!supabase) return getConfigurationsFromLS();
    const { data, error } = await supabase
        .from('configuration')
        .select('*')
        .eq('user_id', user.id);
    if (error) {
        console.error(error);
        return getConfigurationsFromLS();
    }
    return data || [];
}

export function setConfigurationsToLS(configurations: Configuration[]) {
    window.localStorage.setItem(LSKey, JSON.stringify(configurations));
}

export async function addConfigurationToSupabase(
    configuration: Configuration,
): Promise<string | undefined> {
    const supabase = createClient();
    if (!supabase) return;
    const { data, error } = await supabase.from('configuration').insert([
        {
            user_id: configuration.user_id,
            resume: configuration.resume,
            name: configuration.name,
        },
    ]);
    if (error) {
        console.error(error);
        return error.message;
    }
    return undefined;
}

export async function addConfigurationToLS(configuration: Configuration) {
    const unparsedConfigs = window.localStorage.getItem(LSKey);
    const configurations = unparsedConfigs ? JSON.parse(unparsedConfigs) : [];
    configurations.push(configuration);
    setConfigurationsToLS(configurations);
}

export async function overwriteConfig(
    newConfig: Resume,
    configIdx: number,
    configID: number,
    configurations: Configuration[],
): Promise<Configuration[]> {
    const user = await getUser();
    if (user) {
        await overwriteConfigInSupabase(newConfig, configID);
        return {
            ...configurations,
            [configIdx]: {
                ...configurations[configIdx],
                resume: newConfig,
            },
        };
    }
    return overwriteConfigInLS(configurations, configIdx, newConfig);
}

async function overwriteConfigInSupabase(newConfig: Resume, id: number) {
    const client = createClient();
    if (!client) {
        return;
    }
    await client
        .from('configuration')
        .update({ resume: newConfig })
        .eq('id', id);
}

function overwriteConfigInLS(
    configurations: Configuration[],
    configIDX: number,
    resume: Resume,
) {
    const newConfigurations = [...configurations];
    newConfigurations[configIDX].resume = resume;
    window.localStorage.setItem(
        'resume-configurations',
        JSON.stringify(newConfigurations),
    );
    return newConfigurations;
}
