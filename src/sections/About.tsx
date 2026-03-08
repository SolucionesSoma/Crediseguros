import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Clock, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
}

const AnimatedStat = ({ value, label, icon, suffix = '' }: StatProps) => {
  const [count, setCount] = useState(0);
  const statRef = useRef<HTMLDivElement>(null);
  const numericValue = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: statRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(
            { val: 0 },
            {
              val: numericValue,
              duration: 2.5,
              ease: 'power3.out',
              onUpdate: function () {
                setCount(Math.floor(this.targets()[0].val));
              },
            }
          );
        },
      });
    }, statRef);

    return () => ctx.revert();
  }, [numericValue]);

  return (
    <div
      ref={statRef}
      className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-brand transition-all duration-300 hover:-translate-y-1 group"
    >
      <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <p className="text-3xl font-bold text-brand-primary mb-1">
        {value.includes('+') && '+'}{count}{suffix}
      </p>
      <p className="text-sm text-brand-body">{label}</p>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      const contentElements = contentRef.current?.querySelectorAll('.animate-item');
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );
      }

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0, rotateY: 15 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );

      // Stats animation
      const statCards = statsRef.current?.querySelectorAll('.stat-card');
      if (statCards) {
        gsap.fromTo(
          statCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Parallax effect
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(imageRef.current, { y: (progress - 0.5) * 50 });
          gsap.set(contentRef.current, { y: (progress - 0.5) * 30 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '+5000', label: 'Créditos aprobados', icon: <TrendingUp className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors" /> },
    { value: '98', label: 'Clientes satisfechos', icon: <Users className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors" />, suffix: '%' },
    { value: '15', label: 'Años de experiencia', icon: <Clock className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors" /> },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-light/30 -skew-x-12 translate-x-1/4" />

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="relative z-10">
            <span className="animate-item inline-block text-sm font-semibold text-brand-secondary uppercase tracking-wider mb-4">
              Sobre Nosotros
            </span>

            <h2 className="animate-item font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-dark mb-6 leading-tight">
              15 Años Protegiendo{' '}
              <span className="text-gradient">Tu Patrimonio</span>
            </h2>

            <p className="animate-item text-lg text-brand-body mb-6 leading-relaxed">
              En CrediSeguros entendemos que tu hogar es más que una propiedad: es el lugar 
              donde construyes tus sueños. Por eso ofrecemos soluciones financieras y de 
              protección diseñadas a tu medida.
            </p>

            <p className="animate-item text-brand-body mb-8 leading-relaxed">
              Nuestro equipo de expertos te acompaña en cada paso del proceso, desde la 
              solicitud de tu crédito hasta la protección integral de tu inversión. 
              Trabajamos con los principales bancos y aseguradoras para ofrecerte las 
              mejores opciones del mercado.
            </p>

            {/* Features */}
            <div className="animate-item grid sm:grid-cols-2 gap-4 mb-8">
              {[
                'Asesoría personalizada',
                'Proceso 100% transparente',
                'Respuesta en 24-72 horas',
                'Cobertura nacional',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-brand-dark">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="animate-item bg-brand-primary hover:bg-brand-secondary text-white px-8 py-6 rounded-full font-semibold transition-all duration-300 hover:shadow-brand hover:scale-105 flex items-center gap-2 group"
            >
              Conoce Nuestra Historia
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative" style={{ perspective: '1000px' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-brand-lg">
              <img
                src="/about-consultation.jpg"
                alt="Consulta profesional en CrediSeguros"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-soft-lg p-6 max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-brand-primary/20 border-2 border-white flex items-center justify-center"
                    >
                      <Users className="w-4 h-4 text-brand-primary" />
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm font-semibold text-brand-dark">+50 Expertos</p>
              <p className="text-xs text-brand-body">Listos para ayudarte</p>
            </div>

            {/* Experience badge */}
            <div className="absolute -top-6 -right-6 bg-brand-primary rounded-2xl shadow-brand-lg p-4 text-white">
              <p className="text-3xl font-bold">15+</p>
              <p className="text-xs opacity-90">Años de<br/>experiencia</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid sm:grid-cols-3 gap-6 mt-16 lg:mt-24"
        >
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <AnimatedStat
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                suffix={stat.suffix}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
