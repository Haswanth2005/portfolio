import React from 'react'
import { motion } from 'framer-motion'
import { Download, ExternalLink } from 'lucide-react'
import './AboutMe.css'

const pdfPath = '/12311988.pdf'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    })
}

const AboutMe = () => {
    const interests = [
        'Web Performance', 'UI/UX Design', 'Open Source',
        'System Design', 'Cloud & DevOps', 'Competitive Coding',
        'AI/ML', 'Creative Coding'
    ]

    return (
        <section id="about" className="about-section container section">
            <motion.div
                className="about-header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeUp}
            >
                <h2 className="text-huge">ABOUT<span className="text-coral">.</span></h2>
            </motion.div>

            <div className="about-grid">
                {/* Left – narrative text */}
                <motion.div
                    className="about-text-block"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    <motion.p className="about-paragraph" variants={fadeUp} custom={0}>
                        I'm <span className="highlight">Haswanth</span>, a full-stack developer and
                        UI engineer based in India. I craft digital experiences that blend
                        performance with pixel-perfect design — from concept to deployment.
                    </motion.p>

                    <motion.p className="about-paragraph" variants={fadeUp} custom={1}>
                        With a deep curiosity for how things work under the hood, I enjoy
                        building scalable web applications, optimising critical render paths,
                        and creating interfaces that feel <span className="highlight">alive</span>.
                    </motion.p>

                    <motion.p className="about-paragraph" variants={fadeUp} custom={2}>
                        When I'm not coding, you'll find me exploring new frameworks,
                        contributing to open-source projects, or diving into competitive
                        programming challenges.
                    </motion.p>

                    {/* Resume buttons */}
                    <motion.div className="about-resume-actions" variants={fadeUp} custom={3}>
                        <a className="resume-btn" href={pdfPath} download>
                            <Download size={18} />
                            Download Resume
                        </a>
                        <a className="resume-btn ghost" href={pdfPath} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={18} />
                            View Resume
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right – photo */}
                <motion.div
                    className="about-photo-wrapper"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={fadeUp}
                    custom={1}
                >
                    <div className="about-photo-frame">
                        <img
                            src="/Gemini_Generated_Image_tn0mxatn0mxatn0m.png"
                            alt="Haswanth"
                            className="about-photo"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Stats row */}
            <motion.div
                className="about-stats"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
            >
                <motion.div className="stat-item" variants={fadeUp} custom={0}>
                    <p className="stat-number">10+</p>
                    <p className="stat-label text-mono">Projects Built</p>
                </motion.div>
                <motion.div className="stat-item" variants={fadeUp} custom={1}>
                    <p className="stat-number">3+</p>
                    <p className="stat-label text-mono">Years Coding</p>
                </motion.div>
                <motion.div className="stat-item" variants={fadeUp} custom={2}>
                    <p className="stat-number">∞</p>
                    <p className="stat-label text-mono">Curiosity</p>
                </motion.div>
            </motion.div>

            {/* Interests */}
            <motion.div
                className="about-interests"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
            >
                <motion.p className="section-label text-mono" variants={fadeUp}>
                    Things I'm Into
                </motion.p>
                <motion.div className="interest-tags" variants={fadeUp} custom={1}>
                    {interests.map(tag => (
                        <span key={tag} className="interest-tag text-mono">{tag}</span>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}

export default AboutMe
