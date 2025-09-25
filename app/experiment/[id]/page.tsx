import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Zap, FlaskConical, Loader as Loader2 } from "lucide-react"
import { notFound } from "next/navigation"
import { useState } from 'react'
import OhmsLaw from '@/components/experiments/ohms-law'
import AcidBase from '@/components/experiments/acid-base'
import Quiz from '@/components/quiz'

'use client'

const experiments = {
  "ohms-law": {
    title: "Ohm's Law Experiment",
    description:
      "Explore the fundamental relationship between voltage, current, and resistance in electrical circuits.",
    icon: Zap,
    color: "from-purple-500 to-blue-500",
    theory:
      "Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage across the two points.",
    formula: "V = I × R",
  },
  "acid-base-indicator": {
    title: "Acid-Base Indicator Experiment",
    description: "Discover how pH indicators change color when mixed with acids and bases of different strengths.",
    icon: FlaskConical,
    color: "from-green-500 to-teal-500",
    theory: "pH indicators are weak acids or bases that change color depending on the pH of the solution they are in.",
    formula: "pH = -log[H⁺]",
  },
}

interface ExperimentPageProps {
  params: Promise<{ id: string }>
}

export default async function ExperimentPage({ params }: ExperimentPageProps) {
  const { id } = await params
  const [explanation, setExplanation] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // This needs to be a client component, so we'll move the async logic
  const experiment = experiments[id as keyof typeof experiments]

  if (!experiment) {
    notFound()
  }

  const IconComponent = experiment.icon

  const handleExplain = async (inputs: any) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experimentId: id,
          inputs
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get explanation')
      }

      const data = await response.json()
      setExplanation(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Lab
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${experiment.color}`}
                >
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">{experiment.title}</h1>
                  <p className="text-sm text-muted-foreground">Interactive Simulation</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Active Experiment
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Simulation Canvas */}
          <div>
            {id === 'ohms-law' && <OhmsLaw onExplain={handleExplain} />}
            {id === 'acid-base-indicator' && <AcidBase onExplain={handleExplain} />}
          </div>

          {/* Right Side - Theory and Results */}
          <div className="space-y-6 lg:max-h-screen lg:overflow-y-auto">
            {/* Theory Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Theory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{experiment.theory}</p>
                <div className="bg-primary/10 rounded-lg p-3 text-center">
                  <code className="text-primary font-mono text-lg">{experiment.formula}</code>
                </div>
              </CardContent>
            </Card>

            {/* Loading State */}
            {loading && (
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span>Generating explanation...</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error State */}
            {error && (
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm border-red-500/50">
                <CardContent className="py-6">
                  <div className="text-red-600 text-center">
                    <p className="font-medium">Error</p>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Explanation Results */}
            {explanation && (
              <>
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">AI Explanation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed">{explanation.explanation}</p>
                    
                    {explanation.equations && explanation.equations.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Key Equations:</h4>
                        <div className="space-y-2">
                          {explanation.equations.map((eq: string, index: number) => (
                            <div key={index} className="bg-primary/10 rounded-lg p-3 text-center">
                              <code className="text-primary font-mono">{eq}</code>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {explanation.real_world && explanation.real_world.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Real-World Applications:</h4>
                        <ul className="text-sm space-y-1">
                          {explanation.real_world.map((app: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              <span>{app}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {explanation.quiz && explanation.quiz.length > 0 && (
                  <Quiz questions={explanation.quiz} title="AI-Generated Quiz" />
                )}
              </>
            )}

            {/* Default Quiz Section (when no AI explanation yet) */}
            {!explanation && !loading && (
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Get Started</CardTitle>
                  <CardDescription>Adjust the experiment parameters and click "Run & Explain" to get AI-powered insights</CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
