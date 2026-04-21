# Rehab - MVP Clínica de Salud Integral

Este es un prototipo funcional para la clínica **Rehab**, construido con Next.js 14, Tailwind CSS, Supabase y Resend.

## Stack Técnico
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion.
- **Backend/Auth**: Supabase.
- **Email**: Resend.

## Configuración de Base de Datos (Supabase)
Ejecuta el siguiente SQL en el editor de consultas de tu proyecto de Supabase:

```sql
CREATE TABLE specialties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  icon TEXT
);

CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'professional',
  specialty_id UUID REFERENCES specialties(id)
);

CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  professional_id UUID REFERENCES profiles(id),
  specialty_id UUID REFERENCES specialties(id),
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'pending'
);

INSERT INTO specialties (name, icon) VALUES 
('Kinesiología', 'Activity'),
('Nutrición', 'Apple'),
('Psicología', 'Brain');
```

## Configuración Local
1. Crea un archivo `.env.local` con tus credenciales:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
   RESEND_API_KEY=tu_api_key_de_resend
   ```
2. Instala las dependencias: `npm install`
3. Inicia el servidor de desarrollo: `npm run dev`

## Estructura del Proyecto
- `src/components/BookingForm.tsx`: El flujo de 3 pasos para la reserva.
- `src/services/appointments.ts`: Lógica de comunicación con Supabase.
- `src/app/api/notifications`: Envío de emails con Resend.
