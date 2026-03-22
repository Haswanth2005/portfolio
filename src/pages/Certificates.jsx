import React, { useState } from 'react'
import PdfCanvas from '../components/PdfCanvas'

// Certificates available under /public/certificates
const certificates = [
  {
    title: 'Data Structures & Algorithms — neoColab',
    issuer: 'neoColab',
    date: '',
    file: '/certificates/DSA%20neoColab.pdf',
    type: 'pdf',
  },
  {
    title: 'Java — neoColab',
    issuer: 'neoColab',
    date: '',
    file: '/certificates/Java%20neoColab.pdf',
    type: 'pdf',
  },
  {
    title: 'Game Development — CipherSchools',
    issuer: 'CipherSchools',
    date: '',
    file: '/certificates/GameDev%20CipherSchools.pdf',
    type: 'pdf',
  },
  {
    title: 'Git & GitHub',
    issuer: '',
    date: '',
    file: '/certificates/Git%20and%20GitHub.pdf',
    type: 'pdf',
  },
  {
    title: 'Hackathon',
    issuer: '',
    date: '',
    file: '/certificates/hackthon.pdf',
    type: 'pdf',
  },
  {
    title: 'Oracle AI',
    issuer: 'Oracle',
    date: '',
    file: '/certificates/oracle_AI.pdf',
    type: 'pdf',
  },
  {
    title: 'Oracle DBMS',
    issuer: 'Oracle',
    date: '',
    file: '/certificates/oracle_DBMS.pdf',
    type: 'pdf',
  },
]

const Certificates = () => {
  const [index, setIndex] = useState(0)
  const selected = certificates[index]
  const next = () => setIndex((i) => (i + 1) % certificates.length)
  const prev = () => setIndex((i) => (i - 1 + certificates.length) % certificates.length)

  return (
    <section className="container section" style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <header style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: 'var(--space-md)' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', lineHeight: 0.9 }}>
          CERTIFICATES<span className="text-coral">.</span>
        </h2>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.8fr 1fr',
          gap: 'var(--space-md)',
          border: '1px solid rgba(61, 48, 37, 0.15)',
          borderRadius: 12,
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(6px)',
          padding: 'var(--space-md)',
          height: 'calc(100vh - 180px)',
        }}
      >
        <div
          style={{
            borderRadius: 8,
            overflow: 'hidden',
            background: '#fff',
            height: '100%',
          }}
        >
          {selected?.type === 'image' ? (
            <img
              src={selected.file}
              alt={selected.title}
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
          ) : (
            <PdfCanvas src={selected.file} />
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: 'clamp(1.25rem, 2.6vw, 2rem)', letterSpacing: '-0.01em' }}>{selected.title}</h3>
            {(selected.issuer || selected.date) && (
              <p className="text-mono" style={{ opacity: 0.7, fontSize: '0.8rem' }}>
                {selected.issuer} {selected.issuer && selected.date ? '—' : ''} {selected.date}
              </p>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="text-mono" onClick={prev} style={{ padding: '0.5rem 0.8rem', border: '1px solid rgba(61,48,37,0.25)', borderRadius: 6 }}>
              Prev
            </button>
            <button className="text-mono" onClick={next} style={{ padding: '0.5rem 0.8rem', border: '1px solid rgba(61,48,37,0.25)', borderRadius: 6 }}>
              Next
            </button>
            <a className="text-mono" href={selected.file} download style={{ padding: '0.5rem 0.8rem', background: 'var(--color-primary)', color: 'var(--color-white)', borderRadius: 6 }}>
              Download
            </a>
            <a className="text-mono" href={selected.file} target="_blank" rel="noopener noreferrer" style={{ padding: '0.5rem 0.8rem', border: '1px solid rgba(61,48,37,0.25)', borderRadius: 6 }}>
              Open ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certificates
