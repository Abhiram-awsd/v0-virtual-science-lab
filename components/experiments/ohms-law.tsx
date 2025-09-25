'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Play } from 'lucide-react'
import p5 from 'p5'

const P5Wrapper = dynamic(() => import('@/lib/p5-wrapper'), { ssr: false })

interface OhmsLawProps {
  onExplain: (inputs: { voltage: number; resistance: number; current: number; power: number }) => void
}

export default function OhmsLaw({ onExplain }: OhmsLawProps) {
  const [voltage, setVoltage] = useState([6])
  const [resistance, setResistance] = useState([10])
  
  const current = voltage[0] / resistance[0]
  const power = voltage[0] * current

  const sketch = useCallback((p: p5) => {
    p.setup = () => {
      p.createCanvas(400, 300)
    }

    p.draw = () => {
      p.background(20, 20, 30)
      
      // Draw circuit
      p.stroke(255)
      p.strokeWeight(3)
      p.noFill()
      
      // Circuit outline
      p.rect(50, 50, 300, 200)
      
      // Battery symbol
      p.strokeWeight(6)
      p.line(60, 100, 60, 120)
      p.strokeWeight(3)
      p.line(70, 95, 70, 125)
      p.textAlign(p.CENTER)
      p.fill(255)
      p.noStroke()
      p.text(`${voltage[0]}V`, 65, 140)
      
      // Resistor symbol (zigzag)
      p.stroke(255)
      p.strokeWeight(3)
      p.noFill()
      const resistorX = 200
      const resistorY = 60
      p.line(resistorX - 30, resistorY, resistorX - 20, resistorY)
      for (let i = 0; i < 6; i++) {
        const x1 = resistorX - 20 + i * 8
        const y1 = resistorY + (i % 2 === 0 ? -10 : 10)
        const x2 = resistorX - 20 + (i + 1) * 8
        const y2 = resistorY + ((i + 1) % 2 === 0 ? -10 : 10)
        p.line(x1, y1, x2, y2)
      }
      p.line(resistorX + 28, resistorY, resistorX + 40, resistorY)
      
      p.fill(255)
      p.noStroke()
      p.text(`${resistance[0]}Ω`, resistorX, resistorY + 25)
      
      // Light bulb
      const bulbX = 300
      const bulbY = 150
      const brightness = p.map(current, 0, 12, 0, 255)
      
      // Bulb glow
      p.fill(255, 255, 0, brightness * 0.3)
      p.noStroke()
      p.circle(bulbX, bulbY, 60)
      
      // Bulb outline
      p.stroke(255)
      p.strokeWeight(2)
      p.noFill()
      p.circle(bulbX, bulbY, 40)
      
      // Filament
      p.stroke(255, 255, 0, brightness)
      p.strokeWeight(2)
      p.line(bulbX - 10, bulbY - 10, bulbX + 10, bulbY + 10)
      p.line(bulbX + 10, bulbY - 10, bulbX - 10, bulbY + 10)
      
      // Current flow animation
      const time = p.millis() * 0.005
      for (let i = 0; i < 8; i++) {
        const progress = (time + i * 0.5) % 4
        let x, y
        
        if (progress < 1) {
          // Top edge
          x = p.lerp(70, 170, progress)
          y = 60
        } else if (progress < 2) {
          // Right edge
          x = 340
          y = p.lerp(60, 240, progress - 1)
        } else if (progress < 3) {
          // Bottom edge
          x = p.lerp(340, 60, progress - 2)
          y = 240
        } else {
          // Left edge
          x = 60
          y = p.lerp(240, 60, progress - 3)
        }
        
        p.fill(0, 255, 255, 200)
        p.noStroke()
        p.circle(x, y, 6)
      }
      
      // Display readings
      p.fill(255)
      p.textAlign(p.LEFT)
      p.text(`Current: ${current.toFixed(2)} A`, 60, 280)
      p.text(`Power: ${power.toFixed(1)} W`, 200, 280)
    }
  }, [voltage, resistance, current, power])

  const handleExplain = () => {
    onExplain({
      voltage: voltage[0],
      resistance: resistance[0],
      current: parseFloat(current.toFixed(2)),
      power: parseFloat(power.toFixed(1))
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Circuit Simulation</CardTitle>
        </CardHeader>
        <CardContent>
          <P5Wrapper sketch={sketch} className="w-full flex justify-center" />
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Voltage: {voltage[0]} V</label>
            <Slider
              value={voltage}
              onValueChange={setVoltage}
              max={12}
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium">Resistance: {resistance[0]} Ω</label>
            <Slider
              value={resistance}
              onValueChange={setResistance}
              max={100}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-secondary/20 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">Current (I)</div>
              <div className="text-lg font-mono font-bold text-primary">
                {current.toFixed(2)} <span className="text-sm text-muted-foreground">A</span>
              </div>
            </div>
            <div className="bg-secondary/20 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">Power (P)</div>
              <div className="text-lg font-mono font-bold text-primary">
                {power.toFixed(1)} <span className="text-sm text-muted-foreground">W</span>
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