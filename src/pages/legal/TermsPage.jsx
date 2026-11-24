import { Link } from 'react-router-dom';
import LegalLayout, { H2, P } from './LegalLayout';
import { TERMS_SECTIONS } from './termsContent';

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use">
      {TERMS_SECTIONS.map((section) => (
        <section key={section.id}>
          <H2 id={section.id}>{section.title}</H2>
          {section.body.map((text) => <P key={text}>{text}</P>)}
        </section>
      ))}
      <P>
        See also our <Link className="text-gray-900 underline" to="/privacy">Privacy Policy</Link> and{' '}
        <Link className="text-gray-900 underline" to="/impressum">Impressum</Link>.
      </P>
    </LegalLayout>
  );
}
