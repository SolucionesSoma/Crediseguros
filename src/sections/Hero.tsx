import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Home, Shield, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      const headlineLines = headlineRef.current?.querySelectorAll('.headline-line');
      if (headlineLines) {
        gsap.fromTo(
          headlineLines,
          { y: 60, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      // Subheadline animation
      gsap.fromTo(
        subheadlineRef.current,
        { opacity: 0, filter: 'blur(10px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.9,
        }
      );

      // CTA buttons animation
      const ctaButtons = ctaRef.current?.querySelectorAll('button');
      if (ctaButtons) {
        gsap.fromTo(
          ctaButtons,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 1.1,
          }
        );
      }

      // Hero image animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)', scale: 1.1 },
        {
          clipPath: 'circle(100% at 50% 50%)',
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.4,
        }
      );

      // Stats pills animation
      const statPills = statsRef.current?.querySelectorAll('.stat-pill');
      if (statPills) {
        gsap.fromTo(
          statPills,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 1.3,
          }
        );
      }

      // Floating elements animation
      const floatingElements = floatingRef.current?.querySelectorAll('.floating-element');
      if (floatingElements) {
        floatingElements.forEach((el, i) => {
          gsap.to(el, {
            y: `${Math.sin(i) * 15}`,
            duration: 3 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }

      // Scroll parallax effects
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(headlineRef.current, { y: -progress * 100 });
          gsap.set(subheadlineRef.current, { y: -progress * 50 });
          gsap.set(imageRef.current, { y: -progress * 80, scale: 1 + progress * 0.1 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-brand-light via-white to-brand-light/50"
    >
      {/* Floating decorative elements */}
      <div ref={floatingRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-element absolute top-20 left-[10%] w-20 h-20 rounded-full bg-brand-primary/10" />
        <div className="floating-element absolute top-40 right-[15%] w-16 h-16 rounded-full bg-brand-secondary/10" />
        <div className="floating-element absolute bottom-40 left-[20%] w-24 h-24 rounded-full bg-brand-accent/10" />
        <div className="floating-element absolute top-1/3 right-[8%] w-12 h-12 rounded-full bg-brand-primary/5" />
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-28 pb-16 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          {/* Content */}
          <div className="order-2 lg:order-1 relative z-10">
            <div ref={headlineRef} className="mb-6">
              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-dark leading-tight">
                <span className="headline-line block">Tu Hogar</span>
                <span className="headline-line block text-gradient">Tu Seguridad</span>
                <span className="headline-line block">Nuestro Compromiso</span>
              </h1>
            </div>

            <p
              ref={subheadlineRef}
              className="text-lg text-brand-body max-w-xl mb-8 leading-relaxed"
            >
              Créditos inmobiliarios y seguros diseñados para proteger lo que más valoras. 
              Más de 15 años acompañando familias en la realización de sus sueños.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 mb-10">
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-brand-primary hover:bg-brand-secondary text-white px-8 py-6 rounded-full font-semibold text-base transition-all duration-300 hover:shadow-brand-lg hover:scale-105 flex items-center gap-2 group"
              >
                Solicitar Crédito
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={() => scrollToSection('#services')}
                variant="outline"
                className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-6 rounded-full font-semibold text-base transition-all duration-300"
              >
                Conocer Seguros
              </Button>
            </div>

            {/* Trust indicators */}
            <div ref={statsRef} className="flex flex-wrap gap-3">
              <div className="stat-pill flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-soft">
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                  <Home className="w-4 h-4 text-brand-primary" />
                </div>
                <span className="text-sm font-medium text-brand-dark">+5,000 familias</span>
              </div>
              <div className="stat-pill flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-soft">
                <div className="w-8 h-8 rounded-full bg-brand-secondary/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-brand-secondary" />
                </div>
                <span className="text-sm font-medium text-brand-dark">15 años de experiencia</span>
              </div>
              <div className="stat-pill flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-soft">
                <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-brand-accent" />
                </div>
                <span className="text-sm font-medium text-brand-dark">98% satisfacción</span>
              </div>
            </div>

            {/* Features list */}
            <div className="mt-10 grid sm:grid-cols-2 gap-3">
              {[
                'Aprobación en 72 horas',
                'Tasas competitivas',
                'Asesoría personalizada',
                'Sin comisiones ocultas',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-brand-body">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 relative">
            <div
              ref={imageRef}
              className="relative rounded-3xl overflow-hidden shadow-brand-lg"
            >
              <img
                src="/hero-family.jpg"
                alt="Familia feliz en su nuevo hogar"
                className="w-full h-[400px] lg:h-[550px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-soft-lg p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-dark">Crédito Aprobado</p>
                  <p className="text-xs text-brand-body">En menos de 72 horas</p>
                </div>
              </div>
            </div>

            {/* Stats card */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-soft-lg p-4 animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-center">
                <p className="text-2xl font-bold text-brand-primary">+5,000</p>
                <p className="text-xs text-brand-body">Familias felices</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
