import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Heart, 
  Shield, 
  Car, 
  ArrowRight, 
  Check,
  ChevronRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
}

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const services: Service[] = [
    {
      id: 1,
      title: 'Créditos Hipotecarios',
      description: 'Financiamiento para adquirir tu casa o departamento con las mejores tasas del mercado.',
      features: [
        'Hasta 90% de financiamiento',
        'Plazos de 5 a 30 años',
        'Aprobación en 72 horas',
        'Sin comisiones ocultas',
      ],
      icon: <Home className="w-8 h-8" />,
      color: 'from-brand-primary to-brand-secondary',
    },
    {
      id: 2,
      title: 'Seguros de Vida',
      description: 'Protege el futuro de tu familia con coberturas adaptadas a tus necesidades.',
      features: [
        'Cobertura por fallecimiento',
        'Invalidez y enfermedades',
        'Ahorro e inversión',
        'Beneficios fiscales',
      ],
      icon: <Heart className="w-8 h-8" />,
      color: 'from-rose-500 to-pink-500',
    },
    {
      id: 3,
      title: 'Seguros de Hogar',
      description: 'Protección integral para tu propiedad contra todo tipo de riesgos.',
      features: [
        'Daños por desastres naturales',
        'Cobertura contra robo',
        'Responsabilidad civil',
        'Asistencia 24/7',
      ],
      icon: <Shield className="w-8 h-8" />,
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 4,
      title: 'Seguros de Autos',
      description: 'Protección completa para tu vehículo con las mejores coberturas del mercado.',
      features: [
        'Cobertura contra accidentes',
        'Daños a terceros',
        'Robo y hurto',
        'Asistencia en carretera 24/7',
      ],
      icon: <Car className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { rotateY: -30, opacity: 0, x: 100 },
          {
            rotateY: 0,
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-brand-light/30 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-[5%] w-64 h-64 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-[5%] w-80 h-80 rounded-full bg-brand-secondary/5 blur-3xl" />
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-brand-secondary uppercase tracking-wider mb-4">
            Nuestros Servicios
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-dark mb-6">
            Soluciones Integrales Para Tu{' '}
            <span className="text-gradient">Bienestar</span>
          </h2>
          <p className="text-lg text-brand-body">
            Te ofrecemos un portafolio completo de servicios financieros y de protección, 
            diseñados para cubrir todas tus necesidades.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ perspective: '1000px' }}
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card group relative"
              onMouseEnter={() => setActiveCard(service.id)}
              onMouseLeave={() => setActiveCard(null)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className={`relative bg-white rounded-3xl p-6 h-full transition-all duration-500 ${
                  activeCard === service.id
                    ? 'shadow-brand-lg -translate-y-2'
                    : 'shadow-soft hover:shadow-brand'
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 text-white shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                >
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="font-heading font-bold text-xl text-brand-dark mb-3">
                  {service.title}
                </h3>
                <p className="text-brand-body text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-brand-primary" />
                      </div>
                      <span className="text-sm text-brand-body">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant="ghost"
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full justify-between text-brand-primary hover:text-white hover:bg-brand-primary group/btn transition-all duration-300"
                >
                  <span className="font-medium">Más información</span>
                  <ChevronRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                </Button>

                {/* Hover gradient overlay */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-brand-body mb-4">
            ¿No sabes qué servicio necesitas? Te ayudamos a elegir.
          </p>
          <Button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-brand-primary hover:bg-brand-secondary text-white px-8 py-6 rounded-full font-semibold transition-all duration-300 hover:shadow-brand hover:scale-105 flex items-center gap-2 group inline-flex"
          >
            Agendar Asesoría Gratuita
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
