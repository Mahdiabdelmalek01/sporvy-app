import LegalLayout, { H2, OperatorAddress, P, Value } from './LegalLayout';
import { OPERATOR } from './legalConfig';

const mail = <a className="text-gray-900 underline" href={`mailto:${OPERATOR.email}`}>{OPERATOR.email}</a>;

// Required for a German website and app by Section 5 DDG. It must be reachable
// in two clicks from every page and from inside the app (Settings).
export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <P>
        Dieses Impressum gilt für die Website www.sporvy.de, die Web-App app.sporvy.de und die
        Sporvy-App für iOS und Android.
      </P>

      <H2 id="provider">Angaben gemäß § 5 DDG</H2>
      <OperatorAddress />
      {/* § 5 DDG wants a second fast channel besides email: a phone number or a contact form. */}
      <P>Telefon: <Value value={OPERATOR.phone} label="Phone number or contact form" /></P>
      {OPERATOR.vatId && <P>Umsatzsteuer-ID gemäß § 27a UStG: {OPERATOR.vatId}</P>}

      <H2 id="editorial">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</H2>
      <P>
        <Value value={OPERATOR.name} label="Full legal name" />, Anschrift wie oben.
      </P>

      <H2 id="dsa">Zentrale Kontaktstelle nach Art. 11 und 12 DSA</H2>
      <P>
        Behörden, die Europäische Kommission und Nutzerinnen und Nutzer erreichen uns für alle Fragen
        nach dem Digital Services Act (Verordnung (EU) 2022/2065) unter {mail}. Wir kommunizieren auf
        Deutsch und Englisch. Inhalte in der App melden Sie am schnellsten direkt dort über
        „Report“.
      </P>

      <H2 id="dispute">Verbraucherstreitbeilegung</H2>
      <P>
        Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </P>

      <H2 id="links">Haftung für Links</H2>
      <P>
        Die Website und die App verlinken auf Websites Dritter, zum Beispiel von Veranstaltern. Für
        deren Inhalte ist der jeweilige Anbieter verantwortlich. Werden uns Rechtsverletzungen auf
        verlinkten Seiten bekannt, entfernen wir den Link umgehend.
      </P>

      <H2 id="contact-en">Contact (English)</H2>
      <P>
        Sporvy is run by <Value value={OPERATOR.name} label="Full legal name" /> at the address above.
        For anything about the app, your account or your data, email {mail}.
      </P>
    </LegalLayout>
  );
}
