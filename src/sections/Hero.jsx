import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Hero.css'
import HeroAvatar from '../components/HeroAvatar'

// Splits text into words and animates each word's opacity based on scroll progress
const ScrollRevealText = ({ text, scrollYProgress, startOffset, endOffset, className }) => {
    const words = text.split(' ')

    return (
        <p className={className}>
            {words.map((word, i) => {
                const wordStart = startOffset + (i / words.length) * (endOffset - startOffset)
                const wordEnd = startOffset + ((i + 1) / words.length) * (endOffset - startOffset)

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, [wordStart, wordEnd], [0.15, 1])

                return (
                    <motion.span
                        key={i}
                        style={{ opacity }}
                        className="word-span"
                    >
                        {word}{' '}
                    </motion.span>
                )
            })}
        </p>
    )
}

const Hero = () => {
    const sectionRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    })

    return (
        <section ref={sectionRef} className="hero-section container">
            <div className="hero-visual">
                <HeroAvatar />
            </div>

            <div className="hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="hero-title-wrapper"
                >
                    <h1 className="text-huge">
                        HASWANTH<span className="text-coral">.</span>
                    </h1>
                </motion.div>

                <div className="hero-bottom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.9 }}
                        className="hero-about"
                    >
                        <p className="text-mono hero-role">
                            <span className="status-dot" />
                            Full-Stack Developer &amp; UI Engineer
                        </p>

                        <ScrollRevealText
                            text="Hey, I'm Haswanth a developer who loves turning complex problems into clean, fast, and delightful digital products. I specialise in building end to end web applications with a strong eye for design and obsession with performance."
                            scrollYProgress={scrollYProgress}
                            startOffset={0.05}
                            endOffset={0.45}
                            className="hero-bio"
                        />

                        <ScrollRevealText
                            text="Whether it's a sleek landing page or a fullscale SaaS platform, I bring precision and creativity to every line of code."
                            scrollYProgress={scrollYProgress}
                            startOffset={0.45}
                            endOffset={0.75}
                            className="hero-bio"
                        />

                        <div className="hero-stack">
                            {['React', 'Node.js', 'TypeScript', 'MongoDB', 'Tailwind'].map(tech => (
                                <span key={tech} className="hero-tag text-mono">{tech}</span>
                            ))}
                        </div>

                        <div className="hero-links">
                            <a
                                href="https://github.com/haswanth"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hero-link text-mono"
                            >
                                GitHub ↗
                            </a>
                            <a
                                href="https://linkedin.com/in/haswanth"
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
                        animate={{ height: '100px' }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="scroll-indicator"
                    />
                </div>
            </div>

            <div className="hero-glow" />
        </section>
    )
}

export default Hero
