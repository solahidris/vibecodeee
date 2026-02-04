import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/landing/Footer'

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-32 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-5xl font-black text-zinc-900">Cookie Policy</h1>
        <p className="mb-12 text-lg text-zinc-600">Last updated: February 4, 2026</p>

        <div className="prose prose-zinc max-w-none">
          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">1. Introduction</h2>
            <p className="mb-4 leading-relaxed text-zinc-700">
              This Cookie Policy explains how VibeCodeee ("we," "us," or "our") uses cookies and similar tracking technologies when you visit our website and use our services. This policy should be read in conjunction with our Privacy Policy and Terms of Service.
            </p>
            <p className="leading-relaxed text-zinc-700">
              By continuing to use our platform, you consent to our use of cookies and tracking technologies as described in this policy. You can control and manage cookies through your browser settings as detailed below.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">2. What Are Cookies?</h2>
            <p className="mb-4 leading-relaxed text-zinc-700">
              Cookies are small text files that are placed on your device (computer, smartphone, tablet, etc.) when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and provide information to website owners.
            </p>
            <p className="leading-relaxed text-zinc-700">
              Cookies typically contain a unique identifier, the name of the website that placed it, and some data related to your visit. They help websites remember your preferences, recognize you on return visits, and analyze how you interact with the site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">3. Types of Cookies We Use</h2>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">3.1 Strictly Necessary Cookies</h3>
            <p className="mb-4 leading-relaxed text-zinc-700">
              These cookies are essential for our platform to function properly. They enable core functionality such as security, network management, authentication, and accessibility. You cannot opt out of these cookies as they are necessary to provide our services.
            </p>
            <div className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="mb-2 font-semibold text-zinc-900">Examples:</p>
              <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                <li>Session cookies for authentication and account access</li>
                <li>Security cookies to prevent fraudulent activity</li>
                <li>Load balancing cookies to distribute traffic efficiently</li>
                <li>Cookie consent preferences</li>
              </ul>
            </div>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">3.2 Performance and Analytics Cookies</h3>
            <p className="mb-4 leading-relaxed text-zinc-700">
              These cookies collect information about how visitors use our platform, such as which pages are visited most often, how long users spend on pages, and any error messages encountered. This data helps us improve the performance and functionality of our services.
            </p>
            <div className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="mb-2 font-semibold text-zinc-900">Examples:</p>
              <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                <li>Google Analytics cookies for traffic analysis</li>
                <li>Error tracking cookies for debugging</li>
                <li>Performance monitoring cookies</li>
                <li>A/B testing cookies for feature optimization</li>
              </ul>
            </div>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">3.3 Functionality Cookies</h3>
            <p className="mb-4 leading-relaxed text-zinc-700">
              These cookies allow our platform to remember choices you make (such as your language preference, theme selection, or region) and provide enhanced, personalized features. They may also be used to provide services you have requested, such as watching a video or commenting on content.
            </p>
            <div className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="mb-2 font-semibold text-zinc-900">Examples:</p>
              <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                <li>User preference cookies (theme, language, timezone)</li>
                <li>Video player settings and playback preferences</li>
                <li>Recently viewed content tracking</li>
                <li>Saved search filters and sorting preferences</li>
              </ul>
            </div>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">3.4 Targeting and Advertising Cookies</h3>
            <p className="mb-4 leading-relaxed text-zinc-700">
              These cookies may be set by us or our advertising partners to build a profile of your interests and show you relevant advertisements on other websites. They track your browsing activity across different sites and can identify you when you visit partner sites.
            </p>
            <div className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="mb-2 font-semibold text-zinc-900">Examples:</p>
              <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                <li>Advertising network cookies (Google Ads, Facebook Pixel)</li>
                <li>Retargeting cookies for personalized ads</li>
                <li>Conversion tracking cookies</li>
                <li>Social media platform cookies</li>
              </ul>
            </div>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">3.5 Social Media Cookies</h3>
            <p className="leading-relaxed text-zinc-700">
              These cookies enable you to share content from our platform on social media networks and allow social media platforms to track your activity across the web. They are set by social media companies when you use their sharing features or interact with social media content embedded on our site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">4. First-Party vs. Third-Party Cookies</h2>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">4.1 First-Party Cookies</h3>
            <p className="mb-6 leading-relaxed text-zinc-700">
              First-party cookies are set directly by VibeCodeee and are used exclusively by us. These cookies help us provide core functionality, remember your preferences, and analyze how you use our platform. We have full control over these cookies and the data they collect.
            </p>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">4.2 Third-Party Cookies</h3>
            <p className="leading-relaxed text-zinc-700">
              Third-party cookies are set by external services we use on our platform, such as analytics providers, advertising networks, and social media platforms. These cookies are controlled by the third-party providers, and their use is subject to the third party's privacy policies. We do not control these cookies but use them to enhance your experience and provide better services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">5. How Long Do Cookies Last?</h2>
            <p className="mb-4 leading-relaxed text-zinc-700">
              Cookies can be classified based on their lifespan:
            </p>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">5.1 Session Cookies</h3>
            <p className="mb-6 leading-relaxed text-zinc-700">
              Session cookies are temporary and are deleted when you close your browser. They are essential for basic functionality, such as keeping you logged in as you navigate between pages during a single browsing session.
            </p>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">5.2 Persistent Cookies</h3>
            <p className="mb-4 leading-relaxed text-zinc-700">
              Persistent cookies remain on your device for a set period (ranging from days to years) or until you manually delete them. They are used to remember your preferences across multiple visits and provide features like "Remember Me" functionality.
            </p>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="mb-2 font-semibold text-zinc-900">Typical Duration:</p>
              <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                <li>Authentication cookies: 30 days</li>
                <li>Preference cookies: 1 year</li>
                <li>Analytics cookies: 2 years</li>
                <li>Advertising cookies: 90 days to 1 year</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">6. Other Tracking Technologies</h2>
            <p className="mb-4 leading-relaxed text-zinc-700">
              In addition to cookies, we may use other tracking technologies:
            </p>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">6.1 Web Beacons (Pixels)</h3>
            <p className="mb-6 leading-relaxed text-zinc-700">
              Web beacons are tiny transparent images embedded in web pages or emails that track whether content has been viewed. They are often used in combination with cookies to measure campaign effectiveness and user engagement.
            </p>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">6.2 Local Storage</h3>
            <p className="mb-6 leading-relaxed text-zinc-700">
              HTML5 local storage allows websites to store larger amounts of data locally on your device. Unlike cookies, local storage data is not automatically sent with every HTTP request, making it more efficient for certain types of data storage.
            </p>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">6.3 Device Fingerprinting</h3>
            <p className="leading-relaxed text-zinc-700">
              Device fingerprinting creates a unique identifier for your device based on its configuration (browser type, screen resolution, installed fonts, etc.). This technique can be used for security purposes and to prevent fraud.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">7. Managing Your Cookie Preferences</h2>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">7.1 Browser Settings</h3>
            <p className="mb-4 leading-relaxed text-zinc-700">
              Most web browsers allow you to control cookies through their settings. You can configure your browser to:
            </p>
            <ul className="mb-6 list-disc pl-8 space-y-2 text-zinc-700">
              <li>Block all cookies</li>
              <li>Block third-party cookies only</li>
              <li>Delete cookies after each browsing session</li>
              <li>Receive notifications when cookies are being set</li>
              <li>Delete existing cookies</li>
            </ul>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">7.2 Browser-Specific Instructions</h3>
            <div className="mb-6 space-y-4">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="mb-2 font-semibold text-zinc-900">Google Chrome</p>
                <p className="text-zinc-700">Settings → Privacy and security → Cookies and other site data</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="mb-2 font-semibold text-zinc-900">Mozilla Firefox</p>
                <p className="text-zinc-700">Settings → Privacy & Security → Cookies and Site Data</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="mb-2 font-semibold text-zinc-900">Safari</p>
                <p className="text-zinc-700">Preferences → Privacy → Cookies and website data</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="mb-2 font-semibold text-zinc-900">Microsoft Edge</p>
                <p className="text-zinc-700">Settings → Privacy, search, and services → Cookies and site permissions</p>
              </div>
            </div>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">7.3 Opt-Out Tools</h3>
            <p className="mb-4 leading-relaxed text-zinc-700">
              You can opt out of certain types of cookies using industry tools:
            </p>
            <ul className="mb-6 list-disc pl-8 space-y-2 text-zinc-700">
              <li><strong>Google Analytics:</strong> Use the Google Analytics Opt-out Browser Add-on</li>
              <li><strong>Advertising:</strong> Visit the Digital Advertising Alliance or Network Advertising Initiative opt-out pages</li>
              <li><strong>Social Media:</strong> Adjust privacy settings in your social media accounts</li>
            </ul>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">7.4 Impact of Disabling Cookies</h3>
            <p className="leading-relaxed text-zinc-700">
              Please note that if you disable or delete cookies, some features of our platform may not function properly. You may experience reduced functionality, loss of personalization, and may need to re-enter information more frequently. Strictly necessary cookies cannot be disabled as they are essential for the platform to operate.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">8. Specific Cookie Information</h2>
            <p className="mb-4 leading-relaxed text-zinc-700">
              Below is a list of the main cookies we use on our platform:
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-zinc-200 p-6">
                <h4 className="mb-2 text-lg font-bold text-zinc-900">Authentication Cookie</h4>
                <div className="space-y-1 text-sm text-zinc-700">
                  <p><strong>Name:</strong> sb-auth-token</p>
                  <p><strong>Purpose:</strong> Maintains your login session</p>
                  <p><strong>Type:</strong> First-party, Session</p>
                  <p><strong>Duration:</strong> Session or 30 days (if "Remember Me" is selected)</p>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 p-6">
                <h4 className="mb-2 text-lg font-bold text-zinc-900">Preference Cookie</h4>
                <div className="space-y-1 text-sm text-zinc-700">
                  <p><strong>Name:</strong> user-preferences</p>
                  <p><strong>Purpose:</strong> Stores your theme, language, and display preferences</p>
                  <p><strong>Type:</strong> First-party, Persistent</p>
                  <p><strong>Duration:</strong> 1 year</p>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 p-6">
                <h4 className="mb-2 text-lg font-bold text-zinc-900">Analytics Cookie</h4>
                <div className="space-y-1 text-sm text-zinc-700">
                  <p><strong>Name:</strong> _ga, _gid</p>
                  <p><strong>Purpose:</strong> Google Analytics tracking for usage statistics</p>
                  <p><strong>Type:</strong> Third-party, Persistent</p>
                  <p><strong>Duration:</strong> 2 years (_ga), 24 hours (_gid)</p>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 p-6">
                <h4 className="mb-2 text-lg font-bold text-zinc-900">Cookie Consent</h4>
                <div className="space-y-1 text-sm text-zinc-700">
                  <p><strong>Name:</strong> cookie-consent</p>
                  <p><strong>Purpose:</strong> Records your cookie consent preferences</p>
                  <p><strong>Type:</strong> First-party, Persistent</p>
                  <p><strong>Duration:</strong> 1 year</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">9. Do Not Track Signals</h2>
            <p className="leading-relaxed text-zinc-700">
              Some browsers have a "Do Not Track" (DNT) feature that signals websites that you do not want to have your online activities tracked. Currently, there is no universal standard for how websites should respond to DNT signals. At this time, our platform does not respond to DNT signals, but we are monitoring developments in this area and may adjust our practices in the future.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">10. Updates to This Cookie Policy</h2>
            <p className="leading-relaxed text-zinc-700">
              We may update this Cookie Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. We will notify you of any material changes by posting the updated policy on our platform and updating the "Last updated" date. We encourage you to review this policy periodically to stay informed about how we use cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">11. Contact Us</h2>
            <p className="mb-4 leading-relaxed text-zinc-700">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
              <p className="mb-4 text-zinc-900 font-semibold">VibeCodeee</p>
              <p className="mb-2 text-zinc-700">WhatsApp: +60 18-293 4765</p>
              <a
                href="https://wa.me/60182934765"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-green-600"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Message on WhatsApp
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
