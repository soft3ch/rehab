import BookingForm from '@/components/BookingForm';
import { Heart, Shield, Clock } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative py-12 px-6 md:py-20 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-60" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
              Rehab<span className="text-emerald-600">.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Tu camino hacia el bienestar integral comienza aquí. Reserva tu turno con nuestros especialistas en segundos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Info Column */}
            <div className="space-y-8 lg:pt-12 order-2 lg:order-1">
              <div className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Salud Integral</h3>
                  <p className="text-sm text-gray-500 text-balance">Atención personalizada en Kinesiología, Nutrición y Psicología.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Profesionales Certificados</h3>
                  <p className="text-sm text-gray-500 text-balance">Contamos con un equipo de expertos listos para ayudarte en tu recuperación.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Gestión Inmediata</h3>
                  <p className="text-sm text-gray-500 text-balance">Reserva y recibe tu confirmación al instante por correo electrónico.</p>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="order-1 lg:order-2">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm font-medium">
            &copy; 2026 Rehab Clínica de Salud Integral. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
