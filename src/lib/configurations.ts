import type { User } from '@supabase/supabase-js';
import type { Configuration } from './types/configuration';
import { createClient } from './supabase/client';

const LSKey = 'resume-configurations';

function getConfigurationsFromLS(): Configuration[] {
    const unparsed = window.localStorage.getItem(LSKey);
    if (!unparsed) return [];
    return JSON.parse(unparsed);
}

export async function getSavedConfigurationsForUser(
    user: User | undefined | null,
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
