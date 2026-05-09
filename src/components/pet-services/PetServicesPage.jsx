"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaCalendarCheck,
  FaCut,
  FaShoppingCart,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaShieldAlt,
  FaTruck,
  FaTag,
  FaHeart,
  FaSearch,
  FaFilter,
  FaArrowRight,
  FaChevronRight,
} from "react-icons/fa";

/* ─────────────────── DATA ─────────────────── */
const groomingShops = [
  {
    id: 1,
    name: "Paws & Claws Grooming Studio",
    rating: 4.9,
    reviews: 218,
    location: "Andheri West, Mumbai",
    phone: "+91 98201 34567",
    hours: "9 AM – 8 PM",
    tags: ["Bathing", "Haircut", "Nail Trim", "Spa"],
    badge: "Top Rated",
    badgeColor: "bg-blue-600",
    img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "FurEver Fresh Pet Spa",
    rating: 4.7,
    reviews: 145,
    location: "Koramangala, Bangalore",
    phone: "+91 80234 56789",
    hours: "10 AM – 7 PM",
    tags: ["Aromatherapy", "De-shedding", "Ear Cleaning"],
    badge: "Eco Friendly",
    badgeColor: "bg-teal-600",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "The Waggy Tail Salon",
    rating: 4.8,
    reviews: 192,
    location: "Sector 18, Noida",
    phone: "+91 98765 43210",
    hours: "8 AM – 9 PM",
    tags: ["Full Groom", "Teeth Brushing", "Paw Care"],
    badge: "24/7 Service",
    badgeColor: "bg-purple-600",
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Happy Hound Grooming Hub",
    rating: 4.6,
    reviews: 98,
    location: "Salt Lake, Kolkata",
    phone: "+91 33456 78901",
    hours: "9 AM – 6 PM",
    tags: ["Puppy Bath", "Styling", "Flea Treatment"],
    badge: "Budget Pick",
    badgeColor: "bg-blue-500",
    img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&auto=format&fit=crop&q=60",
  },
];

const products = [
  {
    id: 1,
    name: "Royal Canin Adult Dry Food 5 kg",
    price: 1499,
    originalPrice: 1999,
    rating: 4.8,
    reviews: 432,
    category: "Food",
    badge: "Best Seller",
    img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Orthopedic Memory Foam Pet Bed",
    price: 2199,
    originalPrice: 3200,
    rating: 4.7,
    reviews: 217,
    category: "Beds",
    badge: "32% Off",
    img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Retractable Leash with LED Light",
    price: 649,
    originalPrice: 899,
    rating: 4.5,
    reviews: 188,
    category: "Accessories",
    badge: "New",
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Natural Grain-Free Treats Pack",
    price: 349,
    originalPrice: 499,
    rating: 4.9,
    reviews: 512,
    category: "Treats",
    badge: "Top Rated",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "Stainless Steel Pet Bowl Set",
    price: 499,
    originalPrice: 699,
    rating: 4.6,
    reviews: 303,
    category: "Accessories",
    badge: null,
    img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    name: "Anti-flea & Tick Shampoo 500ml",
    price: 279,
    originalPrice: 399,
    rating: 4.4,
    reviews: 145,
    category: "Grooming",
    badge: "30% Off",
    img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&auto=format&fit=crop&q=60",
  },
];

const ecomCategories = ["All", "Food", "Beds", "Accessories", "Treats", "Grooming"];

/* ─────────────────── HERO ─────────────────── */
const ServiceHero = () => (
  <section className="relative w-full min-h-[420px] flex items-center overflow-hidden">
    {/* Gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600" />

    {/* Decorative circles */}
    <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-3xl" />
    <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full bg-cyan-400/10 blur-3xl" />

    <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 w-full">
      <p className="text-blue-300 font-semibold tracking-widest text-sm uppercase mb-3">
        All-in-One Platform
      </p>
      <h1 className="text-4xl md:text-6xl font-extrabold text-white font-titillium mb-5 leading-tight">
        Pet Services Hub
      </h1>
      <p className="text-blue-100 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
        Book vet appointments, discover top grooming studios, and shop premium
        pet products — all from one place.
      </p>

      <div className="flex flex-wrap gap-4">
        <a
          href="#appointment"
          className="flex items-center gap-2 px-7 py-3.5 bg-white text-blue-900 font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <FaCalendarCheck /> Book Appointment
        </a>
        <a
          href="#grooming"
          className="flex items-center gap-2 px-7 py-3.5 bg-blue-500/30 text-white font-bold rounded-full border border-white/30 hover:bg-blue-500/50 transition-colors"
        >
          <FaCut /> Grooming Shops
        </a>
        <a
          href="#ecommerce"
          className="flex items-center gap-2 px-7 py-3.5 bg-blue-500/30 text-white font-bold rounded-full border border-white/30 hover:bg-blue-500/50 transition-colors"
        >
          <FaShoppingCart /> Shop Now
        </a>
      </div>
    </div>
  </section>
);

