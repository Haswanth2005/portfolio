import React from 'react'
import { motion } from 'framer-motion'
import './Skills.css'

const skillGroups = [
  {
    title: 'Frontend',
    items: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Framer'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'JWT'],
  },
  {
    title: 'Tools',
    items: ['Git', 'Vite', 'Figma', 'AWS', 'Postman'],
  },
  {
    title: 'Other',
    items: ['Unity', 'C#', 'Three.js', 'Rive'],
  },
]

const simpleIconUrl = (slug) =>
  `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`

const logoByName = (name) => {
  const map = {
    'React': 'react',
    'JavaScript': 'javascript',
    'TypeScript': 'typescript',
    'HTML5': 'html5',
    'CSS3': 'css3',
    'Framer': 'framer',
    'Node.js': 'nodedotjs',
    'Express': 'express',
    'MongoDB': 'mongodb',
    'MySQL': 'mysql',
    'JWT': 'jsonwebtokens',
    'Git': 'git',
    'Vite': 'vite',
    'Figma': 'figma',
    'AWS': 'amazonaws',
    'Postman': 'postman',
    'Unity': 'unity',
    'C#': 'csharp',
    'Three.js': 'threedotjs',
    'Rive': 'rive',
  }
  const slug = map[name]
  return slug ? simpleIconUrl(slug) : null
}

const Skills = () => {
  return (
    <section id="skills" className="skills-section container section">
      <header className="skills-header">
        <h2 className="text-huge">
          SKILLS<span className="text-coral">.</span>
        </h2>
        <div className="line-divider" />
      </header>

      <div className="skills-grid">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="skill-card"
          >
            <h3 className="skill-card-title text-mono">{group.title}</h3>
            <div className="skill-logo-grid">
              {group.items.map((item) => {
                const url = logoByName(item)
                return url ? (
                  <img
                    key={item}
                    src={url}
                    alt={`${item} logo`}
                    title={item}
                    className="skill-logo"
                    loading="lazy"
                  />
                ) : (
                  <span key={item} className="skill-chip text-mono">
                    {item}
                  </span>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills
