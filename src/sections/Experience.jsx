import React from 'react'
import { motion } from 'framer-motion'
import './Experience.css'

const experiences = [
    {
        role: 'Full-Stack Developer',
        company: 'Project Thynk',
        period: 'Dec 2025',
        details: 'Engineered a comprehensive blogging platform with custom block-style editor and AWS S3 integration.',
        bullets: [
            'Built a custom Notion-style block editor from scratch using React and Draft.js with drag-and-drop reordering.',
            'Integrated AWS S3 for image and file uploads with signed URL pre-authorization and CDN delivery.',
            'Designed a RESTful API with Node.js and Express, secured with JWT authentication and role-based access control.',
            'Implemented real-time collaborative editing using WebSockets, reducing content conflicts by over 90%.',
            'Reduced initial page load by 40% through lazy loading, code splitting, and server-side rendering with Next.js.'
        ]
    },
    {
        role: 'Frontend Architect',
        company: 'AgriGlance',
        period: 'Feb 2025',
        details: 'Built AI-powered monitoring dashboards, optimizing UI performance and cutting load times by 50%.',
        bullets: [
            'Architected a real-time sensor data dashboard consuming live MQTT streams and visualized with Chart.js and Mapbox GL.',
            'Integrated a neural-network crop disease classifier, surfacing model predictions with confidence scores in the UI.',
            'Reduced dashboard load time by 50% via virtualized list rendering, memoization, and aggressive API response caching.',
            'Established a component design system with 30+ reusable React components, cutting new feature development time by 35%.',
            'Led accessibility audit bringing the app to WCAG 2.1 AA compliance across all major screen readers.'
        ]
    },
    {
        role: 'Unity Game Developer',
        company: 'Barrel Boost',
        period: 'Aug 2025',
        details: 'Developed a fast-paced semi-3D game with physics-based movement and custom visual effects.',
        bullets: [
            'Implemented a custom physics controller in C# with barrel-roll momentum, collision response, and variable friction surfaces.',
            'Designed and built a procedural level generation system producing infinite, balanced obstacle courses.',
            'Created a post-processing visual pipeline (bloom, chromatic aberration, motion blur) within Unity URP for cinematic feel.',
            'Optimized draw calls from 800+ to under 150 using GPU instancing, occlusion culling, and LOD grouping.',
            'Published to WebGL via itch.io, achieving a smooth 60 fps target on mid-range hardware.'
        ]
    }
]

const skills = [
    'React', 'Node.js', 'Unity', 'C#', 'JavaScript',
    'MongoDB', 'AWS S3', 'Figma', 'PHP', 'MySQL'
]

const Experience = () => {
    return (
        <section id="experience" className="experience-section container section">
            <div className="exp-grid">
                <div className="exp-left">
                    <h2 className="text-huge">EXP<span className="text-coral">.</span></h2>
                    <p className="text-mono">Professional Journey</p>

                    <div className="skills-cloud">
                        {skills.map(skill => (
                            <span key={skill} className="skill-tag text-mono">{skill}</span>
                        ))}
                    </div>
                </div>

                <div className="exp-right">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="exp-item"
                        >
                            <div className="exp-header">
                                <h3 className="exp-role">{exp.role}</h3>
                                <span className="exp-period text-mono">{exp.period}</span>
                            </div>
                            <p className="exp-company text-coral text-mono">{exp.company}</p>
                            <p className="exp-details">{exp.details}</p>

                            <ul className="exp-bullets">
                                {exp.bullets.map((bullet, i) => (
                                    <li key={i} className="exp-bullet">{bullet}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Experience
