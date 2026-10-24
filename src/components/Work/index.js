import './index.scss'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import signature from '../../assets/images/signature.png'
import workData from '../../data/work.json'

const jobs = workData.jobs

const OFFSET = 8 // px a card sits above its checkpoint so its first line meets the connector
const GAP = 46 // px between a checkpoint and its card
const RAIL = 150 // px reserved on the right for the contents rail

// The path lies on a ground plane tilted away from the viewer. The camera
// flies along it, so checkpoints ahead are smaller and nearer the horizon.
const PERSPECTIVE = 1300
const TILT_DEG = 54
const TILT = (TILT_DEG * Math.PI) / 180
const SIN = Math.sin(TILT)
const COS = Math.cos(TILT)
const HEADING = 0.5 // how much the camera turns to follow the bends (0 = never)
const KEY_SPEED = 650 // scroll px per second while W / S is held

const clamp01 = (v) => Math.min(1, Math.max(0, v))

const useMedia = (query) => {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
    useEffect(() => {
        const mq = window.matchMedia(query)
        const onChange = () => setMatches(mq.matches)
        onChange()
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
    }, [query])
    return matches
}

// Lay the checkpoints out along the ground, alternating sides, joined by one
// smooth curve. "j" is how far along the journey a point is (always increasing),
// and "yF" is its y on the ground plane (the journey runs toward smaller y).
const buildGeometry = (w, h, n) => {
    const contentW = w - RAIL
    const cx = contentW / 2
    const S = Math.max(520, h * 0.85)
    const A = Math.min(contentW * 0.16, 220)
    const wiggle = [1, 0.7, 1.1, 0.8, 1.05, 0.75]
    const D = S * n
    const y0F = D + 400
    const cardW = Math.max(180, Math.min(360, cx - A * 1.1 - GAP - 30))
    const aX = cx
    const aY = Math.min(Math.max(h - 520, h * 0.34), h * 0.56) // leaves room under the open card

    const nodes = Array.from({ length: n }, (_, i) => {
        const side = i % 2 === 0 ? -1 : 1
        return {
            x: cx + side * A * wiggle[i % wiggle.length],
            yF: y0F - S * (i + 1),
            j: S * (i + 1),
            side,
        }
    })

    const pts = [{ x: cx, y: y0F }, ...nodes.map((nd) => ({ x: nd.x, y: nd.yF }))]
    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 1; i < pts.length; i += 1) {
        const a = pts[i - 1]
        const b = pts[i]
        const k = (a.y - b.y) * 0.55
        d += ` C ${a.x} ${a.y - k}, ${b.x} ${b.y + k}, ${b.x} ${b.y}`
    }

    return {
        contentW, cx, S, A, D, y0F, aX, aY, cardW, nodes, d,
        yEndF: nodes[n - 1].yF,
        titleBack: S * 0.45, // the title stands behind the start, so it sits below the marker and the path never crosses it
        sceneH: y0F + 300,
    }
}

// Look up the point on the line at a given journey distance.
const sample = (t, j) => {
    let lo = 0
    let hi = t.count
    while (hi - lo > 1) {
        const mid = (lo + hi) >> 1
        if (t.js[mid] <= j) lo = mid
        else hi = mid
    }
    const span = t.js[hi] - t.js[lo] || 1
    const f = clamp01((j - t.js[lo]) / span)
    return {
        x: t.xs[lo] + (t.xs[hi] - t.xs[lo]) * f,
        len: t.ls[lo] + (t.ls[hi] - t.ls[lo]) * f,
        slope: (t.xs[hi] - t.xs[lo]) / span,
    }
}

// A rounded square for a company logo. Drop an image at
// public/work-logos/<job id>.png (or set "logo" in work.json) and it appears;
// until then a soft placeholder with the company's first letter is shown.
const JobLogo = ({ job }) => {
    const [loaded, setLoaded] = useState(false)
    const src = job.logo || `${process.env.PUBLIC_URL}/work-logos/${job.id}.png`
    return (
        <div className="job-logo" role="img" aria-label={`${job.company} logo`}>
            <span className="job-logo-initial">{job.company.charAt(0)}</span>
            <img
                src={src}
                alt=""
                className={loaded ? 'is-loaded' : ''}
                onLoad={() => setLoaded(true)}
                onError={() => setLoaded(false)}
            />
        </div>
    )
}

