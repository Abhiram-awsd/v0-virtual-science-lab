import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Beaker, Zap, FlaskConical } from "lucide-react"

export default function HomePage() {
  const experiments = [
    {
      id: "ohms-law",
      title: "Ohm's Law",
      description: "Explore the relationship between voltage, current, and resistance in electrical circuits.",
      icon: Zap,
      color: "from-purple-500 to-blue-500",
    },
    {
      id: "acid-base-indicator",
      title: "Acid-Base Indicator",
      description: "Discover how pH indicators change color in different chemical solutions.",
      icon: FlaskConical,
      color: "from-green-500 to-teal-500",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Beaker className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Virtual Science Lab</h1>
                <p className="text-sm text-muted-foreground">Interactive Learning Platform</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Virtual Science Lab for Hackathon
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Explore Science Through
            <span className="text-primary"> Interactive Experiments</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-8">
            Discover the wonders of science with our virtual laboratory. Conduct experiments, learn concepts, and test
            your knowledge in an immersive digital environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Start Experimenting
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Learn More
            </Button>
          </div>
        </div>

        {/* Experiments Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Available Experiments</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {experiments.map((experiment) => {
              const IconComponent = experiment.icon
              return (
                <Link key={experiment.id} href={`/experiment/${experiment.id}`}>
                  <Card className="group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${experiment.color} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {experiment.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">{experiment.description}</CardDescription>
                      <div className="mt-4 flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform duration-300">
                        Start Experiment →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">Why Choose Virtual Science Lab?</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <Beaker className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold">Interactive Simulations</h4>
              <p className="text-muted-foreground">
                Hands-on virtual experiments that respond to your inputs in real-time.
              </p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold">Instant Feedback</h4>
              <p className="text-muted-foreground">
                Get immediate results and explanations to enhance your learning experience.
              </p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <FlaskConical className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold">Safe Environment</h4>
              <p className="text-muted-foreground">Experiment without risk in our secure virtual laboratory setting.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
