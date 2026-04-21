'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Apple, Brain, Calendar as CalendarIcon, Clock, ChevronLeft, CheckCircle2, User } from 'lucide-react';
import { appointmentService } from '@/services/appointments';
import { toast, Toaster } from 'sonner';

const STEPS = ['Servicio', 'Profesional', 'Fecha y Hora'];

const MOCK_SPECIALTIES = [
  { id: '1', name: 'Kinesiología', icon: Activity, color: 'text-emerald-500' },
  { id: '2', name: 'Nutrición', icon: Apple, color: 'text-orange-500' },
  { id: '3', name: 'Psicología', icon: Brain, color: 'text-blue-500' },
];

const MOCK_PROFESSIONALS = [
  { id: 'p1', full_name: 'Lic. Matías Sánchez', specialty_id: '1' },
  { id: 'p2', full_name: 'Dra. Valentina Paz', specialty_id: '2' },
  { id: 'p3', full_name: 'Lic. Sofia Martínez', specialty_id: '3' },
];

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    specialtyId: '',
    professionalId: '',
    date: '',
    time: '',
    name: '',
    email: '',
  });

  const selectedSpecialty = MOCK_SPECIALTIES.find(s => s.id === formData.specialtyId);
  const filteredProfessionals = MOCK_PROFESSIONALS.filter(p => p.specialty_id === formData.specialtyId);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 1. Generar número de confirmación aleatorio
      const confirmationNumber = `REH-${Math.random().toString(36).toUpperCase().substring(2, 8)}`;
      
      // 2. Enviar Email de Confirmación con todos los detalles
      const response = await fetch('/api/notifications/booking-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          date: formData.date,
          time: formData.time,
          specialty: selectedSpecialty?.name || 'Consulta General',
          confirmationNumber: confirmationNumber
        }),
      });

      if (!response.ok) throw new Error('Error al enviar el email');

      setIsSuccess(true);
      toast.success('¡Cita reservada con éxito!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Hubo un error al procesar tu reserva.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">¡Todo listo, {formData.name.split(' ')[0]}!</h2>
        <p className="text-gray-500 max-w-xs">
          Hemos enviado un correo de confirmación a <span className="font-semibold text-gray-900">{formData.email}</span> con los detalles de tu turno.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
      <Toaster position="top-center" />
      
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-10 px-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-col items-center flex-1 relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all duration-300 ${
              step > i + 1 ? 'bg-emerald-500 text-white' : 
              step === i + 1 ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-110' : 
              'bg-gray-100 text-gray-400'
            }`}>
              {step > i + 1 ? <CheckCircle2 className="w-6 h-6" /> : i + 1}
            </div>
            <span className={`text-[11px] mt-2 font-bold uppercase tracking-tighter ${step >= i + 1 ? 'text-emerald-700' : 'text-gray-400'}`}>
              {s}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`absolute top-5 left-1/2 w-full h-[2px] -z-0 transition-colors duration-500 ${step > i + 1 ? 'bg-emerald-500' : 'bg-gray-100'}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {/* STEP 1: ESPECIALIDAD */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-gray-800">Selecciona una Especialidad</h2>
              <div className="grid grid-cols-1 gap-3">
                {MOCK_SPECIALTIES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => { setFormData({...formData, specialtyId: s.id}); handleNext(); }}
                    className={`group flex items-center p-5 rounded-2xl border-2 transition-all duration-200 text-left ${
                      formData.specialtyId === s.id ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30'
                    }`}
                  >
                    <div className={`p-3 rounded-xl bg-white shadow-sm mr-4 group-hover:scale-110 transition-transform ${s.color}`}>
                      <s.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{s.name}</h3>
                      <p className="text-xs text-gray-500">Haz clic para ver profesionales disponibles</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: PROFESIONAL */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <button type="button" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Elige tu Profesional</h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {filteredProfessionals.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => { setFormData({...formData, professionalId: p.id}); handleNext(); }}
                    className={`flex items-center p-5 rounded-2xl border-2 transition-all duration-200 text-left ${
                      formData.professionalId === p.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 hover:border-emerald-200 bg-white'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{p.full_name}</h3>
                      <p className="text-xs text-emerald-600 font-semibold uppercase">{selectedSpecialty?.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: FECHA, HORA Y CONTACTO */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2">
                <button type="button" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Confirmar Cita</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" /> Fecha
                    </label>
                    <input 
                      type="date" 
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-900"
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Hora
                    </label>
                    <select 
                      required
                      className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white text-gray-900"
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    >
                      <option value="">Seleccionar...</option>
                      {['09:00', '10:00', '11:00', '16:00', '17:00'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-4 pt-2 border-t border-gray-100">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Nombre Completo</label>
                    <input 
                      placeholder="Ej: Juan Pérez" 
                      required
                      className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-900"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Email de Contacto</label>
                    <input 
                      placeholder="tu@email.com" 
                      type="email" 
                      required
                      className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-900"
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-xl shadow-emerald-200 hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  ) : 'Agendar Cita'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
