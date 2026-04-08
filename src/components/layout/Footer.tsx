import Image from "next/image"
import Link from "next/link"

const FOOTER_LINKS = {
    Capabilities: [
        { name: "Structural Engineering", href: "/expertise#structural" },
        { name: "EPS Systems", href: "/expertise#eps" },
        { name: "Operations Management", href: "/expertise#operations" },
        { name: "Cost Alignment", href: "/expertise#cost" },
    ],
    Company: [
        { name: "About Kossy", href: "/about" },
        { name: "Featured Work", href: "/work" },
        { name: "Insights & Articles", href: "/insights" },
        { name: "For Young Women", href: "/mentorship" },
    ],
    Connect: [
        { name: "LinkedIn", href: "#", external: true },
        { name: "Start a Project", href: "/contact" },
        { name: "Speaking Inquiries", href: "/contact?type=speaking" },
    ],
}

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full bg-primary text-background px-4 md:px-8 pt-24 pb-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-background/20">

                    {/* Brand & Mission Statement */}
                    <div className="lg:col-span-5 flex flex-col items-start">
                        <Link href="/" className="mb-6 group inline-block">
                            <Image
                                src="/KOSSYmain.svg"
                                alt="Kossy"
                                className="h-9 w-auto max-w-[min(220px,85vw)] object-contain object-left transition-opacity group-hover:opacity-90"
                                width={786}
                                height={193}
                                unoptimized
                            />
                        </Link>

                        <p className="font-sans text-lg text-background/80 max-w-sm leading-relaxed mb-8">
                            I don&apos;t just build structures. I build alignment between the people who make them possible.
                        </p>

                        <Link
                            href="/contact"
                            className="footer-cta inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all bg-background rounded-sm hover:bg-background/90 cta-conic-border"
                        >
                            Start A Conversation
                        </Link>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-serif text-lg font-medium text-background mb-4">Capabilities</h3>
                            <ul className="space-y-3">
                                {FOOTER_LINKS.Capabilities.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="font-sans text-sm text-background/70 hover:text-accent hover:underline underline-offset-4 transition-all">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-serif text-lg font-medium text-background mb-4">Explore</h3>
                            <ul className="space-y-3">
                                {FOOTER_LINKS.Company.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="font-sans text-sm text-background/70 hover:text-accent hover:underline underline-offset-4 transition-all">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-span-2 sm:col-span-1 border-t border-background/20 sm:border-none pt-6 sm:pt-0">
                            <h3 className="font-serif text-lg font-medium text-background mb-4">Connect</h3>
                            <ul className="space-y-3">
                                {FOOTER_LINKS.Connect.map((link) => (
                                    <li key={link.name}>
                                        {link.external ? (
                                            <a href={link.href} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-background/70 hover:text-accent hover:underline underline-offset-4 transition-all flex items-center gap-1">
                                                {link.name}
                                                <span className="text-[10px] ml-0.5">↗</span>
                                            </a>
                                        ) : (
                                            <Link href={link.href} className="font-sans text-sm text-background/70 hover:text-accent hover:underline underline-offset-4 transition-all">
                                                {link.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-sm text-background/50 font-sans">
                    <p>© {currentYear} Naomi &quot;Kossy&quot; Lang&apos;at Chepkoskei. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-background transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
