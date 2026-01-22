import Link from 'next/link'
import './demo.css'

export default function DemoPage() {
  return (
    <div className="demo-page">
      {/* Hero Section */}
      <section className="demo-hero">
        <div className="demo-hero-bg">
          <div className="demo-grid"></div>
          <div className="demo-blob demo-blob-1"></div>
          <div className="demo-blob demo-blob-2"></div>
          <div className="demo-blob demo-blob-3"></div>
        </div>

        <div className="demo-container">
          <div className="demo-hero-content">
            <div className="demo-badge">
              <span>✨ New Release</span>
            </div>

            <h1 className="demo-hero-title">
              Build Beautiful
              <span className="demo-gradient-text"> Websites </span>
              in Minutes
            </h1>

            <p className="demo-hero-subtitle">
              The modern way to create stunning websites. Fast, flexible, and designed for developers who care about design.
            </p>

            <div className="demo-hero-cta">
              <Link href="#features" className="demo-btn-primary">
                Get Started
                <svg className="demo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="#demo" className="demo-btn-secondary">
                View Demo
                <svg className="demo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="demo-stats">
        <div className="demo-container">
          <div className="demo-stats-grid">
            <div className="demo-stat-card">
              <div className="demo-stat-value">10K+</div>
              <div className="demo-stat-label">Active Users</div>
            </div>
            <div className="demo-stat-card">
              <div className="demo-stat-value">99.9%</div>
              <div className="demo-stat-label">Uptime</div>
            </div>
            <div className="demo-stat-card">
              <div className="demo-stat-value">50M+</div>
              <div className="demo-stat-label">API Requests</div>
            </div>
            <div className="demo-stat-card">
              <div className="demo-stat-value">24/7</div>
              <div className="demo-stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="demo-features">
        <div className="demo-container">
          <div className="demo-section-header">
            <div className="demo-badge">
              <span>Features</span>
            </div>
            <h2 className="demo-section-title">Everything you need to succeed</h2>
            <p className="demo-section-subtitle">
              Powerful features designed to help you build better, faster
            </p>
          </div>

          <div className="demo-features-grid">
            <div className="demo-feature-card">
              <div className="demo-feature-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="demo-feature-title">Lightning Fast</h3>
              <p className="demo-feature-description">
                Optimized for performance with cutting-edge technology
              </p>
            </div>

            <div className="demo-feature-card">
              <div className="demo-feature-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="demo-feature-title">Secure by Default</h3>
              <p className="demo-feature-description">
                Enterprise-grade security built into every layer
              </p>
            </div>

            <div className="demo-feature-card">
              <div className="demo-feature-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="demo-feature-title">Fully Responsive</h3>
              <p className="demo-feature-description">
                Perfect on any device, from mobile to desktop
              </p>
            </div>

            <div className="demo-feature-card">
              <div className="demo-feature-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="demo-feature-title">Customizable</h3>
              <p className="demo-feature-description">
                Tailor every aspect to match your brand
              </p>
            </div>

            <div className="demo-feature-card">
              <div className="demo-feature-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="demo-feature-title">Analytics</h3>
              <p className="demo-feature-description">
                Deep insights into your application performance
              </p>
            </div>

            <div className="demo-feature-card">
              <div className="demo-feature-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="demo-feature-title">Team Collaboration</h3>
              <p className="demo-feature-description">
                Work together seamlessly with your team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="demo-cta">
        <div className="demo-cta-bg">
          <div className="demo-blob demo-blob-cta-1"></div>
          <div className="demo-blob demo-blob-cta-2"></div>
        </div>

        <div className="demo-container">
          <div className="demo-cta-content">
            <h2 className="demo-cta-title">
              Ready to get started?
            </h2>
            <p className="demo-cta-subtitle">
              Join thousands of developers building the future
            </p>
            <div className="demo-cta-buttons">
              <Link href="#" className="demo-btn-primary demo-btn-large">
                Start Building
                <svg className="demo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
