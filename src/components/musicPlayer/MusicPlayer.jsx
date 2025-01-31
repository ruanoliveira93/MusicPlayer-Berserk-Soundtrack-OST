import Draggable from "react-draggable";
import { useEffect, useRef, useState } from "react";
import Sound01 from "../../assets/sound/Berserk OST - 01 Behelit.mp3";
import Sound02 from "../../assets/sound/Berserk OST - 02 Ghosts.mp3";
import Sound03 from "../../assets/sound/Berserk OST - 03 Ball.mp3";
import Sound04 from "../../assets/sound/Berserk OST - 04 Guts.mp3";
import Sound05 from "../../assets/sound/Berserk OST - 05 Murder.mp3";
import Sound06 from "../../assets/sound/Berserk OST - 06 Fear.mp3";
import Sound07 from "../../assets/sound/Berserk OST - 07 Monster.mp3";
import Sound08 from "../../assets/sound/Berserk OST - 08 Earth.mp3";
import Sound09 from "../../assets/sound/Berserk OST - 09 Forces.mp3";
import Sound10 from "../../assets/sound/Berserk OST - 10 Tell my why (Opening theme TV Size).mp3";
import Sound11 from "../../assets/sound/Berserk OST - 11 Waiting so long (Ending theme TV Size).mp3";
import AlbumCapa from "../../assets/img/BerserkCapaSoundTrack.jpg";
import s from "./musicPlayer.module.scss";

export default function MusicPlayer() {
    const soundtrack = [
        { id: 1, title: "01 Behelit", album: "Berserk OST", type: "soundtrack", genre: "Anime", sound: Sound01 },
        { id: 2, title: "02 Ghost", album: "Berserk OST", type: "soundtrack", genre: "Anime", sound: Sound02 },
        { id: 3, title: "03 Ball", album: "Berserk OST", type: "soundtrack", genre: "Anime", sound: Sound03 },
        { id: 4, title: "04 Guts", album: "Berserk OST", type: "soundtrack", genre: "Anime", sound: Sound04 },
        { id: 5, title: "05 Murder", album: "Berserk OST", type: "soundtrack", genre: "Anime", sound: Sound05 },
        { id: 6, title: "06 Fear", album: "Berserk OST", type: "soundtrack", genre: "Anime", sound: Sound06 },
        { id: 7, title: "07 Monster", album: "Berserk OST", type: "soundtrack", genre: "Anime", sound: Sound07 },
        { id: 8, title: "08 Earth", album: "Berserk OST", type: "soundtrack", genre: "Anime", sound: Sound08 },
        { id: 9, title: "09 Forces", album: "Berserk OST", type: "soundtrack", genre: "Anime", sound: Sound09 },
        { id: 10, title: "10 Tell my why (Opening theme TV Size)", album: "Berserk OST", type: "soundtrack", genre: "Anime", sound: Sound10 },
        { id: 11, title: "11 Waiting so long (Ending theme TV Size)", album: "Berserk OST", type: "soundtrack", genre: "Anime", sound: Sound11 },
    ];

    const [music, setMusic] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
        }

        audioRef.current = new Audio(soundtrack[music].sound);
        audioRef.current.volume = 0.5;

        audioRef.current.addEventListener("loadedmetadata", () => {
            setDuration(audioRef.current.duration);
            if (isPlaying) {
                audioRef.current.play().catch(() => console.log("Autoplay bloqueado, o usuário precisa interagir."));
            }
        });

        audioRef.current.addEventListener("timeupdate", () => {
            setCurrentTime(audioRef.current.currentTime);
        });

        audioRef.current.addEventListener("ended", () => {
            handleNextButton();
        });

        return () => {
            audioRef.current.pause();
            audioRef.current.src = "";
        };
    }, [music]);

    const PlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
            scrollRef.current.style.animationPlayState = "paused";
        } else {
            audioRef.current.play().catch(() => console.log("Autoplay bloqueado, o usuário precisa interagir."));
            scrollRef.current?.classList.add(s.scroller);
            scrollRef.current.style.animationPlayState = "running";
        }
        setIsPlaying(!isPlaying);
    };

    const handleNextButton = () => {
        setMusic((prev) => (prev + 1) % soundtrack.length);
    };

    const handleBackButton = () => {
        setMusic((prev) => (prev - 1 + soundtrack.length) % soundtrack.length);
    };

    const handleSeek = (e) => {
        const newTime = Number(e.target.value);
        if (!isNaN(newTime)) {
            setCurrentTime(newTime);
            audioRef.current.currentTime = newTime;
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <Draggable handle=".drag-handle">
            <section className={s.container}>
                <img src={AlbumCapa} alt="Album Capa" />
                <section className={`${s.title} drag-handle`}>
                    <span ref={scrollRef} aria-label="Music title">
                        {"🎵 " + soundtrack[music].album + " - " + soundtrack[music].title + " 🎵"}
                    </span>
                </section>

                <section className={s.album}>
                    <span>Album: {soundtrack[music].album}</span>
                    <span>Type: {soundtrack[music].type}</span>
                    <span>Genre: {soundtrack[music].genre}</span>
                </section>

                <section className={s.progressContainer}>
                    <section className={s.progressTime}>
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </section>
                    <input className={s.progressBar} type="range" min={0} max={duration} value={currentTime} onChange={handleSeek} onMouseDown={(e) => e.stopPropagation()} />
                </section>

                <section className={s.buttonContainer}>
                    <button onClick={handleBackButton} type="button" aria-label="Return Music">
                        <i className="fa-solid fa-backward-step"></i>
                    </button>
                    <button onClick={PlayPause} type="button" aria-label="Play or Pause">
                        {isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
                    </button>
                    <button onClick={handleNextButton} type="button" aria-label="Next Music">
                        <i className="fa-solid fa-forward-step"></i>
                    </button>
                </section>
            </section>
        </Draggable>
    );
}

