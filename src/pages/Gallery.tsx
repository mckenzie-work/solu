
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Sample gallery images - replace with actual barbershop photos
  const galleryImages = [
    {
      id: 1,
      src: '/',
      alt: 'Classic gentleman haircut',
      category: 'Haircuts'
    },
    {
      id: 2,
      src: '/',
      alt: 'Professional beard trim',
      category: 'Beard Work'
    },
    {
      id: 3,
      src: '/',
      alt: 'Modern fade haircut',
      category: 'Haircuts'
    },
    {
      id: 4,
      src: '/',
      alt: 'Barbershop interior',
      category: 'Shop'
    },
    {
      id: 5,
      src: '/',
      alt: 'Solution beard styling',
      category: 'Beard Work'
    },
    {
      id: 6,
      src: '/',
      alt: 'Classic pompadour',
      category: 'Haircuts'
    },
    {
      id: 7,
      src: '/',
      alt: 'Vintage barber tools',
      category: 'Shop'
    },
    {
      id: 8,
      src: '/',
      alt: 'Hot towel service',
      category: 'Services'
    }
  ];

  const categories = ['All', 'Haircuts', 'Beard Work', 'Shop', 'Services'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-space font-light text-barbershop-black mb-6">
              Our Work
            </h1>
            <p className="text-xl text-barbershop-gray-600 max-w-2xl mx-auto">
              Craftsmanship in every cut. Precision in every detail. 
              See the artistry that defines our barbershop.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-barbershop-black text-white'
                    : 'bg-barbershop-gray-100 text-barbershop-gray-700 hover:bg-barbershop-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl bg-barbershop-gray-100 aspect-square cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
                  <div className="p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-medium">{image.alt}</p>
                    <p className="text-sm opacity-80">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-space font-light text-barbershop-black mb-6">
              Ready for Your Transformation?
            </h2>
            <p className="text-lg text-barbershop-gray-600 mb-8 max-w-lg mx-auto">
              Book your appointment today and experience the Solution that sets us apart.
            </p>
            <a
              href="/booking"
              className="premium-button text-xl px-12 py-5"
            >
              Book Now
            </a>
          </div>
        </div>
      </main>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] animate-scale-in">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-barbershop-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white font-medium text-lg">{filteredImages[selectedImage].alt}</h3>
              <p className="text-white/80">{filteredImages[selectedImage].category}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
