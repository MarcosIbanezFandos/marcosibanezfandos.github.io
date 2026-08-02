import React, { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
    Github, Linkedin, Mail, FileText, ArrowUpRight, MapPin, Sun, Moon, Languages,
    GraduationCap, HeartHandshake, Sparkles, Lock,
} from 'lucide-react'
import { content, RESUME, TOOLBOX_GROUPS_ES } from './content.js'
import { Reveal, Section, GlowCard, Background, ScrollProgress, ScrambleText, Chip } from './components/UI.jsx'
import { CompanyArt, ProjectViz, NeuralArt, UniversityMark, FLAGS } from './components/Art.jsx'

const ICONS = { github: Github, linkedin: Linkedin, mail: Mail, 'file-text': FileText }
// One blue-family tone per toolbox category, so the groups read apart
// without breaking the palette.
const TONES = {
    sky: 'bg-sky-400/10 text-sky-700 dark:text-sky-300',
    cyan: 'bg-cyan-400/10 text-cyan-700 dark:text-cyan-300',
    teal: 'bg-teal-400/10 text-teal-700 dark:text-teal-300',
    indigo: 'bg-indigo-400/10 text-indigo-700 dark:text-indigo-300',
    blue: 'bg-blue-400/10 text-blue-700 dark:text-blue-300',
    violet: 'bg-violet-400/10 text-violet-700 dark:text-violet-300',
}

const SECTIONS = ['about', 'experience', 'education', 'certifications', 'projects', 'publications', 'volunteering']

