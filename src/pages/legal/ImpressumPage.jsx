import LegalLayout, { H2, OperatorAddress, P, Value } from './LegalLayout';
import { OPERATOR } from './legalConfig';

// Required for a German website by Section 5 DDG.
export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <H2 id="provider">Angaben gemäß § 5 DDG</H2>
      <OperatorAddress />
      {/* § 5 DDG wants a second fast channel besides email: a phone number or a contact form. */}
      <P>Telefon: <Value value={OPERATOR.phone} label="Phone number or contact form" /></P>
      {OPERATOR.vatId && <P>Umsatzsteuer-ID gemäß § 27a UStG: {OPERATOR.vatId}</P>}

      <H2 id="dispute">Verbraucherstreitbeilegung</H2>
      <P>
        Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </P>
    </LegalLayout>
  );
}
