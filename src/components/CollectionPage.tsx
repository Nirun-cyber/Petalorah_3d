import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Heart, Check, Mail, MessageCircle, ShieldCheck, Truck, RefreshCw, Send } from 'lucide-react';
import { PetalorahLogoIcon } from './PetalorahLogo';
import { ScrollBackground } from './ScrollBackground';

export interface ProductCollection {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  itemCount: string;
  longDescription?: string;
  items?: {
    id: string;
    title: string;
    price: number;
    image: string;
    tags: string[];
    description: string;
  }[];
}

export const ALL_COLLECTIONS: ProductCollection[] = [
  {
    id: 'keychains',
    name: 'Keychains',
    category: 'Keychains',
    price: 45.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    description: 'Resin-encapsulated real forget-me-not petals, pressed daisies & gold-plated charms.',
    itemCount: '12 Unique Designs',
    longDescription: 'Each keychain is handcrafted with real, hand-picked flowers carefully preserved in crystal-clear UV-resistant resin. Finished with durable gold-plated hardware and anti-tarnish protective coating, these portable botanical keepsakes carry the beauty of nature wherever you go.',
    items: [
      {
        id: 'kc-1',
        title: 'Pressed Daisy Gold Ring Charm',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop',
        tags: ['Best Seller', 'Real Daisy'],
        description: 'Features a real golden center daisy encased in a tear-drop resin charm with gold flake accents.',
      },
      {
        id: 'kc-2',
        title: 'Forget-Me-Not Botanical Pendant',
        price: 48.00,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
        tags: ['New', 'Blue Petals'],
        description: 'Vibrant blue forget-me-not blossoms arranged in a crystal heart resin charm with gold key ring.',
      },
      {
        id: 'kc-3',
        title: 'Rose Quartz & Petal Cluster',
        price: 52.00,
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
        tags: ['Limited', 'Gemstone'],
        description: 'Natural rose quartz chip beads paired with miniature pressed pink rosebud resin capsule.',
      },
      {
        id: 'kc-4',
        title: 'Lavender & Gold Leaf Bar',
        price: 50.00,
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=600&auto=format&fit=crop',
        tags: ['Aromatic Theme', 'Gold Foil'],
        description: 'Slim rectangular resin bar embedding French lavender sprigs and 24K gold foil leaves.',
      },
    ],
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
    longDescription: 'Transform your desk or living space with our zero-maintenance tabletop miniatures. Hand-assembled using real preserved mosses, micro-succulents, miniature handmade figures, and blown glass domes that bring serene nature into your everyday work environment.',
    items: [
      {
        id: 'tt-1',
        title: 'Micro Succulent Terrarium Sphere',
        price: 200.00,
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=600&auto=format&fit=crop',
        tags: ['Desk Favorite', 'Preserved'],
        description: 'Self-contained glass sphere featuring preserved zebra haworthia and white stone riverbed.',
      },
      {
        id: 'tt-2',
        title: 'Handmade Bonsai Tree',
        price: 250.00,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=600&auto=format&fit=crop',
        tags: ['Custom Sculpt', 'Artisan'],
        description: 'Meticulously twisted plush stems forming an everlasting sakura bonsai tree on ceramic base.',
      },
      {
        id: 'tt-3',
        title: 'Crystal Glass Moss Diorama',
        price: 220.00,
        image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=600&auto=format&fit=crop',
        tags: ['Eco Glass', 'Mini World'],
        description: 'Geometrical glass vessel with multi-tone preserved mood moss and tiny quartz crystal cluster.',
      },
      {
        id: 'tt-4',
        title: 'Petite Pastel Succulent Trio',
        price: 210.00,
        image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=600&auto=format&fit=crop',
        tags: ['Set of 3', 'Cute Gift'],
        description: 'Three miniature ceramic pots holding soft handmade succulents in blush, mint, and lilac.',
      },
    ],
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
    longDescription: 'My signature floral bouquets combine artisanal craftsmanship with eternal beauty. Made from premium velvet chenille pipe cleaners and preserved natural botanicals, these bouquets never fade, wither, or require water — providing a lasting symbol of love and appreciation.',
    items: [
      {
        id: 'fb-1',
        title: 'Blush Pink Tulip & Daisy Bouquet',
        price: 48.00,
        image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=600&auto=format&fit=crop',
        tags: ['Top Seller', 'Hand-Tied'],
        description: 'Hand-crafted soft pink pipe cleaner tulips wrapped in luxury frosted korean wrapping paper with ribbon.',
      },
      {
        id: 'fb-2',
        title: 'Eternal Red Rose Glass Dome',
        price: 65.00,
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
        tags: ['Romantic', 'LED Lighting'],
        description: 'Preserved real Ecuadorian red rose inside wooden base glass dome with warm fairy string lights.',
      },
      {
        id: 'fb-3',
        title: 'Pastel Lavender & Sunflower Bundle',
        price: 52.00,
        image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=crop',
        tags: ['Custom Colors', 'Velvet Feel'],
        description: 'Cheerful bright yellow handmade sunflowers surrounded by soft lavender stems and eucalyptus sprigs.',
      },
      {
        id: 'fb-4',
        title: 'Custom Anniversary Keepsake Bouquet',
        price: 75.00,
        image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=600&auto=format&fit=crop',
        tags: ['Personalized', 'Bespoke'],
        description: 'Fully customizable color palette and flower count with personalized photo charm and hand-written card.',
      },
    ],
  },
];

