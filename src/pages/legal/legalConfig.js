// Every fact the legal pages state about the operator lives here, so it is
// filled in once. A null value renders as a highlighted gap on the page.
//
// While DRAFT is true, every legal page carries a "not reviewed" banner and a
// noindex tag. Set it to false only after the text has been read and checked.
export const DRAFT = true;

export const LAST_UPDATED = null; // e.g. '2026-11-01'

export const OPERATOR = {
  name: 'Mohamed Mahdi Abdelmalek',          // full legal name of the person (or company) running Sporvy
  street: 'Große Klingergasse 4',        // a postal address where mail is actually received, no PO box
  city: '94032 Passau',          // postcode and city
  country: 'Germany',
  email: 'support@sporvy.de', // must receive mail before publishing
  phone: '+49 160 99654981',         // a second fast contact channel for the Impressum
  vatId: null,         // only if one has been issued
};

// Supabase dashboard -> Project Settings -> General -> Region.
export const DATABASE_REGION = 'West EU (Ireland)';

// Who sends sign-up and password-reset emails: Supabase's built-in mailer or a
// custom SMTP provider configured under Authentication -> Emails -> SMTP.
export const EMAIL_PROVIDER = 'Resend Inc. (USA)'; // sends as noreply@sporvy.de

// How long Supabase keeps database backups on the current plan.
export const BACKUP_RETENTION = null;
