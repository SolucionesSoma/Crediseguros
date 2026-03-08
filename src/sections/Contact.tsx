import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Phone, 
  Instagram, 
  Facebook, 
  Clock, 
  Check,
  Loader2,
  MessageCircle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  });

  const phoneNumber = '573187798503'; // Número de WhatsApp de CrediSeguros

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Teléfono',
      value: '+57 (318) 779-8503',
      href: 'tel:+573187798503',
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      label: 'Instagram',
      value: '@crediseguros',
      href: 'https://www.instagram.com/credisegurosbucaramanga/',
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      label: 'Facebook',
      value: 'Inmobiliaria crediseguros',
      href: 'https://www.facebook.com/seguros.gloriaduarte',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Horario',
      value: 'Lun-Vie: 9:00 - 18:00',
      href: '#',
    },
  ];

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

      // Form animation
      const formElements = formRef.current?.querySelectorAll('.form-field');
      if (formElements) {
        gsap.fromTo(
          formElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
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
          gsap.set(contentRef.current, { y: (progress - 0.5) * 40 });
          gsap.set(formRef.current, { y: (progress - 0.5) * 20 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, servicio: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate WhatsApp message
    const servicioTexto = {
      hipotecario: 'Crédito Hipotecario',
      vida: 'Seguro de Vida',
      hogar: 'Seguro de Hogar',
      auto: 'Seguro de Auto',
      otro: 'Otro servicio',
    }[formData.servicio] || 'No especificado';

    const whatsappMessage = `*Nuevo mensaje desde CrediSeguros website*%0A%0A` +
      `*Nombre:* ${formData.nombre}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Teléfono:* ${formData.telefono || 'No proporcionado'}%0A` +
      `*Servicio de interés:* ${servicioTexto}%0A%0A` +
      `*Mensaje:*%0A${formData.mensaje || 'Sin mensaje adicional'}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      servicio: '',
      mensaje: '',
    });

    // Reset success state after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-brand-light/30 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="absolute bottom-20 left-[5%] w-64 h-64 rounded-full bg-brand-secondary/5 blur-3xl" />
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Contact Info */}
          <div ref={contentRef}>
            <span className="animate-item inline-block text-sm font-semibold text-brand-secondary uppercase tracking-wider mb-4">
              Contacto
            </span>

            <h2 className="animate-item font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-dark mb-6 leading-tight">
              Hablemos de Tu{' '}
              <span className="text-gradient">Futuro</span>
            </h2>

            <p className="animate-item text-lg text-brand-body mb-10 leading-relaxed">
              Estamos listos para ayudarte a cumplir tus metas. Contáctanos y un asesor 
              especializado te atenderá a la brevedad.
            </p>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="animate-item group bg-white rounded-2xl p-5 shadow-soft hover:shadow-brand transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-3 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <p className="text-sm text-brand-body mb-1">{item.label}</p>
                  <p className="font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">
                    {item.value}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="relative">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-soft-lg p-8 border border-gray-100"
            >
              <h3 className="font-heading font-bold text-2xl text-brand-dark mb-2">
                Envíanos un Mensaje
              </h3>
              <p className="text-sm text-brand-body mb-6">
                Completa el formulario y te contactaremos por WhatsApp
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="form-field">
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Nombre completo *
                  </label>
                  <Input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                  />
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Correo electrónico *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="form-field">
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Teléfono
                  </label>
                  <Input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                  />
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Servicio de interés *
                  </label>
                  <Select value={formData.servicio} onValueChange={handleServiceChange} required>
                    <SelectTrigger className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20">
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hipotecario">
                        Crédito Hipotecario
                      </SelectItem>
                      <SelectItem value="vida">Seguro de Vida</SelectItem>
                      <SelectItem value="hogar">Seguro de Hogar</SelectItem>
                      <SelectItem value="auto">Seguro de Auto</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="form-field mb-6">
                <label className="block text-sm font-medium text-brand-dark mb-2">
                  Mensaje
                </label>
                <Textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  placeholder="Cuéntanos sobre tus necesidades..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-6 rounded-xl font-semibold text-base transition-all duration-500 ${
                  isSubmitted
                    ? 'bg-green-500 hover:bg-green-500'
                    : 'bg-green-500 hover:bg-green-600 hover:shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Preparando mensaje...
                  </>
                ) : isSubmitted ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    ¡Mensaje enviado a WhatsApp!
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Enviar por WhatsApp
                  </>
                )}
              </Button>

              <p className="text-xs text-brand-body text-center mt-4">
                Al enviar este formulario, serás redirigido a WhatsApp con tu mensaje listo para enviar.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
