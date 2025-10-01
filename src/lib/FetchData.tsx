import type { Sound } from "./Sound";

export async function fetchSounds(): Promise<Sound[] | null> {
    const data = await fetch(soundAPI);
    if (data.ok) {
        return data.json();
    }
    return null;
}

export const soundAPI = "https://materialy.jakub.dev/soundboard-api/";
