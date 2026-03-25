import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LoadingScreen.css'

const greetings = [
  'Namaste 🙏',
  'Salam',
  'Hola',
  'Ni Hao',
  'Olá',
  'Bonjour',
  'Shalom',
]

const BAR_COUNT = 5
const GREETING_INTERVAL = 500 // ms per greeting
const STAIRCASE_STAGGER = 0.08 // delay between each bar
const STAIRCASE_DURATION = 0.5 // each bar animation duration

export default function LoadingScreen({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState('greetings') // 'greetings' | 'reveal' | 'done'

  // Cycle through greetings
  useEffect(() => {
    if (phase !== 'greetings') return

    // Calculate dynamic duration: start at 600ms, decrease by 75ms each step, min 150ms
    const currentDuration = Math.max(150, 600 - currentIndex * 75)

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => {
        if (prev >= greetings.length - 1) {
          // Small pause on last greeting before reveal
          setTimeout(() => setPhase('reveal'), 400)
          return prev
        }
        return prev + 1
      })
    }, currentDuration)

    return () => clearTimeout(timer)
  }, [currentIndex, phase])

  // After staircase reveal completes, signal done
  const handleRevealComplete = () => {
    setPhase('done')
    onComplete?.()
  }

  if (phase === 'done') return null

  return (
    <>
      {/* Coral background — stays constant throughout both phases */}
      <div className="loading-screen">
        {/* Greeting text — fades in/out but background stays */}
        <AnimatePresence mode="wait">
          {phase === 'greetings' && (
            <motion.span
              className="loading-screen__greeting"
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {greetings[currentIndex]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Staircase reveal bars — on top of the coral background */}
      <AnimatePresence>
        {phase === 'reveal' && (
          <div className="loading-screen__reveal">
            {Array.from({ length: BAR_COUNT }).map((_, i) => (
              <motion.div
                className="loading-screen__bar"
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{
                  duration: STAIRCASE_DURATION,
                  delay: i * STAIRCASE_STAGGER,
                  ease: [0.65, 0, 0.35, 1],
                }}
                onAnimationComplete={
                  i === BAR_COUNT - 1
                    ? () => {
                        // After the last bar finishes expanding, wait briefly then exit
                        setTimeout(handleRevealComplete, 300)
                      }
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
