import { promises as fs } from 'fs';
import path from 'path';
import { DEFAULT_FEATURES } from './features';

export type Config = {
    features: typeof DEFAULT_FEATURES
}

const CONFIG_FILE = 'config.json';

export default async function loadConfigs(): Promise<Config> {
    const filePath = path.resolve(process.cwd(), 'config', CONFIG_FILE);

    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const config = JSON.parse(fileContent) as Config;
        return config;
    } catch (e) {
        console.log(`[loadConfigs] Error loading config file: ${e}, return HARD CODED`);
        return Promise.resolve({
            features: {
                ...DEFAULT_FEATURES
            }
        })
    }
}