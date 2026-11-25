import { Link } from 'react-router-dom';
import LegalLayout, { H2, H3, OperatorAddress, P, UL, Value } from './LegalLayout';
import { BACKUP_RETENTION, DATABASE_REGION, EMAIL_PROVIDER, OPERATOR } from './legalConfig';

const mail = <a className="text-gray-900 underline" href={`mailto:${OPERATOR.email}`}>{OPERATOR.email}</a>;

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <P>
        This policy explains what personal data Sporvy processes, why, and what rights you have. It
        covers the Sporvy app (for iPhone and Android, and the web app at app.sporvy.de) and this
        website, www.sporvy.de.
      </P>

      <H2 id="controller">1. Who is responsible</H2>
      <P>The controller under the General Data Protection Regulation (GDPR) is:</P>
      <OperatorAddress />
      <P>
        We are not required to appoint a data protection officer. Write to the address above with any
        question about your data.
      </P>

      <H2 id="account">2. Your account</H2>
      <P>To use the app you create an account in one of three ways:</P>
      <UL>
        <li>
          <strong>Email and password.</strong> We store your email address and your password. The
          password is stored only as a cryptographic hash and is never visible to us.
        </li>
        <li>
          <strong>Sign in with Google.</strong> Google sends us your email address, your name, your
          Google profile picture address and your Google account ID. We receive no other data from
          your Google account.
        </li>
        <li>
          <strong>Sign in with Apple</strong> (iPhone app). Apple sends us an Apple account ID, your
          email address and, the first time only, your name. If you choose <em>Hide My Email</em>, we
          receive only an address that Apple forwards to you, and never your real one.
        </li>
      </UL>
      <P>
        Google and Apple process your sign-in under their own privacy policies.
      </P>
      <P>
        When you accept our <Link className="text-gray-900 underline" to="/terms">Terms of Use</Link>{' '}
        in the app, we store which version you accepted and when, so we can show that you agreed and
        ask you again when they change.
      </P>
      <P>
        <strong>Legal basis:</strong> Art. 6(1)(b) GDPR. We need this data to provide the account you
        asked for. The record of your acceptance is also kept under Art. 6(1)(f) GDPR (our interest in
        being able to prove it).
      </P>

      <H3>Emails we send you</H3>
      <UL>
        <li>
          <strong>Account emails:</strong> confirming your email address and resetting your password.
        </li>
        <li>
          <strong>Activity emails:</strong> when someone asks you to train together for a race or
          accepts your request; when a group lets you in from a waiting list; when someone asks to join
          a group you organise, or you are made organiser of a group; when a group you are in moves on
          to a new race.
        </li>
        <li>
          <strong>Group session emails:</strong> when a new session is posted in your group (at most one
          email per group per day), when a session you said you would go to changes or is cancelled,
          when you move up from its waiting list, and a reminder the evening before a session you are
          going to.
        </li>
        <li>
          <strong>Training partner reminders:</strong> when a training partner logs a session they
          share with you (with its sport, type and numbers), and a reminder when you have not logged a
          session for a few days while training with a partner for a race. A session's note is never
          put into an email.
        </li>
        <li>
          <strong>Weekly email:</strong> once a week, on Thursday evening, new races within 200 km of
          the city in your profile (in your sports), and new training groups for races you are going to
          or have entered whose organiser lives within 40 km of you. It is sent only in weeks when there
          is something new.
        </li>
      </UL>
      <P>
        You can switch each kind off at any time in the app under Settings, or with the unsubscribe
        link at the bottom of every email. A few emails you need in order to take part are sent
        whatever your switches say, unless you turn all emails off: when you are made an organiser,
        when your group moves on to a new race, and when a session you said you would go to changes,
        is cancelled, or you move up from its waiting list. Account emails are always sent. We never send emails about chat messages, and we do not send advertising
        for anyone else. To avoid sending the same thing twice, we keep a record of what we have already
        emailed you about.
      </P>
      <P>
        <strong>Legal basis:</strong> Art. 6(1)(b) GDPR for account, activity, group session and
        partner emails, which are part of the service you use. Art. 6(1)(f) GDPR for the weekly email:
        our legitimate interest is telling you about new races and groups on Sporvy that match your
        profile. It contains no advertising, and you can object to it at any time by switching it
        off.
      </P>

      <H2 id="profile">3. Your athlete profile</H2>
      <P>After signing up you fill in a profile:</P>
      <UL>
        <li>Name, city and an optional short bio</li>
        <li>An optional profile photo, which you choose from your photos</li>
        <li>Gender, birth year and fitness level</li>
        <li>The sports you do and your goals</li>
      </UL>
      <P>
        We use this to show your athlete page, to suggest races and groups that suit you, and to check
        whether you fit a group's joining rules (see section 4). Your gender and birth year are never
        shown to other users; the app checks them only on our server. We do not sell this data, use it
        for advertising, or make automated decisions about you with it that have legal or similarly
        significant effects.
      </P>
      <P>
        <strong>Legal basis:</strong> Art. 6(1)(b) GDPR.
      </P>

      <H3>Finding places on the map</H3>
      <P>
        To work out how far a race is from you, our server looks up the city in your profile and the
        town of each race on a map. It sends only the place name as it was typed (for example
        "Passau"), never your name, email address or anything else about you. The request comes from
        our server, not from your device, so the services do not see your IP address. We use:
      </P>
      <UL>
        <li>
          <strong>Nominatim</strong>, run by the OpenStreetMap Foundation (United Kingdom), and
        </li>
        <li>
          <strong>Photon</strong>, run by komoot GmbH (Germany), when Nominatim does not answer.
        </li>
      </UL>
      <P>
        We store the map point found for the place name and look it up again only when the name
        changes. If you remove or change your city, the old point is deleted at once.
      </P>

      <H3>Near me</H3>
      <P>
        The <em>Near me</em> filter in the app shows races within 200 km. In the web app at
        app.sporvy.de, if you allow it, your browser gives the app your current location. The iPhone
        and Android apps do not ask for your location at the moment and use the city in your profile. The distances are calculated on your device only: your
        location is never sent to us or to anyone else, and it is not stored. If you do not allow it,
        the app uses the city in your profile instead. You can withdraw the permission at any time in
        your device's or browser's settings.
      </P>
      <P>
        <strong>Legal basis:</strong> Art. 6(1)(b) GDPR for looking up places, which is needed to
        suggest races near you. Using your device's location requires your permission (Section 25(1)
        TDDDG, Art. 6(1)(a) GDPR).
      </P>

      <H2 id="activity">4. Races, groups, sessions and training partners</H2>
      <P>When you use the app we store:</P>
      <UL>
        <li>
          Races you mark as <em>going</em> or <em>entered</em>. Once the race date has passed, they are
          shown as races you raced. This is a note in Sporvy only. It does not register you with the
          race organiser. Registration and payment for a race happen on the organiser's own website,
          under the organiser's own privacy policy.
        </li>
        <li>
          Training groups you create or join, your role in them (member, co-organiser or organiser),
          requests to join you send or receive, and waiting-list places. When a group moves on to a new
          race, we note which race it moved from and who moved it.
        </li>
        <li>
          A group's settings, which its organisers choose: public or private, its rules, and who can
          join (for example by gender or fitness level). When you ask to join a group with such a rule,
          our server compares it with your profile. The organisers learn only whether you fit, never
          your gender or birth year.
        </li>
        <li>
          <strong>Group sessions:</strong> the sessions organisers post (time, meeting place, pace,
          number of places, description), and your answer to each one: going, can't make it, or on the
          waiting list.
        </li>
        <li>
          <strong>My training:</strong> sessions you log (date, sport, type, how it felt, an optional
          note, and optional numbers such as distance, time and elevation), and
          which training partners you share each one with.
        </li>
        <li>Training partner requests you send or receive for a race, and whether they were accepted.</li>
        <li>Messages you write in a group chat or to a training partner, with the time they were sent.</li>
        <li>When you last opened each chat, so the app can show you which ones have unread messages.</li>
        <li>Whether you have Sporvy+. Sporvy+ is free during the launch period, so we hold no payment data.</li>
      </UL>
      <P>
        <strong>Legal basis:</strong> Art. 6(1)(b) GDPR.
      </P>

      <H3>Reports and blocks</H3>
      <P>
        You can report a group, a group session or a chat message, and block any person.
      </P>
      <UL>
        <li>
          <strong>A report</strong> stores who reported, what was reported, the reason and any details
          you add. We read reports to keep Sporvy safe and decide whether to remove content or accounts.
          The person reported is not told who reported them. If we act on a report against your
          content, we tell you what we did and why.
        </li>
        <li>
          <strong>A block</strong> stores who blocked whom. Only you see the people you have blocked;
          the person you block is not told. Blocking hides their group chat messages from you, ends a
          training partnership between you (with its chat), stops partner requests between you, and
          hides you from each other in lists of people.
        </li>
      </UL>
      <P>
        <strong>Legal basis:</strong> Art. 6(1)(b) GDPR for blocks, which are a feature you use.
        Art. 6(1)(f) GDPR and Art. 16 of the EU Digital Services Act for reports: our legitimate
        interest and legal duty is to deal with unlawful and harmful content and keep our users safe.
      </P>

      <H2 id="visibility">5. What other people can see</H2>
      <P>Sporvy is for meeting other athletes, so some of your data is visible to other users:</P>
      <UL>
        <li>
          <strong>Your athlete page</strong>, visible to all signed-in users: your name, photo, city,
          fitness level, bio, sports and goals, the races you are going to, have entered or have
          raced, and the groups you are in. Your gender and birth year are never shown.
        </li>
        <li>
          <strong>Races:</strong> signed-in users see who is going to or has entered a race, so they
          can find training partners.
        </li>
        <li>
          <strong>Groups:</strong> a group's name, description, rules, sport, level and race are
          visible to all signed-in users. Its members and waiting list are visible to signed-in users
          too, except in a group that only some genders can join: there, only its members see who is in
          it, because membership could reveal a person's gender. Organisers see the people who ask to
          join their group and their athlete pages.
        </li>
        <li>
          <strong>Group chat and sessions:</strong> only the members of a group can read its chat and
          see its sessions, including meeting places and who is going. Whether you said you can't make
          it is shown in the app only as a number, not by name. The group's organisers can delete
          messages in it.
        </li>
        <li>
          <strong>Training partners:</strong> a request is visible only to the two people involved.
          Messages between training partners, and training sessions you share with a partner, can be
          seen only by the two of you. If either of you ends the partnership, the conversation and the
          sharing are deleted; your own training log stays yours.
        </li>
        <li>
          Your profile photo is stored at a web address that is not listed anywhere but is not
          password-protected. Anyone who has that exact address can open the image.
        </li>
      </UL>
      <P>
        Apart from the photo address above, nothing about you is visible to people who are not signed
        in to Sporvy.
      </P>

      <H3>Features that open other apps</H3>
      <P>
        <em>Open in Maps</em> passes a session's meeting place to Apple Maps or Google Maps, and{' '}
        <em>Add to calendar</em> creates a calendar file on your device that you can save or share. We
        send nothing to these apps ourselves; whatever you then do in them is processed by their
        providers under their own policies.
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
        The app stores your login session on your device so you stay signed in: in the secure storage
        of iOS or Android, or in your browser's local storage when you use the web app. This is
        strictly necessary for a service you requested, so it needs no consent (Section 25(2) No. 2
        TDDDG).
      </P>
      <P>
        We use no tracking, no analytics and no advertising tools in the app or on this website, and
        we do not track you across other companies' apps or websites. The website's fonts are served
        from our own host, not from Google.
      </P>

      <H2 id="processors">8. Service providers</H2>
      <P>
        We use the following providers. They process data on our behalf under data processing
        agreements (Art. 28 GDPR) and may not use it for their own purposes.
      </P>
      <UL>
        <li>
          <strong>Supabase Inc.</strong> (USA): database, login, file storage and account deletion.
          Your data is stored in the EU, in the region <Value value={DATABASE_REGION} label="Supabase project region" />.
        </li>
        <li>
          <strong>Vercel Inc.</strong> (USA): hosting of this website and of the web app.
        </li>
        <li>
          <strong><Value value={EMAIL_PROVIDER} label="Email provider" /></strong>: sending the emails
          described in section 2. It receives your email address and the content of each email.
        </li>
      </UL>
      <P>
        Because these companies are based in the USA, access to data from the USA cannot be ruled out.
        Such transfers are protected by the EU Standard Contractual Clauses (Art. 46(2)(c) GDPR) that
        form part of each provider's data processing agreement and, where a provider is certified
        under it, by the EU–US Data Privacy Framework (Art. 45 GDPR).
      </P>
      <P>
        The map services named in section 3 (OpenStreetMap Foundation and komoot GmbH) receive only
        place names, never data about you.
      </P>
      <P>
        <strong>This website</strong> (www.sporvy.de, not the app) shows example photos that are loaded
        from Unsplash (Unsplash Inc., Canada/USA). When you open a page with such a photo, your browser
        sends your IP address to Unsplash's servers. Legal basis: Art. 6(1)(f) GDPR, our interest in an
        illustrated website.
      </P>
      <P>
        If you install the app from the Apple App Store or Google Play, Apple or Google processes data
        about the download as an independent controller under its own privacy policy.
      </P>

      <H2 id="retention">9. How long we keep data</H2>
      <P>
        We keep your account and the data described above for as long as you have an account. You can
        delete your own messages and training sessions at any time.
      </P>
      <P>
        When you delete your account, your login, profile, profile photo, races, group memberships,
        join requests, waiting-list places, session answers, training log, training partner requests,
        the messages you wrote, which chats you have read, the reports you made, your blocks, your email settings and the record
        of emails sent to you are deleted immediately. Before you delete your account, the app asks you
        to hand over any group you organise; if you do not, it passes to a co-organiser or the
        longest-standing member. Groups and sessions you created remain so their other members keep
        them, but they are no longer linked to you.
      </P>
      <P>
        Reports are deleted once they have been dealt with and no longer needed, and at the latest
        after 12 months. Copies in database backups are overwritten within{' '}
        <Value value={BACKUP_RETENTION} label="backup retention period" />. Our providers delete
        server logs automatically, normally within 7 days.
      </P>

      <H2 id="delete">10. Deleting your account</H2>
      <P>You can delete your account in two ways:</P>
      <UL>
        <li>
          <strong>In the app:</strong> Settings → Delete account. Deletion is immediate and cannot be
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
        <li>withdraw a consent you gave, at any time, with effect for the future (Art. 7(3))</li>
      </UL>
      <P>To use any of these rights, email {mail}.</P>
      <H3>Right to object (Art. 21 GDPR)</H3>
      <P>
        <strong>
          Where we process your data on the basis of our legitimate interests (Art. 6(1)(f) GDPR), you
          may object at any time on grounds relating to your particular situation. We will then stop
          unless we can show compelling legitimate grounds that override your interests. You can object
          to the weekly email at any time, without giving a reason, by switching it off.
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
        Sporvy is for people aged 16 and over. We do not knowingly process data of younger people. If
        you believe a child under 16 uses Sporvy, tell us at {mail} and we will delete the account.
      </P>

      <H2 id="changes">13. Changes to this policy</H2>
      <P>
        We will update this policy when the app changes how it uses data. Significant changes will be
        announced in the app. See also our <Link className="text-gray-900 underline" to="/terms">Terms of
        Use</Link> and <Link className="text-gray-900 underline" to="/impressum">Impressum</Link>.
      </P>
    </LegalLayout>
  );
}
