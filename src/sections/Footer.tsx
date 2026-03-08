import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Phone, 
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Clock,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer content animation
      const elements = contentRef.current?.querySelectorAll('.animate-item');
      if (elements) {
        gsap.fromTo(
          elements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const quickLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Servicios', href: '#services' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Nuestra Fundadora', href: '#fundadora' },
    { name: 'Contacto', href: '#contact' },
    { name: 'FAQ', href: '#' },
  ];

  const services = [
    { name: 'Créditos Hipotecarios', href: '#services' },
    { name: 'Seguros de Vida', href: '#services' },
    { name: 'Seguros de Hogar', href: '#services' },
    { name: 'Seguros de Autos', href: '#services' },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com/crediseguros', label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com/crediseguros', label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
  ];

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-br from-brand-dark via-brand-primary to-brand-secondary overflow-hidden"
    >
      {/* Wave decoration at top */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#1A1A1A"
          />
        </svg>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div ref={contentRef} className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-20 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          {/* Brand Column */}
          <div className="animate-item lg:col-span-1">
            <img
              src="/logo.png"
              alt="CrediSeguros"
              className="h-16 mb-6 brightness-0 invert"
            />
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Tu aliado confiable en créditos inmobiliarios y seguros. 
              Protegiendo tu patrimonio y ayudándote a cumplir el sueño de tu hogar 
              desde 2009.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-brand-primary transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-item">
            <h4 className="font-heading font-semibold text-white text-lg mb-6">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/70 hover:text-white text-sm flex items-center gap-2 group transition-colors duration-300"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="animate-item">
            <h4 className="font-heading font-semibold text-white text-lg mb-6">
              Nuestros Servicios
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(service.href);
                    }}
                    className="text-white/70 hover:text-white text-sm flex items-center gap-2 group transition-colors duration-300"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-item">
            <h4 className="font-heading font-semibold text-white text-lg mb-6">
              Contáctanos
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/60 text-xs mb-1">Teléfono</p>
                  <a
                    href="tel:+573187798503"
                    className="text-white text-sm hover:text-brand-accent transition-colors"
                  >
                    +57 (318) 779-8503
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <InstagramIcon className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/60 text-xs mb-1">Instagram</p>
                  <a
                    href="https://www.instagram.com/credisegurosbucaramanga/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm hover:text-brand-accent transition-colors"
                  >
                    @credisegurosbucaramanga
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FacebookIcon className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/60 text-xs mb-1">Facebook</p>
                  <a
                    href="https://www.facebook.com/seguros.gloriaduarte"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm hover:text-brand-accent transition-colors"
                  >
                    Inmobiliaria crediseguros
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/60 text-xs mb-1">Horario</p>
                  <p className="text-white text-sm">
                    Lun-Vie: 9:00 - 18:00
                  </p>
                </div>
              </li>
            </ul>

            <a
              href="https://wa.me/573187798503?text=Hola,%20estoy%20interesado%20en%20adquirir%20los%20servicios"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 w-full flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Escríbenos por WhatsApp
              </Button>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="animate-item border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © 2026 CrediSeguros. Todos los derechos reservados.
            </p>

            <div className="flex gap-6">
              <a
                href="#"
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Privacidad
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Términos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
