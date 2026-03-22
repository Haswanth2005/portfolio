import React, { useEffect, useRef, useState } from 'react'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

GlobalWorkerOptions.workerSrc = workerUrl

const PdfCanvas = ({ src }) => {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!src) return
    let cancelled = false
    setError(null)

    const render = async () => {
      try {
        const loadingTask = getDocument(src)
        const pdf = await loadingTask.promise
        if (cancelled) return
        const page = await pdf.getPage(1)
        if (cancelled) return

        const wrap = wrapRef.current
        const canvas = canvasRef.current
        if (!wrap || !canvas) return
        const ctx = canvas.getContext('2d')

        const fit = async () => {
          const rect = wrap.getBoundingClientRect()
          const viewport0 = page.getViewport({ scale: 1 })
          const scaleFit = Math.min(rect.width / viewport0.width, rect.height / viewport0.height) * 0.95
          const viewport = page.getViewport({ scale: scaleFit })

          canvas.width = Math.floor(rect.width)
          canvas.height = Math.floor(rect.height)
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Center the PDF in the canvas
          const offsetX = (canvas.width - viewport.width) / 2
          const offsetY = (canvas.height - viewport.height) / 2

          ctx.translate(offsetX, offsetY)
          await page.render({ canvasContext: ctx, viewport }).promise
          ctx.setTransform(1, 0, 0, 1, 0, 0)
        }

        await fit()

        const ro = new ResizeObserver(() => {
          fit()
        })
        ro.observe(wrap)

        return () => ro.disconnect()
      } catch (e) {
        if (!cancelled) {
          setError('Failed to load PDF')
        }
      }
    }

    const cleanup = render()
    return () => {
      cancelled = true
      if (typeof cleanup === 'function') cleanup()
    }
  }, [src])

  return (
    <div ref={wrapRef} style={{ width: '100%', height: '100%' }}>
      {error ? (
        <p className="text-mono" style={{ padding: '1rem' }}>
          {error}. <a href={src} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 6 }}>Open the certificate</a>
        </p>
      ) : (
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      )}
    </div>
  )
}

export default PdfCanvas
