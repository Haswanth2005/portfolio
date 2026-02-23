import React from 'react'
import { motion } from 'framer-motion'
import './Experience.css'

const experiences = [
    {
        role: 'Full-Stack Developer',
        company: 'Project Thynk',
        period: 'Dec 2025',
        details: 'Engineered a comprehensive blogging platform with custom block-style editor and AWS S3 integration.'
    },
    {
        role: 'Frontend Architect',
        company: 'AgriGlance',
        period: 'Feb 2025',
        details: 'Built AI-powered monitoring dashboards, optimizing UI performance and cutting load times by 50%.'
    },
    {
        role: 'Unity Game Developer',
        company: 'Barrel Boost',
        period: 'Aug 2025',
        details: 'Developed a fast-paced semi-3D game with physics-based movement and custom VISUAL effects.'
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
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Experience
