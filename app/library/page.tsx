"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Download,
  ArrowLeft,
  Sparkles,
  Database,
  MicroscopeIcon as Molecule,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

interface Compound {
  id: string
  name: string
  smiles: string
  category: string
  properties: {
    solubility: { value: string; confidence: number }
    toxicity: { value: string; confidence: number }
    bioavailability: { value: string; confidence: number }
  }
  score: number
  dateAdded: string
}

const mockCompounds: Compound[] = [
  {
    id: "CMP-001",
    name: "Aspirin Derivative",
    smiles: "CC(=O)OC1=CC=CC=C1C(=O)O",
    category: "Anti-inflammatory",
    properties: {
      solubility: { value: "High", confidence: 92 },
      toxicity: { value: "Low", confidence: 88 },
      bioavailability: { value: "Medium", confidence: 85 },
    },
    score: 88,
    dateAdded: "2024-01-15",
  },
  {
    id: "CMP-002",
    name: "Kinase Inhibitor KI-47",
    smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C",
    category: "Oncology",
    properties: {
      solubility: { value: "Medium", confidence: 87 },
      toxicity: { value: "Low", confidence: 91 },
      bioavailability: { value: "High", confidence: 89 },
    },
    score: 92,
    dateAdded: "2024-01-14",
  },
  {
    id: "CMP-003",
    name: "Antibiotic AB-23",
    smiles: "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O",
    category: "Antibiotic",
    properties: {
      solubility: { value: "Low", confidence: 78 },
      toxicity: { value: "Medium", confidence: 82 },
      bioavailability: { value: "Medium", confidence: 86 },
    },
    score: 75,
    dateAdded: "2024-01-13",
  },
]

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [compounds] = useState<Compound[]>(mockCompounds)

  const filteredCompounds = compounds.filter((compound) => {
    const matchesSearch =
      compound.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      compound.smiles.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || compound.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(compounds.map((c) => c.category)))]

  const getPropertyColor = (value: string) => {
    switch (value.toLowerCase()) {
      case "high":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100">
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Compound Library</h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Browse and manage your molecular compound database
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 sm:mb-8 hover:shadow-lg transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search compounds by name or SMILES..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Library Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-3 sm:p-4 text-center">
              <Database className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-indigo-500" />
              <div className="text-lg sm:text-2xl font-bold">12,847</div>
              <p className="text-xs sm:text-sm text-gray-600">Total Compounds</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-3 sm:p-4 text-center">
              <Molecule className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-purple-500" />
              <div className="text-lg sm:text-2xl font-bold">8,934</div>
              <p className="text-xs sm:text-sm text-gray-600">Analyzed</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-3 sm:p-4 text-center">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-green-500" />
              <div className="text-lg sm:text-2xl font-bold">2,156</div>
              <p className="text-xs sm:text-sm text-gray-600">Optimized</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-3 sm:p-4 text-center">
              <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-lg sm:text-2xl font-bold">347</div>
              <p className="text-xs sm:text-sm text-gray-600">Flagged</p>
            </CardContent>
          </Card>
        </div>

        {/* Compounds List */}
        <div className="space-y-4 sm:space-y-6">
          {filteredCompounds.map((compound) => (
            <Card key={compound.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Compound Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold">{compound.name}</h3>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {compound.id}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {compound.category}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            compound.score >= 85
                              ? "bg-green-100 text-green-800"
                              : compound.score >= 70
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          Score: {compound.score}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 font-mono mb-3 break-all">{compound.smiles}</p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Added: {new Date(compound.dateAdded).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Properties */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:w-80">
                    <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Solubility</p>
                      <Badge className={`${getPropertyColor(compound.properties.solubility.value)} text-xs mb-1`}>
                        {compound.properties.solubility.value}
                      </Badge>
                      <p className="text-xs text-gray-500">{compound.properties.solubility.confidence}%</p>
                    </div>

                    <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Toxicity</p>
                      <Badge className={`${getPropertyColor(compound.properties.toxicity.value)} text-xs mb-1`}>
                        {compound.properties.toxicity.value}
                      </Badge>
                      <p className="text-xs text-gray-500">{compound.properties.toxicity.confidence}%</p>
                    </div>

                    <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Bioavailability</p>
                      <Badge className={`${getPropertyColor(compound.properties.bioavailability.value)} text-xs mb-1`}>
                        {compound.properties.bioavailability.value}
                      </Badge>
                      <p className="text-xs text-gray-500">{compound.properties.bioavailability.confidence}%</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-32">
                    <Button variant="outline" size="sm" className="text-xs">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Optimize
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCompounds.length === 0 && (
          <Card>
            <CardContent className="text-center py-8 sm:py-12">
              <Database className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">No compounds found</h3>
              <p className="text-gray-600 text-sm sm:text-base">Try adjusting your search terms or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
