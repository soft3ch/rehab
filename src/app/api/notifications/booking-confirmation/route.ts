import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name, date, time, specialty, confirmationNumber } = await req.json();

    console.log('Intentando enviar email a:', email, 'para la fecha:', date, 'hora:', time);

    const { data, error } = await resend.emails.send({
      from: 'Rehab <contacto@rutinax.com>',
      to: [email],
      subject: `Confirmación de Turno #${confirmationNumber} - Rehab`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #059669; font-size: 28px; margin-bottom: 0;">¡Turno Confirmado!</h1>
            <p style="color: #6b7280; font-size: 16px;">Código de reserva: <strong>${confirmationNumber}</strong></p>
          </div>
          
          <p style="color: #4b5563; font-size: 16px;">Hola <strong>${name}</strong>,</p>
          <p style="color: #4b5563; font-size: 16px;">Tu cita para <strong>${specialty}</strong> ha sido reservada con éxito en <strong>Rehab</strong>.</p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 12px; margin: 25px 0; border: 1px solid #f1f5f9;">
            <h2 style="font-size: 18px; color: #1f2937; margin-top: 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Detalles del Turno</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Especialidad:</strong></td>
                <td style="padding: 8px 0; color: #111827; text-align: right;">${specialty}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Fecha:</strong></td>
                <td style="padding: 8px 0; color: #111827; text-align: right;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Hora:</strong></td>
                <td style="padding: 8px 0; color: #111827; text-align: right;">${time} hs</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Lugar:</strong></td>
                <td style="padding: 8px 0; color: #111827; text-align: right;">Clínica Rehab - Sede Central</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #ecfdf5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; color: #065f46; font-size: 14px;"><strong>Nota:</strong> Por favor, llega 10 minutos antes de tu horario programado.</p>
          </div>

          <p style="color: #6b7280; font-size: 14px;">Si necesitas cancelar o reprogramar, por favor contáctanos con al menos 24hs de anticipación mencionando tu código <strong>${confirmationNumber}</strong>.</p>
          
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">&copy; 2026 Rehab Clínica de Salud Integral<br/>Este es un mensaje automático, por favor no respondas a este correo.</p>
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
