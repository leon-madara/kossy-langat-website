"use client"

import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface AnimatedTextProps {
    children: ReactNode
    className?: string
    delay?: number
    /** Direction the element fades in from */
    direction?: "up" | "down" | "left" | "right" | "none"
    /** Run animation only once when it enters the viewport */
    once?: boolean
}

const buildVariants = (direction: AnimatedTextProps["direction"]): Variants => {
    const offset = 24
    const map = {
        up: { y: offset },
        down: { y: -offset },
        left: { x: offset },
        right: { x: -offset },
        none: {},
    }
    const initial = { opacity: 0, ...map[direction ?? "up"] }
    return {
        hidden: initial,
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
        },
    }
}

export function AnimatedReveal({
    children,
    className,
    delay = 0,
    direction = "up",
    once = true,
}: AnimatedTextProps) {
    const variants = buildVariants(direction)

    return (
        <motion.div
            className={cn("will-change-transform", className)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-150px" }}
            transition={{ delay }}
            variants={variants}
        >
            {children}
        </motion.div>
    )
}
