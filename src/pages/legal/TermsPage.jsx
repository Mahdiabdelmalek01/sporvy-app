import { Link } from 'react-router-dom';
import LegalLayout, { H2, OperatorAddress, P, UL } from './LegalLayout';
import { OPERATOR } from './legalConfig';

const mail = <a className="text-gray-900 underline" href={`mailto:${OPERATOR.email}`}>{OPERATOR.email}</a>;

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service">
      <H2 id="scope">1. Who we are and what these terms cover</H2>
      <P>These terms apply to your use of the Sporvy app (Android and app.sporvy.de). Sporvy is run by:</P>
      <OperatorAddress />
      <P>
        By creating an account you agree to these terms. How we handle your data is explained in our{' '}
        <Link className="text-gray-900 underline" to="/privacy">Privacy Policy</Link>.
      </P>

      <H2 id="service">2. What Sporvy is</H2>
      <P>
        Sporvy helps endurance athletes find races and other people to train for them with. Sporvy is
        currently free of charge. If we introduce paid features, they will be offered separately and
        you will never be charged without agreeing to it first.
      </P>
      <P>
        <strong>Sporvy is not the organiser of any race.</strong> Race details shown in the app come
        from organisers and public sources. We take care to keep them accurate, but dates, prices,
        places and registration deadlines can change. Always check with the organiser. Marking a race
        as <em>going</em> or <em>entered</em> in Sporvy does not register you for it. You register
        directly with the organiser, and your contract for the race is with them.
      </P>
      <P>
        Sporvy is in an early stage. We are continually changing and improving it, and we cannot
        promise that it will always be available or free of errors.
      </P>

      <H2 id="account">3. Your account</H2>
      <UL>
        <li>You must be at least 16 years old.</li>
        <li>One account per person. Give accurate information, and use your own name.</li>
        <li>Keep your password to yourself. Tell us at {mail} if you think someone else is using your account.</li>
      </UL>

      <H2 id="conduct">4. How you use Sporvy</H2>
      <P>You are responsible for what you post, such as training group names and descriptions. Do not:</P>
      <UL>
        <li>harass, threaten or discriminate against others</li>
        <li>impersonate anyone or post other people's personal data</li>
        <li>post illegal, misleading or commercial spam content</li>
        <li>access the service by automated means, or try to get around its security</li>
      </UL>
      <P>
        You keep all rights to what you post. You give us a non-exclusive, free licence to store and
        display it within Sporvy for as long as it is there, which we need to run the service.
      </P>
      <P>We may remove content that breaks these rules.</P>

      <H2 id="training">5. Training and meeting other people</H2>
      <P>
        Endurance sport carries health risks. Train within your limits, and see a doctor if you are
        unsure whether a race or training load is right for you. Training groups are organised by
        their members, not by Sporvy. Use common sense when meeting people you know only from the app.
      </P>

      <H2 id="liability">6. Liability</H2>
      <P>
        We are fully liable for intent and gross negligence, for injury to life, body or health, and
        under the German Product Liability Act.
      </P>
      <P>
        For slight negligence we are liable only if we breach an obligation that is essential to the
        service and that you are entitled to rely on. In that case our liability is limited to the
        damage typically foreseeable when you started using Sporvy.
      </P>
      <P>We are not responsible for races, organisers, or third-party websites linked from the app.</P>

      <H2 id="ending">7. Ending your account</H2>
      <P>
        You can delete your account at any time in the app under Profile → Delete account, or by
        emailing {mail}.
      </P>
      <P>
        We may suspend or close an account that seriously or repeatedly breaks these terms. Except in
        urgent cases we will warn you first. We may also end the service as a whole with at least 30
        days' notice.
      </P>

      <H2 id="changes">8. Changes to these terms</H2>
      <P>
        If we change these terms, we will tell you in the app at least 30 days before the changes take
        effect. If you do not agree, you can delete your account before then.
      </P>

      <H2 id="law">9. Applicable law</H2>
      <P>
        German law applies. If you are a consumer, this does not take away the protection of mandatory
        consumer law in the country where you live.
      </P>
      <P>
        We are not willing or obliged to take part in dispute resolution proceedings before a consumer
        arbitration board.
      </P>
    </LegalLayout>
  );
}
