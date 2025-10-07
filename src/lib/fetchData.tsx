import type { Sound } from "./sound";

export async function fetchSounds(soundApi: string): Promise<Sound[] | null> {
    const data = await fetch(soundApi);
    if (data.ok) {
        return data.json();
    }
    return null;
}
