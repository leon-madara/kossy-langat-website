"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { AnimatedThemeToggler } from "@/components/ui/AnimatedThemeToggler"
import "./Header.css"

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Expertise", href: "/expertise" },
    { name: "Work", href: "/work" },
    { name: "Insights", href: "/insights" },
    { name: "Mentorship", href: "/mentorship" },
    { name: "Contact", href: "/contact" },
]

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpenOnPath, setMobileMenuOpenOnPath] = useState<string | null>(null)
    const pathname = usePathname()
    const isMobileMenuOpen = mobileMenuOpenOnPath === pathname

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "site-header",
                isScrolled && "site-header--scrolled"
            )}
        >
            <div className="site-header__inner">
                {/* Logo Mark */}
                <Link href="/" className="site-header__brand">
                    <Image
                        src="/KOSSYmain.svg"
                        alt="Kossy"
                        className="site-header__brand-logo"
                        width={786}
                        height={193}
                        priority
                        unoptimized
                    />
                    <span className="site-header__brand-logo-mask" aria-hidden="true" />
                    <span className="site-header__brand-subtitle">Structural Engineer</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="site-header__nav" aria-label="Primary">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "site-header__link",
                                    isActive && "site-header__link--active"
                                )}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="site-header__controls">
                    {/* Theme Toggle */}
                    <AnimatedThemeToggler className="site-header__theme-toggle" />

                    {/* Desktop CTA */}
                    <div className="site-header__cta">
                        <Link
                            href="/contact"
                            className="site-header__cta-btn cta-conic-border"
                        >
                            Start A Conversation
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        type="button"
                        className={cn(
                            "site-header__menu-toggle",
                            isMobileMenuOpen && "site-header__menu-toggle--open"
                        )}
                        onClick={() => setMobileMenuOpenOnPath((prev) => (prev === pathname ? null : pathname))}
                        aria-label="Toggle Menu"
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="site-header-mobile-overlay"
                    >
                        <span className="site-header__menu-icon" aria-hidden="true">
                            <span className="site-header__menu-line" />
                            <span className="site-header__menu-line" />
                            <span className="site-header__menu-line" />
                        </span>
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="site-header__mobile-overlay"
                            id="site-header-mobile-overlay"
                        >
                            <nav className="site-header__mobile-nav" aria-label="Mobile">
                                {NAV_LINKS.map((link, i) => {
                                    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
                                    return (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1, duration: 0.3 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "site-header__mobile-link",
                                                isActive && "site-header__mobile-link--active"
                                            )}
                                            onClick={() => setMobileMenuOpenOnPath(null)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                    )
                                })}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                                className="site-header__mobile-cta"
                            >
                                <Link
                                    href="/contact"
                                    className="site-header__mobile-cta-btn cta-conic-border"
                                    onClick={() => setMobileMenuOpenOnPath(null)}
                                >
                                    Start A Conversation
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}
