"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Brain, MicroscopeIcon as Molecule, AlertCircle, CheckCircle, ArrowLeft, Sparkles } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

interface PredictionResult {
  property: string
  value: string
  confidence: number
  risk: "low" | "medium" | "high"
}

export default function PredictPage() {
  const [smilesInput, setSmilesInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [predictions, setPredictions] = useState<PredictionResult[]>([])
  const [hasResults, setHasResults] = useState(false)

  const handlePredict = async () => {
    if (!smilesInput.trim()) return

    setIsLoading(true)

    // Simulate AI prediction delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock prediction results
    const mockResults: PredictionResult[] = [
      { property: "Solubility", value: "High", confidence: 92, risk: "low" },
      { property: "Toxicity", value: "Low", confidence: 88, risk: "low" },
      { property: "Bioavailability", value: "Medium", confidence: 85, risk: "medium" },
      { property: "Blood-Brain Barrier", value: "Permeable", confidence: 78, risk: "medium" },
      { property: "CYP450 Inhibition", value: "Low Risk", confidence: 91, risk: "low" },
      { property: "hERG Toxicity", value: "Low Risk", confidence: 89, risk: "low" },
    ]

    setPredictions(mockResults)
    setHasResults(true)
    setIsLoading(false)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Dashboard</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium text-purple-600">LuminaX-alt</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Molecular Property Prediction
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Predict molecular properties using advanced AI models
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Section */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Molecule className="h-5 w-5" />
                Molecular Input
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Enter molecular structure data for property prediction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="smiles" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="smiles" className="text-sm">
                    SMILES
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="text-sm">
                    Upload File
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="smiles" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="smiles" className="text-sm font-medium">
                      SMILES Notation
                    </Label>
                    <Textarea
                      id="smiles"
                      placeholder="Enter SMILES string (e.g., CCO for ethanol)"
                      value={smilesInput}
                      onChange={(e) => setSmilesInput(e.target.value)}
                      className="min-h-[80px] sm:min-h-[100px] text-sm"
                    />
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs sm:text-sm">
                      Example: CC(=O)OC1=CC=CC=C1C(=O)O (Aspirin)
                    </AlertDescription>
                  </Alert>
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center">
                    <Upload className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">Upload SDF, MOL, or CSV file</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <Button
                onClick={handlePredict}
                disabled={!smilesInput.trim() || isLoading}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-spin" />
                    <span className="text-sm sm:text-base">Predicting Properties...</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    <span className="text-sm sm:text-base">Predict Properties</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <CheckCircle className="h-5 w-5" />
                Prediction Results
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                AI-generated molecular property predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="space-y-4">
                  <div className="text-center py-6 sm:py-8">
                    <Brain className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-purple-500 animate-pulse" />
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Analyzing Molecule...</h3>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">AI models are processing your compound</p>
                    <Progress value={66} className="w-full" />
                  </div>
                </div>
              )}

              {hasResults && !isLoading && (
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid gap-3 sm:gap-4">
                    {predictions.map((result, index) => (
                      <div key={index} className="p-3 sm:p-4 border rounded-lg bg-white">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                          <h4 className="font-semibold text-sm sm:text-base">{result.property}</h4>
                          <Badge className={`${getRiskColor(result.risk)} text-xs self-start`}>
                            {result.risk} risk
                          </Badge>
                        </div>
                        <p className="text-base sm:text-lg font-medium text-purple-600 mb-2">{result.value}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm text-gray-600">Confidence:</span>
                          <Progress value={result.confidence} className="flex-1 h-2" />
                          <span className="text-xs sm:text-sm font-medium">{result.confidence}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full text-sm sm:text-base">
                      Export Results
                    </Button>
                  </div>
                </div>
              )}

              {!hasResults && !isLoading && (
                <div className="text-center py-8 sm:py-12 text-gray-500">
                  <Brain className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm sm:text-base">Enter a molecular structure to see predictions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
