import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeCards from "../components/ThreeCards";
import DesignCard from "../components/DesignCard";
import DesignModal from "../components/DesignModal";
import EnquiryModal from "../components/EnquiryModal";
import InfiniteScrollCards from "../components/InfiniteScrollCards";
import { fetchDesigns, fetchServices, WHATSAPP_NUMBER } from "../data";
import { useLang } from "../context/LangContext";
import {
  useReveal,
  useStagger,
  useHorizontalScroll,
} from "../hooks/useAnimations";
import {
  ArrowRight,
  Star,
  Award,
  Zap,
  Shield,
  CheckCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
  "Wedding Cards",
  "Visiting Cards",
  "Flex Banners",
  "Custom Designs",
  "Digital Printing",
  "Premium Quality",
];

const WHY_US = [
  {
    icon: Star,
    title: "Premium Quality",
    desc: "18+ years of printing excellence in Sattur, Virudhunagar.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    desc: "Get your prints ready in 3–5 business days, same-day on select orders.",
  },
  {
    icon: Award,
    title: "Custom Designs",
    desc: "In-house creative team crafts unique designs for every occasion.",
  },
  {
    icon: Shield,
    title: "Satisfaction Guarantee",
    desc: "Not happy? We reprint at no cost — your trust is everything.",
  },
];

