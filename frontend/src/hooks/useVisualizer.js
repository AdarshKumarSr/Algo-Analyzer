import { useState } from 'react'
import { visualizeAlgorithm } from '../api/index'

function useVisualizer() {
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generate = async (slug, input) => {
    setLoading(true)
    setError(null)
    try {
      const res = await visualizeAlgorithm(slug, input)
      setSteps(res.data.data.steps)
      setCurrentStep(0)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const next = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  const prev = () => setCurrentStep(prev => Math.max(prev - 1, 0))
  const reset = () => { setCurrentStep(0); setIsPlaying(false) }

  const clear = () => {
    setSteps([])
    setCurrentStep(0)
    setIsPlaying(false)
    setError(null)
  }

  const play = () => {
    setIsPlaying(true)
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval)
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 600)
  }

  return {
    steps,
    currentStep,
    step: steps[currentStep] || null,
    isPlaying,
    loading,
    error,
    generate,
    next,
    prev,
    reset,
    clear,  // ← add
    play,
    totalSteps: steps.length
  }
}

export default useVisualizer;