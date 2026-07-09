/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./home.css";

const FeatureCard = ({ icon, title, desc }) => (
  <div className="feature-card">
    <div className="feature-card-icon" aria-hidden="true">{icon}</div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

const Home = () => {
  const featuresRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = featuresRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <main className="home-root">
      <section className="hero-section" aria-label="Hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-gradient" />
          <div className="hero-particles" aria-hidden="true">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${6 + Math.random() * 6}s`,
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-badge" aria-hidden="true">
            <span className="hero-badge-dot" />
            Twitch API Explorer
          </div>

          <h1 className="hero-title">
            Stream
            <span className="hero-title-accent">Vault</span>
          </h1>

          <p className="hero-subtitle">
            Discover the best streams and categories Twitch has to offer.
            Your gateway to endless entertainment.
          </p>

          <div className="hero-actions">
            <Link to="/browse" className="hero-btn hero-btn-primary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explore Categories
            </Link>
            <Link to="/browse" className="hero-btn hero-btn-secondary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Live Streams
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section" ref={featuresRef} aria-label="Features">
        <h2 className="features-title">
          Everything you need to explore <span className="text-gradient">Twitch</span>
        </h2>
        <p className="features-subtitle">
          Dive into the world of live streaming with powerful discovery tools
        </p>

        <div className="features-grid">
          <FeatureCard
            icon={
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
            title="Top Categories"
            desc="Browse the most popular gaming categories on Twitch. From Action to RPG, find exactly what you're looking for."
          />
          <FeatureCard
            icon={
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            }
            title="Live Streams"
            desc="See who's live right now. Discover new streamers and watch the best content being created in real-time."
          />
          <FeatureCard
            icon={
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
            title="Smart Search"
            desc="Find any category instantly with our powerful search. Just type and discover new gaming communities."
          />
          <FeatureCard
            icon={
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title="Instant Access"
            desc="One click takes you directly to the content you love on Twitch. Fast, seamless, and hassle-free."
          />
        </div>

        <div className="features-cta">
          <Link to="/browse" className="hero-btn hero-btn-primary">
            Start Exploring
          </Link>
        </div>
      </section>

      <footer className="home-footer" role="contentinfo">
        <p className="text-gray-600 text-sm">
          StreamVault &copy; {new Date().getFullYear()} &mdash; Built with the Twitch API
        </p>
        <p className="text-gray-500 text-xs mt-2">
          Developed by{' '}
          <a
            href="https://narvaez-portfolio.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-twitch hover:text-twitch-light underline underline-offset-2 transition-colors"
          >
            Cristian Narvaez
          </a>
        </p>
        <p className="text-gray-700 text-xs mt-1">
          Not affiliated with Twitch or Amazon
        </p>
      </footer>
    </main>
  );
};

export default Home;
