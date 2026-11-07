"use client";
import { useRef, useState } from "react";
import { ArrowUpRight, Loader2, Mail, MapPin, Send } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { CONTACT_LIMITS, validateContact } from "@/lib/contact-validation";
import { siteConfig } from "@/config/site";
const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
};
export default function Contact() {
  const [loading, setLoading] = useState(false);
  const submitting = useRef(false);
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  async function sendEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(
      ["name", "email", "message"].map((key) => [
        key,
        String(data.get(key) ?? "").trim(),
      ]),
    );
    const validation = validateContact(values);
    if (!validation.success) {
      setStatus({ success: false, message: validation.message });
      return;
    }
    submitting.current = true;
    setLoading(true);
    setStatus(null);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validation.values,
          website: String(data.get("website") ?? ""),
        }),
        signal: AbortSignal.timeout(30_000),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setStatus({
          success: false,
          message:
            result.message ||
            "Your message could not be sent. Please try again or email me directly.",
        });
        return;
      }
      setStatus({
        success: true,
        message: "Thanks for reaching out! Your message has been sent.",
      });
      form.reset();
    } catch {
      setStatus({
        success: false,
        message:
          "Your message could not be sent. Please try again or email me directly.",
      });
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  }
  return (
    <section className="section-band" id="contact">
      <div className="shell section">
        <div className="contact-grid">
          <div className="contact-copy">
            <span className="eyebrow">04 / GET IN TOUCH</span>
            <h2>
              Good things start
              <br />
              with a conversation<span className="blue-dot">.</span>
            </h2>
            <p>
              Have a project in mind, an opportunity to share, or just want to
              say hello? I’d love to hear from you.
            </p>
            <a className="email-link" href={`mailto:${siteConfig.email}`}>
              <Mail size={19} />
              <span>{siteConfig.email}</span>
              <ArrowUpRight size={17} />
            </a>
            <div className="social-links">
              {siteConfig.socials.map(({ id, label, url }) => {
                const Icon = socialIcons[id];
                return (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                  >
                    <Icon size={19} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
            <div className="location-card">
              <div>
                <MapPin size={16} />
                <span>Denpasar, Bali, Indonesia</span>
              </div>
              <iframe
                title="Location in Denpasar, Bali"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.4145083368517!2d115.2244157745681!3d-8.652068388013772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24083046234a3%3A0x6755e48bb38887b!2sJl.%20Pacar%20No.11%2C%20Sumerta%20Kauh%2C%20Kec.%20Denpasar%20Tim.%2C%20Kota%20Denpasar%2C%20Bali%2080236!5e0!3m2!1sid!2sid!4v1776054314117!5m2!1sid!2sid"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
          <div className="contact-form-card">
            <h3>Send a message</h3>
            <p className="contact-form-intro">
              Let’s make something great together.
            </p>
            <form onSubmit={sendEmail} aria-busy={loading}>
              <div className="honeypot" aria-hidden="true">
                <label htmlFor="contact-website">Leave this field empty</label>
                <input
                  id="contact-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <fieldset disabled={loading} className="contact-fields">
                <div className="form-field">
                  <label htmlFor="contact-name">Your name</label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder="How should I call you?"
                    required
                    maxLength={CONTACT_LIMITS.name}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email">Email address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    maxLength={CONTACT_LIMITS.email}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me a little about what you have in mind…"
                    rows={5}
                    required
                    maxLength={CONTACT_LIMITS.message}
                  />
                </div>
              </fieldset>
              <div aria-live="polite">
                {status && (
                  <p
                    className={status.success ? "form-success" : "form-error"}
                    role="status"
                  >
                    {status.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <Send />
                  </>
                )}
              </Button>
              <span className="form-note">
                Your details are only used to reply to your message.
              </span>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
