import { Link } from "wouter";
import { Facebook, Heart, Instagram, Linkedin, Mail, Phone, ShieldCheck } from "lucide-react";
import { navItems } from "@/constants/navigation";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[#011330] text-white">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-[1.3fr_.7fr_.9fr] md:py-20">
        <div>
          <Logo light />
          <p className="mt-7 max-w-xs text-sm leading-7 text-[#b9c1c6]">
            Connecting You to the Right Path.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#BA780E]/35 bg-[#BA780E]/10 px-3.5 py-1.5 text-xs uppercase tracking-[.12em] text-[#BA780E]">
            <ShieldCheck size={14} /> No Commission From Your Job
          </p>
        </div>
        <div>
          <p className="eyebrow text-[#BA780E]">Explore</p>
          <div className="mt-5 flex flex-col items-start gap-3 text-sm text-[#d7dcdf]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[#BA780E]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow text-[#BA780E]">Contact</p>
          <div className="mt-5 flex flex-col items-start gap-3 text-sm text-[#d7dcdf]">
            <a
              href="tel:+18084003068"
              data-testid="link-footer-phone"
              className="inline-flex items-center gap-2 transition-colors hover:text-[#BA780E]"
            >
              <Phone size={14} className="text-[#BA780E]" /> +1808-400-3068
            </a>
            <a
              href="mailto:info@inclinedcareers.in"
              data-testid="link-footer-email"
              className="inline-flex items-center gap-2 transition-colors hover:text-[#BA780E]"
            >
              <Mail size={14} className="text-[#BA780E]" /> info@inclinedcareers.in
            </a>
            <span className="text-[#b9c1c6]">Hyderabad, India</span>
            <div className="mt-3 flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                data-testid="link-facebook"
                className="transition-colors hover:text-[#BA780E]"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/inclinedcareers?igsi=eWZvenZ6bHFtaXA5"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                data-testid="link-instagram"
                className="transition-colors hover:text-[#BA780E]"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn placeholder"
                data-testid="link-linkedin"
                className="transition-colors hover:text-[#BA780E]"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-center gap-3 py-6 text-xs text-[#98a9b5] sm:flex-row sm:justify-between">
          <span>© 2026 Inclined Careers. All rights reserved.</span>

          <div className="flex justify-center items-center gap-1">
            Made with <Heart className="inline h-4 w-4 text-red-500 mx-1" /> by
            <a
              href="https://staffarc.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-orange-600 hover:underline"
            >
              <img
                src="https://www.staffarc.in/images/Staffarc-logo.png"
                alt="StaffArc logo"
                className="h-5 w-5 object-contain"
              />
              StaffArc
            </a>
          </div>

          <span className="text-[.68rem] uppercase tracking-[.14em]">Connecting You to the Right Path.</span>
        </div>
      </div>
    </footer>
  );
}
