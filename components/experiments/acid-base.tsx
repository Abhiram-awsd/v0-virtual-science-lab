'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Play } from 'lucide-react'

interface AcidBaseProps {
  onExplain: (inputs: { ph: number; temperature: number; indicatorColor: string; solutionType: string }) => void
}

export default function AcidBase({ onExplain }: AcidBaseProps) {
  const [ph, setPh] = useState([7])
  const [temperature] = useState([25])

  const getIndicatorColor = (phValue: number) => {
    if (phValue < 3) return { color: '#ff0000', name: 'Red' }
    if (phValue < 5) return { color: '#ff8800', name: 'Orange' }
    if (phValue < 6) return { color: '#ffff00', name: 'Yellow' }
    if (phValue < 8) return { color: '#00ff00', name: 'Green' }
    if (phValue < 10) return { color: '#0088ff', name: 'Blue' }
    if (phValue < 12) return { color: '#4400ff', name: 'Indigo' }
    return { color: '#8800ff', name: 'Violet' }
  }

  const getSolutionType = (phValue: number) => {
    if (phValue < 7) return 'Acidic'
    if (phValue > 7) return 'Basic'
    return 'Neutral'
  }

  const indicator = getIndicatorColor(ph[0])
  const solutionType = getSolutionType(ph[0])

  const handleExplain = () => {
    onExplain({
      ph: parseFloat(ph[0].toFixed(1)),
      temperature: temperature[0],
      indicatorColor: indicator.name,
      solutionType
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>pH Indicator Simulation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-secondary/20 rounded-lg border-2 border-dashed border-border flex items-center justify-center relative overflow-hidden">
            {/* Beaker */}
            <div className="relative">
              <svg width="200" height="250" viewBox="0 0 200 250" className="drop-shadow-lg">
                {/* Beaker outline */}
                <path
                  d="M40 50 L40 200 Q40 220 60 220 L140 220 Q160 220 160 200 L160 50"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                />
                
                {/* Solution */}
                <path
                  d="M45 55 L45 195 Q45 210 60 210 L140 210 Q155 210 155 195 L155 55"
                  fill={indicator.color}
                  opacity="0.8"
                />
                
                {/* Beaker rim */}
                <line x1="35" y1="50" x2="165" y2="50" stroke="white" strokeWidth="4" strokeLinecap="round" />
                
                {/* Measurement marks */}
                {[0, 1, 2, 3, 4].map(i => (
                  <g key={i}>
                    <line 
                      x1="160" 
                      y1={70 + i * 30} 
                      x2="170" 
                      y2={70 + i * 30} 
                      stroke="white" 
                      strokeWidth="1"
                    />
                    <text 
                      x="175" 
                      y={75 + i * 30} 
                      fill="white" 
                      fontSize="10" 
                      textAnchor="start"
                    >
                      {500 - i * 100}ml
                    </text>
                  </g>
                ))}
              </svg>
              
              {/* pH indicator strip */}
              <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-32 rounded border-2 border-white/50 overflow-hidden">
                  <div 
                    className="w-full h-full transition-colors duration-500"
                    style={{ backgroundColor: indicator.color }}
                  />
                </div>
                <p className="text-xs text-center mt-2 text-white">pH Strip</p>
              </div>
            </div>
            
            {/* Bubbles animation for extreme pH */}
            {(ph[0] < 2 || ph[0] > 12) && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full animate-bounce"
                    style={{
                      left: `${45 + Math.random() * 20}%`,
                      top: `${60 + Math.random() * 30}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">pH Level: {ph[0].toFixed(1)}</label>
            <Slider
              value={ph}
              onValueChange={setPh}
              max={14}
              min={0}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Acidic</span>
              <span>Neutral</span>
              <span>Basic</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/20 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">pH Level</div>
              <div className="text-lg font-mono font-bold text-primary">
                {ph[0].toFixed(1)}
              </div>
            </div>
            <div className="bg-secondary/20 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">Temperature</div>
              <div className="text-lg font-mono font-bold text-primary">
                {temperature[0]} <span className="text-sm text-muted-foreground">°C</span>
              </div>
            </div>
            <div className="bg-secondary/20 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">Indicator Color</div>
              <div className="text-lg font-mono font-bold text-primary">
                {indicator.name}
              </div>
            </div>
            <div className="bg-secondary/20 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">Solution Type</div>
              <div className="text-lg font-mono font-bold text-primary">
                {solutionType}
              </div>
            </div>
          </div>

          <Button onClick={handleExplain} className="w-full gap-2" size="lg">
            <Play className="h-4 w-4" />
            Run & Explain
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}