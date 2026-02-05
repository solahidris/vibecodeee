import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/landing/Footer'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-32 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-5xl font-black text-zinc-900">Privacy Policy</h1>
        <p className="mb-12 text-lg text-zinc-600">Last updated: February 4, 2026</p>

        <div className="prose prose-zinc max-w-none">
          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">1. Introduction</h2>
            <p className="mb-4 leading-relaxed text-zinc-700">
              Welcome to VibeCodeee ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.
            </p>
            <p className="leading-relaxed text-zinc-700">
              By using VibeCodeee, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">2. Information We Collect</h2>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">2.1 Personal Information</h3>
            <p className="mb-4 leading-relaxed text-zinc-700">
              We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products and services, or otherwise contact us. The personal information we collect may include:
            </p>
            <ul className="mb-6 list-disc pl-8 space-y-2 text-zinc-700">
              <li>Name and contact data (email address, phone number)</li>
              <li>Account credentials (username, password)</li>
              <li>Profile information (profile picture, bio, preferences)</li>
              <li>Payment information (processed securely through third-party payment processors)</li>
              <li>Communication data (messages, forum posts, comments)</li>
            </ul>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">2.2 Automatically Collected Information</h3>
            <p className="mb-4 leading-relaxed text-zinc-700">
              When you access our platform, we automatically collect certain information about your device and usage patterns, including:
            </p>
            <ul className="mb-6 list-disc pl-8 space-y-2 text-zinc-700">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages viewed, time spent, click patterns)</li>
              <li>Location data (approximate geographic location based on IP address)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">2.3 Information from Third Parties</h3>
            <p className="leading-relaxed text-zinc-700">
              We may receive information about you from third-party services such as Google OAuth when you choose to authenticate using these services. This may include your name, email address, and profile picture.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">3. How We Use Your Information</h2>
            <p className="mb-4 leading-relaxed text-zinc-700">
              We use the information we collect or receive for the following purposes:
            </p>
            <ul className="mb-6 list-disc pl-8 space-y-2 text-zinc-700">
              <li><strong>Account Management:</strong> To create and manage your user account and provide you with access to our services</li>
              <li><strong>Service Delivery:</strong> To provide, operate, and maintain our platform and deliver the content and features you request</li>
              <li><strong>Communication:</strong> To send you updates, newsletters, marketing materials, and other information that may be of interest to you</li>
              <li><strong>Personalization:</strong> To understand your preferences and personalize your experience on our platform</li>
              <li><strong>Analytics:</strong> To analyze usage patterns and trends to improve our services and develop new features</li>
              <li><strong>Security:</strong> To protect against fraud, unauthorized access, and other security threats</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
              <li><strong>Customer Support:</strong> To respond to your inquiries, provide technical support, and resolve issues</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">4. Information Sharing and Disclosure</h2>
            <p className="mb-4 leading-relaxed text-zinc-700">
              We may share your information in the following circumstances:
            </p>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">4.1 With Your Consent</h3>
            <p className="mb-6 leading-relaxed text-zinc-700">
              We may share your information with third parties when you have given us explicit consent to do so.
            </p>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">4.2 Service Providers</h3>
            <p className="mb-6 leading-relaxed text-zinc-700">
              We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer support. These service providers are contractually obligated to protect your information and use it only for the purposes we specify.
            </p>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">4.3 Legal Requirements</h3>
            <p className="mb-6 leading-relaxed text-zinc-700">
              We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, subpoenas, or government agencies).
            </p>

            <h3 className="mb-3 text-2xl font-semibold text-zinc-900">4.4 Business Transfers</h3>
            <p className="leading-relaxed text-zinc-700">
              If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or prominent notice on our platform of any change in ownership or use of your personal information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">5. Data Security</h2>
            <p className="mb-4 leading-relaxed text-zinc-700">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="mb-6 list-disc pl-8 space-y-2 text-zinc-700">
              <li>Encryption of data in transit and at rest using industry-standard protocols</li>
              <li>Regular security assessments and vulnerability testing</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Employee training on data protection and security practices</li>
              <li>Secure backup and disaster recovery procedures</li>
            </ul>
            <p className="leading-relaxed text-zinc-700">
              However, please note that no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">6. Data Retention</h2>
            <p className="leading-relaxed text-zinc-700">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it. The retention period may vary depending on the type of information and the purpose for which it was collected.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">7. Your Privacy Rights</h2>
            <p className="mb-4 leading-relaxed text-zinc-700">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="mb-6 list-disc pl-8 space-y-2 text-zinc-700">
              <li><strong>Access:</strong> You have the right to request access to the personal information we hold about you</li>
              <li><strong>Correction:</strong> You can request that we correct any inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> You may request deletion of your personal information, subject to certain legal exceptions</li>
              <li><strong>Portability:</strong> You have the right to receive your personal information in a structured, commonly used format</li>
              <li><strong>Objection:</strong> You can object to the processing of your personal information for certain purposes</li>
              <li><strong>Restriction:</strong> You may request that we restrict the processing of your information in certain circumstances</li>
              <li><strong>Withdraw Consent:</strong> Where we rely on your consent, you can withdraw it at any time</li>
            </ul>
            <p className="leading-relaxed text-zinc-700">
              To exercise any of these rights, please contact us using the information provided in the "Contact Us" section below. We will respond to your request within the timeframe required by applicable law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">8. Cookies and Tracking Technologies</h2>
            <p className="mb-4 leading-relaxed text-zinc-700">
              We use cookies and similar tracking technologies to collect and store information about your preferences and usage patterns. Cookies are small text files stored on your device that help us improve your experience on our platform. For more detailed information about how we use cookies, please refer to our Cookie Policy.
            </p>
            <p className="leading-relaxed text-zinc-700">
              You can control cookie preferences through your browser settings. However, disabling cookies may limit your ability to use certain features of our platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">9. Third-Party Links and Services</h2>
            <p className="leading-relaxed text-zinc-700">
              Our platform may contain links to third-party websites, applications, or services that are not operated by us. This Privacy Policy does not apply to these third-party services. We are not responsible for the privacy practices of third parties and encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">10. Children's Privacy</h2>
            <p className="leading-relaxed text-zinc-700">
              Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately. If we become aware that we have collected personal information from a child under 13 without parental consent, we will take steps to delete that information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">11. International Data Transfers</h2>
            <p className="leading-relaxed text-zinc-700">
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those of your country. When we transfer your information internationally, we implement appropriate safeguards to ensure your information remains protected in accordance with this Privacy Policy and applicable data protection laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">12. Changes to This Privacy Policy</h2>
            <p className="leading-relaxed text-zinc-700">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated policy on our platform and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically. Your continued use of our services after any changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">13. Contact Us</h2>
            <p className="mb-4 leading-relaxed text-zinc-700">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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

          <section>
            <h2 className="mb-4 text-3xl font-bold text-zinc-900">14. Additional Information for EU/EEA Residents</h2>
            <p className="mb-4 leading-relaxed text-zinc-700">
              If you are located in the European Union or European Economic Area, you have additional rights under the General Data Protection Regulation (GDPR):
            </p>
            <ul className="list-disc pl-8 space-y-2 text-zinc-700">
              <li>Right to lodge a complaint with your local data protection authority</li>
              <li>Right to know the legal basis for processing your information</li>
              <li>Right to object to automated decision-making, including profiling</li>
              <li>Right to be informed about the safeguards we use for international data transfers</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
