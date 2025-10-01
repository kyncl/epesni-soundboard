import { useEffect, useState } from 'react';
import './App.css'
import { fetchSounds } from './lib/FetchData';
import { SoundBtn, VolumeIcon } from './components/Sound';
import type { Sound } from './lib/Sound';


function App() {
    const [buttons, setButtons] = useState<Sound[]>([]);
    const [counter, setCounter] = useState(parseInt(sessionStorage.getItem("counter") ?? "0", 10));
    const [volume, setVolume] = useState(0.5);
    const [showVolume, setShowVolume] = useState(false);
    useEffect(() => {
        fetchSounds().then((data) => {
            if (data) {
                const buttons = data.map((button, idx) => (
                    {
                        ...button,
                        id: idx
                    }
                ));
                setButtons(buttons);
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
                    <div className='m-1' onClick={() => {
                        setCounter(counter + 1);
                        sessionStorage.setItem("counter", (counter + 1).toString());
                    }} key={button.id} >
                        <SoundBtn title={button.name} audioSrc={button.url} volume={volume} />
                    </div>
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
