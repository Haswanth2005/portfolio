import React, { useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import './Hero.css'
import HeroAvatar from '../components/HeroAvatar'

// Splits text into words, animating each word's opacity from 0.15→1
// based on a manually driven motionValue (0→1)
const ScrollRevealText = ({ text, progress, startOffset, endOffset, className }) => {
    const words = text.split(' ')

    return (
        <p className={className}>
            {words.map((word, i) => {
                const wordStart = startOffset + (i / words.length) * (endOffset - startOffset)
                const wordEnd = startOffset + ((i + 1) / words.length) * (endOffset - startOffset)

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(progress, [wordStart, wordEnd], [0.15, 1])

                // Word glows coral while animating, settles to normal text color when done
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const color = useTransform(
                    progress,
                    [Math.max(0, wordStart - 0.005), wordStart, wordEnd, Math.min(1, wordEnd + 0.005)],
                    ['var(--color-text)', 'var(--color-primary)', 'var(--color-primary)', 'var(--color-text)']
                )

                return (
                    <motion.span key={i} style={{ opacity, color }} className="word-span">
                        {word}{' '}
                    </motion.span>
                )
            })}
        </p>
    )
}

const Hero = ({ isRevealed }) => {
    // progress: 0 = start, 1 = all words revealed
    const progress = useMotionValue(0)
    const animDoneRef = useRef(false)

    useEffect(() => {
        // Accumulate wheel input to drive animation (mimics ~3 full scrolls worth)
        const TOTAL_DELTA = 2200
        let accumulated = 0

        // Stop Lenis so the page doesn't scroll while animation is playing
        const stopLenis = () => window.lenis?.stop()
        const startLenis = () => window.lenis?.start()

        // Small delay to ensure Lenis is initialized
        const timer = setTimeout(stopLenis, 100)

        const onWheel = (e) => {
            if (animDoneRef.current) return

            // Prevent default page scroll while we drive the animation
            e.preventDefault()

            accumulated = Math.min(TOTAL_DELTA, Math.max(0, accumulated + e.deltaY))
            const p = accumulated / TOTAL_DELTA
            progress.set(p)

            if (p >= 1) {
                animDoneRef.current = true
                // Resume Lenis so the page scrolls normally to the next section
                startLenis()
            }
        }

        window.addEventListener('wheel', onWheel, { passive: false })

        return () => {
            clearTimeout(timer)
            window.removeEventListener('wheel', onWheel)
            // Always restore Lenis on unmount
            startLenis()
        }
    }, [progress])

    return (
        <section className="hero-section container">
            <div className="hero-visual">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                    <HeroAvatar />
                </motion.div>
            </div>

            <div className="hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    className="hero-title-wrapper"
                >
                    <h1 className="text-huge">
                        HASWANTH<span className="text-coral">.</span>
                    </h1>
                </motion.div>

                <div className="hero-bottom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="hero-about"
                    >
                        <p className="text-mono hero-role">
                            <span className="status-dot" />
                            Full-Stack Developer &amp; UI Engineer
                        </p>

                        {/* Para 1: 0%–55% of scroll */}
                        <ScrollRevealText
                            text="Hey, I'm Haswanth a developer who loves turning complex problems into clean, fast, and delightful digital products. I specialise in building end to end web applications with a strong eye for design and obsession with performance."
                            progress={progress}
                            startOffset={0.02}
                            endOffset={0.55}
                            className="hero-bio"
                        />

                        {/* Para 2: 55%–100% of scroll */}
                        <ScrollRevealText
                            text="Whether it's a sleek landing page or a fullscale SaaS platform, I bring precision and creativity to every line of code."
                            progress={progress}
                            startOffset={0.55}
                            endOffset={1.0}
                            className="hero-bio"
                        />

                        <div className="hero-stack">
                            {['React', 'Node.js', 'TypeScript', 'MongoDB', 'Tailwind'].map(tech => (
                                <span key={tech} className="hero-tag text-mono">{tech}</span>
                            ))}
                        </div>

                        <div className="hero-links">
                            <a
                                href="https://github.com/Haswanth2005"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hero-link text-mono"
                            >
                                GitHub ↗
                            </a>
                            <a
                                href="https://www.linkedin.com/in/haswanth-m875/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hero-link text-mono"
                            >
                                LinkedIn ↗
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ height: 0 }}
                        animate={isRevealed ? { height: '100px' } : { height: 0 }}
                        transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="scroll-indicator"
                    />
                </div>
            </div>

            <div className="hero-glow" />
        </section>
    )
}

export default Hero