export default function App() {
    // English by default; the visitor can switch to Spanish at any time.
    const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
    const [active, setActive] = useState('about')
    const t = content[lang]

    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        localStorage.setItem('theme', theme)
    }, [theme])

    useEffect(() => { document.documentElement.lang = lang; localStorage.setItem('lang', lang) }, [lang])

    // Highlight the nav entry for whichever section is in view.
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
                if (visible[0]) setActive(visible[0].target.id)
            },
            { rootMargin: '-45% 0px -45% 0px', threshold: [0.1, 0.5, 1] }
        )
        SECTIONS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
        return () => obs.disconnect()
    }, [lang])

    const year = useMemo(() => new Date().getFullYear(), [])

    return (
        <div className="min-h-screen font-sans text-slate-700 antialiased selection:bg-sky-300/30 dark:text-slate-400">
            <Background />
            <ScrollProgress scaleX={scaleX} />

            <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-sky-500 focus:px-4 focus:py-2 focus:font-bold focus:text-white">
                Skip to content
            </a>

            <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
                <div className="lg:flex lg:justify-between lg:gap-4">

                    {/* ── Left: identity + nav (sticky on desktop) ───────────── */}
                    <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
                        <div>
                            <Reveal>
                                <h1 className="text-[2.6rem] font-black leading-[1.05] tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
                                    {t.profile.name}
                                </h1>
                                <h2 className="mt-3 min-h-[1.75rem] text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-200 sm:text-xl">
                                    <ScrambleText text={t.profile.role} />
                                </h2>
                                <p className="mt-4 max-w-sm leading-relaxed">{t.profile.tagline}</p>
                            </Reveal>

                            {/* Live status pill */}
                            <Reveal delay={0.1}>
                                <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-slate-300/70 bg-white/60 px-3.5 py-2 backdrop-blur dark:border-slate-700/70 dark:bg-slate-800/40">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                    </span>
                                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{t.ui.status}</span>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{t.ui.statusValue}</span>
                                </div>
                            </Reveal>

                            {/* Desktop nav */}
                            <nav className="nav hidden lg:mt-14 lg:block" aria-label="In-page jump links">
                                <ul className="w-max space-y-1">
                                    {SECTIONS.map(id => (
                                        <li key={id}>
                                            <a href={`#${id}`} className="group flex items-center py-2.5">
                                                <span className={`mr-4 h-px transition-all duration-300 ${active === id ? 'w-16 bg-slate-900 dark:bg-slate-100' : 'w-8 bg-slate-400 group-hover:w-16 group-hover:bg-slate-700 dark:bg-slate-600 dark:group-hover:bg-slate-200'}`} />
                                                <span className={`text-xs font-black uppercase tracking-widest transition-colors ${active === id ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 group-hover:text-slate-800 dark:text-slate-500 dark:group-hover:text-slate-200'}`}>
                                                    {t.nav[id]}
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Socials + toggles */}
                        <div className="mt-10 flex items-center gap-4 lg:mt-0">
                            <ul className="flex items-center gap-4">
                                {t.profile.links.map(l => {
                                    const I = ICONS[l.icon] || Sparkles
                                    return (
                                        <li key={l.name}>
                                            <motion.a
                                                whileHover={{ y: -3, scale: 1.06 }} whileTap={{ scale: 0.95 }}
                                                href={l.url} target={l.url.startsWith('http') ? '_blank' : undefined}
                                                rel="noreferrer noopener" aria-label={l.name} title={l.name}
                                                className="block text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-slate-100"
                                            >
                                                <I size={22} />
                                            </motion.a>
                                        </li>
                                    )
                                })}
                            </ul>
                            <span className="h-5 w-px bg-slate-300 dark:bg-slate-700" />
                            <button
                                onClick={() => setLang(l => (l === 'en' ? 'es' : 'en'))}
                                className="rounded-lg px-2 py-1 text-xs font-black uppercase tracking-widest text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-slate-100"
                                aria-label="Toggle language"
                            >
                                {lang === 'en' ? 'ES' : 'EN'}
                            </button>
                            <button
                                onClick={() => setTheme(th => (th === 'dark' ? 'light' : 'dark'))}
                                className="text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-slate-100"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                        </div>
                    </header>

                    {/* ── Right: content ─────────────────────────────────────── */}
                    <main id="content" className="pt-16 lg:w-[54%] lg:py-24">

                        {/* About */}
                        <Section id="about" title={t.nav.about}>
                            <div className="space-y-4 leading-relaxed">
                                {t.profile.about.map((p, i) => (
                                    <Reveal key={i} delay={i * 0.06}><p>{p}</p></Reveal>
                                ))}
                            </div>

                        </Section>

                        {/* Experience */}
                        <Section id="experience" title={t.nav.experience}>
                            <ol className="group/list space-y-2">
                                {t.experience.map((job, i) => (
                                    <Reveal key={job.company} delay={i * 0.05}>
                                        <li>
                                            <GlowCard href={job.link}>
                                                {({ hovered }) => (
                                                    <>
                                                        <CompanyArt theme={job.theme} hovered={hovered} />
                                                        <div className="relative z-10 pl-3 sm:grid sm:grid-cols-8 sm:gap-6">
                                                            <header className="mb-2 mt-1 text-[11px] font-black uppercase tracking-widest text-slate-500 sm:col-span-2">
                                                                {job.dates}
                                                            </header>
                                                            <div className="sm:col-span-6">
                                                                {/* right padding keeps the company artwork from touching the text */}
                                                                <h3 className="pr-24 font-bold leading-snug text-slate-900 dark:text-slate-100 sm:pr-32">
                                                                    <span className="inline-flex items-baseline gap-1">
                                                                        {job.title} · {job.company}
                                                                        <ArrowUpRight size={16} className="shrink-0 translate-y-px transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                                    </span>
                                                                </h3>
                                                                <div className="mt-1 flex items-center gap-1.5 pr-24 text-xs font-semibold text-slate-500 sm:pr-32">
                                                                    <MapPin size={12} /> {job.location}
                                                                </div>
                                                                <p className="mt-2.5 text-sm leading-relaxed">{job.description}</p>
                                                                <ul className="mt-3 flex flex-wrap gap-1.5">
                                                                    {job.skills.map(s => <Chip key={s}>{s}</Chip>)}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </GlowCard>
                                        </li>
                                    </Reveal>
                                ))}
                            </ol>
                            <Reveal>
                                <a href={RESUME} target="_blank" rel="noreferrer noopener"
                                    className="group mt-6 inline-flex items-center gap-1.5 pl-5 font-bold text-slate-900 dark:text-slate-100">
                                    {t.ui.viewResume}
                                    <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </a>
                            </Reveal>
                        </Section>

                        {/* Education */}
                        <Section id="education" title={t.nav.education}>
                            <ol className="space-y-4">
                                {t.education.map((e, i) => (
                                    <Reveal key={e.school} delay={i * 0.06}>
                                        <li className="flex items-start gap-4">
                                            <UniversityMark id={e.logo} />
                                            <div className="pb-1">
                                                <h3 className="flex flex-wrap items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                                                    {e.degree}
                                                    {e.inProgress && (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-400/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-sky-700 dark:text-sky-300">
                                                            <span className="relative flex h-1.5 w-1.5">
                                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                                                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-500" />
                                                            </span>
                                                            {t.ui.inProgress}
                                                        </span>
                                                    )}
                                                </h3>
                                                <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">{e.school}</div>
                                                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                                                    <MapPin size={12} /> {e.city} · {e.details}
                                                </div>
                                            </div>
                                        </li>
                                    </Reveal>
                                ))}
                            </ol>
                        </Section>

                        {/* Languages */}
                        <Section id="certifications" title={t.nav.certifications}>
                            {/* Each row is the language bar itself: the flag sits behind the
                                text, vivid across the level reached and muted beyond it. */}
                            <ul className="space-y-2.5">
                                {t.certifications.map((c, i) => (
                                    <Reveal key={c.title} delay={i * 0.04}>
                                        <li className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white/50 dark:border-slate-700/60 dark:bg-slate-800/30">
                                            {/* One flag at its true 3:2 ratio, anchored left so it sits
                                                behind the language name and dissolves into the bar. */}
                                            <motion.div
                                                className="absolute inset-y-0 left-0 w-1/2"
                                                style={{
                                                    backgroundImage: FLAGS[c.code],
                                                    backgroundSize: 'auto 100%',
                                                    backgroundRepeat: 'no-repeat',
                                                    maskImage: 'linear-gradient(to right, #000 0%, #000 34%, transparent 96%)',
                                                    WebkitMaskImage: 'linear-gradient(to right, #000 0%, #000 34%, transparent 96%)',
                                                }}
                                                initial={{ opacity: 0, x: -12 }}
                                                whileInView={{ opacity: 0.62, x: 0 }}
                                                viewport={{ once: true, margin: '-60px' }}
                                                transition={{ duration: 0.6, delay: 0.06 * i, ease: 'easeOut' }}
                                                aria-hidden="true"
                                            />
                                            {/* scrim so the name stays crisp on top of the flag */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/45 to-transparent dark:from-slate-950/75 dark:via-slate-950/45" aria-hidden="true" />
                                            {/* proficiency as a progress line along the bottom edge */}
                                            <motion.div
                                                className="absolute bottom-0 left-0 h-[3px] rounded-full bg-gradient-to-r from-sky-400 to-indigo-500"
                                                initial={{ width: 0 }} whileInView={{ width: `${c.level}%` }}
                                                viewport={{ once: true, margin: '-60px' }}
                                                transition={{ duration: 1, delay: 0.1 + 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                                                aria-hidden="true"
                                            />

                                            <div className="relative flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-4 py-3">
                                                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{c.title}</span>
                                                {c.issuer && <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">{c.issuer} {c.year}</span>}
                                            </div>
                                        </li>
                                    </Reveal>
                                ))}
                            </ul>
                        </Section>

                        {/* Projects */}
                        <Section id="projects" title={t.nav.projects}>
                            <ul className="space-y-2">
                                {t.projects.map((p, i) => (
                                    <Reveal key={p.title} delay={i * 0.05}>
                                        <li>
                                            <GlowCard href={p.private ? undefined : (p.live || p.link)}>
                                                <div className="flex flex-col gap-4 sm:flex-row-reverse sm:items-start sm:justify-end">
                                                    <ProjectViz theme={p.theme} />
                                                    <div className="flex-1">
                                                        <h3 className="font-bold leading-snug text-slate-900 dark:text-slate-100">
                                                            <span className="inline-flex items-baseline gap-1.5">
                                                                {p.title}
                                                                {p.private
                                                                    ? <Lock size={14} className="shrink-0 translate-y-px text-slate-400" aria-label={t.ui.privateRepo} />
                                                                    : <ArrowUpRight size={16} className="shrink-0 translate-y-px transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                                                            </span>
                                                        </h3>
                                                        <p className="mt-2 text-sm leading-relaxed">{p.description}</p>
                                                        <ul className="mt-3 flex flex-wrap gap-1.5">
                                                            {p.tech.map(s => <Chip key={s}>{s}</Chip>)}
                                                        </ul>
                                                        {p.private ? (
                                                            <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-slate-400">
                                                                <Lock size={11} /> {t.ui.privateRepo}
                                                            </span>
                                                        ) : p.live ? (
                                                            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> live
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </GlowCard>
                                        </li>
                                    </Reveal>
                                ))}
                            </ul>
                        </Section>

                        {/* Research */}
                        <Section id="publications" title={t.nav.publications}>
                            <ul className="space-y-2">
                                {t.publications.map((pub, i) => (
                                    <Reveal key={pub.title} delay={i * 0.05}>
                                        <li>
                                            <GlowCard href={pub.link}>
                                                <div className="flex flex-col gap-4 sm:flex-row-reverse sm:items-start sm:justify-end">
                                                    {pub.theme === 'neural' ? <NeuralArt /> : <ProjectViz theme={pub.theme} />}
                                                    <div className="flex-1">
                                                        <div className="text-[11px] font-black uppercase tracking-widest text-slate-500">{pub.year} · {pub.publisher}</div>
                                                        <h3 className="mt-1 font-bold leading-snug text-slate-900 dark:text-slate-100">
                                                            <span className="inline-flex items-baseline gap-1">
                                                                {pub.title}
                                                                <ArrowUpRight size={16} className="shrink-0 translate-y-px transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                            </span>
                                                        </h3>
                                                        <p className="mt-2 text-sm leading-relaxed">{pub.description}</p>
                                                    </div>
                                                </div>
                                            </GlowCard>
                                        </li>
                                    </Reveal>
                                ))}
                            </ul>
                        </Section>

                        {/* Volunteering */}
                        <Section id="volunteering" title={t.nav.volunteering}>
                            <ul className="space-y-2">
                                {t.volunteering.map(v => (
                                    <Reveal key={v.organization}>
                                        <li>
                                            <GlowCard>
                                                <div className="flex items-start gap-4">
                                                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-400/15 text-amber-600 dark:text-amber-400">
                                                        <HeartHandshake size={18} />
                                                    </span>
                                                    <div>
                                                        <h3 className="font-bold text-slate-900 dark:text-slate-100">{v.role}</h3>
                                                        <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">{v.organization}</div>
                                                        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                                                            <MapPin size={12} /> {v.location} · {v.dates}
                                                        </div>
                                                        <p className="mt-2 text-sm leading-relaxed">{v.description}</p>
                                                    </div>
                                                </div>
                                            </GlowCard>
                                        </li>
                                    </Reveal>
                                ))}
                            </ul>
                        </Section>

                            <Reveal delay={0.15}>
                                <div className="mb-16 border-t border-slate-200/70 pt-8 dark:border-slate-800">
                                    <div className="mb-3 text-[11px] font-black uppercase tracking-widest text-slate-500">{t.ui.toolbox}</div>
                                    <div className="space-y-3">
                                        {t.profile.toolbox.map((grp, gi) => (
                                            <div key={grp.group} className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-3">
                                                <span className="w-32 shrink-0 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                    {lang === 'es' ? (TOOLBOX_GROUPS_ES[grp.group] || grp.group) : grp.group}
                                                </span>
                                                <ul className="flex flex-wrap gap-1.5">
                                                    {grp.items.map((s, si) => (
                                                        <motion.li
                                                            key={s}
                                                            initial={{ opacity: 0, y: 6 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true, margin: '-60px' }}
                                                            transition={{ duration: 0.35, delay: gi * 0.05 + si * 0.025 }}
                                                            className={`rounded-full px-3 py-1 text-[11px] font-semibold leading-5 ${TONES[grp.tone]}`}
                                                        >
                                                            {s}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                        <footer className="pb-16 text-xs leading-relaxed text-slate-500">
                            <p>© {year} Marcos Ibáñez. {t.ui.builtWith}</p>
                            <p className="mt-1.5 text-[11px] text-slate-500/80">
                                Company and university marks are the property of their respective owners.
                            </p>
                        </footer>
                    </main>
                </div>
            </div>
        </div>
    )
}
