import React, { useRef } from 'react'
import { motion, useScroll, useMotionValue, useMotionValueEvent } from 'framer-motion'
import './Projects.css'

const projects = [
    {
        title: 'Thynk',
        category: 'SaaS Platform',
        metric: 'User Growth +30%',
        description: 'An editorial blogging platform with custom block-style editor and AWS S3 integration.',
        color: '#DDB8A6',
        image: '/thynk.png'
    },
    {
        title: 'AgriGlance',
        category: 'AI Dashboard',
        metric: '50% Faster Insight',
        description: 'Smart agriculture monitoring system using neural networks and real-time mapping.',
        color: '#5D6D3E',
        image: '/agriglance.png'
    },
    {
        title: 'Barrel Boost',
        category: 'Creative Tech',
        metric: 'Physics First',
        description: 'Experimental 3D game engine built with React and Three.js principles.',
        color: '#EF6D58',
        image: '/barrelboost.png'
    },
    {
        title: 'Social Welfare',
        category: 'Web Application',
        metric: 'AI-Powered RAG',
        description: 'Full-stack social welfare platform with an n8n-powered RAG chatbot and automated data ingestion pipeline.',
        color: '#8B9E6A',
        image: '/socialwelfare.png'
    },
    {
        title: 'Portfolio 2.0',
        category: 'Design System',
        metric: 'Motion-First',
        description: 'This very portfolio — crafted with React, Framer Motion, and a custom scroll-driven animation system.',
        color: '#C9A882',
        image: '/portfolio.png'
    }
]

const Projects = () => {
    const wrapperRef = useRef(null)
    const rowRef = useRef(null)
    const x = useMotionValue(0)

    // Track scroll through the tall wrapper
    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ['start start', 'end end'],
    })

    // Dynamically drive X based on row's actual width vs viewport
    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        if (!rowRef.current) return
        // End padding ensures the last card stops flush at the right edge
        const endPadding = 64
        const maxX = -(rowRef.current.scrollWidth - window.innerWidth + endPadding)
        x.set(v * maxX)
    })

    return (
        // Tall wrapper — provides vertical scroll distance for horizontal pan
        <div ref={wrapperRef} className="projects-scroll-wrapper">
            <section id="work" className="projects-sticky">

                {/* Header stays at top of the sticky section */}
                <div className="container projects-header-wrap">
                    <header className="projects-header">
                        <h2 className="text-mono text-coral">Selected Work</h2>
                        <div className="line-divider" />
                    </header>
                </div>

                {/* Horizontally scrolling track */}
                <div className="projects-track-outer">
                    <motion.div
                        ref={rowRef}
                        style={{ x }}
                        className="projects-track"
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="project-card"
                            >
                                <div
                                    className="project-image-wrapper"
                                    style={{
                                        backgroundColor: project.color,
                                        backgroundImage: project.image ? `url(${project.image})` : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center top',
                                    }}
                                >
                                    <div className="project-metric text-mono">{project.metric}</div>
                                    {/* Project number watermark */}
                                    <span className="project-number text-mono">0{index + 1}</span>
                                </div>

                                <div className="project-info">
                                    <p className="text-mono project-category">{project.category}</p>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-desc">{project.description}</p>
                                    <a href="#" className="view-project-link text-mono">View Project ↗</a>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll progress indicator */}
                <div className="projects-progress-bar">
                    <motion.div
                        className="projects-progress-fill"
                        style={{ scaleX: scrollYProgress }}
                    />
                </div>
            </section>
        </div>
    )
}

export default Projects
