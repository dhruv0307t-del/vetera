/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./home.css";

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { 
          e.target.classList.add('visible'); 
          io.unobserve(e.target); 
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(r => io.observe(r));

    // Immediately reveal items already in viewport on load
    reveals.forEach(r => {
      const rect = r.getBoundingClientRect();
      if (rect.top < window.innerHeight) r.classList.add('visible');
    });

    // 3D Card Tilt (desktop only)
    if (window.matchMedia('(hover: hover)').matches) {
      document.querySelectorAll('.svc-card').forEach(card => {
        card.addEventListener('mousemove', e => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `translateY(-8px) scale(1.01) perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
      });

      document.querySelectorAll('.how-card').forEach(card => {
        card.addEventListener('mousemove', e => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `translateY(-6px) perspective(600px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
      });
    }

    // Count-up Animation
    function countUp(el, target) {
      if (!el) return;
      const dur = 2000; const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * target).toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
      const statsObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          countUp(document.getElementById('c1'), 50);
          countUp(document.getElementById('c2'), 2400);
          countUp(document.getElementById('c3'), 98);
          countUp(document.getElementById('c4'), 340);
          statsObserver.unobserve(statsBar);
        }
      }, { threshold: 0.5 });
      statsObserver.observe(statsBar);
      return () => {
        io.disconnect();
        statsObserver.disconnect();
      };
    }

    return () => {
      io.disconnect();
    };
  }, []);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMenu = () => {
    setMobileMenuOpen(prev => {
      if (!prev) document.body.style.overflow = 'hidden';
      else document.body.style.overflow = '';
      return !prev;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="home-body">
      {/* ══════════════════════════════════════
           DESKTOP NAV
      ══════════════════════════════════════ */}
      <nav className="nav-desktop">
        <Link href="/" className="logo">
          <div className="logo-mark">🐾</div>
          VetEra
        </Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/health-monitoring">Health Monitoring</Link></li>
          <li><Link href="/appointments">Appointments</Link></li>
          <li><Link href="/pet-services">Pet Services</Link></li>
          <li><Link href="/community">Community</Link></li>
          <li><Link href="/login" className="nav-cta">Get Started</Link></li>
        </ul>
        <button 
          className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} 
          id="hamburger" 
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* ══════════════════════════════════════
           MOBILE MENU DRAWER
      ══════════════════════════════════════ */}
      <div 
        className={`menu-backdrop ${mobileMenuOpen ? 'open' : ''}`} 
        id="backdrop"
        onClick={closeMenu}
      ></div>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} id="mobileMenu">
        <div className="mobile-menu-inner">
          <div className="mobile-menu-pets">
            <div className="mob-pet-chip">🐕 Dogs</div>
            <div className="mob-pet-chip">🐈 Cats</div>
            <div className="mob-pet-chip">🐇 Rabbits</div>
            <div className="mob-pet-chip">🦜 Birds</div>
            <div className="mob-pet-chip">🐟 Fish</div>
            <div className="mob-pet-chip">🐹 Hamsters</div>
          </div>

          <ul className="mobile-nav-links">
            <li>
              <Link href="/" onClick={closeMenu}>
                <span>🏠 Home</span>
                <span className="link-arrow">›</span>
              </Link>
            </li>
            <li>
              <Link href="/health-monitoring" onClick={closeMenu}>
                <span>❤️ Health Monitoring</span>
                <span className="link-arrow">›</span>
              </Link>
            </li>
            <li>
              <Link href="/appointments" onClick={closeMenu}>
                <span>📅 Appointments</span>
                <span className="link-arrow">›</span>
              </Link>
            </li>
            <li>
              <Link href="/pet-services" onClick={closeMenu}>
                <span>🐾 Pet Services</span>
                <span className="link-arrow">›</span>
              </Link>
            </li>
            <li>
              <Link href="/community" onClick={closeMenu}>
                <span>🤝 Community</span>
                <span className="link-arrow">›</span>
              </Link>
            </li>
            <li>
              <Link href="/login" className="highlight" onClick={closeMenu}>
                <span>🚀 Get Started Free</span>
                <span className="link-arrow">›</span>
              </Link>
            </li>
          </ul>

          <div className="mobile-menu-bottom">
            <Link href="/appointments" className="mob-btn-primary" onClick={closeMenu} style={{ textDecoration: 'none' }}>📅 Book</Link>
            <Link href="/login" className="mob-btn-outline" onClick={closeMenu} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Sign In</Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
           HERO
      ══════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-bg-paws">
          <span className="bg-paw">🐾</span>
          <span className="bg-paw">🐾</span>
          <span className="bg-paw">🐾</span>
          <span className="bg-paw">🐾</span>
        </div>
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>

        <div className="hero-left">
          <div className="hero-badge"><span className="badge-paw">🐾</span> All-in-One Pet Care Platform</div>
          <h1 className="hero-title">Welcome to<br/><span className="accent-word">VetEra</span></h1>
          <p className="hero-sub">Your all-in-one platform for pet care — book vets, monitor health, find groomers, and connect with a community that loves pets as much as you do.</p>
          <div className="hero-btns">
            <Link href="/appointments" className="btn-primary">📅 Schedule Appointment</Link>
            <Link href="/appointments" className="btn-outline">View Appointments →</Link>
          </div>
          <div className="hero-trust">
            <div className="trust-avatars">
              <div className="trust-avatar">🐕</div>
              <div className="trust-avatar">🐈</div>
              <div className="trust-avatar">🐇</div>
              <div className="trust-avatar">🦜</div>
            </div>
            <div className="trust-text">
              <strong>50,000+ Happy Pets</strong>
              Trusted by pet parents across India
            </div>
          </div>

          {/* Mobile photo strip */}
          <div className="hero-mobile-strip">
            <div className="mobile-pet-card">
              <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=320&h=400&fit=crop&q=80" alt="Bruno the dog" />
              <div className="mobile-pet-card-label">🐕 Bruno · Golden Retriever</div>
            </div>
            <div className="mobile-pet-card">
              <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=320&h=400&fit=crop&q=80" alt="Whiskers the cat" />
              <div className="mobile-pet-card-label">🐈 Whiskers · Persian</div>
            </div>
            <div className="mobile-pet-card">
              <img src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=320&h=400&fit=crop&q=80" alt="Coco the rabbit" />
              <div className="mobile-pet-card-label">🐇 Coco · Mini Rex</div>
            </div>
            <div className="mobile-pet-card">
              <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=320&h=400&fit=crop&q=80" alt="Max the dog" />
              <div className="mobile-pet-card-label">🐕 Max · Labrador</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="pet-photo-second">
            <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=500&fit=crop&q=80" alt="cat" />
          </div>
          <div className="pet-photo-main">
            <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=600&fit=crop&q=80" alt="dog" />
            <div className="pet-photo-main-overlay">
              <div className="pet-name-tag">
                <div>
                  <h3>Bruno</h3>
                  <div className="pet-species">Golden Retriever · 3 yrs</div>
                </div>
                <div className="pet-health-dot"></div>
              </div>
            </div>
          </div>
          <div className="pet-photo-third">
            <img src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&h=360&fit=crop&q=80" alt="rabbit" />
          </div>
          <div className="float-chip chip-1">
            <span className="fc-icon">✅</span>
            <div className="fc-text"><strong>Vaccinated</strong><span>All shots up to date</span></div>
          </div>
          <div className="float-chip chip-2">
            <span className="fc-icon">🏥</span>
            <div className="fc-text"><strong>Next Appt</strong><span>May 15 · 10:00 AM</span></div>
          </div>
          <div className="float-chip chip-3">
            <span className="fc-icon">❤️</span>
            <div className="fc-text"><strong>72 bpm</strong><span>Heart rate · Normal</span></div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           STATS BAR
      ══════════════════════════════════════ */}
      <div className="stats-bar">
        <div className="stats-bar-inner">
          <div className="stat-item">
            <div className="stat-num"><span id="c1">0</span>k<span>+</span></div>
            <div className="stat-label">Happy Pets</div>
          </div>
          <div className="stat-item">
            <div className="stat-num"><span id="c2">0</span><span>+</span></div>
            <div className="stat-label">Verified Vets</div>
          </div>
          <div className="stat-item">
            <div className="stat-num"><span id="c3">0</span><span>%</span></div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-num"><span id="c4">0</span><span>+</span></div>
            <div className="stat-label">Cities Covered</div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
           SERVICES
      ══════════════════════════════════════ */}
      <section className="services">
        <div className="services-header">
          <div>
            <div className="section-eyebrow reveal"><div className="eyebrow-line"></div><span className="eyebrow-text">Everything Your Pet Needs</span></div>
            <h2 className="section-h2 reveal">Our <em>Services</em></h2>
            <p className="section-p reveal">VetEra brings all pet care services under one roof — accessible anytime, anywhere.</p>
          </div>
          <Link href="/pet-services" style={{ fontSize:"0.85rem", fontWeight:700, color:"var(--navy)", textDecoration:"none", opacity:0.6, whiteSpace:"nowrap", transition:"opacity 0.2s" }} onMouseOver={e=>e.target.style.opacity=1} onMouseOut={e=>e.target.style.opacity=0.6}>View all →</Link>
        </div>

        <div className="services-grid">
          <Link href="/health-monitoring" style={{ textDecoration: 'none' }} className="svc-card reveal reveal-d1">
            <img className="svc-bg" src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&h=800&fit=crop&q=80" alt="health" />
            <div className="svc-card-overlay"></div>
            <div className="svc-card-content">
              <div className="svc-icon-circle">🩺</div>
              <div className="svc-card-title">Health Monitoring</div>
              <div className="svc-card-desc">Track vitals, health records and wellness trends with AI-powered insights.</div>
              <div className="svc-card-link">Explore →</div>
            </div>
          </Link>
          <Link href="/pet-services" style={{ textDecoration: 'none' }} className="svc-card reveal reveal-d2">
            <img className="svc-bg" src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&h=700&fit=crop&q=80" alt="services" />
            <div className="svc-card-overlay"></div>
            <div className="svc-card-content">
              <span className="svc-badge-pill new">NEW</span>
              <div className="svc-icon-circle">🐾</div>
              <div className="svc-card-title">Pet Services</div>
              <div className="svc-card-desc">Book appointments, grooming & shop premium products.</div>
              <div className="svc-card-link">Explore →</div>
            </div>
          </Link>
          <Link href="/community" style={{ textDecoration: 'none' }} className="svc-card reveal reveal-d3">
            <img className="svc-bg" src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500&h=700&fit=crop&q=80" alt="community" />
            <div className="svc-card-overlay"></div>
            <div className="svc-card-content">
              <div className="svc-icon-circle">🐕</div>
              <div className="svc-card-title">Community</div>
              <div className="svc-card-desc">Adopt, buy & sell pets, share photos with pet lovers.</div>
              <div className="svc-card-link">Explore →</div>
            </div>
          </Link>
          <Link href="/emergency" style={{ textDecoration: 'none' }} className="svc-card reveal reveal-d4">
            <img className="svc-bg" src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&h=700&fit=crop&q=80" alt="emergency" />
            <div className="svc-card-overlay"></div>
            <div className="svc-card-content">
              <div className="svc-icon-circle">🚑</div>
              <div className="svc-card-title">Emergency</div>
              <div className="svc-card-desc">Instant emergency vet help & accident reporting — 24/7.</div>
              <div className="svc-card-link">Explore →</div>
            </div>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
           HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="how-section">
        <span className="paw-trail pt-1">🐾</span><span className="paw-trail pt-2">🐾</span>
        <span className="paw-trail pt-3">🐾</span><span className="paw-trail pt-4">🐾</span>
        <span className="paw-trail pt-5">🐾</span><span className="paw-trail pt-6">🐾</span>

        <div className="section-eyebrow reveal"><div className="eyebrow-line"></div><span className="eyebrow-text">Simple & Fast</span></div>
        <h2 className="section-h2 reveal">How It <em>Works</em></h2>

        <div className="how-grid">
          <div className="how-card reveal reveal-d1">
            <div className="how-number">01</div>
            <span className="how-pet">🐕</span>
            <div className="how-title">Create Your Pet Profile</div>
            <div className="how-desc">Add your pet&apos;s details — breed, age, weight, medical history. VetEra builds a smart health dashboard tailored just for them.</div>
          </div>
          <div className="how-card reveal reveal-d2">
            <div className="how-number">02</div>
            <span className="how-pet">📅</span>
            <div className="how-title">Book a Verified Vet</div>
            <div className="how-desc">Browse 2,400+ licensed vets, check their availability, read reviews, and book an appointment in under 60 seconds.</div>
          </div>
          <div className="how-card reveal reveal-d3">
            <div className="how-number">03</div>
            <span className="how-pet">📊</span>
            <div className="how-title">Track Health & Wellness</div>
            <div className="how-desc">Monitor vitals, vaccinations, medications and growth over time. Get AI-powered insights and reminders for upcoming care.</div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           FEATURE / WHY VETERA
      ══════════════════════════════════════ */}
      <section className="feature-section">
        <div className="feature-grid">
          <div className="pet-collage reveal-left">
            <div className="collage-main"><img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=620&fit=crop&q=80" alt="dog" /></div>
            <div className="collage-second"><img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=480&fit=crop&q=80" alt="cat" /></div>
            <div className="collage-third"><img src="https://images.unsplash.com/photo-1520885708668-55f83e2fe37a?w=300&h=380&fit=crop&q=80" alt="golden" /></div>
            <div className="collage-chip cc-1">
              <span className="cc-icon">⭐</span>
              <div className="cc-text"><strong>4.9 / 5 Rating</strong><span>Avg vet satisfaction</span></div>
            </div>
            <div className="collage-chip cc-2">
              <span className="cc-icon">🛡️</span>
              <div className="cc-text"><strong>100% Verified</strong><span>All vets licensed & checked</span></div>
            </div>
          </div>

          <div className="reveal-right">
            <div className="section-eyebrow" style={{ marginBottom: "16px" }}><div className="eyebrow-line"></div><span className="eyebrow-text">Why VetEra</span></div>
            <h2 className="section-h2">Your pet&apos;s health,<br/><em>always in reach</em></h2>
            <p className="section-p">From real-time health monitoring to instant vet booking, VetEra puts everything your pet needs right in the palm of your hand.</p>
            <div className="feature-items">
              <div className="feature-item">
                <div className="fi-icon">🩺</div>
                <div><div className="fi-title">Verified Professionals Only</div><div className="fi-desc">Every vet on VetEra is licensed, background-verified, and rated by real pet parents.</div></div>
              </div>
              <div className="feature-item">
                <div className="fi-icon">⚡</div>
                <div><div className="fi-title">Instant Booking & Confirmation</div><div className="fi-desc">Book a vet, groomer, or specialist in under 60 seconds. Instant SMS & email confirmation.</div></div>
              </div>
              <div className="feature-item">
                <div className="fi-icon">📊</div>
                <div><div className="fi-title">AI-Powered Health Insights</div><div className="fi-desc">Smart health tracking with trend analysis and personalized care recommendations.</div></div>
              </div>
              <div className="feature-item">
                <div className="fi-icon">🚨</div>
                <div><div className="fi-title">24/7 Emergency Response</div><div className="fi-desc">Round-the-clock emergency vet access. Report accidents and get help within minutes.</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="testi-section">
        <div className="section-eyebrow reveal"><div className="eyebrow-line"></div><span className="eyebrow-text">Pet Parents Love Us</span></div>
        <h2 className="section-h2 reveal" style={{ marginBottom: 0 }}>Real <em>stories,</em> real care</h2>
        <div className="testi-grid">
          <div className="testi-card reveal reveal-d1">
            <div className="testi-pet-img"><img src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop&q=80" alt="Bruno" /></div>
            <div className="testi-stars">★★★★★</div>
            <div className="testi-text">&quot;VetEra completely changed how I manage Bruno&apos;s health. The dashboard is so intuitive — I can track everything from one place. Booking a vet has never been this easy!&quot;</div>
            <div className="testi-author"><div className="testi-avatar-text">👩</div><div><div className="testi-name">Priya Sharma</div><div className="testi-pet-label">Parent of Bruno 🐕</div></div></div>
          </div>
          <div className="testi-card reveal reveal-d2">
            <div className="testi-pet-img"><img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop&q=80" alt="Whiskers" /></div>
            <div className="testi-stars">★★★★★</div>
            <div className="testi-text">&quot;The emergency feature saved Whiskers when she needed immediate care at 2 AM. Found a vet, booked, and got help within 15 minutes. Absolutely life-saving app.&quot;</div>
            <div className="testi-author"><div className="testi-avatar-text">👨</div><div><div className="testi-name">Rahul Mehta</div><div className="testi-pet-label">Parent of Whiskers 🐈</div></div></div>
          </div>
          <div className="testi-card reveal reveal-d3">
            <div className="testi-pet-img"><img src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=200&h=200&fit=crop&q=80" alt="Coco" /></div>
            <div className="testi-stars">★★★★★</div>
            <div className="testi-text">&quot;The pet health monitoring is incredible. Coco&apos;s vet can access her records during appointments and the health trend charts give me total peace of mind.&quot;</div>
            <div className="testi-author"><div className="testi-avatar-text">👩</div><div><div className="testi-name">Ananya Gupta</div><div className="testi-pet-label">Parent of Coco 🐇</div></div></div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           CTA
      ══════════════════════════════════════ */}
      <section className="cta-section">
        <div className="cta-inner reveal">
          <div className="cta-text">
            <h2 className="cta-title">Ready to give your pet<br/>the care they <em>deserve?</em></h2>
            <p className="cta-sub">Join 50,000+ pet parents already using VetEra. Free to get started — no credit card needed.</p>
            <div className="cta-btns-row">
              <Link href="/login" className="btn-gold">🐾 Get Started Free</Link>
              <Link href="/about" className="btn-white-outline">Learn More →</Link>
            </div>
          </div>
          <div className="cta-pets">
            <div className="cta-pet-card"><img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=300&fit=crop&q=80" alt="dog" /></div>
            <div className="cta-pet-card"><img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=300&fit=crop&q=80" alt="cat" /></div>
            <div className="cta-pet-card"><img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&h=300&fit=crop&q=80" alt="dogs" /></div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           FOOTER
      ══════════════════════════════════════ */}
      <footer>
        <div className="footer-logo">🐾 VetEra</div>
        <div className="footer-links">
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/support">Support</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/careers">Careers</Link>
        </div>
        <div className="footer-copy">© 2026 VetEra. Made with ❤️ for pets.</div>
      </footer>
    </div>
  );
};

export default HomePage;
