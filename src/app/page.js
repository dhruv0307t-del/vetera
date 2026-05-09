"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import "./home.css";

const HomePage = () => {
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

    // Make reveals visible immediately if in viewport
    reveals.forEach(r => {
      const rect = r.getBoundingClientRect();
      if (rect.top < window.innerHeight) r.classList.add('visible');
    });

    // Service card 3D tilt on mouse
    const serviceCards = document.querySelectorAll('.svc-card');
    serviceCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-8px) scale(1.01) perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    // How card subtle tilt
    const howCards = document.querySelectorAll('.how-card');
    howCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-6px) perspective(600px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    // Smooth count animation for stats
    function countUp(el, target, decimals = 0) {
      if (!el) return;
      let start = 0; const dur = 2000; const startTime = performance.now();
      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / dur, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = ease * target;
        el.textContent = decimals ? val.toFixed(decimals) : Math.floor(val).toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }

    const statsBar = document.querySelector('.stats-bar');
    const statsObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        countUp(document.getElementById('c1'), 50);
        countUp(document.getElementById('c2'), 2400);
        countUp(document.getElementById('c3'), 98);
        countUp(document.getElementById('c4'), 340);
        statsObserver.unobserve(statsBar);
      }
    }, { threshold: 0.5 });
    if (statsBar) statsObserver.observe(statsBar);

    return () => {
      io.disconnect();
      if (statsBar) statsObserver.disconnect();
    };
  }, []);

  return (
    <div className="home-body">
      {/* NAV */}
      <nav className="home-nav" style={{ pointerEvents: 'auto' }}>
        <Link href="/" className="home-logo" style={{ position: 'relative', zIndex: 250 }}>
          <div className="home-logo-mark">🐾</div>
          VetEra
        </Link>
        <ul style={{ pointerEvents: 'auto' }}>
          <li><Link href="/" style={{ position: 'relative', zIndex: 250 }}>Home</Link></li>
          <li><Link href="/health-monitoring" style={{ position: 'relative', zIndex: 250 }}>Health Monitoring</Link></li>
          <li><Link href="/appointments" style={{ position: 'relative', zIndex: 250 }}>Appointments</Link></li>
          <li><Link href="/pet-services" style={{ position: 'relative', zIndex: 250 }}>Pet Services</Link></li>
          <li><Link href="/community" style={{ position: 'relative', zIndex: 250 }}>Community</Link></li>
          <li><Link href="/login" className="home-nav-cta" style={{ position: 'relative', zIndex: 250 }}>Get Started</Link></li>
        </ul>
      </nav>

      {/* ══ HERO ══ */}
      <section className="home-hero">
        <div className="hero-bg-paws">
          <span className="bg-paw">🐾</span>
          <span className="bg-paw">🐾</span>
          <span className="bg-paw">🐾</span>
          <span className="bg-paw">🐾</span>
        </div>
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>

        {/* LEFT CONTENT */}
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-paw">🐾</span>
            All-in-One Pet Care Platform
          </div>
          <h1 className="hero-title">
            Welcome to<br />
            <span className="accent-word">VetEra</span>
          </h1>
          <p className="hero-sub">Your all-in-one platform for pet care — book vets, monitor health, find groomers, and connect with a community that loves pets as much as you do.</p>
          <div className="hero-btns">
            <Link href="/appointments" className="btn-primary">📅 Schedule Appointment</Link>
            <Link href="/login" className="btn-outline">View Appointments →</Link>
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
        </div>

        {/* RIGHT — 3D PHOTO SCENE */}
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
            <div className="fc-text">
              <strong>Vaccinated</strong>
              <span>All shots up to date</span>
            </div>
          </div>

          <div className="float-chip chip-2">
            <span className="fc-icon">🏥</span>
            <div className="fc-text">
              <strong>Next Appt</strong>
              <span>May 15 · 10:00 AM</span>
            </div>
          </div>

          <div className="float-chip chip-3">
            <span className="fc-icon">❤️</span>
            <div className="fc-text">
              <strong>72 bpm</strong>
              <span>Heart rate · Normal</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
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

      {/* ══ SERVICES ══ */}
      <section className="home-services">
        <div className="services-header">
          <div>
            <div className="section-eyebrow reveal">
              <div className="eyebrow-line"></div>
              <span className="eyebrow-text">Everything Your Pet Needs</span>
            </div>
            <h2 className="section-h2 reveal">Our <em>Services</em></h2>
            <p className="section-p reveal">VetEra brings all pet care services under one roof — accessible anytime, anywhere.</p>
          </div>
          <Link href="/pet-services" style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--navy)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", opacity: "0.7" }}>View all services →</Link>
        </div>

        <div className="services-grid">
          <div className="svc-card reveal reveal-d1" style={{ minHeight: "440px" }}>
            <img className="svc-card-img" src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&h=800&fit=crop&q=80" alt="health monitoring" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="svc-card-overlay"></div>
            <div className="svc-card-content">
              <div className="svc-icon-circle">🩺</div>
              <div className="svc-card-title">Health Monitoring</div>
              <div className="svc-card-desc">Track vitals, health records and wellness trends for your pet with AI insights.</div>
              <Link href="/health-monitoring" className="svc-card-link" style={{ position: 'relative', zIndex: 10 }}>Explore →</Link>
            </div>
          </div>

          <div className="svc-card reveal reveal-d2" style={{ minHeight: "440px" }}>
            <img className="svc-card-img" src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&h=700&fit=crop&q=80" alt="pet services" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="svc-card-overlay"></div>
            <div className="svc-card-content">
              <span className="svc-badge-pill new">NEW</span>
              <div className="svc-icon-circle">🐾</div>
              <div className="svc-card-title">Pet Services</div>
              <div className="svc-card-desc">Book appointments, grooming studios & shop premium products.</div>
              <Link href="/pet-services" className="svc-card-link" style={{ position: 'relative', zIndex: 10 }}>Explore →</Link>
            </div>
          </div>

          <div className="svc-card reveal reveal-d3" style={{ minHeight: "440px" }}>
            <img className="svc-card-img" src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500&h=700&fit=crop&q=80" alt="community" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="svc-card-overlay"></div>
            <div className="svc-card-content">
              <div className="svc-icon-circle">🐕</div>
              <div className="svc-card-title">Community</div>
              <div className="svc-card-desc">Adopt, buy & sell pets, share photos, and chat with pet lovers.</div>
              <Link href="/community" className="svc-card-link" style={{ position: 'relative', zIndex: 10 }}>Explore →</Link>
            </div>
          </div>

          <div className="svc-card reveal reveal-d4" style={{ minHeight: "440px" }}>
            <img className="svc-card-img" src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&h=700&fit=crop&q=80" alt="emergency" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="svc-card-overlay"></div>
            <div className="svc-card-content">
              <div className="svc-icon-circle">🚑</div>
              <div className="svc-card-title">Emergency</div>
              <div className="svc-card-desc">Instant access to emergency vet help & accident reporting — 24/7.</div>
              <Link href="/emergency" className="svc-card-link" style={{ position: 'relative', zIndex: 10 }}>Explore →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="how-section">
        <span className="paw-trail pt-1">🐾</span>
        <span className="paw-trail pt-2">🐾</span>
        <span className="paw-trail pt-3">🐾</span>
        <span className="paw-trail pt-4">🐾</span>
        <span className="paw-trail pt-5">🐾</span>
        <span className="paw-trail pt-6">🐾</span>

        <div className="section-eyebrow reveal">
          <div className="eyebrow-line"></div>
          <span className="eyebrow-text">Simple & Fast</span>
        </div>
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

      {/* ══ FEATURE / WHY VETERA ══ */}
      <section className="feature-section">
        <div className="feature-grid">
          <div className="pet-collage reveal-left">
            <div className="collage-main">
              <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=620&fit=crop&q=80" alt="dog" />
            </div>
            <div className="collage-second">
              <img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=480&fit=crop&q=80" alt="cat" />
            </div>
            <div className="collage-third">
              <img src="https://images.unsplash.com/photo-1520885708668-55f83e2fe37a?w=300&h=380&fit=crop&q=80" alt="golden" />
            </div>
            <div className="collage-chip cc-1">
              <span className="cc-icon">⭐</span>
              <div className="cc-text">
                <strong>4.9 / 5 Rating</strong>
                <span>Avg vet satisfaction</span>
              </div>
            </div>
            <div className="collage-chip cc-2">
              <span className="cc-icon">🛡️</span>
              <div className="cc-text">
                <strong>100% Verified</strong>
                <span>All vets licensed & checked</span>
              </div>
            </div>
          </div>

          <div className="reveal-right">
            <div className="section-eyebrow" style={{ marginBottom: "16px" }}>
              <div className="eyebrow-line"></div>
              <span className="eyebrow-text">Why VetEra</span>
            </div>
            <h2 className="section-h2">Your pet&apos;s health,<br /><em>always in reach</em></h2>
            <p className="section-p">From real-time health monitoring to instant vet booking, VetEra puts everything your pet needs right in the palm of your hand.</p>

            <div className="feature-items">
              <div className="feature-item">
                <div className="fi-icon">🩺</div>
                <div>
                  <div className="fi-title">Verified Professionals Only</div>
                  <div className="fi-desc">Every vet on VetEra is licensed, background-verified, and rated by real pet parents.</div>
                </div>
              </div>
              <div className="feature-item">
                <div className="fi-icon">⚡</div>
                <div>
                  <div className="fi-title">Instant Booking & Confirmation</div>
                  <div className="fi-desc">Book a vet, groomer, or specialist in under 60 seconds. Get instant SMS & email confirmation.</div>
                </div>
              </div>
              <div className="feature-item">
                <div className="fi-icon">📊</div>
                <div>
                  <div className="fi-title">AI-Powered Health Insights</div>
                  <div className="fi-desc">Smart health tracking with trend analysis and personalized care recommendations.</div>
                </div>
              </div>
              <div className="feature-item">
                <div className="fi-icon">🚨</div>
                <div>
                  <div className="fi-title">24/7 Emergency Response</div>
                  <div className="fi-desc">Round-the-clock emergency vet access. Report accidents and get help within minutes.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="testi-section">
        <div className="section-eyebrow reveal">
          <div className="eyebrow-line"></div>
          <span className="eyebrow-text">Pet Parents Love Us</span>
        </div>
        <h2 className="section-h2 reveal" style={{ marginBottom: 0 }}>Real <em>stories,</em> real care</h2>

        <div className="testi-grid">
          <div className="testi-card reveal reveal-d1">
            <div className="testi-pet-img">
              <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop&q=80" alt="Bruno" />
            </div>
            <div className="testi-stars">★★★★★</div>
            <div className="testi-text">&quot;VetEra completely changed how I manage Bruno&apos;s health. The dashboard is so intuitive — I can track everything from one place. Booking a vet has never been this easy!&quot;</div>
            <div className="testi-author">
              <div className="testi-avatar-text">👩</div>
              <div>
                <div className="testi-name">Priya Sharma</div>
                <div className="testi-pet">Parent of Bruno 🐕</div>
              </div>
            </div>
          </div>
          <div className="testi-card reveal reveal-d2">
            <div className="testi-pet-img">
              <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop&q=80" alt="Whiskers" />
            </div>
            <div className="testi-stars">★★★★★</div>
            <div className="testi-text">&quot;The emergency feature saved Whiskers when she needed immediate care at 2 AM. Found a vet, booked, and got help within 15 minutes. Absolutely life-saving app.&quot;</div>
            <div className="testi-author">
              <div className="testi-avatar-text">👨</div>
              <div>
                <div className="testi-name">Rahul Mehta</div>
                <div className="testi-pet">Parent of Whiskers 🐈</div>
              </div>
            </div>
          </div>
          <div className="testi-card reveal reveal-d3">
            <div className="testi-pet-img">
              <img src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=200&h=200&fit=crop&q=80" alt="Coco" />
            </div>
            <div className="testi-stars">★★★★★</div>
            <div className="testi-text">&quot;The pet health monitoring is incredible. Coco&apos;s vet can access her records during appointments and the health trend charts give me total peace of mind.&quot;</div>
            <div className="testi-author">
              <div className="testi-avatar-text">👩</div>
              <div>
                <div className="testi-name">Ananya Gupta</div>
                <div className="testi-pet">Parent of Coco 🐇</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="cta-section">
        <div className="cta-inner reveal">
          <div className="cta-text">
            <h2 className="cta-title">Ready to give your pet<br />the care they <em>deserve?</em></h2>
            <p className="cta-sub">Join 50,000+ pet parents already using VetEra. Free to get started — no credit card needed.</p>
            <div className="cta-btns-row">
              <Link href="/login" className="btn-gold">🐾 Get Started Free</Link>
              <Link href="/about" className="btn-white-outline">Learn More →</Link>
            </div>
          </div>
          <div className="cta-pets">
            <div className="cta-pet-card">
              <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=300&fit=crop&q=80" alt="dog" />
            </div>
            <div className="cta-pet-card">
              <img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=300&fit=crop&q=80" alt="cat" />
            </div>
            <div className="cta-pet-card">
              <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&h=300&fit=crop&q=80" alt="dogs" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="home-footer">
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
