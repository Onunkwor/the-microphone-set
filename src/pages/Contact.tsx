import { useState } from "react";
import { Mail, MessageSquare, Phone, MapPin, Loader2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { contactApi } from "@/services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const result = await contactApi.submit(formData);
      setSubmitStatus({ type: "success", message: result.message });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus({ type: "error", message: error instanceof Error ? error.message : "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactMethods = [
    { icon: Mail, title: "Email Us", description: "Send us an email anytime", value: "themicrophoneset@gmail.com", href: "mailto:themicrophoneset@gmail.com", rotation: -1 },
    { icon: MessageSquare, title: "Live Chat", description: "Chat with our team", value: "Mon-Fri, 9am-5pm EST", href: "#", rotation: 0.5 },
    { icon: Phone, title: "Call Us", description: "Give us a call", value: "+234 704 066 5597", href: "tel:+2347040665597", rotation: -0.5 },
  ];

  return (
    <div className="bg-paper text-ink overflow-hidden">
      {/* Hero */}
      <section className="pt-16 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <span
            className="inline-block bg-ink text-paper font-typewriter text-[11px] uppercase tracking-[3px] px-4 py-1.5 mb-6"
            style={{ transform: "rotate(-2deg)" }}
          >
            Get in Touch
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-ink mb-6">
            Let&apos;s
            <br />
            <span className="inline-block bg-cutout-red text-paper px-4 py-1 relative cutout-border" style={{ transform: "rotate(-1.5deg)" }}>
              Connect
            </span>
          </h1>
          <p className="font-body text-lg text-ink/60 max-w-xl leading-relaxed border-l-[3px] border-ink pl-4">
            Have a question, suggestion, or just want to say hi? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-6 md:px-12 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, i) => (
            <a
              key={method.title}
              href={method.href}
              className="group relative bg-paper-white p-6 border-2 border-ink/10 hover:border-ink hover:shadow-hard transition-all duration-300 no-underline text-ink block"
              style={{ transform: `rotate(${method.rotation}deg)` }}
            >
              <div className="absolute w-12 h-3.5 bg-cutout-yellow/70 top-[-7px] left-6 z-10" style={{ transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)` }} />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ink flex items-center justify-center shrink-0 group-hover:bg-cutout-red transition-colors duration-300">
                  <method.icon className="w-5 h-5 text-paper" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-ink mb-1">{method.title}</h3>
                  <p className="font-body text-xs text-ink/40 mb-2">{method.description}</p>
                  <p className="font-typewriter text-sm text-ink">{method.value}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-6 md:px-12 bg-paper-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2 relative bg-paper p-8 md:p-10 border-2 border-ink/10" style={{ transform: "rotate(-0.3deg)" }}>
            <div className="absolute w-16 h-5 bg-cutout-yellow/70 top-[-10px] left-8 z-10" style={{ transform: "rotate(-3deg)" }} />
            <div className="absolute w-14 h-4 bg-cutout-yellow/70 top-[-8px] right-12 z-10" style={{ transform: "rotate(2deg)" }} />

            <span className="inline-block bg-cutout-red text-paper font-typewriter text-xs uppercase tracking-[3px] px-3 py-1 mb-4" style={{ transform: "rotate(-1deg)" }}>
              Send a Message
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-2">
              We&apos;d love to hear
            </h2>
            <p className="font-display text-3xl md:text-4xl text-ink/30 mb-8">from you</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-typewriter text-xs uppercase tracking-wider text-ink/60 mb-2">Your Name</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3 bg-paper-white border-2 border-ink/20 font-body text-sm focus:outline-none focus:border-cutout-red transition-colors placeholder:text-ink/20"
                    placeholder="John Doe" required
                  />
                </div>
                <div>
                  <label className="block font-typewriter text-xs uppercase tracking-wider text-ink/60 mb-2">Email Address</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 bg-paper-white border-2 border-ink/20 font-body text-sm focus:outline-none focus:border-cutout-red transition-colors placeholder:text-ink/20"
                    placeholder="john@example.com" required
                  />
                </div>
              </div>

              <div>
                <label className="block font-typewriter text-xs uppercase tracking-wider text-ink/60 mb-2">Subject</label>
                <select
                  name="subject" value={formData.subject} onChange={handleChange}
                  className="w-full px-4 py-3 bg-paper-white border-2 border-ink/20 font-body text-sm focus:outline-none focus:border-cutout-red transition-colors"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="playlist">Playlist Submission</option>
                  <option value="interview">Interview Request</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-typewriter text-xs uppercase tracking-wider text-ink/60 mb-2">Message</label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} rows={5}
                  className="w-full px-4 py-3 bg-paper-white border-2 border-ink/20 font-body text-sm focus:outline-none focus:border-cutout-red transition-colors resize-none placeholder:text-ink/20"
                  placeholder="Tell us what's on your mind..." required
                />
              </div>

              {submitStatus && (
                <div className={`p-4 border-2 border-dashed font-body text-sm flex items-center gap-3 ${
                  submitStatus.type === "success"
                    ? "border-green-600/30 bg-green-50 text-green-800"
                    : "border-cutout-red/30 bg-cutout-red/5 text-cutout-red"
                }`}>
                  {submitStatus.type === "success" && <CheckCircle className="w-5 h-5 shrink-0" />}
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-typewriter text-sm uppercase tracking-[2px] px-8 py-4 border-[3px] transition-all duration-200 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-ink/50 text-paper/50 border-ink/50 cursor-not-allowed"
                    : "bg-ink text-paper border-ink shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 cursor-pointer"
                }`}
                style={{ transform: "rotate(-0.5deg)" }}
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-paper p-6 border-2 border-ink/10" style={{ transform: "rotate(0.5deg)" }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ink flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-paper" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-ink mb-2">Our Office</h3>
                  <p className="font-body text-ink/60 text-sm leading-relaxed">
                    Primewater Gardens 2<br />
                    Freedom Way, Lekki<br />
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-paper p-6 border-2 border-ink/10" style={{ transform: "rotate(-0.5deg)" }}>
              <h3 className="font-display text-lg text-ink mb-4">Follow Us</h3>
              <div className="space-y-3">
                {[
                  { name: "Instagram", handle: "@themicrophoneset" },
                  { name: "Twitter", handle: "@MicrophoneSet" },
                  { name: "YouTube", handle: "The Microphone Set" },
                ].map((social) => (
                  <div key={social.name} className="flex items-center gap-3 p-2 border border-ink/10 hover:border-ink hover:shadow-hard transition-all duration-200 cursor-pointer">
                    <div className="font-typewriter text-sm text-ink">{social.name}</div>
                    <div className="font-body text-xs text-ink/40">{social.handle}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-cutout-yellow/20 p-6 border-2 border-dashed border-ink/20" style={{ transform: "rotate(1deg)" }}>
              <h3 className="font-display text-lg text-ink mb-4">Business Hours</h3>
              <div className="space-y-2 font-typewriter text-xs">
                <div className="flex justify-between"><span className="text-ink/60">Mon - Fri</span><span className="text-ink">9AM - 6PM</span></div>
                <div className="flex justify-between"><span className="text-ink/60">Saturday</span><span className="text-ink">10AM - 4PM</span></div>
                <div className="flex justify-between"><span className="text-ink/60">Sunday</span><span className="text-ink">Closed</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #f5f0e8 1px, transparent 0)`, backgroundSize: "32px 32px" }} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-paper mb-6">
            Looking for
            <br />
            <span className="inline-block bg-cutout-red text-paper px-4 py-1 mt-2" style={{ transform: "rotate(-1deg)" }}>
              Quick Answers?
            </span>
          </h2>
          <p className="font-body text-paper/50 text-lg mb-10 max-w-xl mx-auto">
            Check out our blog for insights about music, playlists, and our community.
          </p>
          <Link
            to="/blog"
            className="inline-block font-typewriter text-sm uppercase tracking-[2px] px-8 py-4 bg-paper text-ink border-[3px] border-paper shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 transition-all duration-200 no-underline"
            style={{ transform: "rotate(-1deg)" }}
          >
            Visit Blog
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;
