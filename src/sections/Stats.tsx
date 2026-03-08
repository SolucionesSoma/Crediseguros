import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, ThumbsUp, Clock, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

const AnimatedCounter = ({ 
  value, 
  suffix, 
  isVisible 
}: { 
  value: number; 
  suffix: string; 
  isVisible: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isVisible) {
      gsap.to(
        { val: 0 },
        {
          val: value,
          duration: 2.5,
          ease: 'power3.out',
          onUpdate: function () {
            setCount(Math.floor(this.targets()[0].val));
          },
        }
      );
    }
  }, [isVisible, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const stats: StatItem[] = [
    {
      value: 5000,
      suffix: '+',
      label: 'Familias atendidas',
      icon: <Users className="w-8 h-8" />,
    },
    {
      value: 98,
      suffix: '%',
      label: 'Tasa de satisfacción',
      icon: <ThumbsUp className="w-8 h-8" />,
    },
    {
      value: 15,
      suffix: '',
      label: 'Años de experiencia',
      icon: <Clock className="w-8 h-8" />,
    },
    {
      value: 24,
      suffix: '/7',
      label: 'Atención personalizada',
      icon: <Headphones className="w-8 h-8" />,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { scale: 0.8, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              once: true,
              onEnter: () => setIsVisible(true),
            },
          }
        );
      }

      // Icon rotation
      const icons = statsRef.current?.querySelectorAll('.stat-icon');
      if (icons) {
        icons.forEach((icon) => {
          gsap.to(icon, {
            rotation: 360,
            duration: 30,
            repeat: -1,
            ease: 'none',
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-24 bg-gradient-to-br from-brand-primary to-brand-secondary overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-white/10" />
      <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border border-white/10" />
      <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-white/5" />

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-white/80 text-lg">
            Números que respaldan nuestra trayectoria y compromiso con cada cliente.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 lg:p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="stat-icon w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Value */}
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>

              {/* Label */}
              <p className="text-white/80 text-sm lg:text-base">{stat.label}</p>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
