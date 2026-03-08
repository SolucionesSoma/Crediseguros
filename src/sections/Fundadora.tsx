import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, GraduationCap, Briefcase, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Fundadora = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
        { x: 100, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );

      // Parallax effect
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(imageRef.current, { y: (progress - 0.5) * 40 });
          gsap.set(contentRef.current, { y: (progress - 0.5) * 20 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const credentials = [
    {
      icon: <GraduationCap className="w-5 h-5" />,
      text: 'Administradora de Empresas',
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      text: 'Técnica Contable',
    },
    {
      icon: <Award className="w-5 h-5" />,
      text: '15+ años de experiencia',
    },
    {
      icon: <Star className="w-5 h-5" />,
      text: 'Líder en el sector',
    },
  ];

  return (
    <section
      id="fundadora"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-brand-light/30 -skew-x-12 -translate-x-1/4" />

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="relative z-10 order-2 lg:order-1">
            <span className="animate-item inline-block text-sm font-semibold text-brand-secondary uppercase tracking-wider mb-4">
              Nuestra Fundadora
            </span>

            <h2 className="animate-item font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-dark mb-6 leading-tight">
              Gloria <span className="text-gradient">Duarte</span>
            </h2>

            <p className="animate-item text-lg text-brand-body mb-6 leading-relaxed">
              Con una sólida formación académica y más de 15 años de experiencia en el sector 
              financiero y de seguros, Gloria fundó CrediSeguros con la visión de ofrecer 
              servicios accesibles, transparentes y personalizados para cada familia.
            </p>

            <p className="animate-item text-brand-body mb-8 leading-relaxed">
              Su compromiso con la excelencia y la atención al cliente ha convertido a 
              CrediSeguros en una de las empresas líderes del sector, ayudando a miles 
              de familias a proteger su patrimonio y cumplir el sueño de tener su hogar.
            </p>

            {/* Credentials */}
            <div className="animate-item grid sm:grid-cols-2 gap-4 mb-8">
              {credentials.map((credential, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-brand-light/50 rounded-xl p-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    {credential.icon}
                  </div>
                  <span className="text-sm font-medium text-brand-dark">
                    {credential.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="animate-item relative bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl p-6 text-white">
              <div className="absolute -top-3 left-6 w-8 h-8 bg-brand-primary transform rotate-45" />
              <p className="relative text-lg italic leading-relaxed">
                "Mi mayor satisfacción es ver cómo cada familia que confía en nosotros 
                logra cumplir sus sueños. Esa es la verdadera razón de existir de CrediSeguros."
              </p>
              <p className="relative mt-4 font-semibold">— Gloria Duarte</p>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative order-1 lg:order-2">
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-brand-lg">
                <img
                  src="/fundadora.jpeg"
                  alt="Gloria Duarte - Fundadora de CrediSeguros"
                  className="w-full h-[500px] lg:h-[600px] object-cover object-top"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/30 via-transparent to-transparent" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-brand-primary/10 -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-brand-secondary/10 -z-10" />

              {/* Badge */}
              <div className="absolute bottom-8 left-8 bg-white rounded-2xl shadow-soft-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">Fundadora</p>
                    <p className="text-sm text-brand-body">Desde 2009</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fundadora;
