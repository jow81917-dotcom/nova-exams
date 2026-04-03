import { ArrowLeft, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import navLogo from "@/assets/navlogo.png";

function TermsPage() {
  return (
    <div className="min-h-screen py-16 px-5">
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="flex items-center space-x-2 rounded-md px-3 py-2 bg-muted text-muted-foreground hover:bg-primary transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back</span>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-[hsl(var(--secondary))]">
          Terms of Service
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-8">
          Last updated: January 18, 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing or using this website and its services, you agree to
              be legally bound by these Terms of Service. If you do not agree,
              you must not use the Service.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              2. Services Description
            </h2>
            <p>
              Nova Exams provides English proficiency exam preparation and
              mentorship services, mock testing tools, and exam facilitation.
              Nova Exams is not an official exam body unless expressly stated.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              3. Eligibility
            </h2>
            <p>
              You must be legally capable of entering into binding agreements.
              Minors may use the Service only with parental consent.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              4. User Obligations
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>No false or misleading information</li>
              <li>No cheating or academic misconduct</li>
              <li>No circumvention of security</li>
              <li>No unlawful use</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              5. Fees, Payments, and Refunds
            </h2>
            <p>
              Fees are disclosed prior to purchase. Payments are final unless
              explicitly stated otherwise. Nova Exams does not guarantee exam
              results.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              6. Intellectual Property Rights
            </h2>
            <p>
              All content and trademarks are owned by or licensed to Nova Exams.
              Unauthorized use is prohibited.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              7. Disclaimers
            </h2>
            <p>
              The Service is provided “as is” and “as available.” We do not
              warrant uninterrupted access or specific outcomes.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              8. Limitation of Liability
            </h2>
            <p>
              Nova Exams shall not be liable for indirect losses, exam outcomes,
              or technical failures beyond reasonable control.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              9. Termination
            </h2>
            <p>
              We may suspend or terminate access for violations of these Terms.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              10. Governing Law and Jurisdiction
            </h2>
            <p>
              These Terms are governed by the laws of Ethiopia, subject to
              mandatory consumer protection rights.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              11. Amendments
            </h2>
            <p>
              We may amend these Terms at any time. Continued use constitutes
              acceptance of the revised Terms.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              12. Contact
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-950 flex items-center justify-center">
                  <img
                    src={navLogo}
                    alt="Nova Exams Logo"
                    className="w-3 h-3"
                  />
                </div>
                <p className="font-display text-sm text-black">Nova Exams</p>
              </div>
              <p className="flex items-center gap-1">
                <Mail className="w-4 h-4 text-[hsl(var(--secondary))]" />
                <a
                  href="mailto:astronomer291@gmail.com"
                  className="hover:underline hover:text-[hsl(var(--secondary))] transition-colors"
                >
                  astronomer291@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[hsl(var(--secondary))]" />
                <a
                  href="tel:+251949700013"
                  className="hover:underline hover:text-[hsl(var(--secondary))] transition-colors"
                >
                  +251 949700013
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
