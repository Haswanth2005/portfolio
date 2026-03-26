import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import './ProjectModal.css'

export default function ProjectModal({ project, isOpen, onClose }) {
  const [mainImage, setMainImage] = useState(null)

  useEffect(() => {
    if (project && isOpen) {
      setMainImage(project.gallery && project.gallery.length > 0 ? project.gallery[0] : project.image)
    }
  }, [project, isOpen])

  // Lock body scroll (and Lenis) when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.lenis?.stop() // Stop smooth scroll
    } else {
      document.body.style.overflow = ''
      window.lenis?.start()
    }

    // Cleanup on unmount just in case
    return () => {
      document.body.style.overflow = ''
      window.lenis?.start()
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="project-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose} // Click outside to close
        >
          <motion.div
            className="project-modal-content"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
          >
            <button className="project-modal-close" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>

            {/* Left Side: Image Gallery */}
            <div 
              className="project-modal-image-col"
              style={{ backgroundColor: project.color || 'var(--color-muted)' }}
            >
              {/* Main Large Image */}
              <motion.div
                className="project-modal-main-image-wrap"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {mainImage ? (
                  <motion.img 
                    key={mainImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={mainImage} 
                    alt={`${project.title} master shot`} 
                    className="project-modal-main-image" 
                  />
                ) : (
                  <span className="project-modal-no-image text-mono">Image coming soon</span>
                )}
              </motion.div>

              {/* Thumbnails Row */}
              {project.gallery && project.gallery.length > 1 && (
                <div className="project-modal-thumbnails">
                  {project.gallery.filter(img => img !== mainImage).slice(0, 3).map((img, i) => (
                    <motion.div
                      key={`thumb-${img}-${i}`}
                      className="project-modal-thumb-wrap"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1), duration: 0.4 }}
                      onClick={(e) => { e.stopPropagation(); setMainImage(img); }}
                      style={{ cursor: 'pointer' }}
                    >
                      <img src={img} alt={`Thumbnail ${i}`} className="project-modal-thumb" />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side: Details */}
            <div className="project-modal-info-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <p className="project-modal-category text-mono">{project.category}</p>
                <h2 className="project-modal-title">{project.title}</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <span className="project-modal-metric text-mono">{project.metric}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <p className="project-modal-desc">{project.description}</p>
                {/* For demo purposes, we can add some extra mock content here to show scrolling if needed,
                    but keeping it clean for now based on the reference design. */}
              </motion.div>

              <motion.div 
                className="project-modal-link-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-modal-link text-mono">
                    VIEW LIVE PROJECT <ArrowUpRight size={18} />
                  </a>
                ) : (
                  <a href="#" className="project-modal-link text-mono" onClick={(e) => e.preventDefault()}>
                    COMING SOON <ArrowUpRight size={18} />
                  </a>
                )}
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
