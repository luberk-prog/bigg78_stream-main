import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LandingNavbar from '../components/LandingNavbar'
import HeroSlideshow from '../components/HeroSlideshow'
import TrendingSection from '../components/TrendingSection'
import { fetchLandingVideos } from '../lib/youtube'

export default function Landing() {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFallback, setIsFallback] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      setIsLoading(true)
      try {
        const res = await fetchLandingVideos(12)
        if (isMounted) {
          setVideos(res.items || [])
          setIsFallback(res.isFallback)
        }
      } catch (err) {
        console.error('Error fetching landing page videos:', err)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadData()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#07080b] text-white font-sans selection:bg-red-600 selection:text-white relative overflow-x-hidden">
      <LandingNavbar />

      <main className="relative z-10 pt-16 pb-16">
        <HeroSlideshow videos={videos} isLoading={isLoading} />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <TrendingSection videos={videos} isLoading={isLoading} />

          <section className="py-8 md:py-12 border-t border-white/10">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500 mb-3">Why watch here</p>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">A better place to watch together</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  num: '01',
                  title: 'Find something worth watching',
                  text: 'Explore the biggest hits, trending clips, and crowd-favorite recommendations from the BIGG78 library.'
                },
                {
                  num: '02',
                  title: 'Watch together',
                  text: 'Launch a room, sync with friends, and keep the viewing session social without leaving the stream.'
                },
                {
                  num: '03',
                  title: 'Stay in the story',
                  text: 'Minimal distractions, stronger focus, and a visual experience built for cinematic content.'
                }
              ].map((item) => (
                <article key={item.num} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-white/[0.04]">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-sm font-black text-red-400">
                    {item.num}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-3">{item.title}</h3>
                  <p className="text-sm leading-6 text-zinc-400">{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-[#07080b]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between text-sm text-zinc-500">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-red-600 text-xs font-black text-white">B</div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-300">
              BIGG78 <span className="text-red-500">STREAM</span>
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link to="/search" className="hover:text-white transition-colors">Browse</Link>
          </div>

          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            © {new Date().getFullYear()} BIGG78 STREAM
          </p>
        </div>
      </footer>
    </div>
  )
}
