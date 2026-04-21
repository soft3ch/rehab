import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name, date } = await req.json();

    console.log('Intentando enviar email a:', email, 'para la fecha:', date);

    const { data, error } = await resend.emails.send({
      from: 'Rehab <contacto@rutinax.com>',
      to: [email],
      subject: 'Confirmación de tu Turno - Rehab',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h1 style="color: #059669; font-size: 24px;">¡Hola ${name}!</h1>
          <p style="color: #4b5563; font-size: 16px;">Tu turno ha sido reservado con éxito en <strong>Rehab</strong>.</p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #374151;"><strong>Fecha:</strong> ${date}</p>
            <p style="margin: 5px 0 0 0; color: #374151;"><strong>Lugar:</strong> Clínica Rehab - Sede Central</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">Si necesitas cancelar o reprogramar, por favor contáctanos con al menos 24hs de anticipación.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">&copy; 2026 Rehab Clínica de Salud Integral</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error de Resend:', error);
      return NextResponse.json({ error }, { status: 400 });
    }

    console.log('Email enviado exitosamente:', data);

    return NextResponse.json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.log('Error sending email:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