/* ─────────────────── APPOINTMENT SECTION ─────────────────── */
const AppointmentSection = () => {
  const [showVetOptions, setShowVetOptions] = useState(false);

  const vetOptions = [
    { icon: "🩺", label: "General Checkup", color: "from-blue-500 to-blue-700" },
    { icon: "💉", label: "Vaccination", color: "from-indigo-500 to-indigo-700" },
    { icon: "🦷", label: "Dental Care", color: "from-sky-500 to-sky-700" },
    { icon: "🏥", label: "Surgery", color: "from-cyan-500 to-cyan-700" },
    { icon: "🔬", label: "Lab Tests", color: "from-blue-600 to-blue-800" },
  ];

  return (
    <section id="appointment" className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-3">
              📅 Appointments
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 font-titillium">
              Book Your Appointment
            </h2>
            <p className="text-gray-500 mt-2 max-w-lg">
              Choose a service type and get connected with a specialist near
              you, available 7 days a week.
            </p>
          </div>
          <Link
            href="/appointments/booking"
            className="flex items-center gap-2 text-blue-700 font-semibold hover:underline"
          >
            Book Full Appointment <FaArrowRight />
          </Link>
        </div>

        {/* Main Service Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <div
            onClick={() => setShowVetOptions(!showVetOptions)}
            className={`rounded-3xl p-8 flex flex-col items-center gap-4 shadow-lg hover:shadow-2xl transition-all cursor-pointer text-center group ${showVetOptions ? 'bg-gradient-to-br from-blue-700 to-blue-900 scale-[1.02]' : 'bg-gradient-to-br from-blue-600 to-blue-800 hover:-translate-y-1'}`}
          >
            <span className="text-6xl group-hover:scale-110 transition-transform">🩺</span>
            <span className="text-white font-bold text-2xl">Vet Checkup</span>
            <span className="text-blue-200 text-sm">Click to see options</span>
          </div>

          <Link
            href="/appointments/booking?service=grooming"
            className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-8 flex flex-col items-center gap-4 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer text-center group"
          >
            <span className="text-6xl group-hover:scale-110 transition-transform">✂️</span>
            <span className="text-white font-bold text-2xl">Grooming</span>
            <span className="text-cyan-100 text-sm">Book grooming session</span>
          </Link>
        </div>

        {/* Vet Sub-options */}
        {showVetOptions && (
          <div className="mb-12 animate-fade-in">
            <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">Select Vet Checkup Type</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {vetOptions.map((s, i) => (
                <Link
                  key={i}
                  href={`/appointments/booking?concern=${encodeURIComponent(s.label)}`}
                  className={`bg-gradient-to-br ${s.color} rounded-2xl p-4 flex flex-col items-center gap-2 shadow hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer text-center group`}
                >
                  <span className="text-3xl">{s.icon}</span>
                  <span className="text-white font-semibold text-sm">{s.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: <FaClock className="text-blue-500 w-6 h-6" />,
              title: "Instant Confirmation",
              desc: "Get booking confirmation within minutes directly to your phone.",
            },
            {
              icon: <FaShieldAlt className="text-blue-500 w-6 h-6" />,
              title: "Verified Vets",
              desc: "All specialists are licensed and verified by the VetEra team.",
            },
            {
              icon: <FaCalendarCheck className="text-blue-500 w-6 h-6" />,
              title: "Easy Rescheduling",
              desc: "Reschedule or cancel your appointment up to 2 hours before.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-6 rounded-2xl border border-blue-100 bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <div className="p-3 rounded-xl bg-blue-100">{card.icon}</div>
              <div>
                <h3 className="font-bold text-blue-900 mb-1">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────── GROOMING SECTION ─────────────────── */
const GroomingSection = () => {
  const [search, setSearch] = useState("");

  const filtered = groomingShops.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="grooming" className="py-20 bg-gradient-to-b from-blue-950 to-blue-900">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-block px-4 py-1 bg-blue-700/50 text-blue-200 text-sm font-semibold rounded-full mb-3">
              ✂️ Grooming
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-titillium">
              Top Grooming Shops
            </h2>
            <p className="text-blue-200 mt-2 max-w-lg">
              Pamper your pet at the best grooming studios — rated by thousands
              of happy pet parents.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or city..."
              className="pl-11 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-blue-300 focus:outline-none focus:border-blue-400 w-full sm:w-72"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.length === 0 && (
            <p className="text-blue-300 col-span-4 text-center py-10">
              No shops found matching your search.
            </p>
          )}
          {filtered.map((shop) => (
            <div
              key={shop.id}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-blue-400/50 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={shop.img}
                  alt={shop.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span
                  className={`absolute top-3 left-3 ${shop.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow`}
                >
                  {shop.badge}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-white text-base mb-1 leading-tight">
                  {shop.name}
                </h3>

                <div className="flex items-center gap-1 mb-3">
                  <FaStar className="text-yellow-400 text-sm" />
                  <span className="text-yellow-300 font-semibold text-sm">
                    {shop.rating}
                  </span>
                  <span className="text-blue-300 text-xs">
                    ({shop.reviews} reviews)
                  </span>
                </div>

                <div className="space-y-1.5 text-sm text-blue-200 mb-4">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-400 flex-shrink-0" />
                    {shop.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-blue-400 flex-shrink-0" />
                    {shop.hours}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-blue-400 flex-shrink-0" />
                    {shop.phone}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {shop.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-0.5 bg-blue-700/50 text-blue-200 rounded-full border border-blue-600/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/appointments/booking"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  Book Slot <FaChevronRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────── ECOMMERCE SECTION ─────────────────── */
const EcommerceSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [addedId, setAddedId] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% tax example
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 50; 
  const total = subtotal + tax + shipping;

  return (
    <section id="ecommerce" className="py-20 bg-[#F0F6FF] relative">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-3">
              🛒 E-Commerce
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 font-titillium">
              Pet Products Store
            </h2>
            <p className="text-gray-500 mt-2 max-w-lg">
              Shop premium, vet-recommended products — delivered right to your
              doorstep.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm hover:bg-blue-200 transition-colors">
              <FaFilter /> Filter
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              <FaShoppingCart /> Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Feature banners */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: <FaTruck />, text: "Free delivery on orders above ₹999" },
            { icon: <FaShieldAlt />, text: "100% authentic & vet-approved products" },
            { icon: <FaTag />, text: "Exclusive member discounts every week" },
          ].map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3.5 bg-blue-600 text-white rounded-2xl shadow-md"
            >
              <span className="text-lg opacity-80">{b.icon}</span>
              <span className="text-sm font-semibold">{b.text}</span>
            </div>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex gap-3 flex-wrap mb-8">
          {ecomCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-blue-700 text-white shadow-md"
                  : "bg-white text-blue-700 border border-blue-200 hover:border-blue-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const discount = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            );
            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-blue-50 group"
              >
                <div className="relative h-52 bg-blue-50 overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                  <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform">
                    <FaHeart className="text-blue-400 hover:text-red-400 transition-colors" />
                  </button>
                  <span className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {discount}% OFF
                  </span>
                </div>

                <div className="p-5">
                  <span className="text-xs text-blue-500 font-semibold uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-blue-950 mt-1 mb-2 leading-tight">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-3">
                    <FaStar className="text-yellow-400 text-sm" />
                    <span className="text-blue-800 font-semibold text-sm">
                      {product.rating}
                    </span>
                    <span className="text-gray-400 text-xs">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-extrabold text-blue-700">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      addedId === product.id
                        ? "bg-green-500 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {addedId === product.id ? (
                      "✓ Added to Cart!"
                    ) : (
                      <>
                        <FaShoppingCart /> Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load more */}
        <div className="flex justify-center mt-10">
          <button className="flex items-center gap-2 px-8 py-3 bg-blue-700 text-white font-bold rounded-full shadow-md hover:bg-blue-800 hover:shadow-xl transition-all">
            Load More Products <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Cart Side Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" 
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-blue-50">
              <h2 className="text-2xl font-bold text-blue-950 flex items-center gap-2">
                <FaShoppingCart className="text-blue-600" /> Your Cart
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 shadow-sm"
              >
                ✕
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-blue-100 text-blue-300 rounded-full flex items-center justify-center text-3xl mb-4">
                    <FaShoppingCart />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Cart is empty</h3>
                  <p className="text-gray-500 text-sm">Add some amazing pet products to see them here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl p-3 flex gap-4 shadow-sm border border-gray-100 relative">
                      <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-blue-950 pr-6 leading-tight mb-1">{item.name}</h4>
                        <div className="text-blue-700 font-extrabold text-sm mb-3">₹{item.price.toLocaleString()}</div>
                        
                        <div className="flex items-center bg-gray-100 rounded-lg p-1 w-max">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-bold text-gray-800 text-xs">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white">
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-800">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18%)</span>
                    <span className="font-semibold text-gray-800">₹{tax.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-gray-800">
                      {shipping === 0 ? <span className="text-green-500">Free</span> : `₹${shipping}`}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-100">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-extrabold text-blue-700">₹{total.toFixed(0)}</span>
                </div>
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-600/30 transition-all text-lg">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

/* ─────────────────── MAIN EXPORT ─────────────────── */
const PetServicesPage = () => {
  return (
    <main className="w-full min-h-screen font-titillium">
      <ServiceHero />
      <AppointmentSection />
      <GroomingSection />
      <EcommerceSection />
    </main>
  );
};

export default PetServicesPage;
