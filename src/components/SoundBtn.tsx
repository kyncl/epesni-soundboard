import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

interface SoundBtnProps {
    title: string,
    audioSrc: string,
    volume: number,
    soundAPI: string,
    globalCounter: number,
    globalSetCounter: Dispatch<SetStateAction<number>>
}

export const SoundBtn = ({
    title,
    audioSrc,
    volume,
    soundAPI,
    globalCounter,
    globalSetCounter
}: SoundBtnProps) => {
    const [counter, setCounter] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playAudio = () => {
        if (!audioRef.current)
            return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setCounter(counter + 1);

        globalSetCounter(globalCounter + 1);
        sessionStorage.setItem("counter", (globalCounter + 1).toString());
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

