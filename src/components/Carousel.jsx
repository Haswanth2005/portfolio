import React, { useEffect, useId, useRef, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import './Carousel.css'

const Slide = ({ slide, index, current, onClick }) => {
  const liRef = useRef(null)
  const xRef = useRef(0)
  const yRef = useRef(0)
  const frameRef = useRef()

  useEffect(() => {
    const animate = () => {
      if (!liRef.current) return
      liRef.current.style.setProperty('--x', `${xRef.current}px`)
      liRef.current.style.setProperty('--y', `${yRef.current}px`)
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  const onMove = (e) => {
    const el = liRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    xRef.current = e.clientX - (r.left + Math.floor(r.width / 2))
    yRef.current = e.clientY - (r.top + Math.floor(r.height / 2))
  }

  const onLeave = () => {
    xRef.current = 0
    yRef.current = 0
  }

  return (
    <div className="carousel-perspective">
      <li
        ref={liRef}
        className="carousel-slide"
        onClick={() => onClick(index)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transform: current !== index ? 'scale(0.98) rotateX(8deg)' : 'scale(1) rotateX(0deg)',
        }}
      >
        <div
          className="carousel-surface"
          style={{ transform: current === index ? 'translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)' : 'none' }}
        >
          {slide.type === 'image' && slide.src ? (
            <img
              className="carousel-image"
              alt={slide.title}
              src={slide.src}
              loading="eager"
              decoding="sync"
              style={{ opacity: current === index ? 1 : 0.6 }}
            />
          ) : (
            <div className="carousel-pdf-tile text-mono">PDF</div>
          )}
          {current === index && <div className="carousel-dim" />}
        </div>

        <article className={`carousel-caption ${current === index ? 'visible' : 'hidden'}`}>
          <h2 className="carousel-title">{slide.title}</h2>
          <div className="carousel-button-wrap">
            <button className="carousel-button text-mono">{slide.button || 'View Certificate'}</button>
          </div>
        </article>
      </li>
    </div>
  )
}

const Control = ({ type, title, onClick }) => {
  return (
    <button
      className={`carousel-control ${type === 'prev' ? 'rotate' : ''}`}
      title={title}
      onClick={onClick}
      aria-label={title}
    >
      <ChevronRight size={18} />
    </button>
  )
}

const Carousel = ({ slides, onSlideClick, onCurrentChange, className = '', full = false, previewPdf = false }) => {
  const [current, setCurrent] = useState(0)
  const id = useId()

  useEffect(() => {
    onCurrentChange?.(current)
  }, [current, onCurrentChange])

  const prev = () =>
    setCurrent((c) => {
      const n = c - 1 < 0 ? slides.length - 1 : c - 1
      return n
    })
  const next = () =>
    setCurrent((c) => {
      const n = c + 1 === slides.length ? 0 : c + 1
      return n
    })
  const handleClick = (index) => {
    if (current !== index) {
      setCurrent(index)
    } else {
      onSlideClick?.(slides[index])
    }
  }

  return (
    <div className={`carousel-root ${full ? 'fill-parent' : ''} ${className}`} aria-labelledby={`carousel-heading-${id}`}>
      <ul
        className="carousel-track"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((s, i) => (
          <div className="carousel-perspective" key={i}>
            <li
              className="carousel-slide"
              onClick={() => handleClick(i)}
              style={{
                transform: current !== i ? 'scale(0.98) rotateX(8deg)' : 'scale(1) rotateX(0deg)',
              }}
            >
              <div
                className="carousel-surface"
                style={{ transform: current === i ? 'translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)' : 'none' }}
              >
                {previewPdf && s.type === 'pdf' ? (
                  <object
                    data={`${s.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-fit`}
                    type="application/pdf"
                    className="carousel-pdf-embed"
                  />
                ) : s.type === 'image' && s.src ? (
                  <img
                    className="carousel-image"
                    alt={s.title}
                    src={s.src}
                    loading="eager"
                    decoding="sync"
                    style={{ opacity: current === i ? 1 : 0.6 }}
                  />
                ) : (
                  <div className="carousel-pdf-tile text-mono">PDF</div>
                )}
                {current === i && <div className="carousel-dim" />}
              </div>
              <article className={`carousel-caption ${full ? 'hidden' : current === i ? 'visible' : 'hidden'}`}>
                <h2 className="carousel-title">{s.title}</h2>
                <div className="carousel-button-wrap">
                  <button className="carousel-button text-mono">{s.button || 'View Certificate'}</button>
                </div>
              </article>
            </li>
          </div>
        ))}
      </ul>
      <div className="carousel-controls">
        <Control type="prev" title="Previous" onClick={prev} />
        <Control type="next" title="Next" onClick={next} />
      </div>
    </div>
  )
}

export default Carousel
