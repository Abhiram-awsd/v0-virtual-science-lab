import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, RotateCcw, Zap, FlaskConical } from "lucide-react"
import { notFound } from "next/navigation"

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
    readouts: [
      { label: "Voltage (V)", value: "12.0", unit: "V" },
      { label: "Current (I)", value: "2.4", unit: "A" },
      { label: "Resistance (R)", value: "5.0", unit: "Ω" },
      { label: "Power (P)", value: "28.8", unit: "W" },
    ],
    quiz: [
      {
        question: "If voltage increases and resistance stays constant, what happens to current?",
        options: ["Increases", "Decreases", "Stays the same", "Becomes zero"],
        correct: 0,
      },
      {
        question: "What is the unit of electrical resistance?",
        options: ["Ampere", "Volt", "Ohm", "Watt"],
        correct: 2,
      },
    ],
  },
  "acid-base-indicator": {
    title: "Acid-Base Indicator Experiment",
    description: "Discover how pH indicators change color when mixed with acids and bases of different strengths.",
    icon: FlaskConical,
    color: "from-green-500 to-teal-500",
    theory: "pH indicators are weak acids or bases that change color depending on the pH of the solution they are in.",
    formula: "pH = -log[H⁺]",
    readouts: [
      { label: "pH Level", value: "7.2", unit: "" },
      { label: "Temperature", value: "25.0", unit: "°C" },
      { label: "Indicator Color", value: "Blue", unit: "" },
      { label: "Solution Type", value: "Basic", unit: "" },
    ],
    quiz: [
      {
        question: "What pH value indicates a neutral solution?",
        options: ["0", "7", "14", "1"],
        correct: 1,
      },
      {
        question: "What color does litmus paper turn in an acidic solution?",
        options: ["Blue", "Red", "Green", "Yellow"],
        correct: 1,
      },
    ],
  },
}

interface ExperimentPageProps {
  params: Promise<{ id: string }>
}

export default async function ExperimentPage({ params }: ExperimentPageProps) {
  const { id } = await params
  const experiment = experiments[id as keyof typeof experiments]

  if (!experiment) {
    notFound()
  }

  const IconComponent = experiment.icon

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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Simulation Canvas */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconComponent className="h-5 w-5 text-primary" />
                  Simulation Canvas
                </CardTitle>
                <CardDescription>{experiment.description}</CardDescription>
              </CardHeader>
              <CardContent className="h-full">
                <div className="h-full bg-secondary/20 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div
                      className={`h-20 w-20 rounded-full bg-gradient-to-br ${experiment.color} flex items-center justify-center mx-auto animate-pulse`}
                    >
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Simulation Area</h3>
                      <p className="text-muted-foreground text-sm max-w-md">
                        Interactive simulation will be rendered here. This is a placeholder for the actual experiment
                        interface.
                      </p>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
                      <div
                        className="h-2 w-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Control Panel */}
          <div className="space-y-6">
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

            {/* Numeric Readouts */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Live Readings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {experiment.readouts.map((readout, index) => (
                    <div key={index} className="bg-secondary/20 rounded-lg p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">{readout.label}</div>
                      <div className="text-lg font-mono font-bold text-primary">
                        {readout.value}
                        {readout.unit && <span className="text-sm text-muted-foreground ml-1">{readout.unit}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Control Buttons */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full gap-2" size="lg">
                  <Play className="h-4 w-4" />
                  Run & Explain
                </Button>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <RotateCcw className="h-4 w-4" />
                  Reset Experiment
                </Button>
              </CardContent>
            </Card>

            {/* Quiz Section */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Quiz</CardTitle>
                <CardDescription>Test your understanding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {experiment.quiz.map((question, qIndex) => (
                  <div key={qIndex} className="space-y-3">
                    <p className="text-sm font-medium">
                      {qIndex + 1}. {question.question}
                    </p>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <Button
                          key={oIndex}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left h-auto py-2 px-3 bg-transparent"
                        >
                          <span className="text-xs bg-muted rounded px-1.5 py-0.5 mr-2">
                            {String.fromCharCode(65 + oIndex)}
                          </span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
