"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SectionLabel } from "@/components/ui/SectionLabel"
import Image from "next/image"
import "./AboutPage.css"

gsap.registerPlugin(ScrollTrigger)

const GYM_IMAGES = [
    {
        src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
        alt: "Early morning training discipline",
        caption: "5:30 AM — Before the site wakes up"
    },
    {
        src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
        alt: "Focused training session",
        caption: "Controlled stress builds strength"
    },
    {
        src: "https://images.unsplash.com/photo-1549476464-37392f717541?w=600&q=80",
        alt: "Weight training and endurance",
        caption: "Progressive overload — same principle, different domain"
    },
    {
        src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
        alt: "Engineer staying sharp",
        caption: "Physical discipline mirrors structural discipline"
    }
]

const CORE_VALUES = [
    { label: "01", title: "Integrity Before Convenience", text: "Every structural decision carries moral weight. I do not compromise safety for budget or speed." },
    { label: "02", title: "Alignment Before Execution", text: "A project started without shared understanding is a project already failing. I build consensus before I build anything else." },
    { label: "03", title: "Long-Term Stability", text: "Short-term gains that compromise long-term integrity are not gains. Every material choice, every timeline decision, must survive scrutiny." },
    { label: "04", title: "Clarity Before Speed", text: "Moving fast through miscommunication costs more than slowing down to ensure everyone is aligned." },
    { label: "05", title: "Representation With Competence", text: "Being visible is not enough. I carry the responsibility to be undeniably excellent, so the door stays open for every woman who follows." },
    { label: "06", title: "Discipline Under Pressure", text: "Pressure is a constant in engineering and leadership. Systems — both physical and personal — must be built to absorb it." },
]

const PARALLAX_LEFT = [
    { quote: "Engineering is 30% calculations, 70% people.", context: "Learned on-site, year three as a site engineer" },
    { quote: "I don't tell girls engineering is hard. I tell them it's challenging — hear the difference?", context: "On inspiring young women" },
    { quote: "The gym is where I practice not quitting. Everything else follows.", context: "On 5:30 AM discipline" },
]

