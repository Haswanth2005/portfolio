import React from 'react'
import { motion } from 'framer-motion'
import './Hero.css'
import HeroAvatar from '../components/HeroAvatar'

const Hero = () => {
    return (
        <section className="hero-section container">
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
                        HASWANTH<span className="text-coral">.</span><br />
                        DEV
                    </h1>
                </motion.div>

                <div className="hero-bottom">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-mono hero-subtitle"
                    >
                        Engineering scalable digital<br />
                        experiences with precision.
                    </motion.p>

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
