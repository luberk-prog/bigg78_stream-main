export default function TrendingSection({ videos = [], isLoading = false }) {
  if (isLoading) {
    return (
      <section className="py-8 md:py-12">
        <div className="mb-6 h-8 w-40 rounded-full bg-zinc-800/80 animate-pulse" />
        <div className="flex gap-5 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-[250px] shrink-0 sm:w-[280px]">
              <div className="aspect-video rounded-[20px] bg-zinc-800 animate-pulse" />
              <div className="mt-3 h-5 w-3/4 rounded-md bg-zinc-800 animate-pulse" />
              <div className="mt-2 h-3 w-1/2 rounded-md bg-zinc-800 animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (!videos || videos.length === 0) return null

  const trendingList = videos.slice(0, 8)

  return (
    <section className="py-8 md:py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">Trending</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">Popular right now</h2>
        </div>
        <div className="hidden rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 sm:block">
          Updated daily
        </div>
      </div>

      <div className="-mx-2 overflow-x-auto pb-4 md:-mx-0">
        <div className="flex gap-5 px-2 md:px-0">
          {trendingList.map((video, idx) => (
            <div key={video.id || video.youtubeId || idx} className="flex-none">
              <div className="text-[10px] font-black uppercase tracking-[0.26em] text-zinc-500 mb-2">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div className="[&>button]:w-[250px] [&>button]:sm:w-[280px]">
                <div className="pointer-events-none"> </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-max gap-5">
          {trendingList.map((video, idx) => (
            <div key={video.id || video.youtubeId || idx} className="shrink-0">
              <div className="mb-2 hidden text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500 sm:block">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <LandingVideoCard video={video} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import LandingVideoCard from './LandingVideoCard'
