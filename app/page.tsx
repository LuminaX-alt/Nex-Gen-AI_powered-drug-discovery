import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Beaker, Brain, Database, MicroscopeIcon as Molecule, TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"
import { MolecularPropertyChart } from "./components/molecular-property-chart"
import { CompoundLibraryStats } from "./components/compound-library-stats"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              LuminaX-alt
            </h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl">
            Next-generation AI-powered drug discovery platform for molecular property prediction and compound
            optimization
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Compounds</CardTitle>
              <Molecule className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">12,847</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Projects</CardTitle>
              <Beaker className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">5 completed this week</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">AI Predictions</CardTitle>
              <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">8,934</div>
              <p className="text-xs text-muted-foreground">94.2% accuracy</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">87.3%</div>
              <p className="text-xs text-muted-foreground">+5.2% improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 sm:px-4 py-2">
              Overview
            </TabsTrigger>
            <TabsTrigger value="predict" className="text-xs sm:text-sm px-2 sm:px-4 py-2">
              Predict
            </TabsTrigger>
            <TabsTrigger value="optimize" className="text-xs sm:text-sm px-2 sm:px-4 py-2">
              Optimize
            </TabsTrigger>
            <TabsTrigger value="library" className="text-xs sm:text-sm px-2 sm:px-4 py-2">
              Library
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Recent Predictions</CardTitle>
                  <CardDescription>Latest molecular property predictions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { compound: "Compound-A47", property: "Solubility", value: "High", confidence: 92 },
                      { compound: "Compound-B23", property: "Toxicity", value: "Low", confidence: 88 },
                      { compound: "Compound-C91", property: "Bioavailability", value: "Medium", confidence: 95 },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-2"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm sm:text-base">{item.compound}</p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {item.property}: {item.value}
                          </p>
                        </div>
                        <div className="self-start sm:self-center">
                          <Badge variant="secondary" className="text-xs">
                            {item.confidence}% confidence
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Active Optimization Tasks</CardTitle>
                  <CardDescription>Ongoing compound optimization processes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { name: "Kinase Inhibitor Optimization", progress: 75, status: "In Progress" },
                      { name: "ADMET Property Enhancement", progress: 45, status: "Running" },
                      { name: "Lead Compound Refinement", progress: 90, status: "Near Completion" },
                    ].map((task, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                          <p className="font-medium text-sm sm:text-base">{task.name}</p>
                          <Badge variant="outline" className="self-start text-xs">
                            {task.status}
                          </Badge>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                        <p className="text-xs sm:text-sm text-gray-600">{task.progress}% complete</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              <MolecularPropertyChart />
              <CompoundLibraryStats />
            </div>
          </TabsContent>

          <TabsContent value="predict">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-xl sm:text-2xl">Molecular Property Prediction</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Use AI models to predict molecular properties from chemical structures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 sm:py-8">
                  <Brain className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-purple-500" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">AI-Powered Predictions</h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-4">
                    Upload molecular structures or enter SMILES notation to predict properties
                  </p>
                  <Link href="/predict">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    >
                      Start Prediction
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimize">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-xl sm:text-2xl">Compound Optimization</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Optimize molecular structures for desired properties using generative AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 sm:py-8">
                  <Activity className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-green-500" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Generative Optimization</h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-4">
                    Generate optimized molecular variants with improved properties
                  </p>
                  <Link href="/optimize">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    >
                      Start Optimization
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="library">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-xl sm:text-2xl">Compound Library</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Browse and manage your molecular compound database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 sm:py-8">
                  <Database className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-indigo-500" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Molecular Database</h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-4">
                    Access your complete library of analyzed compounds and predictions
                  </p>
                  <Link href="/library">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                    >
                      Browse Library
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
