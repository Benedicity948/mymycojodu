import { useEffect, useRef, useState, useMemo, type FormEvent } from "react";
import pastor from "../assets/Images/sp3.webp";

interface GalleryImage {
  id: string | number;
  src: string;
  title: string;
  event: string;
  category: string;
  date: string;
  people: string[];
  fileName?: string;
}

interface SelectedUpload {
  file: File;
  previewUrl: string;
}

const initialGalleryImages: GalleryImage[] = [
  {
    id: 1,
    src: pastor,
    title: "Sunday Service",
    event: "Sunday Worship",
    category: "Worship",
    date: "2024-03-10",
    people: [],
  },
  {
    id: 2,
    src: pastor,
    title: "Youth Conference",
    event: "Annual Youth Summit",
    category: "Event",
    date: "2024-06-22",
    people: [],
  },
  {
    id: 3,
    src: pastor,
    title: "Prayer Night",
    event: "Midweek Prayer",
    category: "Worship",
    date: "2024-04-15",
    people: [],
  },
  {
    id: 4,
    src: pastor,
    title: "Baptism Ceremony",
    event: "New Members Baptism",
    category: "Ceremony",
    date: "2024-05-05",
    people: [],
  },
  {
    id: 5,
    src: pastor,
    title: "Choir Practice",
    event: "Music Ministry",
    category: "Music",
    date: "2024-02-18",
    people: [],
  },
  {
    id: 6,
    src: pastor,
    title: "Community Outreach",
    event: "Feeding Program",
    category: "Event",
    date: "2024-07-09",
    people: [],
  },
];

// 🔐 In production: move this check to your backend
const VALID_CODES = ["CHURCH2024", "GALLERY01", "BLESSED99"];

