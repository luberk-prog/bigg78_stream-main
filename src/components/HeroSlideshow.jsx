import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import YouTubeImage from './YouTubeImage'

export default function HeroSlideshow({ videos = [], isLoading = false }) {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const slideCount = Math.min(videos.length, 5)
  const currentVideo = videos[currentIndex]

  useEffect(() => {
    if (slideCount <= 1 || isLoading) return

    const timer = setInterval(() => {
      handleNext()
    }, 7000)

    return () => clearInterval(timer)
  }, [currentIndex, slideCount, isLoading])

  const handleNext = () => {
    if (slideCount === 0) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slideCount)
      setIsTransitioning(false)
    }, 250)
  }

  const handlePrev = () => {
    if (slideCount === 0) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount)
      setIsTransitioning(false)
    }, 250)
  }

  const handleSelectSlide = (idx) => {
    if (idx === currentIndex) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(idx)
      setIsTransitioning(false)
    }, 250)
  }

  const handleWatchNow = () => {
    if (!currentVideo) return
    const targetId = currentVideo.id || currentVideo.youtubeId
    navigate(`/watch/${targetId}`)
  }

  const handleBrowse = () => {
    navigate('/search')
  }

  if (isLoading || !currentVideo) {
    return (
      <div className="relative w-full h-[72vh] min-h-[560px] bg-zinc-900 animate-pulse overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900" />
        <div className="relative z-10 flex h-full max-w-[1440px] mx-auto items-end px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <div className="w-full max-w-2xl space-y-4">
            <div className="h-6 w-28 rounded-full bg-zinc-800" />
            <div className="h-14 w-3/4 rounded-xl bg-zinc-800" />
            <div className="h-5 w-1/2 rounded-md bg-zinc-800" />
            <div className="h-20 w-full rounded-xl bg-zinc-800" />
            <div className="flex gap-4">
              <div className="h-12 w-32 rounded-full bg-zinc-800" />
              <div className="h-12 w-32 rounded-full bg-zinc-800" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const videoId = currentVideo.id || currentVideo.youtubeId

  return (
    <section aria-label="Featured videos carousel" className="relative h-[72vh] min-h-[560px] max-h-[900px] overflow-hidden bg-[#090b0f] select-none">
      <div className="absolute inset-0 z-0">
        <YouTubeImage
          videoId={videoId}
          src={currentVideo.thumbnail}
          alt={currentVideo.title}
          className={`h-full w-full object-cover object-center transition-all duration-500 ${
            isTransitioning ? 'scale-105 opacity-40' : 'scale-100 opacity-90'
          }`}
        />

        <div className="absolute inset-0 bg-[#05070c]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090b0f] via-[#090b0f]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090b0f] via-[#090b0f]/25 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-end px-4 pb-10 pt-24 sm:px-6 lg:px-8 lg:pb-14">
        <div className="max-w-3xl transition-all duration-300">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-zinc-200">
            <span className="rounded-full border border-red-500/40 bg-red-500/20 px-3 py-1.5 text-red-300 shadow-[0_0_30px_rgba(239,68,68,0.22)]">
              Featured now
            </span>
            {currentVideo.category && (
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-zinc-300 backdrop-blur-sm">
                {currentVideo.category}
              </span>
            )}
            {currentVideo.duration && (
              <span className="hidden text-zinc-400 sm:inline">{currentVideo.duration}</span>
            )}
            {currentVideo.views && (
              <span className="hidden text-zinc-400 sm:inline">{currentVideo.views}</span>
            )}
          </div>

          <h1 className="max-w-2xl text-4xl font-black leading-[0.92] tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
            {currentVideo.title}
          </h1>

          <div className="mt-5 flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
            {currentVideo.channel && (
              <span className="font-semibold uppercase tracking-[0.16em] text-zinc-300/90">{currentVideo.channel}</span>
            )}
            {currentVideo.views && <span className="text-zinc-500">•</span>}
            {currentVideo.views && <span className="text-zinc-400">{currentVideo.views}</span>}
          </div>

          {currentVideo.description && (
            <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base">
              {currentVideo.description}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleWatchNow}
              className="inline-flex items-center gap-2.5 rounded-full bg-red-600 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_16px_50px_rgba(239,68,68,0.38)] transition-all duration-200 hover:bg-red-500 active:scale-[0.98]"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Now
            </button>

            <button
              type="button"
              onClick={handleBrowse}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 active:scale-[0.98]"
            >
              Browse
            </button>
          </div>
        </div>

        {slideCount > 1 && (
          <div className="absolute bottom-8 right-4 z-20 flex items-center gap-3 rounded-full border border-white/10 bg-[#0c0e12]/80 px-3 py-2 backdrop-blur-md sm:right-8 lg:right-12">
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous slide"
              className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-1.5" role="tablist" aria-label="Slideshow pages">
              {Array.from({ length: slideCount }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={idx === currentIndex}
                  onClick={() => handleSelectSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    idx === currentIndex ? 'w-8 bg-red-500' : 'w-2 bg-zinc-600 hover:bg-zinc-400'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <span className="min-w-[36px] text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              {currentIndex + 1}/{slideCount}
            </span>

            <button
              onClick={handleNext}
              type="button"
              aria-label="Next slide"
              className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
