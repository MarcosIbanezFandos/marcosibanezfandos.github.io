import React, { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** Fades content up as it scrolls into view. Content is always in the DOM. */
export const Reveal = ({ children, delay = 0, y = 18, className = '' }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
)

/** Section wrapper with the sticky mobile heading. */
export const Section = ({ id, title, children }) => (
    <section id={id} className="mb-20 scroll-mt-16 md:mb-28 lg:scroll-mt-24" aria-label={title}>
        <div className="sticky top-0 z-20 -mx-6 mb-5 w-screen bg-slate-50/80 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 dark:bg-slate-950/80">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-slate-200">{title}</h2>
        </div>
        {children}
    </section>
)

/** Card that lifts and lights up on hover, exposing `hovered` to its children. */
export const GlowCard = ({ children, href, className = '' }) => {
    const [hovered, setHovered] = useState(false)
    const Wrapper = href ? motion.a : motion.div
    const props = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer noopener' } : {}
    return (
        <Wrapper
            {...props}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className={`group relative block overflow-hidden rounded-2xl border border-transparent p-5 transition-colors duration-300 hover:border-slate-200/80 hover:bg-white/70 hover:shadow-lg hover:shadow-slate-200/40 dark:hover:border-slate-700/60 dark:hover:bg-slate-800/40 dark:hover:shadow-black/20 ${className}`}
        >
            {typeof children === 'function' ? children({ hovered }) : children}
        </Wrapper>
    )
}

/** Cursor spotlight + slow aurora blobs. Purely decorative. */
export const Background = () => {
    const reduce = useReducedMotion()
    const [pos, setPos] = useState({ x: 0, y: 0 })
    useEffect(() => {
        if (reduce || window.matchMedia('(pointer: coarse)').matches) return
        const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
        window.addEventListener('pointermove', onMove, { passive: true })
        return () => window.removeEventListener('pointermove', onMove)
    }, [reduce])

    return (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950" />
            {/* Aurora: soft radial gradients instead of blurred boxes — same look,
                without the heavy filter that makes low-end GPUs stutter. */}
            <div
                className="animate-drift absolute inset-[-20%] opacity-70 dark:opacity-50"
                style={{
                    backgroundImage: [
                        'radial-gradient(38rem 38rem at 12% 8%, rgb(56 189 248 / 0.22), transparent 60%)',
                        'radial-gradient(34rem 34rem at 88% 38%, rgb(129 140 248 / 0.20), transparent 60%)',
                        'radial-gradient(30rem 30rem at 35% 92%, rgb(45 212 191 / 0.18), transparent 60%)',
                    ].join(','),
                }}
            />
            {/* fine grid */}
            <div
                className="absolute inset-0 opacity-[0.16] dark:opacity-[0.12]"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, rgb(100 116 139 / .35) 1px, transparent 1px), linear-gradient(to bottom, rgb(100 116 139 / .35) 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
                }}
            />
            {!reduce && (
                <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(600px at ${pos.x}px ${pos.y}px, rgb(56 189 248 / 0.10), transparent 70%)`,
                    }}
                />
            )}
        </div>
    )
}

/** Thin progress bar tied to page scroll. */
export const ScrollProgress = ({ scaleX }) => (
    <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-gradient-to-r from-sky-400 via-indigo-500 to-fuchsia-500"
        aria-hidden="true"
    />
)

/** Letter-by-letter reveal for the hero role line. */
export const ScrambleText = ({ text, className = '' }) => {
    const reduce = useReducedMotion()
    const [shown, setShown] = useState(reduce ? text : '')
    const ref = useRef(text)
    useEffect(() => {
        if (reduce) { setShown(text); return }
        ref.current = text
        setShown('')
        let i = 0
        const id = setInterval(() => {
            i += 1
            setShown(text.slice(0, i))
            if (i >= text.length) clearInterval(id)
        }, 26)
        return () => clearInterval(id)
    }, [text, reduce])
    return (
        <span className={className}>
            {shown}
            {shown.length < text.length && <span className="animate-pulse text-sky-500">▌</span>}
        </span>
    )
}

/** Chip used for skills / tech stacks. */
export const Chip = ({ children, tone = 'default' }) => (
    <li
        className={`rounded-full px-3 py-1 text-[11px] font-semibold leading-5 ${
            tone === 'accent'
                ? 'bg-sky-400/10 text-sky-700 dark:text-sky-300'
                : 'bg-slate-900/[0.06] text-slate-700 dark:bg-slate-100/10 dark:text-slate-300'
        }`}
    >
        {children}
    </li>
)