function GalleryGrid() {
  const [galleryImages, setGalleryImages] = useState(initialGalleryImages);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [downloadedIds, setDownloadedIds] = useState<(string | number)[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<SelectedUpload[]>([]);
  const previewUrls = useRef<string[]>([]);
  const [personNames, setPersonNames] = useState("");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadEvent, setUploadEvent] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Event");
  const [uploadDate, setUploadDate] = useState(
    () => new Date().toISOString().slice(0, 10),
  );
  const [uploadMessage, setUploadMessage] = useState("");

  // 🔍 Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'oldest'
  const [galleryView, setGalleryView] = useState<"photos" | "people">("photos");
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  useEffect(
    () => () => previewUrls.current.forEach((url) => URL.revokeObjectURL(url)),
    [],
  );

  // Derive unique categories for filter chips
  const categories = useMemo(
    () => ["All", ...new Set(galleryImages.map((img) => img.category))],
    [galleryImages],
  );

  const people = useMemo(
    () =>
      [...new Set(galleryImages.flatMap((image) => image.people))].sort(
        (a, b) => a.localeCompare(b),
      ),
    [galleryImages],
  );

  const filteredPeople = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return people.filter((person) => !term || person.toLowerCase().includes(term));
  }, [people, searchTerm]);

  // 🎯 Filter + sort logic
  const filteredImages = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    let result = galleryImages.filter((img) => {
      const matchesCategory =
        activeCategory === "All" || img.category === activeCategory;
      const matchesPerson =
        !selectedPerson || img.people.includes(selectedPerson);

      if (!matchesCategory || !matchesPerson) return false;
      if (!term) return true;

      // Match against title, event, category, AND date (multiple formats)
      const dateObj = new Date(img.date);
      const dateLong = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }); // e.g. "March 10, 2024"
      const dateShort = dateObj.toLocaleDateString("en-US"); // e.g. "3/10/2024"

      return (
        img.title.toLowerCase().includes(term) ||
        img.event.toLowerCase().includes(term) ||
        img.category.toLowerCase().includes(term) ||
        img.people.some((person) => person.toLowerCase().includes(term)) ||
        img.date.includes(term) ||
        dateLong.toLowerCase().includes(term) ||
        dateShort.includes(term) ||
        dateObj.getFullYear().toString().includes(term)
      );
    });

    // Sort by date
    result = [...result].sort((a, b) => {
      const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
      return sortBy === "newest" ? diff : -diff;
    });

    return result;
  }, [galleryImages, searchTerm, activeCategory, sortBy, selectedPerson]);

  const resetUploadForm = () => {
    setSelectedFiles([]);
    setPersonNames("");
    setUploadTitle("");
    setUploadEvent("");
    setUploadCategory("Event");
    setUploadDate(new Date().toISOString().slice(0, 10));
  };

  const handleUpload = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFiles.length === 0) {
      setUploadMessage("Choose at least one image to add.");
      return;
    }

    const taggedPeople = [
      ...new Set(
        personNames
          .split(",")
          .map((name) => name.trim())
          .filter(Boolean),
      ),
    ];

    const newImages = selectedFiles.map(({ file, previewUrl }): GalleryImage => ({
      id: crypto.randomUUID(),
      src: previewUrl,
      title:
        uploadTitle.trim() ||
        file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      event: uploadEvent.trim() || "Church Gallery",
      category: uploadCategory,
      date: uploadDate,
      people: taggedPeople,
      fileName: file.name,
    }));

    setGalleryImages((current) => [...newImages, ...current]);
    setGalleryView("photos");
    setSelectedPerson(null);
    setSearchTerm("");
    setActiveCategory("All");
    setUploadMessage(
      `${newImages.length} photo${newImages.length === 1 ? "" : "s"} added to this session. Connect the gallery API to save uploads permanently.`,
    );
    setShowUploadForm(false);
    resetUploadForm();
  };

  const openDownloadModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setCode("");
    setError("");
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCode("");
    setError("");
  };

  const handleDownload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const image = selectedImage;
    if (!image) return;

    setError("");
    setIsVerifying(true);

    await new Promise((r) => setTimeout(r, 800));

    if (!VALID_CODES.includes(code.trim().toUpperCase())) {
      setError("Invalid download code. Please try again.");
      setIsVerifying(false);
      return;
    }

    const link = document.createElement("a");
    link.href = image.src;
    const extension = image.fileName?.split(".").pop() || "webp";
    link.download = `${image.title.replace(/\s+/g, "-").toLowerCase()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadedIds((prev) => [...prev, image.id]);
    setIsVerifying(false);
    closeModal();
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("All");
    setSortBy("newest");
    setSelectedPerson(null);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
          Photo Gallery
        </h2>
        <p className="text-white/90 max-w-xl mx-auto">
          Browse church moments or find photos tagged with a specific person.
          To download any photo, you'll need a download code from the media team.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2" aria-label="Gallery view">
          {(["photos", "people"] as const).map((view) => (
            <button
              key={view}
              onClick={() => {
                setGalleryView(view);
                setSelectedPerson(null);
                setSearchTerm("");
              }}
              className={`rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors ${
                galleryView === view
                  ? "border-amber-500 bg-amber-500 text-gray-900"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {view === "photos" ? "All photos" : "People"}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            setUploadMessage("");
            setShowUploadForm(true);
          }}
          className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-amber-400"
        >
          Add photos
        </button>
      </div>

      {uploadMessage && (
        <div
          role="status"
          className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-100"
        >
          <span>{uploadMessage}</span>
          <button
            onClick={() => setUploadMessage("")}
            className="text-lg leading-none text-amber-100/70 hover:text-white"
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      {showUploadForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setShowUploadForm(false)}
        >
          <form
            onSubmit={handleUpload}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl space-y-4 overflow-y-auto rounded-2xl bg-white p-6 text-gray-900 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Add photos to the gallery</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Tag people by name to create searchable person albums.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="text-2xl leading-none text-gray-400 hover:text-gray-700"
                aria-label="Close upload form"
              >
                ×
              </button>
            </div>

            <label className="block text-sm font-medium">
              Photos
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => {
                  const uploads = Array.from(event.target.files ?? []).map(
                    (file) => {
                      const previewUrl = URL.createObjectURL(file);
                      previewUrls.current.push(previewUrl);
                      return { file, previewUrl };
                    },
                  );
                  setSelectedFiles(uploads);
                  setUploadMessage("");
                }}
                className="mt-2 block w-full rounded-lg border border-gray-300 p-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2"
              />
            </label>

            {selectedFiles.length > 0 && (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {selectedFiles.map(({ file, previewUrl }, index) => (
                  <img
                    key={`${file.name}-${index}`}
                    src={previewUrl}
                    alt={`Selected photo ${index + 1}`}
                    className="aspect-square w-full rounded-lg object-cover"
                  />
                ))}
              </div>
            )}

            <label className="block text-sm font-medium">
              People in these photos
              <input
                type="text"
                value={personNames}
                onChange={(event) => setPersonNames(event.target.value)}
                placeholder="Enter names separated by commas"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 font-normal focus:border-amber-500 focus:outline-none"
              />
              <span className="mt-1 block text-xs font-normal text-gray-500">
                Photos will appear in each tagged person’s album.
              </span>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Title (optional)
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(event) => setUploadTitle(event.target.value)}
                  placeholder="Defaults to each file name"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 font-normal focus:border-amber-500 focus:outline-none"
                />
              </label>
              <label className="block text-sm font-medium">
                Event
                <input
                  type="text"
                  value={uploadEvent}
                  onChange={(event) => setUploadEvent(event.target.value)}
                  placeholder="e.g. Sunday service"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 font-normal focus:border-amber-500 focus:outline-none"
                />
              </label>
              <label className="block text-sm font-medium">
                Category
                <select
                  value={uploadCategory}
                  onChange={(event) => setUploadCategory(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-amber-500 focus:outline-none"
                >
                  {["Event", "Worship", "Ceremony", "Music", "Community"].map(
                    (category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ),
                  )}
                </select>
              </label>
              <label className="block text-sm font-medium">
                Date
                <input
                  type="date"
                  value={uploadDate}
                  onChange={(event) => setUploadDate(event.target.value)}
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-500 focus:outline-none"
                />
              </label>
            </div>

            <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
              Frontend preview only: these photos are kept in this page session
              and are not uploaded to permanent storage yet.
            </p>
            {uploadMessage && (
              <p role="alert" className="text-sm text-red-600">
                {uploadMessage}
              </p>
            )}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-500 hover:text-gray-900"
              >
                Add to gallery
              </button>
            </div>
          </form>
        </div>
      )}

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
              placeholder={
                galleryView === "people"
                  ? "Search people by name"
                  : "Search by person, event, or date"
              }
              className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
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
                  ? "bg-amber-500 text-gray-900 border-amber-500"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Result count + clear */}
        <div className="flex items-center justify-between text-sm text-white/80">
          <span>
            Showing{" "}
            <strong className="text-white">{filteredImages.length}</strong>{" "}
            {filteredImages.length === 1 ? "photo" : "photos"}
            {searchTerm && (
              <>
                {" "}
                for "<span className="text-amber-400">{searchTerm}</span>"
              </>
            )}
          </span>
          {(searchTerm || activeCategory !== "All") && (
            <button
              onClick={clearFilters}
              className="text-amber-400 hover:text-amber-300 underline underline-offset-2"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {galleryView === "people" && !selectedPerson ? (
        filteredPeople.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/25 px-6 py-16 text-center">
            <h3 className="mb-2 text-lg font-semibold text-white">
              {people.length === 0 ? "No person albums yet" : "No people found"}
            </h3>
            <p className="mx-auto max-w-md text-sm text-white/70">
              {people.length === 0
                ? "Add photos and tag the people in them. A searchable album will be created for each name."
                : "Try another name or clear your search."}
            </p>
            {people.length === 0 && (
              <button
                onClick={() => setShowUploadForm(true)}
                className="mt-5 rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium text-gray-900 hover:bg-amber-400"
              >
                Add tagged photos
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPeople.map((person) => {
              const personImages = galleryImages.filter((image) =>
                image.people.includes(person),
              );
              return (
                <button
                  key={person}
                  onClick={() => setSelectedPerson(person)}
                  className="group overflow-hidden rounded-xl bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                    <img
                      src={personImages[0].src}
                      alt={`Photos of ${person}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                      {personImages.length}{" "}
                      {personImages.length === 1 ? "photo" : "photos"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <h3 className="font-semibold text-gray-900">{person}</h3>
                    <span className="text-sm text-amber-700">View album →</span>
                  </div>
                </button>
              );
            })}
          </div>
        )
      ) : (
        <>
          {galleryView === "people" && selectedPerson && (
            <div className="mb-5 flex items-center justify-between">
              <div>
                <button
                  onClick={() => setSelectedPerson(null)}
                  className="mb-2 text-sm text-amber-400 hover:text-amber-300"
                >
                  ← All people
                </button>
                <h3 className="text-2xl font-bold text-white">{selectedPerson}</h3>
              </div>
              <span className="text-sm text-white/70">
                {filteredImages.length}{" "}
                {filteredImages.length === 1 ? "photo" : "photos"}
              </span>
            </div>
          )}
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
                {new Date(image.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
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
        </>
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
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-amber-500"
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
                  "Verify & Download"
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
  );
}

export default GalleryGrid;
