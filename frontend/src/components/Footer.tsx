import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";
import navLogo from "@/assets/navlogo.png";

export function Footer() {
  return (
    <footer className="relative bg-indigo text-indigo-foreground overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-purple-950 flex items-center justify-center">
                <img src={navLogo} alt="Nova Exams Logo" className="w-8 h-8" />
              </div>
              <span className="font-display font-bold text-xl">
                <span className="text-primary">Nova</span>
                <span className="text-indigo-foreground"> Exams</span>
              </span>
            </Link>
            <p className="text-indigo-foreground/80 text-sm leading-relaxed">
              Your trusted partner for international exam preparation and
              booking services. We streamline your exam journey with expert
              guidance.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-primary">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                "Home",
                "About Us",
                "Blog",
                "Resources",
                "Contact Us",
                "Book Now",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to={
                      link === "Book Now"
                        ? "/booking"
                        : `/${link
                            .toLowerCase()
                            .replace(" ", "-")
                            .replace("home", "")}`
                    }
                    className="nav-link text-indigo-foreground/80 transition-colors text-sm hover:text-yellow-400"
                  >
                    {link.split("").map((char, i) => (
                      <span key={i} className="drop-char">
                        {char}
                      </span>
                    ))}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-primary">
              Exams Offered
            </h4>
            <ul className="space-y-3">
              {["Duolingo", "TOEFL", "IELTS", "TOLC", "GRE", "GMAT"].map(
                (exam) => (
                  <li key={exam}>
                    <span className="text-indigo-foreground/80 text-sm">
                      {exam}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-primary">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-indigo-foreground/80">
                <a
                  href="mailto:astronomer291@gmail.com"
                  className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                >
                  {" "}
                  <Mail className="w-4 h-4 text-primary" />{" "}
                  <span>astronomer291@gmail.com</span>{" "}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-indigo-foreground/80">
                <a
                  href="tel:+251949700013"
                  className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+251 949700013</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-indigo-foreground/80">
                <a
                  href="https://www.google.com/maps/place/Nur+plaza+%2F+%E1%8A%91%E1%88%AD+%E1%8D%95%E1%88%8B%E1%8B%9B/@9.0036896,38.619998,13z/data=!4m10!1m2!2m1!1sNur+Plaza,+Bethel+Area,+Addis+Ababa,+Ethiopia!3m6!1s0x164b870017ae74a5:0x16040086b8193c6!8m2!3d9.0036896!4d38.6920958!15sCi1OdXIgUGxhemEsIEJldGhlbCBBcmVhLCBBZGRpcyBBYmFiYSwgRXRoaW9waWGSAQ9zaG9wcGluZ19jZW50ZXLgAQA!16s%2Fg%2F11xrpg707x?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Nur Plaza, Bethel Area, Addis Ababa</span>
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.youtube.com/@NovaGlobalExams"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-indigo-foreground/10 flex items-center justify-center 
        hover:bg-primary hover:text-primary-foreground 
        transition-transform duration-300 ease-in-out"
              >
                <Youtube className="w-4 h-4 transform hover:rotate-12" />
              </a>

              <a
                href="https://t.me/NovaExamService"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-indigo-foreground/10 flex items-center justify-center 
        hover:bg-primary hover:text-primary-foreground 
        transition-transform duration-300 ease-in-out"
              >
                <MessageCircle className="w-4 h-4 transform hover:rotate-12" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=astronomer291@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-indigo-foreground/10 flex items-center justify-center 
        hover:bg-primary hover:text-primary-foreground 
        transition-transform duration-300 ease-in-out"
              >
                <Mail className="w-4 h-4 transform hover:rotate-12" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-indigo-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-indigo-foreground/60">
            © {new Date().getFullYear()} Nova Exams. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link
              to="/privacy"
              className="text-indigo-foreground/60 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-indigo-foreground/60 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
