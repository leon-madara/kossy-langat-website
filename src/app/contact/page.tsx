"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { SectionLabel } from "@/components/ui/SectionLabel"
import "./ContactPage.css"

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle")

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".c-reveal", {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.1
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFormStatus("submitting")
        // Simulate API call
        setTimeout(() => {
            setFormStatus("success")
            // Reset after 3 seconds
            setTimeout(() => setFormStatus("idle"), 3000)
        }, 1500)
    }

    return (
        <div ref={containerRef} className="contact-page">
            <div className="texture-overlay" />

            <div className="contact-container">
                <header className="contact-hero">
                    <div className="c-reveal">
                        <SectionLabel number="05" text="START A CONVERSATION" className="mb-8" />
                    </div>
                    <h1 className="contact-headline c-reveal">
                        Let&apos;s align your project&apos;s <span className="highlight">physical</span> and financial structures.
                    </h1>
                </header>

                <div className="contact-grid">
                    {/* Left Column: Information */}
                    <div className="contact-info-block">
                        <div className="info-item c-reveal">
                            <span className="info-label">Direct Contact</span>
                            <a href="mailto:hello@kossylangat.com" className="info-link">hello@kossylangat.com</a>
                        </div>

                        <div className="info-item c-reveal">
                            <span className="info-label">Network</span>
                            <a href="https://linkedin.com/in/naomi-langat" target="_blank" rel="noopener noreferrer" className="info-link">
                                LinkedIn ↗
                            </a>
                        </div>

                        <div className="info-item c-reveal">
                            <span className="info-label">Response Expectation</span>
                            <p className="info-text">
                                I aim to respond to all serious project inquiries and speaking requests within 48 business hours. For urgent structural consultations, please indicate in the subject line.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group c-reveal">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                placeholder="Jane Doe"
                                required
                            />
                        </div>

                        <div className="form-group c-reveal">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                placeholder="jane@company.com"
                                required
                            />
                        </div>

                        <div className="form-group c-reveal">
                            <label htmlFor="inquiryType" className="form-label">Inquiry Type</label>
                            <select id="inquiryType" name="inquiryType" className="form-select" required>
                                <option value="" disabled selected>Select an option...</option>
                                <option value="structural">Structural Engineering Consulting</option>
                                <option value="eps">EPS Panel implementation</option>
                                <option value="speaking">Speaking Engagement / Keynote</option>
                                <option value="mentorship">Mentorship</option>
                                <option value="other">Other Inquiry</option>
                            </select>
                        </div>

                        <div className="form-group c-reveal">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                className="form-textarea"
                                placeholder="Briefly describe your project or request..."
                                required
                            />
                        </div>

                        <div className="c-reveal">
                            <button
                                type="submit"
                                className="form-submit"
                                disabled={formStatus === "submitting" || formStatus === "success"}
                            >
                                {formStatus === "idle" && "Send Inquiry"}
                                {formStatus === "submitting" && "Sending..."}
                                {formStatus === "success" && "Message Sent"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
