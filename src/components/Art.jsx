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

/* ── BMW · Transaction Pricing ──────────────────────────────────────────────
   The three M stripes, a tachometer needle that sweeps as the card appears
   (a nod to pricing "moving the needle") and a car silhouette that drives
   across on hover.                                                          */
export const BmwArt = ({ hovered }) => {
    const reduce = useReducedMotion()
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            {/* M stripes */}
            <div className="absolute left-0 top-0 h-full w-[3px] overflow-hidden">
                <motion.div
                    className="h-full w-full"
                    initial={{ y: '-100%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        background:
                            'linear-gradient(180deg,#6CB2E4 0%,#6CB2E4 33%,#0166B1 33%,#0166B1 66%,#E7222E 66%,#E7222E 100%)',
                    }}
                />
            </div>

            {/* Tachometer */}
            <svg viewBox="0 0 120 70" className="absolute right-3 top-3 h-16 w-28 opacity-70">
                <path d="M12 58 A48 48 0 0 1 108 58" fill="none" stroke="currentColor"
                    className="text-slate-300 dark:text-slate-700" strokeWidth="6" strokeLinecap="round" />
                <motion.path
                    d="M12 58 A48 48 0 0 1 108 58" fill="none" stroke="#0166B1" strokeWidth="6" strokeLinecap="round"
                    pathLength={1} initial={{ pathLength: 0 }} whileInView={{ pathLength: 0.72 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                />
                <motion.line
                    x1="60" y1="58" x2="60" y2="20" stroke="#E7222E" strokeWidth="2.5" strokeLinecap="round"
                    style={{ originX: '60px', originY: '58px' }}
                    initial={{ rotate: -88 }} whileInView={{ rotate: 42 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ type: 'spring', stiffness: 42, damping: 12, delay: 0.2 }}
                />
                <circle cx="60" cy="58" r="4" className="fill-slate-400 dark:fill-slate-600" />
            </svg>

            {/* Car silhouette drives across on hover */}
            <motion.svg
                viewBox="0 0 120 40" className="absolute bottom-2 left-0 h-8 w-28 text-bmw-blue dark:text-bmw-light"
                initial={{ x: '-40%', opacity: 0 }}
                animate={hovered && !reduce ? { x: '520%', opacity: [0, 1, 1, 0] } : { x: '-40%', opacity: 0 }}
                transition={{ duration: 1.9, ease: 'easeInOut' }}
                aria-hidden="true"
            >
                <path d="M6 28h4a8 8 0 0 1 16 0h44a8 8 0 0 1 16 0h6a3 3 0 0 0 3-3v-5c0-3-2-5-6-6l-14-2-9-7c-2-1.6-4-2-7-2H41c-3 0-5 1-7 3l-7 6-14 2c-4 .8-6 3-6 6v5a3 3 0 0 0 3 3z"
                    fill="currentColor" opacity="0.85" />
                <circle cx="18" cy="29" r="5" fill="currentColor" />
                <circle cx="78" cy="29" r="5" fill="currentColor" />
            </motion.svg>
        </div>
    )
}

/* ── Pamesa · Ceramics ──────────────────────────────────────────────────────
   Tiles tessellate into place, the way a ceramic surface is laid.           */
export const PamesaArt = ({ hovered }) => {
    const tiles = Array.from({ length: 16 })
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute right-3 top-3 grid grid-cols-4 gap-[3px] opacity-60">
                {tiles.map((_, i) => {
                    const row = Math.floor(i / 4)
                    const col = i % 4
                    return (
                        <motion.span
                            key={i}
                            className="block h-3.5 w-3.5 rounded-[3px]"
                            style={{ background: (row + col) % 2 ? '#C1663F' : '#E4A47C' }}
                            initial={{ opacity: 0, rotateY: 90, scale: 0.6 }}
                            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.45, delay: 0.04 * (row + col), ease: 'easeOut' }}
                            animate={hovered ? { rotateY: [0, 180, 360] } : {}}
                        />
                    )
                })}
            </div>
            <motion.div
                className="absolute left-0 top-0 h-full w-[3px] bg-clay-500"
                initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                style={{ originY: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
        </div>
    )
}

