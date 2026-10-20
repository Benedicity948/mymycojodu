import pastor from '../assets/Images/sp3.webp'

function GalleryHeropage() {
  return (
    <section className="relative w-full  overflow-hidden">
      <img
        src={pastor}
        alt="Pastor ministering"
        className="w-full h-full object-cover object-center"
      />
      {/* Optional overlay + text */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center px-4">
          Welcome
        </h1>
      </div>
    </section>
  )
}

export default GalleryHeropage