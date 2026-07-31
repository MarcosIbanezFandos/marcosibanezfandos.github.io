import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Bespoke, per-employer / per-project artwork.
 *
 * Everything here is hand-drawn SVG — no third-party logo files — so the marks
 * stay ours, scale crisply and cost almost nothing to load. Each piece animates
 * only while it is on screen (`whileInView`) and collapses to a static frame
 * when the visitor prefers reduced motion.
 */

/* ── Brand mark ────────────────────────────────────────────────────────────
   Each logo is used as a CSS mask and painted with the current text colour, so
   it renders as a single tone with no background at all: dark ink on the light
   theme, light ink on the dark one.                                          */
const Mark = ({ src, label, className = '', size = 'md' }) => (
    <span
        role="img"
        aria-label={label}
        title={label}
        className={`block shrink-0 bg-slate-700/85 dark:bg-slate-200/90 ${
            size === 'lg' ? 'h-10 w-10' : 'h-9 w-9'
        } ${className}`}
        style={{
            maskImage: `url(${src})`,
            WebkitMaskImage: `url(${src})`,
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
        }}
    />
)

/* ── BMW · Transaction Pricing ──────────────────────────────────────────────
   The three M stripes, the roundel easing in, and a real M3 Competition that
   drives across the card on hover.                                          */
export const BmwArt = ({ hovered }) => {
    const reduce = useReducedMotion()
    const spin = hovered && !reduce
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            {/* M stripes */}
            <div className="absolute left-0 top-0 h-full w-[3px] overflow-hidden">
                <motion.div
                    className="h-full w-full"
                    initial={{ y: '-100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        background:
                            'linear-gradient(180deg,#6CB2E4 0%,#6CB2E4 33%,#0166B1 33%,#0166B1 66%,#E7222E 66%,#E7222E 100%)',
                    }}
                />
            </div>

            <motion.div
                className="absolute right-4 top-4"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.15 }}
            >
                <motion.div
                    animate={spin ? { rotate: 360 } : { rotate: 0 }}
                    transition={spin ? { duration: 1.6, ease: 'linear', repeat: Infinity } : { duration: 0.4 }}
                >
                    <Mark src="/logos/bmw.svg" label="BMW" />
                </motion.div>
            </motion.div>

        </div>
    )
}

/* ── Pamesa · Ceramics ──────────────────────────────────────────────────────
   The logo settles onto the card like a tile being laid, and shimmers on
   hover the way a glazed surface catches light.                             */
export const PamesaArt = ({ hovered }) => {
    const reduce = useReducedMotion()
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <motion.div
                className="absolute right-4 top-4"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            >
                <motion.div
                    animate={hovered && !reduce ? { rotateY: [0, 180, 360] } : { rotateY: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                >
                    <Mark src="/logos/pamesa.png" label="Pamesa Ceramics" />
                </motion.div>
            </motion.div>
            <motion.div
                className="absolute left-0 top-0 h-full w-[3px] bg-clay-500"
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                style={{ originY: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
        </div>
    )
}

/* ── ETRA I+D · Data / smart cities ─────────────────────────────────────────
   The logo arrives with a signal pulse rippling out from it.                */
export const EtraArt = ({ hovered }) => {
    const reduce = useReducedMotion()
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute right-4 top-4">
                <motion.span
                    className="absolute inset-0 rounded-xl ring-2 ring-emerald-400/60"
                    initial={{ opacity: 0 }}
                    animate={reduce ? {} : { scale: [1, 1.55], opacity: [0.55, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 17, delay: 0.15 }}
                >
                    <motion.div animate={hovered && !reduce ? { y: [0, -4, 0] } : { y: 0 }}
                        transition={{ duration: 1, repeat: hovered ? Infinity : 0 }}>
                        <Mark src="/logos/etra.png" label="ETRA I+D" />
                    </motion.div>
                </motion.div>
            </div>
            <motion.div
                className="absolute left-0 top-0 h-full w-[3px] bg-emerald-500"
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                style={{ originY: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
        </div>
    )
}

export const CompanyArt = ({ theme, hovered }) => {
    if (theme === 'bmw') return <BmwArt hovered={hovered} />
    if (theme === 'pamesa') return <PamesaArt hovered={hovered} />
    if (theme === 'etra') return <EtraArt hovered={hovered} />
    return null
}

/* ── Project thumbnails ─────────────────────────────────────────────────────
   Each project gets a live miniature of what it actually does.              */

// Fandance: a clean upward line with a soft area fill — instantly readable as
// "a portfolio growing", without the clutter of a full chart.
const FandanceViz = () => (
    <svg viewBox="0 0 100 56" className="h-full w-full" preserveAspectRatio="none">
        <defs>
            <linearGradient id="fdFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
        </defs>
        <motion.path
            d="M4 46 C 22 42, 30 34, 44 30 C 58 26, 66 16, 96 8 L96 56 L4 56 Z"
            fill="url(#fdFill)"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.35 }}
        />
        <motion.path
            d="M4 46 C 22 42, 30 34, 44 30 C 58 26, 66 16, 96 8"
            fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
        />
        <motion.circle
            cx="96" cy="8" r="4" fill="#10b981"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 1 }}
        />
    </svg>
)

// Bachelor thesis: an ROC curve drawing itself above the diagonal — a
// deliberately different visual language from the fraud project's matrix.
const ThesisViz = () => (
    <svg viewBox="0 0 100 60" className="h-full w-full">
        <line x1="10" y1="52" x2="92" y2="52" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />
        <line x1="10" y1="52" x2="10" y2="6" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />
        <line x1="10" y1="52" x2="88" y2="8" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="3 3" />
        <motion.path
            d="M10 52 C 22 20, 44 10, 88 8" fill="none" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <motion.circle
            r="3.5" className="fill-sky-500"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 1.1 }}
            cx="34" cy="20"
        />
    </svg>
)

