import React from 'react'
import { motion } from 'framer-motion'
import './Projects.css'

const projects = [
    {
        title: 'Thynk',
        category: 'SaaS Platform',
        metric: 'User Growth +30%',
        description: 'An editorial blogging platform with custom interactions and cloud scaling.',
        color: '#DDB8A6'
    },
    {
        title: 'AgriGlance',
        category: 'AI Dashboard',
        metric: '50% Faster Insight',
        description: 'Smart agriculture monitoring system using neural networks and real-time mapping.',
        color: '#5D6D3E'
    },
    {
        title: 'Barrel Boost',
        category: 'Creative Tech',
        metric: 'Physics First',
        description: 'Experimental 3D game engine built with React and Three.js principles.',
        color: '#EF6D58'
    }
]

const Projects = () => {
    return (
        <section id="work" className="projects-section container section">
            <header className="projects-header">
                <h2 className="text-mono text-coral">Selected Work</h2>
                <div className="line-divider" />
            </header>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="project-card"
                    >
                        <div className="project-image-wrapper" style={{ backgroundColor: project.color }}>
                            {/* Image would go here */}
                            <div className="project-metric text-mono">{project.metric}</div>
                        </div>

                        <div className="project-info">
                            <p className="text-mono project-category">{project.category}</p>
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.description}</p>
                            <a href="#" className="view-project-link text-mono">View Project</a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Projects
