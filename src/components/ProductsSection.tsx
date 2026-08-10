import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ArrowRight, Eye } from 'lucide-react';

interface ProductCollection {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  itemCount: string;
}

const COLLECTIONS: ProductCollection[] = [
  {
    id: 'keychains',
    name: 'Keychains',
    category: 'Keychains',
    price: 45.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    description: 'Resin-encapsulated real forget-me-not petals, pressed daisies & gold-plated charms.',
    itemCount: '12 Unique Designs',
  },
  {
    id: 'tabletops',
    name: 'Tabletops',
    category: 'Tabletops',
    price: 200.00,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=800&auto=format&fit=crop',
    description: 'Micro-landscape terrariums, preserved potted succulents, and crystal glass desk accents.',
    itemCount: '8 Handcrafted Sets',
  },
  {
    id: 'flowers-bouquets',
    name: 'Flowers & Bouquets',
    category: 'Flowers & Bouquets',
    price: 48.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop',
    description: 'Bespoke hand-tied floral arrangements and eternal rose domes preserved in glass.',
    itemCount: '15 Signature Arrangements',
  },
];

interface ProductsSectionProps {
  onSelectProduct?: (product: ProductCollection) => void;
  onSelectCollection?: (collectionId: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onSelectProduct,
  onSelectCollection,
}) => {
  const [activeModalProduct, setActiveModalProduct] = useState<ProductCollection | null>(null);

  const handleOpenCollection = (product: ProductCollection, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (product.id === 'flowers-bouquets') {
      return; // Coming soon, do not open anything
    }
    if (onSelectCollection) {
      onSelectCollection(product.id);
    } else if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      setActiveModalProduct(product);
    }
  };

  return (
    <section id="products" className="w-full bg-transparent text-white pt-24 pb-32 px-4 sm:px-6 lg:px-12 border-t border-white/10 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-white/60 uppercase flex items-center gap-2">
              <Sparkles size={14} className="text-blue-400" />
              Petalorah Collections
            </span>
            <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white">
              Handcrafted Products
            </h2>
            <p className="text-white/70 text-base max-w-xl">
              Discover our signature collections — Keychains, Tabletops, and Flowers & Bouquets.
            </p>
          </div>
        </div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTIONS.map((product, idx) => {
            const isComingSoon = product.id === 'flowers-bouquets';

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                onClick={() => handleOpenCollection(product)}
                className={`group relative rounded-3xl bg-white/[0.03] border border-white/15 backdrop-blur-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-2xl ${
                  isComingSoon
                    ? 'hover:bg-white/[0.04] cursor-default'
                    : 'hover:bg-white/[0.07] hover:border-white/35 cursor-pointer hover:shadow-white/5'
                }`}
              >
                {/* Inner Border Card Frame */}
                <div className="relative rounded-2xl overflow-hidden bg-black/20 border border-white/10 backdrop-blur-md aspect-[4/5] flex flex-col items-center justify-center p-4">
                  
                  {/* Product Image on Pedestal presentation */}
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover object-center transition-transform duration-700 rounded-xl ${
                        isComingSoon ? '' : 'group-hover:scale-108'
                      }`}
                    />
                    
                    {/* Dark gradient bottom vignette for clean contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Pedestal / Podium Base graphic under plant/flower */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-2 rounded-full bg-white/10 blur-sm pointer-events-none" />
                </div>

                {/* Bottom Card Meta & View Collection Action Button */}
                <div className="pt-4 px-2 flex items-end justify-between gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <h3 className={`text-lg sm:text-xl font-medium text-white transition-colors truncate ${
                      isComingSoon ? '' : 'group-hover:text-blue-300'
                    }`}>
                      {product.name}
                    </h3>
                    {!isComingSoon && (
                      <div className="flex items-center gap-2 pt-0.5">
                        <span className="text-xs sm:text-sm font-medium text-white/70">
                          From ₹{product.price.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Button / Coming Soon Tag */}
                  {isComingSoon ? (
                    <div className="px-4 py-2 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/80 shrink-0 select-none backdrop-blur-md">
                      Coming Soon
                    </div>
                  ) : (
                    <button
                      onClick={(e) => handleOpenCollection(product, e)}
                      className="px-3.5 py-2 rounded-full text-xs font-semibold bg-white/10 group-hover:bg-white text-white group-hover:text-black border border-white/20 transition-all duration-300 cursor-pointer flex items-center gap-1.5 shrink-0 shadow-lg group-hover:scale-105 active:scale-95"
                      title="View Collection"
                    >
                      <span>View Collection</span>
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Product Quick-View Translucent Modal */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProduct(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-neutral-900/80 border border-white/20 backdrop-blur-2xl text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10 overflow-hidden"
            >
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white rounded-full bg-white/10 transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="space-y-5">
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/15">
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <span className="text-xs font-mono text-white/50 uppercase">
                    {activeModalProduct.category} Collection
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {activeModalProduct.name}
                  </h3>
                  <p className="text-white/70 text-sm mt-2 leading-relaxed">
                    {activeModalProduct.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-xl font-semibold text-white">
                    From ${activeModalProduct.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => {
                      const id = activeModalProduct.id;
                      setActiveModalProduct(null);
                      if (onSelectCollection) {
                        onSelectCollection(id);
                      }
                    }}
                    className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all cursor-pointer flex items-center gap-2 shadow-lg"
                  >
                    <Eye size={16} />
                    <span>View Collection</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};


