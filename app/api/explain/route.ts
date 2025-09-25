import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { experimentId, inputs } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    let prompt = ''
    
    if (experimentId === 'ohms-law') {
      prompt = `Explain Ohm's Law experiment with these values:
      - Voltage: ${inputs.voltage}V
      - Resistance: ${inputs.resistance}Ω  
      - Current: ${inputs.current}A
      - Power: ${inputs.power}W
      
      Provide a detailed explanation, key equations, 3 quiz questions with 4 options each, and real-world applications.`
    } else if (experimentId === 'acid-base-indicator') {
      prompt = `Explain acid-base indicator experiment with these values:
      - pH: ${inputs.ph}
      - Temperature: ${inputs.temperature}°C
      - Indicator Color: ${inputs.indicatorColor}
      - Solution Type: ${inputs.solutionType}
      
      Provide a detailed explanation, key equations, 3 quiz questions with 4 options each, and real-world applications.`
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a science education expert. Respond with valid JSON in this exact format:
          {
            "explanation": "detailed explanation of the experiment and results",
            "equations": ["equation1", "equation2"],
            "quiz": [
              {
                "q": "question text",
                "options": ["option1", "option2", "option3", "option4"],
                "answer": 0
              }
            ],
            "real_world": ["application1", "application2", "application3"]
          }`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    })

    const content = completion.choices[0].message.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    const response = JSON.parse(content)
    return NextResponse.json(response)

  } catch (error) {
    console.error('Error calling OpenAI:', error)
    return NextResponse.json(
      { error: 'Failed to generate explanation' },
      { status: 500 }
    )
  }
}