import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './Certificates.css'

const certificates = [
  {
    title: 'Data Structures & Algorithms',
    issuer: 'neoColab',
    description: 'Comprehensive training covering arrays, linked lists, trees, graphs, sorting algorithms, and dynamic programming with hands-on problem solving.',
    color: '#3B82F6',
    initials: 'DSA',
    image: '/certificates/dsa.png',
    pdf: '/certificates/DSA neoColab.pdf',
  },
  {
    title: 'Java Programming',
    issuer: 'neoColab',
    description: 'In-depth Java course covering OOP principles, collections framework, exception handling, multithreading, and enterprise application patterns.',
    color: '#F59E0B',
    initials: 'JAVA',
    image: '/certificates/java.png',
    pdf: '/certificates/Java neoColab.pdf',
  },
  {
    title: 'Game Development',
    issuer: 'CipherSchools',
    description: 'Complete Unity and C# game development course. Built a full game with physics-based movement, collision detection, scoring, and VFX systems.',
    color: '#8B5CF6',
    initials: 'GD',
    image: '/certificates/gamedev.png',
    pdf: '/certificates/GameDev CipherSchools.pdf',
  },
  {
    title: 'Git & GitHub',
    issuer: 'Version Control',
    description: 'Mastered Git workflows including branching strategies, merge conflict resolution, rebasing, CI/CD pipelines, and collaborative development practices.',
    color: '#EF4444',
    initials: 'GIT',
    image: '/certificates/git.png',
    pdf: '/certificates/Git and GitHub.pdf',
  },
  {
    title: 'Oracle AI',
    issuer: 'Oracle',
    description: 'Oracle-certified course on artificial intelligence fundamentals, covering machine learning models, neural networks, and AI-driven application development.',
    color: '#E76652',
    initials: 'AI',
    image: '/certificates/oracle-ai.png',
    pdf: '/certificates/oracle_AI.pdf',
  },
  {
    title: 'Oracle DBMS',
    issuer: 'Oracle',
    description: 'Database management certification covering SQL, PL/SQL, normalization, indexing, query optimization, and enterprise database administration.',
    color: '#0EA5E9',
    initials: 'DB',
    image: '/certificates/oracle-dbms.png',
    pdf: '/certificates/oracle_DBMS.pdf',
  },
]

function calculateGap(width) {
  const minWidth = 1024
  const maxWidth = 1456
  const minGap = 60
  const maxGap = 86
  if (width <= minWidth) return minGap
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth))
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
}

const Certificates = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverPrev, setHoverPrev] = useState(false)
  const [hoverNext, setHoverNext] = useState(false)
  const [containerWidth, setContainerWidth] = useState(1200)

  const imageContainerRef = useRef(null)
  const autoplayRef = useRef(null)

  const total = certificates.length
  const active = certificates[activeIndex]

  // Responsive gap
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, 5000)
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current) }
  }, [total])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total)
    if (autoplayRef.current) clearInterval(autoplayRef.current)
  }, [total])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
    if (autoplayRef.current) clearInterval(autoplayRef.current)
  }, [total])

  // 3D perspective transforms for the stacked images
  function getCardStyle(index) {
    const gap = calculateGap(containerWidth)
    const maxStickUp = gap * 0.8
    const isActive = index === activeIndex
    const isLeft = (activeIndex - 1 + total) % total === index
    const isRight = (activeIndex + 1) % total === index

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: 'auto',
        transform: 'translateX(0px) translateY(0px) scale(1) rotateY(0deg)',
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      }
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      }
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      }
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none',
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    }
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  const arrowBg = '#1A1714'
  const arrowFg = '#F2EEE8'
  const arrowHoverBg = '#E76652'

  return (
    <section id="certificates" className="certs-section">
      <div className="container">
        <motion.header
          className="certs-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-huge">
            CERTIFICATES<span className="text-coral">.</span>
          </h2>
          <div className="line-divider" />
        </motion.header>

        <div className="cert-testimonial-grid">
          {/* Left: 3D Stacked Cards */}
          <div className="cert-image-container" ref={imageContainerRef}>
            {certificates.map((cert, index) => (
              <div
                key={cert.initials}
                className="cert-perspective-card"
                style={{
                  ...getCardStyle(index),
                  backgroundColor: cert.color,
                }}
                onClick={() => {
                  setActiveIndex(index)
                  if (autoplayRef.current) clearInterval(autoplayRef.current)
                }}
              >
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="cert-perspective-image"
                  />
                ) : (
                  <span className="cert-perspective-initials">{cert.initials}</span>
                )}
              </div>
            ))}
          </div>

          {/* Right: Content */}
          <div className="cert-testimonial-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={quoteVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <h3 className="cert-t-title">{active.title}</h3>
                <p className="cert-t-issuer text-mono">{active.issuer}</p>
                <motion.p className="cert-t-desc">
                  {active.description.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                      animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut', delay: 0.025 * i }}
                      style={{ display: 'inline-block' }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <div className="cert-arrow-buttons">
              {active.pdf && (
                <a
                  className="cert-view-btn"
                  href={active.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={18} />
                  View Certificate
                </a>
              )}
              <div className="cert-nav-arrows">
                <button
                  className="cert-arrow-btn"
                  onClick={handlePrev}
                  onMouseEnter={() => setHoverPrev(true)}
                  onMouseLeave={() => setHoverPrev(false)}
                  style={{ backgroundColor: hoverPrev ? arrowHoverBg : arrowBg }}
                  aria-label="Previous certificate"
                >
                  <ArrowLeft size={20} color={arrowFg} />
                </button>
                <button
                  className="cert-arrow-btn"
                  onClick={handleNext}
                  onMouseEnter={() => setHoverNext(true)}
                  onMouseLeave={() => setHoverNext(false)}
                  style={{ backgroundColor: hoverNext ? arrowHoverBg : arrowBg }}
                  aria-label="Next certificate"
                >
                  <ArrowRight size={20} color={arrowFg} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certificates
