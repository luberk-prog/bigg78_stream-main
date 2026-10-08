export default function VideoCard({ video, onClick }) {
  const isWatchTogether = !!video.host;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick(video)
    }
  }

  return (
    <div 
      role="button"
      tabIndex={0}
      onClick={() => onClick(video)}
      onKeyDown={handleKeyDown}
      aria-label={`Watch ${video.title} by ${video.channel}`}
      className="group relative flex flex-col cursor-pointer active:scale-[0.98] transition-all duration-300 rounded-xl overflow-hidden border border-zinc-800/80 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-2xl hover:shadow-red-950/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 animate-fade-in"
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-video overflow-hidden bg-zinc-950">
        <img 
          src={video.thumbnail} 
          alt=""
          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="absolute inset-0 flex items-center justify-center translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-xl shadow-red-950/50 scale-90 group-hover:scale-100 transition-transform duration-300 border border-white/20">
                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 6v12l10-6z" /></svg>
              </div>
           </div>
        </div>

        {/* Video Duration Badge */}
        <div className="absolute bottom-2.5 right-2.5 bg-zinc-950/90 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider text-zinc-300 border border-zinc-800">
          {video.duration || '12:45'}
        </div>

        {/* Live / Watch Together Status */}
        {isWatchTogether && (
           <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-red-950/80 px-2.5 py-1 rounded-full border border-red-800/60 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-red-200 leading-none">In Progress</span>
           </div>
        )}
      </div>

      {/* Info Area */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug flex-1">
            {video.title}
          </h3>
          <button
            type="button"
            aria-label="More options"
            onClick={(e) => { e.stopPropagation(); }}
            className="text-zinc-500 hover:text-white transition-colors p-1 rounded hover:bg-zinc-800/60 focus:outline-none focus-visible:ring-1 focus-visible:ring-red-500"
          >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
          </button>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-2.5">
             <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-700/50 shrink-0">
                <img src={`https://i.pravatar.cc/50?u=${video.channel}`} alt="" className="w-full h-full object-cover opacity-80" />
             </div>
             <span className="text-[11px] font-medium text-zinc-400 truncate">{video.channel}</span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-normal text-zinc-500">
             <div className="flex items-center gap-1.5">
                <span>{video.views || '1M'} views</span>
                <span>•</span>
                <span>{video.date || '2d ago'}</span>
             </div>
             {isWatchTogether && (
                <div className="text-[9px] font-bold uppercase tracking-wider text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-900/40">
                  {video.host} Rooms
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  )
}
