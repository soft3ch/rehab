import { supabase } from '@/utils/supabase/client';

export interface AppointmentData {
  patient_name: string;
  patient_email: string;
  patient_phone?: string;
  professional_id: string;
  specialty_id: string;
  appointment_date: Date;
  notes?: string;
}

export const appointmentService = {
  async create(data: AppointmentData) {
    const { data: appointment, error } = await supabase
      .from('appointments')
      .insert([{
        patient_name: data.patient_name,
        patient_email: data.patient_email,
        patient_phone: data.patient_phone,
        professional_id: data.professional_id,
        specialty_id: data.specialty_id,
        appointment_date: data.appointment_date.toISOString(),
        status: 'pending',
        notes: data.notes
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }

    // Intentar enviar notificación vía API Route
    try {
      await fetch('/api/notifications/booking-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: data.patient_email, 
          name: data.patient_name,
          date: data.appointment_date 
        }),
      });
    } catch (notificationError) {
      console.error('Could not send notification:', notificationError);
    }

    return appointment;
  },

  async getSpecialties() {
    const { data, error } = await supabase.from('specialties').select('*');
    if (error) throw error;
    return data;
  },

  async getProfessionals(specialtyId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('specialty_id', specialtyId)
      .eq('role', 'professional');
    if (error) throw error;
    return data;
  }
};