/* ── ETRA I+D · Data / smart cities ─────────────────────────────────────────
   An ETL pipeline: nodes light up in sequence while data flows along the
   dashed edges.                                                             */
export const EtraArt = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <svg viewBox="0 0 140 60" className="absolute right-3 top-4 h-16 w-32 opacity-75">
            <path d="M14 30 H54 M70 30 H110" stroke="currentColor" strokeWidth="1.5"
                strokeDasharray="4 6" className="animate-dash-flow text-emerald-500/70" fill="none" />
            {[14, 62, 118].map((cx, i) => (
                <motion.circle
                    key={cx} cx={cx} cy="30" r="7" fill="none" strokeWidth="2"
                    className={i === 1 ? 'stroke-teal-500' : 'stroke-emerald-500'}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.4, delay: 0.15 * i, ease: 'backOut' }}
                    style={{ originX: `${cx}px`, originY: '30px' }}
                />
            ))}
            {[14, 62, 118].map((cx, i) => (
                <motion.circle
                    key={`p${cx}`} cx={cx} cy="30" r="3" className="fill-emerald-400"
                    animate={{ opacity: [0.25, 1, 0.25] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.5 }}
                />
            ))}
        </svg>
        <motion.div
            className="absolute left-0 top-0 h-full w-[3px] bg-emerald-500"
            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            style={{ originY: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
    </div>
)

export const CompanyArt = ({ theme, hovered }) => {
    if (theme === 'bmw') return <BmwArt hovered={hovered} />
    if (theme === 'pamesa') return <PamesaArt hovered={hovered} />
    if (theme === 'etra') return <EtraArt />
    return null
}

/* ── Project thumbnails ─────────────────────────────────────────────────────
   Each project gets a live miniature of what it actually does.              */

// Fandance: the app's allocation gauge — segments draw in, then a needle
// settles on the target weight, mirroring what the rebalancer actually does.
const FandanceViz = () => {
    const arcs = [
        { color: '#10b981', from: 0, to: 0.36 },
        { color: '#6366f1', from: 0.36, to: 0.64 },
        { color: '#8b5cf6', from: 0.64, to: 0.84 },
        { color: '#f59e0b', from: 0.84, to: 1 },
    ]
    const R = 34
    const arc = (from, to) => {
        const a0 = Math.PI * (1 - from), a1 = Math.PI * (1 - to)
        const x0 = 50 + R * Math.cos(a0), y0 = 44 - R * Math.sin(a0)
        const x1 = 50 + R * Math.cos(a1), y1 = 44 - R * Math.sin(a1)
        return `M ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1}`
    }
    return (
        <svg viewBox="0 0 100 52" className="h-full w-full">
            {arcs.map((a, i) => (
                <motion.path
                    key={i} d={arc(a.from, a.to)} stroke={a.color} strokeWidth="9" fill="none" strokeLinecap="butt"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: 0.12 * i, ease: 'easeOut' }}
                />
            ))}
            {/* needle settling on target */}
            <motion.line
                x1="50" y1="44" x2="50" y2="16" strokeWidth="2.5" strokeLinecap="round"
                className="stroke-slate-700 dark:stroke-slate-200"
                style={{ originX: '50px', originY: '44px' }}
                initial={{ rotate: -78, opacity: 0 }}
                whileInView={{ rotate: 26, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ type: 'spring', stiffness: 45, damping: 11, delay: 0.5 }}
            />
            <circle cx="50" cy="44" r="3.5" className="fill-slate-700 dark:fill-slate-200" />
        </svg>
    )
}

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