// Game of the Goose: the goose itself, bobbing gently.
const OcaViz = () => (
    <svg viewBox="0 0 100 60" className="h-full w-full">
        <motion.g
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <motion.g animate={{ y: [0, -2.5, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
                {/* body */}
                <ellipse cx="52" cy="38" rx="24" ry="14" className="fill-slate-600 dark:fill-slate-100" />
                {/* wing */}
                <path d="M40 34c8-5 20-5 26 1-5 6-18 8-26-1z" className="fill-slate-400 dark:fill-slate-300" />
                {/* tail */}
                <path d="M76 34l12-5-3 8 3 3-12 1z" className="fill-slate-600 dark:fill-slate-100" />
                {/* neck + head */}
                <path d="M32 40c-5-4-6-11-4-17 2-7 8-11 13-10-4 2-7 6-8 11-1 6 1 11 5 14z"
                    className="fill-slate-600 dark:fill-slate-100" />
                <circle cx="39" cy="14" r="7.5" className="fill-slate-600 dark:fill-slate-100" />
                <circle cx="41.5" cy="12" r="1.6" className="fill-white dark:fill-slate-800" />
                {/* beak */}
                <path d="M31.5 14l-9 2.5 9 3z" className="fill-amber-400" />
            </motion.g>
            {/* legs */}
            <path d="M46 51v6M58 51v6" className="stroke-amber-400" strokeWidth="2.5" strokeLinecap="round" />
            {/* water ripple */}
            <motion.path d="M28 58h48" className="stroke-sky-400/60" strokeWidth="2" strokeLinecap="round"
                animate={{ opacity: [0.35, 0.8, 0.35] }} transition={{ duration: 2.4, repeat: Infinity }} />
        </motion.g>
    </svg>
)

// Credit-card fraud: a confusion matrix where the caught-fraud cell pulses.
const FraudViz = () => (
    <div className="grid h-full w-full grid-cols-2 gap-1.5 p-1">
        {[0, 1, 2, 3].map(i => (
            <motion.div
                key={i}
                className={`rounded-md ${i === 0 ? 'bg-emerald-500' : i === 3 ? 'bg-rose-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: i === 0 || i === 3 ? 1 : 0.45, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                animate={i === 3 ? { opacity: [0.7, 1, 0.7] } : undefined}
            />
        ))}
    </div>
)

export const ProjectViz = ({ theme }) => {
    const inner =
        theme === 'fandance' ? <FandanceViz /> :
        theme === 'fraud' ? <FraudViz /> :
        theme === 'thesis' ? <ThesisViz /> :
        theme === 'oca' ? <OcaViz /> : null
    if (!inner) return null
    return (
        <div className="h-16 w-24 shrink-0 rounded-xl border border-slate-200/70 bg-slate-100/60 p-1 dark:border-slate-700/60 dark:bg-slate-800/50 sm:h-20 sm:w-32">
            {inner}
        </div>
    )
}

/* ── Research · spiking neural network ──────────────────────────────────────
   Literal nod to the Hybrid Neural Networks paper: spikes propagate across
   the layers.                                                               */
export const NeuralArt = () => {
    const layers = [[18, 34, 50], [16, 32, 48, 64], [26, 42]]
    const xs = [16, 56, 96]
    return (
        <svg viewBox="0 0 112 80" className="h-16 w-24 shrink-0 sm:h-20 sm:w-32" aria-hidden="true">
            {layers.slice(0, 2).map((from, li) =>
                from.map((y0, i) =>
                    layers[li + 1].map((y1, j) => (
                        <line key={`${li}-${i}-${j}`} x1={xs[li]} y1={y0} x2={xs[li + 1]} y2={y1}
                            className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="0.6" />
                    ))
                )
            )}
            {layers.map((ys, li) =>
                ys.map((y, i) => (
                    <motion.circle
                        key={`n-${li}-${i}`} cx={xs[li]} cy={y} r="4"
                        className={li === 1 ? 'fill-fuchsia-500' : 'fill-indigo-500'}
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.6, repeat: Infinity, delay: li * 0.35 + i * 0.12 }}
                    />
                ))
            )}
        </svg>
    )
}

/* ── University marks ───────────────────────────────────────────────────────
   Same chip language as the employers, so Education reads as part of the
   same system: the logo scales in, a ring traces around it, and it lifts on
   hover.                                                                    */
const UNIS = {
    upv: { src: '/logos/upv.svg', alt: 'Universitat Politècnica de València', ring: 'ring-red-500/40' },
    tum: { src: '/logos/tum.svg', alt: 'Technical University of Munich', ring: 'ring-sky-500/40' },
    ie: { src: '/logos/ie.svg', alt: 'IE University', ring: 'ring-indigo-500/40' },
}

export const UniversityMark = ({ id }) => {
    const uni = UNIS[id]
    if (!uni) return null
    return (
        <motion.div
            className="shrink-0"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <motion.div whileHover={{ y: -3, scale: 1.08 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
                <Mark src={uni.src} label={uni.alt} size="lg" />
            </motion.div>
        </motion.div>
    )
}

/* ── Flag bars for the Languages section ────────────────────────────────────
   The flag is painted behind the row: vivid across the proficiency portion,
   muted across the rest, with a scrim so the text stays perfectly legible. */
export const FLAGS = {
    es: 'linear-gradient(180deg,#AA151B 0 25%,#F1BF00 25% 75%,#AA151B 75% 100%)',
    gb: [
        'linear-gradient(90deg,transparent 45%,#C8102E 45% 55%,transparent 55%)',
        'linear-gradient(180deg,transparent 42%,#C8102E 42% 58%,transparent 58%)',
        'linear-gradient(90deg,transparent 40%,#fff 40% 60%,transparent 60%)',
        'linear-gradient(180deg,transparent 36%,#fff 36% 64%,transparent 64%)',
        'linear-gradient(#012169,#012169)',
    ].join(','),
    fr: 'linear-gradient(90deg,#0055A4 0 33.3%,#FFFFFF 33.3% 66.6%,#EF4135 66.6% 100%)',
    de: 'linear-gradient(180deg,#000 0 33.3%,#DD0000 33.3% 66.6%,#FFCE00 66.6% 100%)',
    va: [
        'linear-gradient(90deg,#0055A4 0 13%,transparent 13%)',
        'linear-gradient(180deg,#F1BF00 0 12.5%,#DA121A 12.5% 25%,#F1BF00 25% 37.5%,#DA121A 37.5% 50%,#F1BF00 50% 62.5%,#DA121A 62.5% 75%,#F1BF00 75% 87.5%,#DA121A 87.5% 100%)',
    ].join(','),
}
