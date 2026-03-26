import React, { useRef, useState } from 'react'
import { motion, useScroll, useMotionValue, useMotionValueEvent } from 'framer-motion'
import ProjectModal from '../components/ProjectModal'
import './Projects.css'

const projects = [
    {
        title: 'Thynk',
        category: 'SaaS Platform',
        metric: 'User Growth +30%',
        description: 'An editorial blogging platform with custom block-style editor and AWS S3 integration.',
        color: '#DDB8A6',
        image: '/projects/thynk1.png',
        gallery: ['/projects/thynk1.png', '/projects/thynk2.png', '/projects/thynk3.png'],
        link: 'https://github.com/Haswanth2005/Thynk'
    },
    {
        title: 'Treble',
        category: 'Music Tool',
        metric: 'Cross-Platform',
        description: 'Convert playlists between Spotify, YouTube Music, Apple Music, Amazon Music, Tidal & Deezer in seconds.',
        color: '#1DB954',
        image: '/projects/treble1.png',
        gallery: ['/projects/treble1.png', '/projects/treble2.png', '/projects/treble3.png'],
        link: 'https://github.com/Haswanth2005/treble'
    },
    {
        title: 'Gameland',
        category: 'Creative Tech',
        metric: 'Physics First',
        description: 'Experimental 3D game engine built with React and Three.js principles.',
        color: '#EF6D58',
        image: '/projects/barrelboost1.png',
        gallery: ['/projects/barrelboost1.png', '/projects/barrelboost2.png', '/projects/barrelboost3.png'],
        link: 'https://github.com/GanjaSiddiGanesh/gameland'
    },
    {
        title: 'AI Resume Builder',
        category: 'Web Application',
        metric: 'AI-Powered',
        description: 'An AI-powered application that helps users generate and format professional resumes.',
        color: '#8A7BBF',
        image: '/projects/airesumebuilder1.png',
        gallery: ['/projects/airesumebuilder1.png', '/projects/airesumebuilder2.png', '/projects/airesumebuilder3.png']
    }
]

const Projects = () => {
    const wrapperRef = useRef(null)
    const rowRef = useRef(null)
    const x = useMotionValue(0)

    // State for the modal
    const [selectedProject, setSelectedProject] = useState(null)

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
                                onClick={() => setSelectedProject(project)}
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
                                    <span className="view-project-link text-mono">View Project ↗</span>
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

            {/* Project Details Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    )
}

export default Projects