// Game of the Goose: a spiral board where tokens hop forward, plus a die.
const OcaViz = () => {
    const squares = [
        [14, 46], [24, 42], [34, 38], [44, 36], [54, 36], [64, 38], [72, 44],
    ]
    return (
        <svg viewBox="0 0 90 60" className="h-full w-full">
            <path d="M14 46 C 30 30, 60 26, 72 44" fill="none"
                className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" strokeDasharray="2 3" />
            {squares.map(([cx, cy], i) => (
                <motion.rect
                    key={i} x={cx - 4} y={cy - 4} width="8" height="8" rx="2"
                    className={i % 3 === 0 ? 'fill-emerald-500' : 'fill-slate-300 dark:fill-slate-600'}
                    initial={{ opacity: 0, y: -6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.35, delay: 0.06 * i, ease: 'backOut' }}
                />
            ))}
            {/* token hopping along the board */}
            <motion.circle
                r="4" className="fill-rose-500"
                initial={{ opacity: 0 }}
                whileInView={{
                    opacity: 1,
                    cx: squares.map(s => s[0]),
                    cy: squares.map(s => s[1] - 9),
                }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 2.4, delay: 0.5, times: squares.map((_, i) => i / (squares.length - 1)), ease: 'easeInOut' }}
            />
            {/* die */}
            <rect x="66" y="8" width="16" height="16" rx="4" className="fill-white stroke-slate-300 dark:fill-slate-700 dark:stroke-slate-600" strokeWidth="1.5" />
            {[[71, 13], [77, 13], [71, 19], [77, 19]].map(([cx, cy], i) => (
                <motion.circle key={i} cx={cx} cy={cy} r="1.6" className="fill-slate-600 dark:fill-slate-200"
                    animate={{ opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.18 }} />
            ))}
        </svg>
    )
}

// Fraud detection: a confusion-matrix grid where the "caught fraud" cell pulses.
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

// Rebalancer: bars settling onto their dashed target line.
const RebalancerViz = () => {
    const bars = [58, 92, 34, 70]
    return (
        <div className="relative flex h-full w-full items-end gap-2 p-2">
            <div className="absolute inset-x-2 top-1/3 border-t border-dashed border-slate-400/70" />
            {bars.map((h, i) => (
                <motion.div
                    key={i} className="flex-1 rounded-t-sm bg-sky-500"
                    initial={{ height: '10%' }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ type: 'spring', stiffness: 60, damping: 13, delay: 0.1 * i }}
                />
            ))}
        </div>
    )
}

export const ProjectViz = ({ theme }) => {
    const inner =
        theme === 'fandance' ? <FandanceViz /> :
        theme === 'fraud' ? <FraudViz /> :
        theme === 'thesis' ? <ThesisViz /> :
        theme === 'oca' ? <OcaViz /> :
        theme === 'rebalancer' ? <RebalancerViz /> : null
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
   Hand-drawn monograms in each institution's colour, not their trademarked
   logo files. A ring traces around the mark as it scrolls into view and the
   badge lifts on hover.                                                     */
const UNIS = {
    upv: { label: 'UPV', from: '#C1002A', to: '#8E0020' },
    tum: { label: 'TUM', from: '#3070B3', to: '#0A4F91' },
    ie: { label: 'IE', from: '#1D3A8A', to: '#0B1F5B' },
}

export const UniversityMark = ({ id }) => {
    const uni = UNIS[id]
    if (!uni) return null
    return (
        <motion.div
            className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white shadow-sm"
            style={{ backgroundImage: `linear-gradient(140deg, ${uni.from}, ${uni.to})` }}
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            whileHover={{ y: -3, rotate: 2, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
            <span className="text-[11px] font-black tracking-tight">{uni.label}</span>
            {/* ring traces around the badge */}
            <svg viewBox="0 0 44 44" className="pointer-events-none absolute inset-0 h-full w-full">
                <motion.rect
                    x="1.5" y="1.5" width="41" height="41" rx="11" fill="none"
                    stroke="currentColor" strokeWidth="1.5" className="text-white/60"
                    pathLength={1} initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1, ease: 'easeInOut', delay: 0.15 }}
                />
            </svg>
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
