'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle } from 'lucide-react'

interface QuizQuestion {
  q: string
  options: string[]
  answer: number
}

interface QuizProps {
  questions: QuizQuestion[]
  title?: string
}

export default function Quiz({ questions, title = "Knowledge Check" }: QuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (showResults) return
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }))
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const handleReset = () => {
    setSelectedAnswers({})
    setShowResults(false)
  }

  const getScore = () => {
    let correct = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        correct++
      }
    })
    return correct
  }

  const allAnswered = questions.every((_, index) => selectedAnswers[index] !== undefined)

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          {showResults && (
            <div className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
              Score: {getScore()}/{questions.length}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="space-y-3">
            <p className="text-sm font-medium">
              {qIndex + 1}. {question.q}
            </p>
            <div className="space-y-2">
              {question.options.map((option, oIndex) => {
                const isSelected = selectedAnswers[qIndex] === oIndex
                const isCorrect = oIndex === question.answer
                const isWrong = showResults && isSelected && !isCorrect
                const shouldShowCorrect = showResults && isCorrect

                return (
                  <Button
                    key={oIndex}
                    variant="outline"
                    size="sm"
                    className={`w-full justify-start text-left h-auto py-3 px-4 bg-transparent transition-all ${
                      isSelected && !showResults ? 'bg-primary/10 border-primary' : ''
                    } ${
                      shouldShowCorrect ? 'bg-green-500/10 border-green-500 text-green-600' : ''
                    } ${
                      isWrong ? 'bg-red-500/10 border-red-500 text-red-600' : ''
                    }`}
                    onClick={() => handleAnswerSelect(qIndex, oIndex)}
                    disabled={showResults}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <span className="text-xs bg-muted rounded px-2 py-1 shrink-0">
                        {String.fromCharCode(65 + oIndex)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {showResults && isCorrect && (
                        <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                      )}
                      {showResults && isWrong && (
                        <XCircle className="h-4 w-4 text-red-600 shrink-0" />
                      )}
                    </div>
                  </Button>
                )
              })}
            </div>
          </div>
        ))}

        <div className="flex gap-3 pt-4">
          {!showResults ? (
            <Button 
              onClick={handleSubmit} 
              disabled={!allAnswered}
              className="flex-1"
            >
              Submit Quiz
            </Button>
          ) : (
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Try Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}