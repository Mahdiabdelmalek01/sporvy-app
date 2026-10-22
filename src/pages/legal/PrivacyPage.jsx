import { Link } from 'react-router-dom';
import LegalLayout, { Fill, H2, H3, OperatorAddress, P, UL, Value } from './LegalLayout';
import { BACKUP_RETENTION, DATABASE_REGION, EMAIL_PROVIDER, OPERATOR } from './legalConfig';

const mail = <a className="text-gray-900 underline" href={`mailto:${OPERATOR.email}`}>{OPERATOR.email}</a>;

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <P>
        This policy explains what personal data Sporvy processes, why, and what rights you have. It
        covers the Sporvy app (Android, and the web app at app.sporvy.de) and this website,
        www.sporvy.de.
      </P>

      <H2 id="controller">1. Who is responsible</H2>
      <P>The controller under the General Data Protection Regulation (GDPR) is:</P>
      <OperatorAddress />
      <P>
        We are not required to appoint a data protection officer. Write to the address above with any
        question about your data.
      </P>

      <H2 id="account">2. Your account</H2>
      <P>To use the app you create an account in one of two ways:</P>
      <UL>
        <li>
          <strong>Email and password.</strong> We store your email address and your password. The
          password is stored only as a cryptographic hash and is never visible to us.
        </li>
        <li>
          <strong>Sign in with Google.</strong> Google sends us your email address, your name, your
          Google profile picture address and your Google account ID. Google processes your sign-in
          under its own privacy policy. We receive no other data from your Google account.
        </li>
      </UL>
      <P>
        We send you emails only for your account: confirming your email address and resetting your
        password. We do not send newsletters or marketing.
      </P>
      <P>
        <strong>Legal basis:</strong> Art. 6(1)(b) GDPR. We need this data to provide the account you
        asked for.
      </P>

      <H2 id="profile">3. Your athlete profile</H2>
      <P>After signing up you fill in a profile:</P>
      <UL>
        <li>Name, city and an optional short bio</li>
        <li>An optional profile photo</li>
        <li>Gender, birth year and fitness level</li>
        <li>The sports you do and your goals</li>
      </UL>
      <P>
        We use this to show you your profile and to suggest races and training groups that suit you.
        We do not sell this data, use it for advertising, or make automated decisions about you with
        it.
      </P>
      <P>
        <strong>Legal basis:</strong> Art. 6(1)(b) GDPR.
      </P>

      <H2 id="activity">4. Races and training groups</H2>
      <P>When you use the app we store:</P>
      <UL>
        <li>
          Races you mark as <em>going</em> or <em>entered</em>. This is a note in Sporvy only. It does
          not register you with the race organiser. Registration and payment for a race happen on the
          organiser's own website, under the organiser's own privacy policy.
        </li>
        <li>Training groups you create or join.</li>
      </UL>
      <P>
        <strong>Legal basis:</strong> Art. 6(1)(b) GDPR.
      </P>

      <H2 id="visibility">5. What other people can see</H2>
      <UL>
        <li>
          Other signed-in users see <strong>how many</strong> people are going to a race and how many
          members a group has. The app does not show them who those people are.
        </li>
        <li>
          A training group you create (its name, description, sport, level and linked race) is
          visible to all signed-in users. If you delete your account, the group remains so its other
          members keep it, but it is no longer linked to you.
        </li>
        <li>
          Your profile photo is stored at a web address that is not listed anywhere but is not
          password-protected. Anyone who has that exact address can open the image.
        </li>
      </UL>
      <P>
        The app does not currently show your profile to other users. If we add features that do, such
        as finding training partners, we will update this policy and tell you in the app before the
        feature goes live.
      </P>

      <H2 id="technical">6. Technical data</H2>
      <P>
        When your device connects to our servers, our hosting providers automatically log technical
        data: IP address, date and time, the address requested, and browser or device type. These logs
        are used only to run the service, keep it secure and find faults.
      </P>
      <P>
        <strong>Legal basis:</strong> Art. 6(1)(f) GDPR. Our legitimate interest is a secure and
        working service.
      </P>

      <H2 id="device">7. Storage on your device</H2>
      <P>
        The app stores your login session on your device so you stay signed in: in Android's
        encrypted secure storage, or in your browser's local storage when you use the web app. This is
        strictly necessary for a service you requested, so it needs no consent (Section 25(2) No. 2
        TDDDG).
      </P>
      <P>
        We use no tracking cookies, no analytics and no advertising tools in the app or on this
        website. The website's fonts are served from our own host, not from Google.
      </P>

      <H2 id="processors">8. Service providers</H2>
      <P>
        We use the following providers. They process data on our behalf under data processing
        agreements (Art. 28 GDPR) and may not use it for their own purposes.
      </P>
      <UL>
        <li>
          <strong>Supabase Inc.</strong> (USA): database, login, file storage and account deletion.
          Your data is stored in the region <Value value={DATABASE_REGION} label="Supabase project region" />.
        </li>
        <li>
          <strong>Vercel Inc.</strong> (USA): hosting of this website and of the web app.
        </li>
        <li>
          <strong><Value value={EMAIL_PROVIDER} label="Email provider" /></strong>: sending account
          emails.
        </li>
      </UL>
      <P>
        Because these companies are based in the USA, access to data from the USA cannot be ruled out.
        Such transfers are protected by <Fill>EU–US Data Privacy Framework certification and/or EU
        Standard Contractual Clauses: confirm for each provider</Fill>.
      </P>
      <P>
        If you install the app from Google Play, Google processes data about the download as an
        independent controller under its own privacy policy.
      </P>

      <H2 id="retention">9. How long we keep data</H2>
      <P>
        We keep your account, profile, races and group memberships for as long as you have an account.
      </P>
      <P>
        When you delete your account, your login, profile, profile photo, race list and group
        memberships are deleted immediately. Copies in database backups are overwritten within{' '}
        <Value value={BACKUP_RETENTION} label="backup retention period" />. Server logs are deleted
        after <Fill>log retention period</Fill>.
      </P>

      <H2 id="delete">10. Deleting your account</H2>
      <P>You can delete your account in two ways:</P>
      <UL>
        <li>
          <strong>In the app:</strong> Profile → Delete account. Deletion is immediate and cannot be
          undone.
        </li>
        <li>
          <strong>Without the app:</strong> email {mail} from the address you signed up with and ask
          us to delete your account. We will do so within one month and confirm by email.
        </li>
      </UL>

      <H2 id="rights">11. Your rights</H2>
      <P>Under the GDPR you have the right to:</P>
      <UL>
        <li>access the data we hold about you (Art. 15)</li>
        <li>have incorrect data corrected (Art. 16)</li>
        <li>have your data deleted (Art. 17)</li>
        <li>restrict processing (Art. 18)</li>
        <li>receive your data in a portable format (Art. 20)</li>
      </UL>
      <P>To use any of these rights, email {mail}.</P>
      <H3>Right to object (Art. 21 GDPR)</H3>
      <P>
        <strong>
          Where we process your data on the basis of our legitimate interests (Art. 6(1)(f) GDPR), you
          may object at any time on grounds relating to your particular situation. We will then stop
          unless we can show compelling legitimate grounds that override your interests.
        </strong>
      </P>
      <H3>Right to complain</H3>
      <P>
        You may complain to a data protection supervisory authority. The one responsible for us is the
        Bayerisches Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach, Germany,
        www.lda.bayern.de.
      </P>

      <H2 id="age">12. Minimum age</H2>
      <P>
        Sporvy is for people aged 16 and over. We do not knowingly process data of younger children.
      </P>

      <H2 id="changes">13. Changes to this policy</H2>
      <P>
        We will update this policy when the app changes how it uses data. Significant changes will be
        announced in the app. See also our <Link className="text-gray-900 underline" to="/terms">Terms of
        Service</Link>.
      </P>
    </LegalLayout>
  );
}
