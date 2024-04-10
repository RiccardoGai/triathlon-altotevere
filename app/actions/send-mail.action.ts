// 'use server';

// import { Resend } from 'resend';

// export default async function sendEmail(formData: FormData) {
//   const resend = new Resend(process.env.RESEND_API_KEY);

//   const name = formData.get('name') as string;
//   if (!name) {
//     throw new Error('Name is required');
//   }

//   const email = formData.get('email') as string;
//   if (!email) {
//     throw new Error('Email is required');
//   }

//   const message = formData.get('message') as string;
//   if (!message) {
//     throw new Error('Message is required');
//   }

//   resend.emails.send({
//     from: 'richiestatriathlonaltotevere@resend.dev',
//     to: (process.env.RESEND_MAIL_TO as string)?.split(';'),
//     subject: 'Richiesta Contatto Triathlon Altotevere',
//     html: `Nome: ${name}<br><br>Email: ${email}<br><br>Messaggio: ${message}`
//   });
// }
