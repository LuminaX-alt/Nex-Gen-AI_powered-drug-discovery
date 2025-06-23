"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Activity, Zap, Target, TrendingUp, ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"

interface OptimizedCompound {
  id: string
  smiles: string
  improvements: {
    solubility: number
    toxicity: number
    bioavailability: number
  }
  score: number
}

export default function OptimizePage() {
  const [parentSmiles, setParentSmiles] = useState("")
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizedCompounds, setOptimizedCompounds] = useState<OptimizedCompound[]>([])
  const [targetSolubility, setTargetSolubility] = useState([75])
  const [targetToxicity, setTargetToxicity] = useState([20])
  const [targetBioavailability, setTargetBioavailability] = useState([80])
  const [preserveCore, setPreserveCore] = useState(true)

  const handleOptimize = async () => {
    if (!parentSmiles.trim()) return

    setIsOptimizing(true)

    // Simulate optimization process
    await new Promise((resolve) => setTimeout(resolve, 5000))

    // Mock optimized compounds
    const mockCompounds: OptimizedCompound[] = [
      {
        id: "opt-001",
        smiles: "CC(=O)OC1=CC=CC=C1C(=O)O",
        improvements: { solubility: +15, toxicity: -25, bioavailability: +12 },
        score: 92,
      },
      {
        id: "opt-002",
        smiles: "CC(=O)NC1=CC=CC=C1C(=O)O",
        improvements: { solubility: +22, toxicity: -18, bioavailability: +8 },
        score: 88,
      },
      {
        id: "opt-003",
        smiles: "CC(=O)SC1=CC=CC=C1C(=O)O",
        improvements: { solubility: +8, toxicity: -30, bioavailability: +18 },
        score: 85,
      },
    ]

    setOptimizedCompounds(mockCompounds)
    setIsOptimizing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100">
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Compound Optimization</h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Generate optimized molecular variants using generative AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Input & Parameters */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Target className="h-5 w-5" />
                  Parent Compound
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Starting molecular structure for optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="parent-smiles" className="text-sm font-medium">
                    SMILES Notation
                  </Label>
                  <Textarea
                    id="parent-smiles"
                    placeholder="Enter parent compound SMILES"
                    value={parentSmiles}
                    onChange={(e) => setParentSmiles(e.target.value)}
                    className="min-h-[60px] sm:min-h-[80px] text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Optimization Targets</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Set target values for molecular properties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Solubility Target: {targetSolubility[0]}%</Label>
                  <Slider
                    value={targetSolubility}
                    onValueChange={setTargetSolubility}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Toxicity Limit: {targetToxicity[0]}%</Label>
                  <Slider
                    value={targetToxicity}
                    onValueChange={setTargetToxicity}
                    max={50}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Bioavailability Target: {targetBioavailability[0]}%</Label>
                  <Slider
                    value={targetBioavailability}
                    onValueChange={setTargetBioavailability}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="preserve-core" checked={preserveCore} onCheckedChange={setPreserveCore} />
                  <Label htmlFor="preserve-core" className="text-sm">
                    Preserve core structure
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleOptimize}
              disabled={!parentSmiles.trim() || isOptimizing}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              size="lg"
            >
              {isOptimizing ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  <span className="text-sm sm:text-base">Optimizing...</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  <span className="text-sm sm:text-base">Start Optimization</span>
                </>
              )}
            </Button>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <TrendingUp className="h-5 w-5" />
                  Optimized Compounds
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  AI-generated molecular variants with improved properties
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isOptimizing && (
                  <div className="text-center py-8 sm:py-12">
                    <Activity className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-green-500 animate-spin" />
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Generating Optimized Compounds...</h3>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">AI is exploring molecular space</p>
                    <Progress value={45} className="w-full max-w-md mx-auto" />
                  </div>
                )}

                {optimizedCompounds.length > 0 && !isOptimizing && (
                  <div className="space-y-4 sm:space-y-6">
                    {optimizedCompounds.map((compound) => (
                      <div key={compound.id} className="p-4 sm:p-6 border rounded-lg bg-white">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-base sm:text-lg">{compound.id}</h4>
                            <p className="text-xs sm:text-sm text-gray-600 font-mono break-all">{compound.smiles}</p>
                          </div>
                          <Badge variant="secondary" className="text-sm sm:text-lg px-2 sm:px-3 py-1 self-start">
                            Score: {compound.score}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <p className="text-xs sm:text-sm text-gray-600">Solubility</p>
                            <p
                              className={`text-base sm:text-lg font-semibold ${compound.improvements.solubility > 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {compound.improvements.solubility > 0 ? "+" : ""}
                              {compound.improvements.solubility}%
                            </p>
                          </div>

                          <div className="text-center p-3 bg-red-50 rounded-lg">
                            <p className="text-xs sm:text-sm text-gray-600">Toxicity</p>
                            <p
                              className={`text-base sm:text-lg font-semibold ${compound.improvements.toxicity < 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {compound.improvements.toxicity > 0 ? "+" : ""}
                              {compound.improvements.toxicity}%
                            </p>
                          </div>

                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <p className="text-xs sm:text-sm text-gray-600">Bioavailability</p>
                            <p
                              className={`text-base sm:text-lg font-semibold ${compound.improvements.bioavailability > 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {compound.improvements.bioavailability > 0 ? "+" : ""}
                              {compound.improvements.bioavailability}%
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                            Save to Library
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                            Further Optimize
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {optimizedCompounds.length === 0 && !isOptimizing && (
                  <div className="text-center py-8 sm:py-12 text-gray-500">
                    <Zap className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm sm:text-base">Enter a parent compound to start optimization</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
