import React from 'react'
import PdfCanvas from '../components/PdfCanvas'
import './Resume.css'

const pdfPath = '/12311988.pdf'

const Resume = () => {
  const handleBack = (e) => {
    e.preventDefault()
    history.replaceState(null, '', ' ')
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="resume-section container section">
      <header className="resume-header">
        <h2 className="text-huge">
          RESUME<span className="text-coral">.</span>
        </h2>
        <div className="resume-actions">
          <a className="resume-btn text-mono" href={pdfPath} download>
            Download PDF ↧
          </a>
          <a className="resume-btn ghost text-mono" href={pdfPath} target="_blank" rel="noopener noreferrer">
            Open in New Tab ↗
          </a>
          <a className="resume-btn ghost text-mono" href="#" onClick={handleBack}>
            Back Home
          </a>
        </div>
      </header>

      <div className="resume-preview-wrap">
        <PdfCanvas src={pdfPath} />
      </div>
    </section>
  )
}

export default Resume
