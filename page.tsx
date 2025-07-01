"use client"
import Image from "next/image";
import { useState } from 'react';
import Link from 'next/link';

const images = [
  { src: '/image-1.jpg', type: 'photo', title: 'Packing Work 1' },
  { src: '/image-2.jpg', type: 'illustration', title: 'Global Packing' },
  { src: '/images.jpg', type: 'vector', title: 'Window Packing' },
  // Add more images as needed
];

const categories = ['all', 'photo', 'illustration', 'vector'];

const products = [
  {
    src: "/image-1.jpg",
    title: "Premium Packing Box",
    desc: "Durable, high-quality packing box for all your needs.",
    price: "$12.99",
  },
  {
    src: "/image-3.jpg",
    title: "Global Shipping Crate",
    desc: "Secure crate for international shipments.",
    price: "$29.99",
  },
  {
    src: "/image-4.webp",
    title: "Window Pallet",
    desc: "Specialized pallet for fragile items.",
    price: "$19.99",
  },
];

// Add a type for the image object
interface GalleryImage {
  src: string;
  type: string;
  title: string;
}

export default function Home() {
  const [filter, setFilter] = useState('all');
  const [modalImg, setModalImg] = useState<GalleryImage | null>(null);
  const [activeNav, setActiveNav] = useState("Home");
  const [navOpen, setNavOpen] = useState(false);

  const filteredImages = filter === 'all' ? images : images.filter(img => img.type === filter);

  return (
    <main className="min-h-screen bg-black flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full bg-black text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-2">
            <Image src="/image-1.jpg" alt="Logo" width={40} height={40} className="rounded-full border-2 border-green-500" />
            <span className="text-2xl font-bold text-green-500">Sheroze Brother</span>
          </div>
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
          >
            <span className={`block w-6 h-0.5 bg-green-500 mb-1 transition-transform ${navOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-green-500 mb-1 ${navOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-green-500 transition-transform ${navOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
          <ul className="hidden md:flex gap-8 text-lg font-semibold">
            {['Home', 'Shop', 'Services', 'Contact'].map((nav) => (
              <li
                key={nav}
                className={`cursor-pointer px-2 py-1 rounded transition-colors duration-200 ${activeNav === nav ? 'bg-green-500 text-black' : 'hover:text-green-400'}`}
                onClick={() => setActiveNav(nav)}
              >
                {nav}
              </li>
            ))}
          </ul>
        </div>
        {navOpen && (
          <ul className="md:hidden flex flex-col gap-2 px-6 pb-4 bg-black text-lg font-semibold">
            {['Home', 'Shop', 'Services', 'Contact'].map((nav) => (
              <li
                key={nav}
                className={`cursor-pointer px-2 py-2 rounded transition-colors duration-200 ${activeNav === nav ? 'bg-green-500 text-black' : 'hover:text-green-400'}`}
                onClick={() => { setActiveNav(nav); setNavOpen(false); }}
              >
                {nav}
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-green-900 to-black py-12 px-4">
        <Image
          src="/image-1.jpg"
          alt="Shehroze & Brother Packing Main"
          width={400}
          height={180}
          className="mb-4 rounded-2xl shadow-lg object-cover border-4 border-green-500"
        />
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2 text-center drop-shadow-lg">
          Sheroze Brother 
        </h1>
        <p className="text-lg md:text-xl text-green-200 mb-6 text-center max-w-2xl">
          Your trusted partner for all packing, moving, and logistics solutions. We deliver excellence, reliability, and care for your goods.
        </p>
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <Link href="https://wa.me/923182710653" passHref legacyBehavior>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 bg-green-500 hover:bg-green-600 text-black rounded-full shadow transition text-lg font-semibold"
            >
              WhatsApp
            </a>
          </Link>
          <Link href="https://facebook.com/shehrozepacking" passHref legacyBehavior>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 bg-white hover:bg-green-100 text-black rounded-full shadow transition text-lg font-semibold border border-green-500"
            >
              Facebook
            </a>
          </Link>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="w-full max-w-5xl mx-auto mb-10">
        <div className="flex gap-4 mb-6 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full font-semibold ${filter === cat ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.map((img, idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden shadow-lg bg-white/80 cursor-pointer" onClick={() => setModalImg(img)}>
              <Image src={img.src} alt={img.title} width={600} height={400} className="object-cover w-full h-48 hover:scale-105 transition-transform duration-300" />
              <div className="p-2 text-center font-medium">{img.title}</div>
            </div>
          ))}
        </div>
        {modalImg && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setModalImg(null)}>
            <div className="bg-white rounded-xl p-4 max-w-lg w-full" onClick={e => e.stopPropagation()}>
              <Image src={modalImg.src} alt={modalImg.title} width={800} height={600} className="w-full h-auto rounded-lg" />
              <div className="mt-2 text-center">{modalImg.title}</div>
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-full" onClick={() => setModalImg(null)}>Close</button>
            </div>
          </div>
        )}
      </section>

      {/* Shop Section */}
      <section className="w-full max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-green-500 mb-8 text-center">Shop Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center border-2 border-green-500 hover:scale-105 transition-transform duration-300">
              <Image src={product.src} alt={product.title} width={220} height={160} className="rounded-xl mb-4 object-cover border border-green-200" />
              <h3 className="text-xl font-bold text-black mb-2 text-center">{product.title}</h3>
              <p className="text-gray-700 mb-2 text-center">{product.desc}</p>
              <span className="text-green-600 font-bold text-lg mb-4">{product.price}</span>
              <button className="px-6 py-2 bg-green-500 text-black rounded-full font-semibold shadow hover:bg-green-600 transition">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full max-w-6xl mx-auto py-12 px-4">
        <div className="w-full bg-gradient-to-r from-black via-green-900 to-black rounded-xl p-8 shadow-inner">
          <h2 className="text-3xl font-bold text-green-500 mb-4 text-center">Our Multipurpose Services</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-lg">
            <li className="flex items-center gap-2"><span className="text-2xl">📦</span> Packing & Moving Solutions</li>
            <li className="flex items-center gap-2"><span className="text-2xl">🚚</span> Local & International Shipping</li>
            <li className="flex items-center gap-2"><span className="text-2xl">🏢</span> Office & Home Relocation</li>
            <li className="flex items-center gap-2"><span className="text-2xl">🔒</span> Secure Storage Facilities</li>
            <li className="flex items-center gap-2"><span className="text-2xl">🛠️</span> Custom Packing Materials</li>
            <li className="flex items-center gap-2"><span className="text-2xl">💼</span> Corporate Logistics</li>
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full max-w-6xl mx-auto py-12 px-4 flex flex-col items-center">
        <div className="bg-gradient-to-r from-green-900 via-black to-green-900 rounded-2xl p-8 shadow-xl w-full flex flex-col items-center">
          <h2 className="text-3xl font-bold text-green-400 mb-4">Get in Touch</h2>
          <p className="text-center text-white mb-6 max-w-xl">
            Ready to move or need a custom packing solution? Contact us today for a free quote and experience hassle-free service!
          </p>
          <Link href="mailto:info@shehrozepacking.com" passHref legacyBehavior>
            <a
              className="px-8 py-3 bg-green-500 text-black rounded-full text-lg font-bold shadow hover:bg-green-600 transition"
            >
              Email Us
            </a>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-6xl text-center text-green-200 py-6">
        &copy; {new Date().getFullYear()} Shehroze & Brother Packing. All rights reserved.
      </footer>
    </main>
  );
}