interface CollectionPageProps {
  collectionId: string;
  onBack: () => void;
  onSelectOtherCollection: (id: string) => void;
  onContactClick: (productName?: string) => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  collectionId,
  onBack,
  onSelectOtherCollection,
  onContactClick,
}) => {
  const collection = ALL_COLLECTIONS.find((c) => c.id === collectionId) || ALL_COLLECTIONS[0];
  const [inquiredItems, setInquiredItems] = useState<Record<string, boolean>>({});
  const [customRequestText, setCustomRequestText] = useState('');
  const [customSubmitted, setCustomSubmitted] = useState(false);

  // Scroll to top when opening page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [collectionId]);

  const handleItemInquire = (itemId: string, itemTitle: string) => {
    setInquiredItems((prev) => ({ ...prev, [itemId]: true }));
    setTimeout(() => {
      setInquiredItems((prev) => ({ ...prev, [itemId]: false }));
    }, 2500);
    onContactClick(`${collection.name} - ${itemTitle}`);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRequestText.trim()) return;
    const text = encodeURIComponent(`Hi! I want custom ${collection.name}: ${customRequestText.trim()}`);
    window.open(`https://wa.me/916382735751?text=${text}`, '_blank');
    setCustomRequestText('');
  };

  const otherCollections = ALL_COLLECTIONS.filter((c) => c.id !== collection.id);

  return (
    <div className="min-h-screen bg-transparent text-white font-sans relative pb-24">
      {/* Background Frame Scroll Animation */}
      <ScrollBackground totalFrames={240} overlayOpacity={0.45} />
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed top-2/3 right-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Floating Glass Navigation Header */}
      <header className="sticky top-0 z-50 px-4 py-4 backdrop-blur-2xl bg-black/30 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-3">
            <PetalorahLogoIcon className="w-7 h-7 text-blue-400" />
            <span className="font-serif text-lg font-semibold tracking-tight hidden sm:inline">
              Petalorah Studio
            </span>
          </div>

          <button
            onClick={() => onContactClick(`${collection.name} Custom Inquiry`)}
            className="px-4 py-2 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-white/90 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
          >
            Custom Order
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 relative z-10 space-y-16">
        
        {/* Collection Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/[0.03] border border-white/15 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 shadow-2xl">
          {/* Left Text Detail */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-mono uppercase tracking-wider">
              <Sparkles size={12} />
              <span>Petalorah Signature Collection</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-light text-white tracking-tight leading-tight">
              {collection.name}
            </h1>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed font-light">
              {collection.longDescription || collection.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-white/70 font-mono">
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <Check size={14} className="text-emerald-400" /> 100% Handcrafted
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <Truck size={14} className="text-blue-400" /> Worldwide Shipping
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <ShieldCheck size={14} className="text-purple-400" /> Gift Box Included
              </span>
            </div>
          </motion.div>

          {/* Right Featured Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-2xl group"
          >
            <img
              src={collection.image}
              alt={collection.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <span className="text-xs font-mono text-white/60 block">{collection.itemCount}</span>
                <span className="text-lg font-semibold text-white">Starting from ₹{collection.price.toFixed(2)}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-xs font-mono text-amber-300">
                ★ {collection.rating} / 5.0
              </span>
            </div>
          </motion.div>
        </div>

        {/* Collection Items Grid */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-white/50 uppercase block mb-1">
                Catalogue Selection
              </span>
              <h2 className="text-3xl font-light text-white tracking-tight">
                Featured {collection.category} Creations
              </h2>
            </div>
            <span className="text-sm text-white/60 font-mono">
              Showing {collection.items?.length || 4} unique artisan pieces
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(collection.items || []).map((item, idx) => {
              const isJustInquired = inquiredItems[item.id];

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="group rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-2xl p-4 flex flex-col justify-between hover:bg-white/[0.07] hover:border-white/35 transition-all duration-300 shadow-xl"
                >
                  <div className="space-y-3">
                    {/* Image Container */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-white/10 bg-black/40">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      
                      {/* Tags */}
                      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-[10px] font-mono text-white/90"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-base font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/70 line-clamp-2 mt-1 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Inquire Action */}
                  <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-white">
                      ₹{item.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => handleItemInquire(item.id, item.title)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 shadow-md ${
                        isJustInquired
                          ? 'bg-emerald-500 text-black font-semibold'
                          : 'bg-white/10 hover:bg-white text-white hover:text-black border border-white/20'
                      }`}
                    >
                      {isJustInquired ? (
                        <>
                          <Check size={12} />
                          <span>Inquired</span>
                        </>
                      ) : (
                        <>
                          <Mail size={12} />
                          <span>Order / Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Custom Handcrafted Request Box */}
        <div className="bg-gradient-to-r from-blue-900/20 via-neutral-900/40 to-indigo-900/20 border border-white/20 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl space-y-4 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-light text-white">
              Want custom {collection.name}
            </h3>

            <form onSubmit={handleCustomSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="text"
                placeholder=""
                value={customRequestText}
                onChange={(e) => setCustomRequestText(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50 backdrop-blur-md"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 shadow-lg hover:scale-105 active:scale-95"
              >
                <Send size={14} />
                <span>Send Request</span>
              </button>
            </form>
          </div>
        </div>

        {/* Explore Other Collections */}
        <div className="space-y-6 pt-6">
          <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight border-b border-white/10 pb-4">
            Explore Other Collections
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherCollections.map((other) => (
              <div
                key={other.id}
                onClick={() => onSelectOtherCollection(other.id)}
                className="group p-5 rounded-2xl bg-white/[0.03] border border-white/15 hover:border-white/35 backdrop-blur-2xl transition-all duration-300 cursor-pointer flex items-center gap-5 shadow-xl hover:bg-white/[0.08]"
              >
                <img
                  src={other.image}
                  alt={other.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-white/50 uppercase block">
                    {other.itemCount}
                  </span>
                  <h4 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                    {other.name}
                  </h4>
                  <p className="text-xs text-white/60 truncate mt-0.5">
                    {other.description}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all shrink-0">
                  →
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};
