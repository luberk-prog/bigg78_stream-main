import { useNavigate } from 'react-router-dom'
import YouTubeImage from './YouTubeImage'

export default function LandingVideoCard({ video }) {
  const navigate = useNavigate()

  if (!video) return null

  const videoId = video.id || video.youtubeId

  const handleClick = () => {
    navigate(`/watch/${videoId}`)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Watch ${video.title}`}
      className="group block w-[250px] shrink-0 text-left sm:w-[280px]"
    >
      <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-red-500/40 group-hover:shadow-[0_24px_60px_rgba(239,68,68,0.14)]">
        <div className="aspect-video overflow-hidden">
          <YouTubeImage
            videoId={videoId}
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90" />

        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-300">
            {video.duration && <span>{video.duration}</span>}
            {video.views && <span>{video.views}</span>}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-200 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/95 text-white shadow-[0_15px_40px_rgba(239,68,68,0.45)]">
            <svg className="ml-0.5 h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1.5 px-1">
        <h3 className="line-clamp-2 text-base font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-red-400">
          {video.title}
        </h3>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">{video.channel}</p>
      </div>
    </button>
  )
}