const PARALLAX_RIGHT = [
    { stat: "15+", label: "Major projects across Kenya & Tanzania" },
    { stat: "40M+ KES", label: "Delivered in client savings through innovation" },
    { stat: "0", label: "Structural failures across all projects under oversight" },
    { stat: "200+", label: "Workers trained in EPS installation" },
]

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero entrance — staggered fade-up
            gsap.to(".abt-reveal-hero", {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.18,
                ease: "power3.out",
                delay: 0.2
            })

            // General scroll reveals
            gsap.utils.toArray<HTMLElement>(".abt-reveal-scroll").forEach((el) => {
                gsap.to(el, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 88%",
                    }
                })
            })

            // Bi-directional parallax — left column scrolls UP, right scrolls DOWN
            const leftTrack = document.querySelector(".parallax-left-track") as HTMLElement
            const rightTrack = document.querySelector(".parallax-right-track") as HTMLElement

            if (leftTrack && rightTrack) {
                ScrollTrigger.create({
                    trigger: ".parallax-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                    onUpdate: (self) => {
                        const progress = self.progress
                        // Left side moves upward as user scrolls
                        gsap.set(leftTrack, { y: -progress * 80 })
                        // Right side moves downward as user scrolls
                        gsap.set(rightTrack, { y: progress * 60 })
                    }
                })
            }

            // Gym images — staggered cascade on scroll
            gsap.utils.toArray<HTMLElement>(".gym-card").forEach((card, i) => {
                gsap.fromTo(card,
                    { y: 40, opacity: 0, scale: 0.96 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.9,
                        delay: i * 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                        }
                    }
                )
            })

            // Engineering parallel section — split fade
            gsap.fromTo(".eng-parallel-left",
                { x: -40, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1.1, ease: "power3.out",
                    scrollTrigger: { trigger: ".eng-parallel-left", start: "top 82%" }
                }
            )
            gsap.fromTo(".eng-parallel-right",
                { x: 40, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1.1, ease: "power3.out",
                    scrollTrigger: { trigger: ".eng-parallel-right", start: "top 82%" }
                }
            )

            // Values cards — cascade
            gsap.utils.toArray<HTMLElement>(".value-card").forEach((card, i) => {
                gsap.fromTo(card,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: i * 0.08,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 92%",
                        }
                    }
                )
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="about-page">
            <div className="texture-overlay" />

            <div className="about-container">

                {/* ─── HERO ─── */}
                <section className="about-hero">
                    <div className="abt-reveal-hero opacity-0 translate-y-8">
                        <SectionLabel number="01" text="THE ENGINEER" className="mb-8" />
                    </div>
                    <h1 className="about-hero-headline abt-reveal-hero opacity-0 translate-y-8">
                        I don&apos;t just build structures.<br />
                        I build <span className="highlight">alignment.</span>
                    </h1>
                    <p className="about-hero-sub abt-reveal-hero opacity-0 translate-y-8">
                        Structural Engineer · General Manager · East Africa
                    </p>
                    <p className="about-hero-descriptor abt-reveal-hero opacity-0 translate-y-8">
                        Navigating the intersection of rigorous structural safety, complex human dynamics,
                        and a relentless belief that excellence has no gender.
                    </p>
                </section>

                {/* ─── ORIGIN STORY ─── */}
                <section className="origin-section">
                    <div className="origin-grid">
                        <div className="origin-image-col abt-reveal-scroll opacity-0 translate-y-8">
                            <div className="origin-image-frame">
                                <Image
                                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                                    alt="High-rise construction in East Africa"
                                    fill
                                    className="origin-img"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    unoptimized
                                />
                                <div className="origin-image-overlay" />
                                <div className="origin-image-badge">
                                    <span>Est. 2014</span>
                                    <span>Structural Engineering</span>
                                </div>
                            </div>
                        </div>

                        <div className="origin-text-col">
                            <div className="abt-reveal-scroll opacity-0 translate-y-8">
                                <SectionLabel number="02" text="The Beginning" className="mb-6" />
                                <h2 className="origin-headline">A Collapse That Built a Career</h2>
                            </div>
                            <div className="abt-reveal-scroll opacity-0 translate-y-8">
                                <p className="origin-paragraph">
                                    I was 14 when a building collapsed in Nairobi. I remember my uncle, a mason, explaining how buildings fail — not just from bad materials, but from people not understanding loads, foundations, forces.
                                </p>
                            </div>
                            <div className="abt-reveal-scroll opacity-0 translate-y-8">
                                <p className="origin-paragraph">
                                    I thought: <em>someone needs to make sure our buildings stand. That someone could be me.</em> That quiet conviction became a degree in Structural Engineering, a career on construction sites across East Africa, and eventually a leadership role where I now coordinate not just steel and concrete — but everything and everyone between concept and completion.
                                </p>
                            </div>
                            <blockquote className="origin-quote abt-reveal-scroll opacity-0 translate-y-8">
                                &ldquo;Engineering is 30% calculations, 70% people. I learned that in year three — and I&apos;ve never forgotten it.&rdquo;
                            </blockquote>
                            <div className="origin-anecdote abt-reveal-scroll opacity-0 translate-y-8">
                                <p className="origin-anecdote-text">
                                    My first day on a real construction site, the foreman looked past me and asked, &ldquo;Where&apos;s the engineer?&rdquo; I was holding the structural drawings. I smiled and said, &ldquo;You&apos;re looking at her.&rdquo; He laughed. Then I showed him why his rebar spacing was wrong. He stopped laughing. We&apos;ve worked on four projects together since.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── BI-DIRECTIONAL PARALLAX — QUOTES vs. STATS ─── */}
                <section className="parallax-section">
                    <div className="parallax-inner">
                        {/* LEFT — scrolls upward */}
                        <div className="parallax-col parallax-left-col">
                            <div className="parallax-col-label abt-reveal-scroll opacity-0 translate-y-8">
                                <SectionLabel number="03" text="Her Words" />
                            </div>
                            <div className="parallax-left-track">
                                {PARALLAX_LEFT.map((item, i) => (
                                    <div className="parallax-quote-card" key={i}>
                                        <div className="parallax-quote-number">{String(i + 1).padStart(2, "0")}</div>
                                        <blockquote className="parallax-quote-text">&ldquo;{item.quote}&rdquo;</blockquote>
                                        <p className="parallax-quote-context">{item.context}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT — scrolls downward */}
                        <div className="parallax-col parallax-right-col">
                            <div className="parallax-col-label abt-reveal-scroll opacity-0 translate-y-8">
                                <SectionLabel number="04" text="By The Numbers" />
                            </div>
                            <div className="parallax-right-track">
                                {PARALLAX_RIGHT.map((item, i) => (
                                    <div className="parallax-stat-card" key={i}>
                                        <span className="parallax-stat-number">{item.stat}</span>
                                        <p className="parallax-stat-label">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── GYM — THE DISCIPLINE SECTION ─── */}
                <section className="gym-section">
                    <div className="gym-header abt-reveal-scroll opacity-0 translate-y-8">
                        <SectionLabel number="05" text="Beyond the Blueprint" className="mb-6" />
                        <h2 className="gym-headline">Discipline Outside the Site</h2>
                        <p className="gym-subhead">
                            Monday through Friday. 5:30 AM. Rain, deadlines, or difficult days — the gym waits.
                        </p>
                    </div>

                    <div className="gym-grid">
                        {GYM_IMAGES.map((img, i) => (
                            <div className="gym-card" key={i}>
                                <div className="gym-card-image-wrap">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="gym-card-img"
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                        unoptimized
                                    />
                                    <div className="gym-card-overlay" />
                                </div>
                                <div className="gym-card-caption">{img.caption}</div>
                            </div>
                        ))}
                    </div>

                    {/* Engineering parallel — two-col layout */}
                    <div className="eng-parallel-wrap">
                        <div className="eng-parallel-left">
                            <h3 className="eng-parallel-title">The Engineering Parallel</h3>
                            <p className="eng-parallel-text">
                                Progressive overload is a principle in both structural engineering and strength training. You apply controlled stress to a system — gradually, deliberately — and it responds by becoming stronger. Rest is not weakness; it is recovery that prevents failure.
                            </p>
                            <p className="eng-parallel-text">
                                Kossy does not go to the gym despite her demanding schedule. She goes because of it. The 5:30 AM session is not a luxury — it is a resilience system. She converts professional pressure into physical output, and returns to the site lighter, sharper, and impossible to exhaust.
                            </p>
                        </div>
                        <div className="eng-parallel-right">
                            <div className="eng-parallel-pillars">
                                {[
                                    { icon: "⚡", title: "Mental Clarity", text: "Physical exertion resets focus. What feels impossible at 5 AM becomes manageable at 9 AM." },
                                    { icon: "🧠", title: "Emotional Regulation", text: "The discipline to finish one more rep mirrors the patience needed to navigate one more difficult stakeholder." },
                                    { icon: "🏗", title: "Structural Endurance", text: "High-stakes projects run for months. Physical endurance trained daily is what allows her leadership to remain consistent." },
                                    { icon: "🔁", title: "Controlled Stress", text: "The gym is where she practices converting pressure into output. The site is where she applies it." },
                                ].map((pillar, i) => (
                                    <div className="eng-pillar-card" key={i}>
                                        <span className="eng-pillar-icon">{pillar.icon}</span>
                                        <div>
                                            <h4 className="eng-pillar-title">{pillar.title}</h4>
                                            <p className="eng-pillar-text">{pillar.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── CORE VALUES GRID (glowing hover cards) ─── */}
                <section className="values-section">
                    <div className="values-header abt-reveal-scroll opacity-0 translate-y-8">
                        <SectionLabel number="06" text="Core Values" className="mb-6" />
                        <h2 className="values-headline">The Framework She Lives By</h2>
                    </div>
                    <div className="values-grid">
                        {CORE_VALUES.map((val, i) => (
                            <div className="value-card" key={i}>
                                <div className="value-card-glow" />
                                <span className="value-label">{val.label}</span>
                                <h3 className="value-title">{val.title}</h3>
                                <p className="value-text">{val.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ─── INSPIRATION — FOR YOUNG WOMEN ─── */}
                <section className="inspiration-section">
                    <div className="inspiration-inner">
                        <div className="inspiration-text-col">
                            <div className="abt-reveal-scroll opacity-0 translate-y-8">
                                <SectionLabel number="07" text="For Young Women" className="mb-6" />
                                <h2 className="inspiration-headline">You Belong Here.</h2>
                            </div>
                            <div className="abt-reveal-scroll opacity-0 translate-y-8">
                                <p className="inspiration-para">
                                    Only 8.4% of registered professional engineers in Kenya are women. Kossy sees that number not as a ceiling, but as a proof of space.
                                </p>
                            </div>
                            <div className="abt-reveal-scroll opacity-0 translate-y-8">
                                <p className="inspiration-para">
                                    &ldquo;We tell girls engineering is <em>hard</em>. We don&apos;t tell boys that — we tell them it&apos;s <em>challenging</em>, prestigious, well-paid. Hard vs. challenging — hear the difference? One says &lsquo;maybe you can&apos;t.&rsquo; The other says &lsquo;this will make you stronger.&rsquo; We are programming girls to opt out before they even try. That stops now.&rdquo;
                                </p>
                            </div>
                            <blockquote className="inspiration-quote abt-reveal-scroll opacity-0 translate-y-8">
                                &ldquo;If you could talk to your 22-year-old self on your first day of engineering school — what would you say? Keep going. The young girl who&apos;ll see you on a construction site and think: &lsquo;That could be me.&rsquo; She&apos;s watching.&rdquo;
                            </blockquote>
                        </div>
                        <div className="inspiration-image-col abt-reveal-scroll opacity-0 translate-y-8">
                            <div className="inspiration-image-frame">
                                <Image
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                                    alt="Professional woman in engineering"
                                    fill
                                    className="inspiration-img"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    unoptimized
                                />
                                <div className="inspiration-image-overlay" />
                                <div className="inspiration-stat-badge">
                                    <span className="ins-stat-num">8.4%</span>
                                    <span className="ins-stat-label">of registered engineers<br />in Kenya are women</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── CREDENTIALS ─── */}
                <section className="credentials-section abt-reveal-scroll opacity-0 translate-y-8">
                    <SectionLabel number="08" text="Credentials" className="mb-10" />
                    <div className="credentials-grid">
                        <div className="credential-group">
                            <h3 className="credential-group-title">Education</h3>
                            <div className="credential-item">
                                <span className="credential-name">BSc. Civil & Structural Engineering</span>
                                <span className="credential-detail">University of Nairobi</span>
                            </div>
                        </div>
                        <div className="credential-group">
                            <h3 className="credential-group-title">Expertise</h3>
                            <div className="credential-item">
                                <span className="credential-name">EPS Construction Systems</span>
                                <span className="credential-detail">Certified Specialist</span>
                            </div>
                            <div className="credential-item">
                                <span className="credential-name">Structural Risk Mitigation</span>
                                <span className="credential-detail">East African Standards Board</span>
                            </div>
                        </div>
                        <div className="credential-group">
                            <h3 className="credential-group-title">Leadership</h3>
                            <div className="credential-item">
                                <span className="credential-name">General Manager</span>
                                <span className="credential-detail">EPS Manufacturing & Supply, Kenya</span>
                            </div>
                            <div className="credential-item">
                                <span className="credential-name">Mentor</span>
                                <span className="credential-detail">8+ young women engineers placed</span>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}
