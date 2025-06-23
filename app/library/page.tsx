import { Suspense } from "react"
import { CompoundSearch } from "./compound-search"

function LibraryContent() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<div className="h-20 bg-gray-100 rounded animate-pulse" />}>
        <CompoundSearch />
      </Suspense>

      {/* Rest of the library content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">{/* Stats cards */}</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">{/* Compound cards */}</div>
    </div>
  )
}

export default function LibraryPage() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Compound Library</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Browse and analyze molecular compounds in the LuminaX-alt database
        </p>
      </div>

      <LibraryContent />
    </div>
  )
}
</merged_code>
