import { FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi"

export const VolumeIcon = ({ volume, style }: { volume: number, style?: string }) => {
    if (volume === 0) {
        return (<FiVolumeX className={style} />)
    }
    else if (volume < 0.6) {
        return (<FiVolume1 className={style} />)
    }
    return (<FiVolume2 className={style} />)
}

