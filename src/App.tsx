import { useEffect, useState } from 'react';
import './App.css'
import type { Sound } from './lib/sound';
import { fetchSounds } from './lib/fetchData';
import { getSessCounterNumber } from './lib/cache';
import { VolumeIcon } from './components/VolumeIcon';
import { SoundBtn } from './components/SoundBtn';

const soundAPI = import.meta.env.VITE_SOUND_API;

function App() {
    const [buttons, setButtons] = useState<Sound[]>([]);
    const [counter, setCounter] = useState(getSessCounterNumber());
    const [volume, setVolume] = useState(0.5);
    const [showVolume, setShowVolume] = useState(false);
    useEffect(() => {
        fetchSounds(soundAPI).then((data) => {
            if (data) {
                setButtons(data);
            }
        });
    }, []);

    return (
        <main className='flex flex-col justify-center items-center'>
            <div className='pb-3'>
                <h1>Soundboard</h1>
                <h2 className='pt-3 pb-3'>Counter: {counter}</h2>
            </div >
            <div className='flex flex-wrap w-2/3'>
                {buttons.map(((button) =>
                    <SoundBtn
                        title={button.name}
                        audioSrc={button.url}
                        volume={volume}
                        soundAPI={soundAPI}
                        globalSetCounter={setCounter}
                        globalCounter={counter}
                        key={button.url}
                    />
                ))}
            </div>
            <div className='fixed right-10 bottom-10 min-w-28'>
                <div className={`flex justify-center volume-slider relative items-center ${showVolume ? "" : "hidden"}`}>
                    <label className='absolute right-20'>{volume * 100}</label>
                    <input aria-orientation='vertical' type="range" id="volume" step="0.1" name="volume" min="0" max="1" onChange={(e) => {
                        setVolume(parseFloat(e.target.value));
                    }} />
                </div>
                <button onClick={() => { setShowVolume(!showVolume) }} className='mt-3 min-w-9 text-center'>
                    <VolumeIcon volume={volume} style="text-3xl text-center" />
                </button>
            </div>
        </main>
    )
}

export default App
