import { Zap, Palette, Image, Layers, Frame, Pen, ArrowRight, Sparkles, Star, Heart } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface RetroServicesPageProps {
  heroTitle?: string;
  heroSubtitle?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  services?: Service[];
  testimonials?: Testimonial[];
  processSteps?: ProcessStep[];
  ctaSectionTitle?: string;
  ctaSectionSubtitle?: string;
  finalCtaText?: string;
}

export function RetroServicesPage({
  heroTitle = "Retro Dreams, Rendered Real",
  heroSubtitle = "Nostalgia meets innovation in every piece. From pixel art to physical prints, I bring the aesthetic of yesterday into the world of tomorrow.",
  primaryCtaText = "Commission a Piece",
  secondaryCtaText = "View Portfolio",
  services = [
    {
      icon: <Image className="w-8 h-8" />,
      title: "Digital Illustrations",
      description: "Custom artwork that captures the essence of 80s and 90s visual culture with modern polish."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Pixel Art",
      description: "Meticulously crafted pixel graphics for games, NFTs, and nostalgic branding."
    },
    {
      icon: <Frame className="w-8 h-8" />,
      title: "Limited Prints",
      description: "Museum-quality physical prints of retro-inspired originals. Each piece numbered and signed."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Album & Cover Art",
      description: "Bold visuals for musicians who want their sound to look as good as it sounds."
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "NFT Collections",
      description: "Blockchain-ready art collections with authentic retro aesthetics and smart contract integration."
    },
    {
      icon: <Pen className="w-8 h-8" />,
      title: "Custom Commissions",
      description: "Bespoke pieces tailored to your vision. Portraits, landscapes, abstract — you dream it, I create it."
    }
  ],
  testimonials = [
    {
      quote: "This artist captured my album's vibe perfectly. The retro aesthetic elevated my entire brand. People buy the vinyl just for the cover art.",
      author: "Kai Martinez",
      company: "Synthwave Producer"
    },
    {
      quote: "I commissioned a portrait of my dog in 16-bit style. It's hanging in my living room and every guest asks about it. Pure magic.",
      author: "Emma Thompson",
      company: "Art Collector"
    },
    {
      quote: "Our NFT collection sold out in 4 hours. The pixel art was so detailed and nostalgic, collectors went wild. Best decision we made.",
      author: "Devon Lee",
      company: "Web3 Founder"
    },
    {
      quote: "I've been following this artist for years. Finally got a limited print and the quality blew me away. Retro never looked so good.",
      author: "Alex Rivera",
      company: "Design Enthusiast"
    }
  ],
  processSteps = [
    {
      number: "01",
      title: "Consultation",
      description: "We discuss your vision, references, and the vibe you're going for."
    },
    {
      number: "02",
      title: "Sketch & Concept",
      description: "I create initial concepts and mood boards for your approval."
    },
    {
      number: "03",
      title: "Creation",
      description: "The magic happens. Digital or physical, every detail is crafted with care."
    },
    {
      number: "04",
      title: "Delivery",
      description: "High-res files delivered instantly, or prints shipped worldwide with tracking."
    }
  ],
  ctaSectionTitle = "Ready to Own a Piece?",
  ctaSectionSubtitle = "Let's create something that takes you back — and moves you forward.",
  finalCtaText = "Start Your Commission"
}: RetroServicesPageProps) {
  return (
    <div className="min-h-screen bg-base text-foreground overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 retro-grain opacity-30 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-0 gradient-bg-retro opacity-20" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-accent opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <Star className="absolute top-20 left-10 w-6 h-6 text-accent opacity-30 animate-spin" style={{ animationDuration: '20s' }} />
          <Star className="absolute top-40 right-20 w-4 h-4 text-accent opacity-40 animate-spin" style={{ animationDuration: '15s' }} />
          <Star className="absolute bottom-32 left-1/4 w-5 h-5 text-accent opacity-20 animate-spin" style={{ animationDuration: '25s' }} />
          <Heart className="absolute top-1/3 right-10 w-5 h-5 text-accent opacity-20 animate-pulse" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight gradient-text-retro animate-text-shimmer">
              {heroTitle}
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 hover:text-foreground transition-colors" style={{ animationDelay: '200ms' }}>
            {heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: '400ms' }}>
            <button className="group relative px-8 py-4 bg-accent text-base rounded-lg font-semibold transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-accent/50 hover:rotate-1">
              <span className="relative z-10 flex items-center gap-2">
                {primaryCtaText}
                <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
              </span>
              <div className="absolute inset-0 rounded-lg bg-accent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50" />
            </button>
            <button className="group px-8 py-4 text-accent border-2 border-accent rounded-lg font-semibold transition-all duration-500 hover:bg-accent hover:text-base hover:scale-110 hover:-rotate-1">
              {secondaryCtaText}
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent rounded-full flex items-start justify-center p-2 hover:scale-110 transition-transform cursor-pointer">
            <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Sparkles className="absolute top-10 right-1/4 w-8 h-8 text-accent opacity-10 animate-pulse" />
          <Sparkles className="absolute bottom-20 left-1/3 w-6 h-6 text-accent opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-retro animate-in fade-in zoom-in duration-1000 hover:scale-105 transition-transform">
              What I Create
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 hover:text-foreground transition-colors" style={{ animationDelay: '100ms' }}>
              Art that transcends time and medium
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-card border border-border rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:-rotate-1 hover:shadow-2xl hover:shadow-accent/20 hover:border-accent animate-in fade-in slide-in-from-bottom-6"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent animate-scanline" />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-base group-hover:scale-110 group-hover:rotate-12">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground transition-all duration-300 group-hover:text-accent">
                    {service.title}
                  </h3>
                  <p className="text-muted leading-relaxed transition-all duration-300 group-hover:text-foreground">
                    {service.description}
                  </p>
                </div>

                <div className="absolute top-0 right-0 w-20 h-20 gradient-border-retro rounded-bl-full opacity-0 group-hover:opacity-30 transition-all duration-500 group-hover:rotate-45" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-accent/5 rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 bg-muted/30">
        <div className="absolute inset-0 retro-grain opacity-20 animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Heart className="absolute top-1/4 left-10 w-6 h-6 text-accent opacity-10 animate-pulse" />
          <Heart className="absolute bottom-1/3 right-20 w-5 h-5 text-accent opacity-10 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <Star className="absolute top-1/3 right-1/4 w-4 h-4 text-accent opacity-10 animate-spin" style={{ animationDuration: '30s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-retro animate-in fade-in zoom-in duration-1000 hover:scale-105 transition-transform">
              Collector Stories
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 hover:text-foreground transition-colors" style={{ animationDelay: '100ms' }}>
              What people are saying about the work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-card border border-border rounded-2xl p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-xl hover:border-accent hover:rotate-1 animate-in fade-in slide-in-from-bottom-6"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative z-10 space-y-6">
                  <div className="text-6xl text-accent opacity-20 font-serif leading-none transition-all duration-500 group-hover:scale-110 group-hover:opacity-40">
                    "
                  </div>
                  <p className="text-lg text-foreground leading-relaxed -mt-8 transition-all duration-300 group-hover:text-accent">
                    {testimonial.quote}
                  </p>
                  <div className="pt-4 border-t border-border transition-colors duration-300 group-hover:border-accent">
                    <p className="font-semibold text-foreground transition-colors duration-300 group-hover:text-accent">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted transition-colors duration-300 group-hover:text-foreground">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-accent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10" />
                <Sparkles className="absolute top-4 right-4 w-5 h-5 text-accent opacity-0 transition-all duration-500 group-hover:opacity-30 group-hover:rotate-180" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 border border-accent/10 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-20 right-20 w-40 h-40 border border-accent/10 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-retro animate-in fade-in zoom-in duration-1000 hover:scale-105 transition-transform">
              The Creative Process
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 hover:text-foreground transition-colors" style={{ animationDelay: '100ms' }}>
              From concept to masterpiece, step by step
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-accent via-accent to-transparent opacity-20 hidden md:block animate-pulse" />

            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-8 animate-in fade-in slide-in-from-${index % 2 === 0 ? 'left' : 'right'}-8`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {index % 2 === 0 && (
                    <>
                      <div className="flex-1 text-center md:text-right space-y-2 group">
                        <h3 className="text-2xl font-bold text-foreground transition-all duration-300 group-hover:text-accent group-hover:scale-105">
                          {step.title}
                        </h3>
                        <p className="text-muted leading-relaxed transition-colors duration-300 group-hover:text-foreground">
                          {step.description}
                        </p>
                      </div>
                      <div className="relative flex-shrink-0 group">
                        <div className="w-20 h-20 bg-accent/10 border-2 border-accent rounded-full flex items-center justify-center text-2xl font-bold text-accent transition-all duration-500 group-hover:scale-125 group-hover:rotate-180 group-hover:bg-accent group-hover:text-base cursor-pointer">
                          {step.number}
                        </div>
                        <div className="absolute inset-0 bg-accent rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="absolute -inset-4 border-2 border-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
                      </div>
                      <div className="flex-1 hidden md:block" />
                    </>
                  )}

                  {index % 2 !== 0 && (
                    <>
                      <div className="flex-1 hidden md:block" />
                      <div className="relative flex-shrink-0 group">
                        <div className="w-20 h-20 bg-accent/10 border-2 border-accent rounded-full flex items-center justify-center text-2xl font-bold text-accent transition-all duration-500 group-hover:scale-125 group-hover:rotate-180 group-hover:bg-accent group-hover:text-base cursor-pointer">
                          {step.number}
                        </div>
                        <div className="absolute inset-0 bg-accent rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="absolute -inset-4 border-2 border-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
                      </div>
                      <div className="flex-1 text-center md:text-left space-y-2 group">
                        <h3 className="text-2xl font-bold text-foreground transition-all duration-300 group-hover:text-accent group-hover:scale-105">
                          {step.title}
                        </h3>
                        <p className="text-muted leading-relaxed transition-colors duration-300 group-hover:text-foreground">
                          {step.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 gradient-bg-retro opacity-30 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute inset-0 retro-grain opacity-40 animate-pulse" style={{ animationDuration: '5s' }} />

        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/2 right-1/4 w-64 h-64 bg-accent opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 left-1/2 w-48 h-48 bg-accent opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Sparkles className="absolute top-10 left-1/4 w-8 h-8 text-accent opacity-20 animate-pulse" />
          <Sparkles className="absolute bottom-20 right-1/3 w-6 h-6 text-accent opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
          <Star className="absolute top-1/4 right-10 w-6 h-6 text-accent opacity-20 animate-spin" style={{ animationDuration: '20s' }} />
          <Star className="absolute bottom-1/3 left-10 w-5 h-5 text-accent opacity-20 animate-spin" style={{ animationDuration: '25s' }} />
          <Heart className="absolute top-1/2 right-1/4 w-6 h-6 text-accent opacity-20 animate-pulse" />
          <Heart className="absolute bottom-1/4 left-1/3 w-5 h-5 text-accent opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="animate-in fade-in zoom-in duration-1000">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text-retro hover:scale-105 transition-transform duration-500 animate-text-shimmer">
              {ctaSectionTitle}
            </h2>
          </div>
          <p className="text-2xl text-muted animate-in fade-in slide-in-from-bottom-6 duration-1000 hover:text-foreground transition-colors" style={{ animationDelay: '200ms' }}>
            {ctaSectionSubtitle}
          </p>
          <div className="pt-6 animate-in fade-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: '400ms' }}>
            <button className="group relative px-12 py-6 bg-accent text-base rounded-xl font-bold text-xl transition-all duration-500 hover:scale-125 hover:shadow-2xl hover:shadow-accent/50 hover:rotate-3">
              <span className="relative z-10 flex items-center gap-3">
                {finalCtaText}
                <Zap className="w-6 h-6 transition-all duration-500 group-hover:rotate-180 group-hover:scale-125" />
              </span>
              <div className="absolute inset-0 rounded-xl bg-accent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60" />
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 pt-4 animate-in fade-in duration-1000" style={{ animationDelay: '600ms' }}>
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-accent animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    fill: 'currentColor'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
