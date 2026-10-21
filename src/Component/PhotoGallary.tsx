import { useState, useMemo, type FormEvent } from 'react'
import pastor from '../assets/Images/sp3.webp'

// Updated data — added `date` field
const galleryImages = [
  { id: 1, src: pastor, title: 'Sunday Service',       event: 'Sunday Worship',       category: 'Worship',   date: '2024-03-10' },
  { id: 2, src: pastor, title: 'Youth Conference',     event: 'Annual Youth Summit',  category: 'Event',     date: '2024-06-22' },
  { id: 3, src: pastor, title: 'Prayer Night',         event: 'Midweek Prayer',       category: 'Worship',   date: '2024-04-15' },
  { id: 4, src: pastor, title: 'Baptism Ceremony',     event: 'New Members Baptism',  category: 'Ceremony',  date: '2024-05-05' },
  { id: 5, src: pastor, title: 'Choir Practice',       event: 'Music Ministry',       category: 'Music',     date: '2024-02-18' },
  { id: 6, src: pastor, title: 'Community Outreach',   event: 'Feeding Program',      category: 'Event',     date: '2024-07-09' },
]

type GalleryImage = (typeof galleryImages)[number]

// 🔐 In production: move this check to your backend
const VALID_CODES = ['CHURCH2024', 'GALLERY01', 'BLESSED99']

function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [downloadedIds, setDownloadedIds] = useState<number[]>([])

  // 🔍 Search state
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest') // 'newest' | 'oldest'

  // Derive unique categories for filter chips
  const categories = useMemo(
    () => ['All', ...new Set(galleryImages.map((img) => img.category))],
    []
  )

  // 🎯 Filter + sort logic
  const filteredImages = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    let result = galleryImages.filter((img) => {
      const matchesCategory =
        activeCategory === 'All' || img.category === activeCategory

      if (!matchesCategory) return false
      if (!term) return true

      // Match against title, event, category, AND date (multiple formats)
      const dateObj = new Date(img.date)
      const dateLong = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) // e.g. "March 10, 2024"
      const dateShort = dateObj.toLocaleDateString('en-US') // e.g. "3/10/2024"

      return (
        img.title.toLowerCase().includes(term) ||
        img.event.toLowerCase().includes(term) ||
        img.category.toLowerCase().includes(term) ||
        img.date.includes(term) ||
        dateLong.toLowerCase().includes(term) ||
        dateShort.includes(term) ||
        dateObj.getFullYear().toString().includes(term)
      )
    })

    // Sort by date
    result = [...result].sort((a, b) => {
      const diff = new Date(b.date).getTime() - new Date(a.date).getTime()
      return sortBy === 'newest' ? diff : -diff
    })

    return result
  }, [searchTerm, activeCategory, sortBy])

  const openDownloadModal = (image: GalleryImage) => {
    setSelectedImage(image)
    setCode('')
    setError('')
  }

  const closeModal = () => {
    setSelectedImage(null)
    setCode('')
    setError('')
  }

  const handleDownload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const image = selectedImage
    if (!image) return

    setError('')
    setIsVerifying(true)

    await new Promise((r) => setTimeout(r, 800))

    if (!VALID_CODES.includes(code.trim().toUpperCase())) {
      setError('Invalid download code. Please try again.')
      setIsVerifying(false)
      return
    }

    const link = document.createElement('a')
    link.href = image.src
    link.download = `${image.title.replace(/\s+/g, '-').toLowerCase()}.webp`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setDownloadedIds((prev) => [...prev, image.id])
    setIsVerifying(false)
    closeModal()
  }

  const clearFilters = () => {
    setSearchTerm('')
    setActiveCategory('All')
    setSortBy('newest')
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
          Photo Gallery
        </h2>
        <p className="text-white/90 max-w-xl mx-auto">
          Browse our cherished moments. To download any photo, you'll need a
          download code from the media team.
        </p>
      </div>

      {/* 🔍 Search & Filters Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, event, or date (e.g. 'Baptism' or '2024-05')"
              className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-xl leading-none"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === cat
                  ? 'bg-amber-500 text-gray-900 border-amber-500'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Result count + clear */}
        <div className="flex items-center justify-between text-sm text-white/80">
          <span>
            Showing <strong className="text-white">{filteredImages.length}</strong>{' '}
            {filteredImages.length === 1 ? 'photo' : 'photos'}
            {searchTerm && (
              <>
                {' '}
                for "<span className="text-amber-400">{searchTerm}</span>"
              </>
            )}
          </span>
          {(searchTerm || activeCategory !== 'All') && (
            <button
              onClick={clearFilters}
              className="text-amber-400 hover:text-amber-300 underline underline-offset-2"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* 📸 Grid */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-white/10 mx-auto flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-white/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>
          <h3 className="text-white text-lg font-semibold mb-1">
            No photos found
          </h3>
          <p className="text-white/70 text-sm mb-4">
            Try a different search term or clear the filters.
          </p>
          <button
            onClick={clearFilters}
            className="bg-amber-500 text-gray-900 px-5 py-2 rounded-lg text-sm font-medium hover:bg-amber-400 transition"
          >
            Reset Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl bg-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Date badge (top-right) */}
              <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                {new Date(image.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">
                  {image.category}
                </span>
                <h3 className="text-white font-semibold text-lg">
                  {image.title}
                </h3>
                <p className="text-white/70 text-xs mb-3">{image.event}</p>
                <button
                  onClick={() => openDownloadModal(image)}
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-400 transition-colors w-fit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                    />
                  </svg>
                  Download
                </button>

                {downloadedIds.includes(image.id) && (
                  <span className="mt-2 text-xs text-green-400 font-medium">
                    ✓ Downloaded
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Download Code Modal — unchanged */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl leading-none"
              aria-label="Close"
            >
              ×
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  Download Verification
                </h3>
                <p className="text-sm text-gray-500">
                  Enter your code to download
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 mb-5">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-14 h-14 rounded-md object-cover"
              />
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {selectedImage.title}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedImage.category} · {selectedImage.event}
                </p>
              </div>
            </div>

            <form onSubmit={handleDownload}>
              <label
                htmlFor="downloadCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Download Code
              </label>
              <input
                id="downloadCode"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. CHURCH2024"
                autoFocus
                disabled={isVerifying}
                className={`w-full px-4 py-3 rounded-lg border-2 text-sm uppercase tracking-wider focus:outline-none transition-colors ${
                  error
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-gray-200 focus:border-amber-500'
                }`}
              />

              {error && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01M5.07 19h13.86a2 2 0 001.74-3l-6.93-12a2 2 0 00-3.48 0l-6.93 12a2 2 0 001.74 3z"
                    />
                  </svg>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={!code.trim() || isVerifying}
                className="mt-5 w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-amber-500 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                      />
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Verifying...
                  </>
                ) : (
                  'Verify & Download'
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-4">
              Don't have a code? Contact the media team.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export default GalleryGrid