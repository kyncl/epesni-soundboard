export async function fetchSounds() {
    const data = await fetch(soundAPI);
    if (data.ok) {
        return data.json();
    }
}

export const soundAPI = "https://materialy.jakub.dev/soundboard-api/";