const JobCard = ({ job }) => {
    const meta = [job.kind, job.location].filter(Boolean).join(' · ')
    return (
        <>
            <span className="job-dates">{job.dates}</span>
            <div className="job-head">
                <JobLogo job={job} />
                <div className="job-titles">
                    <h2 className="job-company">{job.company}</h2>
                    <p className="job-role">
                        {job.title}
                        {job.subtitle ? ` · ${job.subtitle}` : ''}
                    </p>
                </div>
            </div>
            <div className="job-more">
                <div className="job-more-inner">
                    <p className="job-meta">{meta}</p>
                    {job.caption.map((line, i) => (
                        <p className="job-line" key={i}>{line}</p>
                    ))}
                    {job.bullets.length > 0 && (
                        <ol className="job-bullets">
                            {job.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ol>
                    )}
                </div>
            </div>
        </>
    )
}

const Title = ({ letterClass }) => (
    <h1>
        <AnimatedLetters letterClass={letterClass} strArray={'Work Experience'.split('')} idx={10} />
    </h1>
)

const Journey = ({ letterClass }) => {
    const reduced = useMedia('(prefers-reduced-motion: reduce)')
    const reducedRef = useRef(reduced)
    reducedRef.current = reduced

    const scrollerRef = useRef(null)
    const worldRef = useRef(null)
    const introRef = useRef(null)
    const trackPathRef = useRef(null)
    const progRef = useRef(null)
    const markerRef = useRef(null)
    const cardRefs = useRef([])
    const tableRef = useRef(null)
    const geoRef = useRef(null)
    const sizeRef = useRef({ w: 0, h: 0 })
    const anim = useRef({ target: 0, current: 0, raf: 0, last: 0, active: -2, reached: -1 })

    const [size, setSize] = useState({ w: 0, h: 0 })
    const [view, setView] = useState({ active: -1, reached: 0 })

    const geo = useMemo(
        () => (size.w ? buildGeometry(size.w, size.h, jobs.length) : null),
        [size]
    )

    // Move the camera along the path for a given progress (0 to 1): turn and
    // slide the ground under a fixed viewpoint, then place each sign where the
    // same perspective puts its checkpoint. Runs every frame, so it writes
    // straight to the DOM.
    const paint = useCallback((p) => {
        const g = geoRef.current
        const t = tableRef.current
        if (!g || !t) return

        const jm = p * g.D
        const { x: mx, len, slope } = sample(t, jm)
        const myF = g.y0F - jm
        const a = reducedRef.current ? 0 : -Math.atan(slope) * HEADING
        const cosA = Math.cos(a)
        const sinA = Math.sin(a)

        worldRef.current.style.transform =
            `translate(${g.aX}px, ${g.aY}px) rotate(${a}rad) translate(${-mx}px, ${-myF}px)`
        markerRef.current.setAttribute('transform', `translate(${mx.toFixed(2)} ${myF.toFixed(2)})`)
        progRef.current.style.strokeDashoffset = String(t.L - len)

        // Same maths the browser uses for the tilted ground, so signs line up with it.
        const project = (wx, wy) => {
            const dx = wx - mx
            const dy = wy - myF
            const vx = dx * cosA - dy * sinA
            const vy = dx * sinA + dy * cosA
            const denom = PERSPECTIVE - vy * SIN
            if (denom < 0.15 * PERSPECTIVE) return null
            const s = PERSPECTIVE / denom
            return { x: g.aX + vx * s, y: g.aY + vy * COS * s, s }
        }

        // Signs ahead fade slowly into the horizon; ones behind us fade fast.
        const fade = (ahead) => (ahead >= 0
            ? clamp01(1 - Math.max(0, ahead - 0.2 * g.S) / (2.6 * g.S))
            : clamp01(1 + ahead / (0.55 * g.S)))

        const place = (el, wx, wy, op, suffix) => {
            if (!el) return
            const pr = op > 0.01 ? project(wx, wy) : null
            if (!pr) {
                el.style.visibility = 'hidden'
                return
            }
            el.style.visibility = 'visible'
            el.style.opacity = op.toFixed(3)
            el.style.zIndex = String(Math.round(pr.s * 100))
            el.style.transform =
                `translate(${pr.x.toFixed(1)}px, ${pr.y.toFixed(1)}px) scale(${pr.s.toFixed(4)})${suffix || ''}`
        }

        let active = -1
        let best = Infinity
        let reached = 0
        g.nodes.forEach((n, i) => {
            const ahead = n.j - jm
            if (n.j <= jm + 2) reached += 1
            if (Math.abs(ahead) < best) {
                best = Math.abs(ahead)
                active = i
            }
            place(cardRefs.current[i], n.x, n.yF, fade(ahead))
        })
        if (best > g.S * 0.5) active = -1

        place(
            introRef.current,
            g.cx,
            g.y0F + g.titleBack,
            clamp01(1 - jm / (0.4 * g.S)),
            ' translate(-50%, -100%)'
        )

        const an = anim.current
        if (an.active !== active || an.reached !== reached) {
            an.active = active
            an.reached = reached
            setView({ active, reached })
        }
    }, [])

    const tick = useCallback((now) => {
        const a = anim.current
        const dt = Math.min(0.05, (now - a.last) / 1000) || 0.016
        a.last = now
        const k = reducedRef.current ? 1 : 1 - Math.exp(-dt * 7)
        a.current += (a.target - a.current) * k
        if (Math.abs(a.target - a.current) < 0.00004) a.current = a.target
        paint(a.current)
        a.raf = a.current === a.target ? 0 : requestAnimationFrame(tick)
    }, [paint])

    const kick = useCallback(() => {
        const a = anim.current
        if (!a.raf) {
            a.last = performance.now()
            a.raf = requestAnimationFrame(tick)
        }
    }, [tick])

    // Track the size of the scroll area.
    useLayoutEffect(() => {
        const el = scrollerRef.current
        const measure = () => {
            const w = el.clientWidth
            const h = el.clientHeight
            setSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }))
        }
        measure()
        const ro = new ResizeObserver(measure)
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    // Whenever the geometry changes, re-measure the line and repaint.
    useLayoutEffect(() => {
        geoRef.current = geo
        sizeRef.current = size
        const path = trackPathRef.current
        if (!geo || !path) return

        const L = path.getTotalLength()
        const count = 800
        const xs = new Float64Array(count + 1)
        const js = new Float64Array(count + 1)
        const ls = new Float64Array(count + 1)
        for (let k = 0; k <= count; k += 1) {
            const len = (L * k) / count
            const pt = path.getPointAtLength(len)
            xs[k] = pt.x
            js[k] = geo.y0F - pt.y
            ls[k] = len
        }
        tableRef.current = { L, xs, js, ls, count }
        progRef.current.style.strokeDasharray = String(L)

        const a = anim.current
        scrollerRef.current.scrollTop = a.target * geo.D
        a.current = a.target
        paint(a.target)
    }, [geo, size, paint])

    useEffect(() => {
        const a = anim.current
        return () => cancelAnimationFrame(a.raf)
    }, [])

    const onScroll = () => {
        const g = geoRef.current
        if (!g) return
        const a = anim.current
        a.target = clamp01(scrollerRef.current.scrollTop / g.D)
        kick()
    }

    // Keyboard: hold W / S to move forward / back; A / D (or the left / right
    // arrows) jump to the previous / next checkpoint. Everything goes through the
    // scroll position, so the camera, rail and cards respond exactly as they do to
    // the mouse wheel.
    useEffect(() => {
        const held = new Set()
        let raf = 0
        let last = 0
        let dest = null
        let destAt = 0

        const step = (now) => {
            const dt = Math.min(0.05, (now - last) / 1000) || 0.016
            last = now
            const dir = (held.has('w') ? 1 : 0) - (held.has('s') ? 1 : 0)
            const el = scrollerRef.current
            if (dir && el) {
                el.scrollTop += dir * KEY_SPEED * dt
                raf = requestAnimationFrame(step)
            } else {
                raf = 0
            }
        }

        const jump = (dir) => {
            const g = geoRef.current
            const el = scrollerRef.current
            if (!g || !el) return
            const now = performance.now()
            // pressing again mid-glide continues from where the last jump is heading
            const base = dest !== null && now - destAt < 900 ? dest : el.scrollTop
            const stops = [0, ...g.nodes.map((n) => n.j)]
            const next = dir > 0
                ? stops.find((s) => s > base + 20)
                : [...stops].reverse().find((s) => s < base - 20)
            if (next === undefined) return
            dest = next
            destAt = now
            el.scrollTo({ top: next, behavior: reducedRef.current ? 'auto' : 'smooth' })
        }

        const onKeyDown = (e) => {
            if (e.metaKey || e.ctrlKey || e.altKey) return
            const t = e.target
            if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return
            const k = e.key.toLowerCase()
            if (k === 'w' || k === 's') {
                held.add(k)
                if (!raf) {
                    last = performance.now()
                    raf = requestAnimationFrame(step)
                }
            } else if (k === 'd' || k === 'arrowright') {
                if (!e.repeat) jump(1)
            } else if (k === 'a' || k === 'arrowleft') {
                if (!e.repeat) jump(-1)
            }
        }
        const onKeyUp = (e) => held.delete(e.key.toLowerCase())
        const onBlur = () => held.clear()

        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)
        window.addEventListener('blur', onBlur)
        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)
            window.removeEventListener('blur', onBlur)
            cancelAnimationFrame(raf)
        }
    }, [])

    const goTo = (i) => {
        const g = geoRef.current
        if (!g) return
        scrollerRef.current.scrollTo({
            top: g.nodes[i].j,
            behavior: reducedRef.current ? 'auto' : 'smooth',
        })
    }

    return (
        <>
            <div
                className="journey-scroll"
                ref={scrollerRef}
                onScroll={onScroll}
                tabIndex={0}
                role="region"
                aria-label="Work experience. Scroll to travel along the path."
            >
                {geo && (
                    <div className="journey-track" style={{ height: size.h + geo.D }}>
                        <div
                            className="journey-stage"
                            style={{
                                height: size.h,
                                perspective: `${PERSPECTIVE}px`,
                                perspectiveOrigin: `${geo.aX}px ${geo.aY}px`,
                            }}
                        >
                            <div
                                className="journey-plane"
                                style={{
                                    width: geo.contentW,
                                    height: size.h,
                                    transformOrigin: `${geo.aX}px ${geo.aY}px`,
                                    transform: `rotateX(${TILT_DEG}deg)`,
                                }}
                            >
                                <div
                                    className="journey-world"
                                    ref={worldRef}
                                    style={{ width: geo.contentW, height: geo.sceneH }}
                                >
                                    <svg
                                        className="journey-svg"
                                        width={geo.contentW}
                                        height={geo.sceneH}
                                        viewBox={`0 0 ${geo.contentW} ${geo.sceneH}`}
                                        aria-hidden="true"
                                    >
                                        <defs>
                                            <linearGradient
                                                id="journeyGrad"
                                                gradientUnits="userSpaceOnUse"
                                                x1="0"
                                                y1={geo.y0F}
                                                x2="0"
                                                y2={geo.yEndF}
                                            >
                                                <stop offset="0" stopColor="#00b4d8" />
                                                <stop offset="1" stopColor="#275DFA" />
                                            </linearGradient>
                                        </defs>
                                        <path ref={trackPathRef} className="track" d={geo.d} />
                                        <g ref={progRef}>
                                            <path className="glow" d={geo.d} stroke="url(#journeyGrad)" />
                                            <path className="progress" d={geo.d} stroke="url(#journeyGrad)" />
                                        </g>
                                        <circle className="origin" cx={geo.cx} cy={geo.y0F} r="5" />
                                        {geo.nodes.map((n, i) => (
                                            <g
                                                key={jobs[i].id}
                                                className={[
                                                    'node',
                                                    i < view.reached ? 'reached' : '',
                                                    view.active === i ? 'active' : '',
                                                ].join(' ')}
                                                transform={`translate(${n.x} ${n.yF})`}
                                            >
                                                <circle className="ring" r="22" />
                                                <circle className="core" r="8" />
                                            </g>
                                        ))}
                                        <g ref={markerRef} className="marker">
                                            <circle className="halo" r="22" />
                                            <circle className="dot" r="7" />
                                        </g>
                                    </svg>
                                </div>
                            </div>

                            <div className="journey-cards">
                                <div className="journey-intro" ref={introRef}>
                                    <Title letterClass={letterClass} />
                                    <p className="hint">
                                        Scroll Down <span className="chev">↓</span>
                                    </p>
                                    <img className="signature" src={signature} alt="Anthony's signature" />
                                </div>

                                {jobs.map((job, i) => {
                                    const n = geo.nodes[i]
                                    return (
                                        <div
                                            key={job.id}
                                            className="card-anchor"
                                            ref={(el) => { cardRefs.current[i] = el }}
                                        >
                                            <article
                                                className={[
                                                    'job-card',
                                                    n.side < 0 ? 'on-left' : 'on-right',
                                                    view.active === i ? 'open' : '',
                                                ].join(' ')}
                                                style={{
                                                    left: n.side < 0 ? -(GAP + geo.cardW) : GAP,
                                                    top: -OFFSET,
                                                    width: geo.cardW,
                                                }}
                                            >
                                                <JobCard job={job} />
                                            </article>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <nav className="journey-rail" aria-label="Experience contents">
                <span className="rail-title">Experience</span>
                <ol>
                    {jobs.map((job, i) => (
                        <li
                            key={job.id}
                            className={[i < view.reached ? 'reached' : '', view.active === i ? 'active' : ''].join(' ')}
                        >
                            <button
                                type="button"
                                onClick={() => goTo(i)}
                                aria-current={view.active === i ? 'true' : undefined}
                            >
                                <span className="label">{job.short}</span>
                                <span className="tick" />
                            </button>
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    )
}

// Small screens and tablets: a plain stacked list, no camera.
const FlatList = ({ letterClass }) => (
    <div className="journey-scroll flat">
        <Title letterClass={letterClass} />
        <ol className="flat-list">
            {jobs.map((job) => (
                <li key={job.id} className="job-card flat-card open">
                    <JobCard job={job} />
                </li>
            ))}
        </ol>
    </div>
)

const Work = () => {
    const compact = useMedia('(max-width: 1000px)')
    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        const timerId = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
        return () => clearTimeout(timerId)
    }, [])

    return (
        <>
            <div className={`work-journey${compact ? ' compact' : ''}`}>
                {compact ? <FlatList letterClass={letterClass} /> : <Journey letterClass={letterClass} />}
            </div>
            <Loader type="pacman" />
        </>
    )
}

export default Work
