import { useEffect, useRef, useState } from "react";
import { soundAPI } from "../lib/FetchData";
import { FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi";

export const SoundBtn = ({ title, audioSrc, volume }: { title: string, audioSrc: string, volume: number }) => {
    const [counter, setCounter] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playAudio = () => {
        if (!audioRef.current)
            return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setCounter(counter + 1);
    }

    useEffect(() => {
        if (!audioRef.current)
            return;
        audioRef.current.volume = volume;
    }, [volume]);

    return (
        <button onClick={playAudio}>
            <audio ref={audioRef} src={soundAPI + audioSrc}></audio>
            {title} - {counter}
        </button>
    )
};


export const VolumeIcon = ({ volume, style }: { volume: number, style?: string }) => {
    return (
        volume == 0 ?
            <FiVolumeX className={style} />
            : volume < 0.6 ?
                <FiVolume1 className={style} />
                :
                <FiVolume2 className={style} />
    )
}

