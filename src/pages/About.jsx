import { useReveal, useStagger } from '../hooks/useAnimations'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Award, Heart, Leaf } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const VALUES = [
  { icon: <Shield size={20}/>, title:'Quality First', desc:'We never compromise on print quality — every order is inspected before delivery.' },
  { icon: <Award size={20}/>, title:'Expert Craftsmanship', desc:'18+ years of experience means we know printing inside out.' },
  { icon: <Heart size={20}/>, title:'Customer Focus', desc:'Your satisfaction is our priority. We go the extra mile every time.' },
  { icon: <Leaf size={20}/>, title:'Eco-Conscious', desc:'We use eco-friendly inks and sustainable materials wherever possible.' },
]

const TESTIMONIALS = [
  { name:'Priya Sundaram', role:'Wedding Client', text:'The wedding cards were absolutely stunning. Every guest was asking where we got them printed!', stars:5 },
  { name:'Rajan Business Centre', role:'Corporate Client', text:"We've been ordering visiting cards for 3 years. Quality is consistent and delivery is always on time.", stars:5 },
  { name:'Murugan Traders', role:'Banner Client', text:'Great quality flex banners at very reasonable rates. Colours are vibrant even after months outdoor.', stars:5 },
]

export default function About() {
  const heroRef = useReveal({ y: 30 })
  const storyRef = useRef(null)
  const valuesRef = useStagger('.val-item')

  useEffect(() => {
    if (!storyRef.current) return
    gsap.fromTo(storyRef.current, { opacity: 0, x: 40 }, {
      opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: storyRef.current, start: 'top 80%', once: true }
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <main className="section-bg min-h-screen">
      <section className="relative section-pad overflow-hidden" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top center, rgba(201,136,16,0.07) 0%, transparent 60%)' }} />
        <div ref={heroRef} className="relative max-w-4xl mx-auto text-center px-6 opacity-0">
          <div className="eyebrow mb-5" style={{ display:"inline-flex" }}><span>✦</span> Our Story</div>
          <h1 className="heading-xl mb-5" style={{ color: 'var(--text)' }}>
            About <span className="text-gold-gradient">Us</span>
          </h1>
          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: 'var(--text3)' }}>
            A family-run printing legacy in the heart of Sattur, Tamil Nadu.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad">
        <div className="container-xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[480px]">
            <div className="absolute top-0 left-0 w-[65%] h-[70%] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80" alt="Printing press" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-[55%] h-[60%] overflow-hidden" style={{ border: '4px solid var(--bg)' }}>
              <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80" alt="Design work" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-1/2 right-6 -translate-y-1/2 w-24 h-24 flex flex-col items-center justify-center z-10"
              style={{ background: 'var(--surface)', border: '1px solid rgba(201,136,16,0.3)' }}>
              <span className="font-display text-2xl font-bold" style={{ color: '#e4a420' }}>18+</span>
              <span className="font-body text-xs tracking-widest uppercase" style={{ color: 'var(--text4)' }}>Years</span>
            </div>
            <div className="absolute -bottom-3 -left-3 w-16 h-16" style={{ borderLeft: '1px solid rgba(201,136,16,0.2)', borderBottom: '1px solid rgba(201,136,16,0.2)' }} />
          </div>

          <div ref={storyRef} className="opacity-0">
            <div className="font-accent text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(201,136,16,0.6)' }}>Est. 2006, Sattur</div>
            <h2 className="font-display text-4xl font-semibold mb-6 leading-tight" style={{ color: 'var(--text)' }}>
              Printing Dreams Since<br/><span className="text-gold-gradient">2006</span>
            </h2>
            <div className="space-y-4 font-body text-base leading-relaxed" style={{ color: 'var(--text3)' }}>
              <p>Om Sakthi Printers was founded in Sattur with a single mission — to bring premium printing quality within reach of every family and business in Virudhunagar district.</p>
              <p>What started as a small offset press has grown into a full-service digital printing studio, equipped with the latest technology to deliver crisp, vibrant, and lasting prints.</p>
              <p>We've printed wedding invitations for thousands of Tamil families, built brand identities for local businesses, and decorated festivals with our colourful banners.</p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
              {[{ num:'5000+', label:'Happy Clients' }, { num:'200+', label:'Templates' }, { num:'18+', label:'Years' }].map((stat, i) => (
                <div key={i}>
                  <div className="font-display text-2xl font-bold mb-1" style={{ color: '#e4a420' }}>{stat.num}</div>
                  <div className="font-body text-xs tracking-wide" style={{ color: 'var(--text4)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container-xl">
          <div className="text-center mb-14">
            <div className="eyebrow mb-5" style={{ display:"inline-flex" }}><span>✦</span> What We Stand For</div>
            <h2 className="heading-lg" style={{ color: 'var(--text)' }}>Our Values</h2>
          </div>
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, i) => (
              <div key={i} className="val-item glass-gold p-7 group">
                <div className="w-11 h-11 flex items-center justify-center mb-5 text-gold-400 transition-all group-hover:border-gold-400/60"
                  style={{ border: '1px solid rgba(201,136,16,0.2)' }}>
                  {val.icon}
                </div>
                <h3 className="font-display text-lg mb-2" style={{ color: 'var(--text)' }}>{val.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text3)' }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container-xl">
          <div className="text-center mb-14">
            <div className="eyebrow mb-5" style={{ display:"inline-flex" }}><span>✦</span> Client Love</div>
            <h2 className="heading-lg" style={{ color: 'var(--text)' }}>What Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="glass p-7">
                <div className="flex gap-0.5 mb-4">{Array(t.stars).fill(0).map((_,si) => <span key={si} className="text-gold-400 text-sm">★</span>)}</div>
                <p className="font-accent text-base leading-relaxed italic mb-5" style={{ color: 'var(--text3)' }}>"{t.text}"</p>
                <div>
                  <div className="font-body text-sm font-medium" style={{ color: 'var(--text2)' }}>{t.name}</div>
                  <div className="font-body text-xs" style={{ color: 'var(--text4)' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
