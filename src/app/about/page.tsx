"use client"

import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { AboutSplitHero } from "@/components/sections/about/AboutSplitHero"
import Image from "next/image"
import "./AboutPage.css"

gsap.registerPlugin(ScrollTrigger)

const GYM_IMAGES = [
    {
        src: "/images/about/gym2.jpeg",
        alt: "Early morning training discipline",
        caption: "5:30 AM — Before the site wakes up"
    },
    {
        src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
        alt: "Focused training session",
        caption: "Controlled stress builds strength"
    },
    {
        src: "/images/about/gym3.jpeg",
        alt: "Weight training and endurance",
        caption: "Progressive overload — same principle, different domain"
    },
    {
        src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
        alt: "Engineer staying sharp",
        caption: "Physical discipline mirrors structural discipline"
    }
]

const GYM_CARD_DETAILS = [
    {
        number: "01",
        eyebrow: "05:30 AM Ritual",
        title: "Before the Site Wakes",
        subtitle: "Discipline starts before the first briefing, call, or concrete pour.",
        specs: [
            { label: "Window", value: "Mon-Fri, 5:30 AM" },
            { label: "Mode", value: "Lift + conditioning" },
            { label: "Focus", value: "Consistency over mood" },
            { label: "Carryover", value: "Sharper site starts" },
        ],
        badges: ["Rain or shine", "Before deadlines", "Foundation"]
    },
    {
        number: "02",
        eyebrow: "Controlled Stress",
        title: "Strength Under Control",
        subtitle: "The body adapts to measured pressure the same way engineered systems do.",
        specs: [
            { label: "Method", value: "Compound lifts" },
            { label: "Principle", value: "Load with precision" },
            { label: "Response", value: "Recover, then return" },
            { label: "Carryover", value: "Calmer leadership" },
        ],
        badges: ["Composure", "Output", "Structure"]
    },
    {
        number: "03",
        eyebrow: "Progressive Load",
        title: "Load, Recover, Repeat",
        subtitle: "Progressive overload is engineering logic translated into physical practice.",
        specs: [
            { label: "Principle", value: "Stress + recovery" },
            { label: "Tempo", value: "Incremental gains" },
            { label: "Mindset", value: "Repeat without drama" },
            { label: "Carryover", value: "Long-project endurance" },
        ],
        badges: ["Adaptation", "Endurance", "Precision"]
    },
    {
        number: "04",
        eyebrow: "Reset System",
        title: "Clarity Through Effort",
        subtitle: "Physical discipline turns pressure into motion and returns the mind lighter.",
        specs: [
            { label: "Effect", value: "Mental clarity" },
            { label: "Result", value: "Emotional regulation" },
            { label: "Standard", value: "Consistency under load" },
            { label: "Carryover", value: "Sharper stakeholder work" },
        ],
        badges: ["Reset", "Resilience", "Resolve"]
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
    const [activeGymCard, setActiveGymCard] = useState<number | null>(null)
    const [gymAccordionEnabled, setGymAccordionEnabled] = useState(false)
    const [gymAccordionCanHover, setGymAccordionCanHover] = useState(false)

    useEffect(() => {
        const viewportQuery = window.matchMedia("(min-width: 768px)")
        const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)")

        const syncGymAccordion = () => {
            const isEnabled = viewportQuery.matches
            const canHover = hoverQuery.matches

            setGymAccordionEnabled(isEnabled)
            setGymAccordionCanHover(isEnabled && canHover)
            setActiveGymCard(isEnabled && !canHover ? 0 : null)
        }

        syncGymAccordion()

        viewportQuery.addEventListener("change", syncGymAccordion)
        hoverQuery.addEventListener("change", syncGymAccordion)

        return () => {
            viewportQuery.removeEventListener("change", syncGymAccordion)
            hoverQuery.removeEventListener("change", syncGymAccordion)
        }
    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero entrance — staggered fade-up
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

    const handleGymCardPointerEnter = (index: number) => {
        if (!gymAccordionEnabled || !gymAccordionCanHover) return
        setActiveGymCard(index)
    }

    const handleGymGridPointerLeave = () => {
        if (!gymAccordionEnabled || !gymAccordionCanHover) return
        setActiveGymCard(null)
    }

    const handleGymCardFocus = (index: number) => {
        if (!gymAccordionEnabled) return
        setActiveGymCard(index)
    }

    const handleGymGridBlur = (event: FocusEvent<HTMLDivElement>) => {
        if (!gymAccordionEnabled || !gymAccordionCanHover) return

        const nextTarget = event.relatedTarget as Node | null
        if (nextTarget && event.currentTarget.contains(nextTarget)) return

        setActiveGymCard(null)
    }

    const handleGymCardClick = (index: number) => {
        if (!gymAccordionEnabled || gymAccordionCanHover) return
        setActiveGymCard(index)
    }

    const handleGymCardKeyDown = (event: KeyboardEvent<HTMLElement>, index: number) => {
        if (!gymAccordionEnabled) return

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            setActiveGymCard(index)
        }
    }

    return (
        <div ref={containerRef} className="about-page">
            <AboutSplitHero />

            <div className="about-container">

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
                                <h2 className="origin-headline">Curiosity Built from the Ground Up</h2>
                            </div>
                            <div className="abt-reveal-scroll opacity-0 translate-y-8">
                                <p className="origin-paragraph">
                                    I was 9 years old, standing in the rain while my dad built our family home. I watched the foundation walls hold the water — portion by portion, the ground absorbing it, the structure containing it. I didn&apos;t have the words for it then. But I couldn&apos;t look away.
                                </p>
                            </div>
                            <div className="abt-reveal-scroll opacity-0 translate-y-8">
                                <p className="origin-paragraph">
                                    That early fascination became a degree in Structural Engineering, a career on construction sites across East Africa, and eventually a leadership role where I coordinate not just steel and concrete — but everything and everyone between concept and completion.
                                </p>
                            </div>
                            <blockquote className="origin-quote abt-reveal-scroll opacity-0 translate-y-8">
                                &ldquo;Engineering is 30% calculations, 70% people. I learned that in year three — and I&apos;ve never forgotten it.&rdquo;
                            </blockquote>
                        </div>

                        <div className="origin-anecdote origin-anecdote-fullwidth abt-reveal-scroll opacity-0 translate-y-8">
                            <p className="origin-anecdote-text">
                                I&apos;ve been fortunate. The foreman I work with is exactly who you want on a site — professional, precise, someone who cares about the work more than about who&apos;s giving the direction. Together, we&apos;ve built 6 blocks of 300 housing units. That partnership is what construction should look like. But I&apos;m not naive about the industry. I&apos;ve heard from women who walked onto sites and were addressed as secretaries. Women whose specifications were quietly revised by foremen who couldn&apos;t accept that a woman had written them. Women who had to stand in the rain and prove something no man on that site was ever asked to prove. I was spared that. Not every woman is.
                            </p>
                            <div className="origin-anecdote-divider" aria-hidden="true" />
                            <p className="origin-anecdote-text">
                                What I wasn&apos;t spared is this: I&apos;ve stood in a room and proposed a technical solution — the right one — only to watch it gain traction an hour later when a male colleague said the same thing. I&apos;ve had to follow up my own recommendations in writing, calculations attached, just to be taken as seriously as a verbal opinion from someone else. I&apos;ve walked onto sites and been asked twice whether I&apos;m the engineer. Not once, from confusion. Twice, from disbelief. I don&apos;t lead with this because it defines me. I lead with it because pretending it doesn&apos;t happen leaves the next woman unprepared.
                            </p>
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

                    <div
                        className="gym-grid"
                        onPointerLeave={handleGymGridPointerLeave}
                        onBlur={handleGymGridBlur}
                    >
                        {GYM_IMAGES.map((img, i) => {
                            const detail = GYM_CARD_DETAILS[i]
                            const isActive = activeGymCard === i

                            return (
                                <article
                                    className={[
                                        "gym-card",
                                        gymAccordionEnabled ? "gym-card-interactive" : "",
                                        isActive ? "active" : "",
                                        gymAccordionEnabled && activeGymCard !== null && !isActive ? "inactive" : "",
                                    ].filter(Boolean).join(" ")}
                                    key={detail.number}
                                    onPointerEnter={() => handleGymCardPointerEnter(i)}
                                    onFocus={() => handleGymCardFocus(i)}
                                    onClick={() => handleGymCardClick(i)}
                                    onKeyDown={(event) => handleGymCardKeyDown(event, i)}
                                    role={gymAccordionEnabled ? "button" : undefined}
                                    tabIndex={gymAccordionEnabled ? 0 : undefined}
                                    aria-pressed={gymAccordionEnabled ? isActive : undefined}
                                    aria-label={gymAccordionEnabled ? `${detail.title}. ${detail.subtitle}` : undefined}
                                >
                                    <div className="gym-card-image-wrap">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="gym-card-img"
                                            sizes="(max-width: 767px) 50vw, 40vw"
                                            unoptimized
                                        />
                                        <div className="gym-card-overlay" />
                                        <div className="gym-card-content">
                                            <div className="gym-card-number">{detail.number}</div>
                                            <div className="gym-card-eyebrow">{detail.eyebrow}</div>
                                            <h3 className="gym-card-title">{detail.title}</h3>
                                            <p className="gym-card-subtitle">{detail.subtitle}</p>
                                            <div className="gym-card-specs">
                                                {detail.specs.map((spec) => (
                                                    <div className="gym-card-spec-row" key={`${detail.number}-${spec.label}`}>
                                                        <span className="gym-card-spec-label">{spec.label}</span>
                                                        <span className="gym-card-spec-value">{spec.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="gym-card-badges">
                                                {detail.badges.map((badge) => (
                                                    <div className="gym-card-badge" key={`${detail.number}-${badge}`}>
                                                        <div className="gym-card-badge-icon" />
                                                        <span>{badge}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <span className="gym-card-add-button" aria-hidden="true" />
                                    </div>
                                    <div className="gym-card-caption">{img.caption}</div>
                                </article>
                            )
                        })}
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
                            <div className="abt-reveal-scroll opacity-0 translate-y-8">
                                <p className="inspiration-para">
                                    No one will tell you this enough, so I will: some rooms will assume less of you before you&apos;ve spoken. Some sites will make you prove what no one asked your male colleagues to prove. That is not a maybe — it is a likelihood. The response is not to harden or hide. It is to be so prepared that dismissal becomes untenable. Know your calculations cold. Know the codes. Know the ground beneath the project before anyone asks. But also prepare the parts of yourself that no textbook covers: the composure to stay technical when someone gets personal; the resilience to re-enter a room after being talked over in it; the quiet certainty that doesn&apos;t need external validation to keep functioning. A prepared woman is harder to dismiss. That is not just armour. That is architecture.
                                </p>
                            </div>
                            <blockquote className="inspiration-quote abt-reveal-scroll opacity-0 translate-y-8">
                                &ldquo;If you could talk to your 22-year-old self on your first day of engineering school — what would you say? Keep going. The young girl who&apos;ll see you on a construction site and think: &lsquo;That could be me.&rsquo; She&apos;s watching.&rdquo;
                            </blockquote>
                        </div>
                        <div className="inspiration-image-col abt-reveal-scroll opacity-0 translate-y-8">
                            <div className="inspiration-image-frame">
                                <Image
                                    src="/images/about/Kossi-Blur.jpeg"
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
                                <span className="credential-detail">Jomo Kenyatta University of Agriculture and Technology</span>
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
                            <div className="credential-item">
                                <span className="credential-name">Engineers Board of Kenya (EBK) Member</span>
                                <span className="credential-detail">Membership details available upon request for serious business or employment opportunities.</span>
                            </div>
                        </div>
                        <div className="credential-group">
                            <h3 className="credential-group-title">Leadership</h3>
                            <div className="credential-item">
                                <span className="credential-name">General Manager</span>
                                <span className="credential-detail">Haven Heights Limited, Ruiru</span>
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
