"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { motion, AnimatePresence } from "framer-motion"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { ChevronDown } from "lucide-react"
import "./ContactPage.css"

const INQUIRY_OPTIONS = [
    { value: "structural", label: "Structural Engineering Consulting" },
    { value: "eps", label: "EPS Panel implementation" },
    { value: "speaking", label: "Speaking Engagement / Keynote" },
    { value: "mentorship", label: "Mentorship" },
    { value: "other", label: "Other Inquiry" }
]

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const inquirySelectRef = useRef<HTMLDivElement>(null)
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null)

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

    useEffect(() => {
        if (!isDropdownOpen) return

        const handlePointerDown = (event: PointerEvent) => {
            const inquiryEl = inquirySelectRef.current
            if (!inquiryEl) return

            const target = event.target
            if (!(target instanceof Node)) return

            if (!inquiryEl.contains(target)) setIsDropdownOpen(false)
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsDropdownOpen(false)
        }

        document.addEventListener("pointerdown", handlePointerDown)
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isDropdownOpen])

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
                        <div className="form-group form-group--name c-reveal">
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

                        <div className="form-group form-group--email c-reveal">
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

                        <div
                            ref={inquirySelectRef}
                            className={`form-group form-group--inquiry c-reveal custom-select-group ${isDropdownOpen ? 'is-open' : ''}`}
                        >
                            <label className="form-label">Inquiry Type</label>

                            <button
                                type="button"
                                className="custom-select-trigger"
                                aria-haspopup="listbox"
                                aria-expanded={isDropdownOpen}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <span className={!selectedOption ? "placeholder" : ""}>
                                    {selectedOption ? selectedOption.label : "Select an option..."}
                                </span>
                                <motion.div
                                    className="custom-select-icon"
                                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown size={18} />
                                </motion.div>
                            </button>

                            <input
                                type="hidden"
                                name="inquiryType"
                                value={selectedOption?.value || ""}
                                required
                            />

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        className="custom-select-options-wrapper"
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.18, ease: "easeOut" }}
                                    >
                                        <div className="custom-select-divider" />
                                        <div className="custom-select-options" role="listbox">
                                            {INQUIRY_OPTIONS.map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    className={`custom-select-item ${selectedOption?.value === option.value ? 'is-selected' : ''}`}
                                                    role="option"
                                                    aria-selected={selectedOption?.value === option.value}
                                                    onClick={() => {
                                                        setSelectedOption(option)
                                                        setIsDropdownOpen(false)
                                                    }}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>


                        <div className="form-group form-group--message c-reveal">
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
