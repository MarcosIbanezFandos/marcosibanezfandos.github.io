import React from 'react'
import { motion } from 'framer-motion'

/**
 * Side profile of a BMW-style sports sedan, drawn as vectors so it stays crisp,
 * carries no background, and can be animated part by part: the wheels actually
 * spin, the body settles on its suspension and speed lines trail behind it.
 */
export const CarSvg = ({ className = '', spinning = false }) => {
    const wheel = (cx) => (
        <motion.g
            style={{ originX: `${cx}px`, originY: '78px' }}
            animate={spinning ? { rotate: 360 } : { rotate: 0 }}
            transition={spinning ? { duration: 0.55, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
        >
            {/* tyre */}
            <circle cx={cx} cy="78" r="15" className="fill-slate-900 dark:fill-slate-950" />
            <circle cx={cx} cy="78" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
            {/* rim */}
            <circle cx={cx} cy="78" r="9.5" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* spokes */}
            {[0, 72, 144, 216, 288].map(a => (
                <line
                    key={a}
                    x1={cx} y1="78"
                    x2={cx + 9 * Math.cos((a * Math.PI) / 180)}
                    y2={78 + 9 * Math.sin((a * Math.PI) / 180)}
                    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                />
            ))}
            <circle cx={cx} cy="78" r="2.4" fill="currentColor" />
        </motion.g>
    )

    return (
        <svg viewBox="0 0 260 100" className={className} aria-hidden="true">
            {/* speed lines */}
            {spinning && [62, 72, 82].map((y, i) => (
                <motion.line
                    key={y} x1="0" y1={y} x2="30" y2={y}
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35"
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: [-30, -70], opacity: [0, 0.5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12, ease: 'linear' }}
                />
            ))}

            <motion.g
                animate={spinning ? { y: [0, -1.2, 0] } : { y: 0 }}
                transition={spinning ? { duration: 0.45, repeat: Infinity, ease: 'easeInOut' } : {}}
            >
                {/* body: long bonnet, fast roofline, short rear deck */}
                <path
                    d="M14 80c-4 0-6-2-6-5v-9c0-5 3-8 8-9l26-5 22-16c5-4 10-5 16-5h44c7 0 12 2 17 6l19 16 44 6c7 1 11 5 11 11v5c0 3-2 5-5 5h-14a20 20 0 0 0-40 0H68a20 20 0 0 0-40 0H14z"
                    fill="currentColor" opacity="0.92"
                />
                {/* glasshouse */}
                <path d="M84 47l16-11c3-2 6-3 10-3h12v14H84z" className="fill-white/25" />
                <path d="M128 47V33h14c4 0 7 1 10 3l13 11h-37z" className="fill-white/25" />
                {/* shoulder crease */}
                <path d="M40 62h176" stroke="currentColor" strokeWidth="1.2" opacity="0.45" fill="none" />
                {/* kidney grille + headlight */}
                <path d="M232 62h12c4 0 6 2 6 5v4h-18z" className="fill-slate-900/40 dark:fill-white/25" />
                <circle cx="226" cy="63" r="3.2" className="fill-white/70" />
                {/* tail light */}
                <rect x="9" y="62" width="9" height="4" rx="2" className="fill-white/50" />
            </motion.g>

            {wheel(48)}
            {wheel(188)}
        </svg>
    )
}
