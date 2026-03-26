import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Users, Award } from 'lucide-react'
import './Achievements.css'

const achievements = [
  {
    title: 'Smart India Hackathon 2024',
    category: 'National Hackathon',
    achievement: 'Round 2 Qualifier',
    description: 'Qualified for Round 2 of Smart India Hackathon (SIH), one of India\'s biggest hackathons. Competed with thousands of teams nationwide, developed innovative solutions, and demonstrated strong problem-solving and teamwork skills.',
    color: '#FF6B35',
    icon: Trophy,
    image: '/achievements/image.png',
    link: null,
    stats: [
      { label: 'Teams Competed', value: '5000+', icon: Users },
      { label: 'Achievement', value: 'Round 2', icon: Award },
    ]
  }
]

const Achievements = () => {
  return (
    <section id="achievements" className="achievements-section">
      <div className="container">
        <motion.header
          className="achievements-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-huge">
            ACHIEVEMENTS<span className="text-coral">.</span>
          </h2>
          <div className="line-divider" />
        </motion.header>

        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className="achievement-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="achievement-content">
                <div className="achievement-header">
                  <div className="achievement-icon" style={{ backgroundColor: achievement.color }}>
                    <achievement.icon size={24} color="#fff" />
                  </div>
                  <div>
                    <p className="achievement-category text-mono">{achievement.category}</p>
                    <h3 className="achievement-title">{achievement.title}</h3>
                  </div>
                </div>

                <p className="achievement-description">{achievement.description}</p>

                <div className="achievement-stats">
                  {achievement.stats.map((stat, i) => (
                    <div key={i} className="achievement-stat">
                      <stat.icon size={18} className="stat-icon" />
                      <div>
                        <p className="stat-value">{stat.value}</p>
                        <p className="stat-label text-mono">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="achievement-footer">
                  <div className="achievement-badge" style={{ backgroundColor: achievement.color }}>
                    <span className="text-mono">{achievement.achievement}</span>
                  </div>
                </div>
              </div>

              <div className="achievement-image-wrapper">
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="achievement-image"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