const WA = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export default function Home() {
  const { t } = useLang();
  const [DESIGNS, setDESIGNS] = useState([]);
  const [SERVICES, setSERVICES] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [showEnquiry, setShowEnquiry] = useState(false);

  useEffect(() => {
    fetchDesigns().then((data) => setDESIGNS(data));
    fetchServices().then((data) => setSERVICES(data));
  }, []);

  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroBtnsRef = useRef(null);
  const scrollLineRef = useRef(null);
  const statsRef = useRef(null);

  const servicesRef = useStagger(".svc-card");
  const whyRef = useStagger(".why-card");
  const trendingTitleRef = useReveal();
  const servicesTitleRef = useReveal();
  const whyTitleRef = useReveal();
  const ctaRef = useReveal();
  const { trackRef, containerRef } = useHorizontalScroll();

  useEffect(() => {
    // Hero entrance
    const tl = gsap.timeline({ delay: 2.1 });
    const words = heroTitleRef.current?.querySelectorAll(".hw");
    if (words?.length) {
      tl.fromTo(
        words,
        { y: 80, opacity: 0, rotateX: -25 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
        },
      );
    }
    tl.fromTo(
      heroSubRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.45",
    )
      .fromTo(
        Array.from(heroBtnsRef.current?.children ?? []),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" },
        "-=0.35",
      )
      .fromTo(
        scrollLineRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.7, transformOrigin: "top" },
        "-=0.2",
      );

    // Stats counter
    const stats = statsRef.current?.querySelectorAll(".stat-num");
    stats?.forEach((stat) => {
      const target = parseInt(stat.dataset.target);
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 82%",
        once: true,
        onEnter: () =>
          gsap.fromTo(
            { val: 0 },
            { val: target },
            {
              duration: 1.6,
              ease: "power2.out",
              onUpdate: function () {
                stat.textContent = Math.round(
                  this.targets()[0].val,
                ).toLocaleString();
              },
            },
          ),
      });
    });

    // Hero parallax
    gsap.to(".hero-bg-el", {
      yPercent: 28,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const trending = DESIGNS.filter(
    (d) => d.tag === "Trending" || d.tag === "Featured",
  ).slice(0, 6);

  return (
    <main className="section-bg">
      {/* ════════════ HERO ════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background layers */}
        {/* <div className="hero-bg-el absolute inset-0 will-change-transform">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 65% 45%, rgba(201,136,16,0.10) 0%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              opacity: 0.4,
            }}
          />
        </div>

        
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ zIndex: 1, pointerEvents: "none" }}
        >
          <ThreeCards />
        </div> */}
        {/* ════════════ HERO BACKGROUND (VIDEO LOOP) ════════════ */}
        {/* ════════════ HERO BACKGROUND (VIDEO LOOP) ════════════ */}
        <div className="hero-bg-el absolute inset-0 z-0 h-[100svh]">
          {/* Video Element */}
          <video
            autoPlay
            loop
            muted
            playsInline
            /* FIX: Mobile-la video load aagura varaikkum 'poster' image thiriyum. 
       Ithu blank screen varaama thadukkum. 
    */
            poster="https://images.unsplash.com/photo-1616628188542-b8499b679093?q=80&w=2000"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "grayscale(20%) brightness(1)", // Mobile-la text innum nalla theriya brightness 0.6 kuduthuruken
            }}
          >
            {/* Unga video file path correct-ah irukanum (Public folder) */}
            <source src="/bg-video.mp4" type="video/mp4" />

            {/* Fallback color if video/poster fails */}
            <div className="absolute inset-0 bg-[#0a0705]" />
          </video>

          {/* Overlay Layer: Responsive Gradient */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(10,7,5,0.8) 0%, rgba(10,7,5,0.4) 50%, rgba(10,7,5,0.9) 100%)",
            }}
          />

          {/* Desktop-ku mattum side gradient (Optional but looks premium) */}
          <div
            className="absolute inset-0 z-[1] hidden md:block"
            style={{
              background:
                "linear-gradient(to right, rgba(10,7,5,0.9) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="container-xl relative z-10 pt-28 pb-20">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="eyebrow mb-8" style={{ width: "fit-content" }}>
              <span>✦</span> Sattur's Finest Printer
            </div>

            {/* Title */}
            <div
              ref={heroTitleRef}
              className="heading-xl mb-6"
              style={{ perspective: "900px" }}
            >
              {[t.hero_title, t.hero_title2].map((line, li) => (
                <div key={li} style={{ overflow: "hidden", display: "block" }}>
                  {line.split(" ").map((word, wi) => (
                    <span
                      key={wi}
                      className={`hw inline-block mr-[0.25em] ${li === 1 ? "text-gold-gradient" : ""}`}
                      style={{ color: li === 0 ? "var(--text)" : undefined }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            {/* Sub */}
            <p
              ref={heroSubRef}
              className="body-lg mb-10 opacity-0"
              style={{ maxWidth: "34rem" }}
            >
              {t.hero_sub} — Wedding Cards, Visiting Cards, Banners & Custom
              Designs crafted with precision.
            </p>

            {/* CTA buttons */}
            <div ref={heroBtnsRef} className="flex flex-wrap gap-3">
              <Link to="/gallery" className="btn btn-primary btn-lg">
                <span>{t.hero_cta}</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href={WA("Hi! I am interested in your printing services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.107 1.518 5.832L.057 23.743a.5.5 0 00.609.637l6.163-1.615A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.654-.493-5.193-1.358l-.372-.215-3.859 1.011 1.032-3.754-.238-.386A9.951 9.951 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
                {t.hero_whatsapp}
              </a>
            </div>

            {/* Trust line */}
            <div className="flex items-center gap-5 mt-10">
              {[
                "5000+ Happy Clients",
                "18+ Years Experience",
                "Fast Delivery",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle
                    size={13}
                    style={{ color: "var(--gold)", flexShrink: 0 }}
                  />
                  <span
                    className="font-body text-xs"
                    style={{ color: "var(--text4)" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ zIndex: 10 }}
        >
          <span
            className="font-body text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--text4)" }}
          >
            Scroll
          </span>
          <div
            ref={scrollLineRef}
            className="w-px h-10 origin-top"
            style={{
              background:
                "linear-gradient(to bottom, var(--gold), transparent)",
            }}
          />
        </div>
      </section>

      {/* ════════════ MARQUEE ════════════ */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--glass-gold)",
          padding: "14px 0",
          overflow: "hidden",
        }}
      >
        <div className="flex">
          <div className="marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-5 font-accent text-sm tracking-[0.18em] uppercase"
                style={{ color: "rgba(201,136,16,0.55)" }}
              >
                {item}
                <span
                  style={{ color: "rgba(201,136,16,0.3)", fontSize: "8px" }}
                >
                  ◆
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════ STATS ════════════ */}
      <section
        ref={statsRef}
        className="section-pad"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="container-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { target: 5000, label: "Happy Clients", suffix: "+" },
              { target: 18, label: "Years Experience", suffix: "+" },
              { target: 200, label: "Design Templates", suffix: "+" },
              { target: 50000, label: "Cards Printed", suffix: "+" },
            ].map((stat, i) => (
              <div key={i} className="stat-block">
                <div className="stat-num-display mb-1.5">
                  <span className="stat-num" data-target={stat.target}>
                    0
                  </span>
                  <span>{stat.suffix}</span>
                </div>
                <div
                  className="font-body text-sm"
                  style={{ color: "var(--text3)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TRENDING — Infinite 3D Scroll ════════════ */}
      <section className="section-pad">
        <div className="container-xl mb-8">
          <div
            ref={trendingTitleRef}
            className="flex items-end justify-between opacity-0"
          >
            <div>
              <div className="eyebrow mb-4">✦ Trending Now</div>
              <h2 className="heading-lg">Popular Designs</h2>
              <p className="body-sm mt-2" style={{ maxWidth: "28rem" }}>
                Hover to preview all images · Click any card to view full
                details & order
              </p>
            </div>
            <Link
              to="/gallery"
              className="hidden md:flex items-center gap-2 font-body text-sm font-medium transition-colors"
              style={{ color: "var(--text3)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--gold-light)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text3)")
              }
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Infinite 3D auto-scroll strip — all screen sizes */}
        <InfiniteScrollCards designs={DESIGNS} />

        {/* Mobile CTA */}
        <div className="container-xl mt-6 text-center md:hidden">
          <Link to="/gallery" className="btn btn-secondary">
            Browse All Designs
          </Link>
        </div>
      </section>

      {/* ════════════ SERVICES ════════════ */}
      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container-xl section-pad">
          <div ref={servicesTitleRef} className="text-center mb-14 opacity-0">
            <div className="eyebrow mb-4" style={{ display: "inline-flex" }}>
              ✦ What We Offer
            </div>
            <h2 className="heading-lg mb-4">Our Services</h2>
            <div className="divider divider-center" />
          </div>

          <div
            ref={servicesRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {SERVICES.map((svc, i) => (
              <div
                key={i}
                className="svc-card card group"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div className="service-icon-wrap">{svc.icon}</div>
                <div>
                  <h3 className="heading-sm mb-2">{svc.title}</h3>
                  <p className="body-sm">{svc.description}</p>
                </div>
                <div style={{ marginTop: "auto" }}>
                  <span
                    className="chip"
                    style={{ cursor: "default", fontSize: "0.75rem" }}
                  >
                    {svc.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ WHY CHOOSE US ════════════ */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <div className="container-xl section-pad">
          <div ref={whyTitleRef} className="text-center mb-14 opacity-0">
            <div className="eyebrow mb-4" style={{ display: "inline-flex" }}>
              ✦ Our Promise
            </div>
            <h2 className="heading-lg">Why Choose Us</h2>
          </div>

          <div
            ref={whyRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {WHY_US.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="why-card text-center"
                style={{ padding: "2rem 1.5rem" }}
              >
                <div className="service-icon-wrap mx-auto mb-5">
                  <Icon size={20} style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="heading-sm mb-2">{title}</h3>
                <p className="body-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          background: "var(--bg)",
        }}
      >
        <div className="container-xl section-pad">
          <div
            ref={ctaRef}
            className="opacity-0 relative rounded-2xl overflow-hidden"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            {/* Decorative gold glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,136,16,0.06) 0%, transparent 100%)",
              }}
            />
            <div
              className="absolute top-6 left-6 w-14 h-14 pointer-events-none"
              style={{
                borderLeft: "1px solid rgba(201,136,16,0.2)",
                borderTop: "1px solid rgba(201,136,16,0.2)",
                borderRadius: "0 0 0 0",
              }}
            />
            <div
              className="absolute bottom-6 right-6 w-14 h-14 pointer-events-none"
              style={{
                borderRight: "1px solid rgba(201,136,16,0.2)",
                borderBottom: "1px solid rgba(201,136,16,0.2)",
              }}
            />

            <div className="relative text-center max-w-2xl mx-auto">
              <div className="eyebrow mb-5" style={{ display: "inline-flex" }}>
                ✦ Ready to Print?
              </div>
              <h2 className="heading-lg mb-5">
                Let's Create Something
                <br />
                <span className="text-gold-gradient">Extraordinary</span>
              </h2>
              <p
                className="body-lg mb-10"
                style={{ maxWidth: "32rem", margin: "0 auto 2.5rem" }}
              >
                Share your vision with us — we'll design and print it to
                perfection. Contact via WhatsApp for same-day response.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setShowEnquiry(true)}
                  className="btn btn-primary btn-lg w-full sm:w-auto"
                >
                  <span>Get Free Consultation</span>
                  <ArrowRight size={16} />
                </button>
                <a
                  href={WA("Hi, I want to place a print order!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-lg w-full sm:w-auto"
                >
                  WhatsApp Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      {selectedDesign && (
        <DesignModal
          design={selectedDesign}
          onClose={() => setSelectedDesign(null)}
        />
      )}
      {showEnquiry && (
        <EnquiryModal design={null} onClose={() => setShowEnquiry(false)} />
      )}
    </main>
  );
}
