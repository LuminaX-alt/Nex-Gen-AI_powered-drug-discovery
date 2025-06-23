"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

export function CompoundSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "all")
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "name")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    if (category !== "all") params.set("category", category)
    if (sortBy !== "name") params.set("sort", sortBy)

    router.push(`/library?${params.toString()}`)
  }

  const handleReset = () => {
    setSearchTerm("")
    setCategory("all")
    setSortBy("name")
    router.push("/library")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search compounds by name, SMILES, or properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="oncology">Oncology</SelectItem>
            <SelectItem value="cardiology">Cardiology</SelectItem>
            <SelectItem value="neurology">Neurology</SelectItem>
            <SelectItem value="immunology">Immunology</SelectItem>
            <SelectItem value="infectious">Infectious Disease</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="mw">Molecular Weight</SelectItem>
            <SelectItem value="logp">LogP</SelectItem>
            <SelectItem value="solubility">Solubility</SelectItem>
            <SelectItem value="date">Date Added</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleSearch} className="flex-1 sm:flex-none">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        <Button variant="outline" onClick={handleReset}>
          <Filter className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  )
}
