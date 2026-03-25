import React from 'react'
import { motion } from 'framer-motion'
import './Skills.css'

const skills = [
  { name: 'React', slug: 'react' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'HTML5', slug: 'html5' },
  { name: 'CSS3', slug: 'css3' },
  { name: 'Tailwind', slug: 'tailwindcss' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Express', slug: 'express' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'MySQL', slug: 'mysql' },
  { name: 'Git', slug: 'git' },
  { name: 'Figma', slug: 'figma' },
  { name: 'Vite', slug: 'vite' },
  { name: 'AWS', slug: 'amazonaws' },
  { name: 'Postman', slug: 'postman' },
  { name: 'Three.js', slug: 'threedotjs' },
  { name: 'Framer', slug: 'framer' },
  { name: 'Unity', slug: 'unity' },
  { name: 'C#', slug: 'csharp' },
]

const iconUrl = (slug) =>
  `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`

const SkillTile = ({ name, slug }) => (
  <div className="skill-tile">
    <div className="skill-tile__icon-wrap">
      <img
        src={iconUrl(slug)}
        alt={`${name} logo`}
        className="skill-tile__icon"
        loading="lazy"
      />
    </div>
    <span className="skill-tile__label text-mono">{name}</span>
  </div>
)

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <motion.header
          className="skills-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-huge">
            SKILLS<span className="text-coral">.</span>
          </h2>
          <div className="line-divider" />
        </motion.header>

        {/* Carousel — contained within container width */}
        <div className="skills-carousel">
          <div className="skills-track">
            {/* Render skills list twice for seamless loop */}
            {[...skills, ...skills].map((skill, i) => (
              <SkillTile key={`${skill.slug}-${i}`} {...skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
