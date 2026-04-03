import { ArrowLeft, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-6">
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
          Privacy Policy
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-8">
          Last updated: January 18, 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              1. Introduction
            </h2>
            <p>
              Nova Exams (“we,” “us,” or “our”) operates this website and
              related services (collectively, the “Service”). This Privacy
              Policy describes how we collect, use, store, disclose, and protect
              personal data in compliance with applicable data protection laws,
              including the EU General Data Protection Regulation (GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              2. Data Controller
            </h2>
            <p>Nova Exams</p>
            <p className="flex items-center gap-2 mt-2">
              <a
                href="https://www.google.com/maps/place/Nur+plaza+%2F+%E1%8A%91%E1%88%AD+%E1%8D%95%E1%88%8B%E1%8B%9B/@9.0036896,38.619998,13z/data=!4m10!1m2!2m1!1sNur+Plaza,+Bethel+Area,+Addis+Ababa,+Ethiopia!3m6!1s0x164b870017ae74a5:0x16040086b8193c6!8m2!3d9.0036896!4d38.6920958!15sCi1OdXIgUGxhemEsIEJldGhlbCBBcmVhLCBBZGRpcyBBYmFiYSwgRXRoaW9waWGSAQ9zaG9wcGluZ19jZW50ZXLgAQA!16s%2Fg%2F11xrpg707x?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline hover:text-[hsl(var(--secondary))] transition-colors"
              >
                <MapPin className="w-4 h-4 text-[hsl(var(--secondary))]" />
                <span>
                  Nur Plaza, 7th Floor, Bethel Area, Addis Ababa, Ethiopia
                </span>
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[hsl(var(--secondary))]" />
              <a
                href="mailto:astronomer291@gmail.com"
                className="hover:underline hover:text-[hsl(var(--secondary))] transition-colors"
              >
                astronomer291@gmail.com
              </a>
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              3. Categories of Personal Data We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Identity and Contact Data</li>
              <li>Academic and Service Data</li>
              <li>Technical and Usage Data</li>
              <li>Payment Data</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              4. Legal Bases for Processing
            </h2>
            <p>
              We process personal data under lawful bases including contractual
              necessity, consent, legitimate interests, and legal obligations.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              5. How We Use Personal Data
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Deliver and manage exam services</li>
              <li>Process bookings and accounts</li>
              <li>Communicate service-related information</li>
              <li>Improve platform functionality</li>
              <li>Ensure security and prevent abuse</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              6. Cookies and Tracking
            </h2>
            <p>
              We use cookies for essential functionality and analytics. Where
              required by law, cookies are deployed only after user consent.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              7. Data Sharing
            </h2>
            <p>
              We may share data with hosting providers, analytics services, and
              payment processors. We do not sell personal data.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              8. International Transfers
            </h2>
            <p>
              Personal data may be processed outside your country of residence
              with appropriate safeguards.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              9. Data Retention
            </h2>
            <p>
              Data is retained only as long as necessary to fulfill obligations,
              meet legal requirements, and resolve disputes.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              10. Data Subject Rights
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access, rectify, or erase data</li>
              <li>Restrict or object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
              <li>Lodge a complaint</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              11. Data Security
            </h2>
            <p>
              We implement technical and organizational measures to protect
              personal data, but no online system can guarantee absolute
              security.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              12. Third-Party Websites
            </h2>
            <p>
              Our website may link to third-party sites. We are not responsible
              for their privacy practices.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              13. Policy Updates
            </h2>
            <p>
              We may update this Privacy Policy at any time. Material changes
              will be posted here.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--secondary))]">
              14. Contact
            </h2>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <a
                  href="https://www.google.com/maps/place/Nur+plaza+%2F+%E1%8A%91%E1%88%AD+%E1%8D%95%E1%88%8B%E1%8B%9B/@9.0036896,38.619998,13z/data=!4m10!1m2!2m1!1sNur+Plaza,+Bethel+Area,+Addis+Ababa,+Ethiopia!3m6!1s0x164b870017ae74a5:0x16040086b8193c6!8m2!3d9.0036896!4d38.6920958!15sCi1OdXIgUGxhemEsIEJldGhlbCBBcmVhLCBBZGRpcyBBYmFiYSwgRXRoaW9waWGSAQ9zaG9wcGluZ19jZW50ZXLgAQA!16s%2Fg%2F11xrpg707x?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline hover:text-[hsl(var(--secondary))] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[hsl(var(--secondary))]" />
                  <span>
                    Nur Plaza, 7th Floor, Bethel Area, Addis Ababa, Ethiopia
                  </span>
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[hsl(var(--secondary))]" />
                <a
                  href="mailto:astronomer291@gmail.com"
                  className="hover:underline hover:text-[hsl(var(--secondary))] transition-colors"
                >
                  astronomer291@gmail.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPage;
