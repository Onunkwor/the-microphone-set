import { Mail, MessageSquare, Send, MapPin, Phone, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email anytime",
      value: "themicrophoneset@gmail.com",
      href: "mailto:themicrophoneset@gmail.com",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our team",
      value: "Mon-Fri, 9am-5pm EST",
      href: "#",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Give us a call",
      value: "+234 704 066 5597",
      href: "tel:+2347040665597",
    },
  ];

  const socialLinks = [
    { icon: Instagram, name: "Instagram", handle: "@themicrophoneset", href: "#" },
    { icon: Twitter, name: "Twitter", handle: "@MicrophoneSet", href: "#" },
    { icon: Youtube, name: "YouTube", handle: "The Microphone Set", href: "#" },
  ];

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-6 md:px-12">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#3b82f6]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#3b82f6]/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-8">
              <MessageSquare className="w-4 h-4 text-[#3b82f6]" />
              <span className="text-sm text-gray-600 font-medium tracking-wide uppercase">
                Get in Touch
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight text-gray-900 mb-6">
              Let's
              <br />
              <span className="text-[#3b82f6]">Connect</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
              Have a question, suggestion, or just want to say hi? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {contactMethods.map((method, index) => (
              <a
                key={method.title}
                href={method.href}
                className="group block p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#3b82f6]/30 transition-all duration-500"
              >
                <div className="flex items-start gap-5">
                  <span className="text-4xl font-bold text-gray-100 group-hover:text-[#3b82f6]/20 transition-colors duration-500">
                    0{index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center group-hover:bg-[#3b82f6] transition-colors duration-300 mb-4">
                      <method.icon className="w-6 h-6 text-[#3b82f6] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-500 text-sm mb-3">{method.description}</p>
                    <p className="text-gray-900 font-medium">{method.value}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#3b82f6] group-hover:translate-x-2 transition-all duration-300 mt-2" />
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form & Info */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="p-8 md:p-10 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <span className="text-[#3b82f6] text-sm font-semibold uppercase tracking-widest">
                  Send a Message
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-8 text-gray-900">
                  We'd love to hear
                  <br />
                  <span className="text-gray-400">from you</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us what's on your mind..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#3b82f6] text-white hover:bg-[#2563eb] rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_#3b82f640]"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Location */}
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#3b82f6]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Our Office</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Primewater Gardens 2
                      <br />
                      Freedom Way, Lekki
                      <br />
                      Lagos, Nigeria
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Follow Us</h3>
                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-[#3b82f6]/30 hover:bg-[#3b82f6]/5 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-[#3b82f6] transition-colors duration-300">
                        <social.icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{social.name}</div>
                        <div className="text-sm text-gray-500">{social.handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Business Hours</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium text-gray-900">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium text-gray-900">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-gray-900">Closed</span>
                  </div>
                  <p className="text-xs text-gray-500 pt-2 border-t border-gray-200 mt-3">
                    All times in Eastern Standard Time (EST)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden bg-[#3b82f6]">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Looking for
            <br />
            Quick Answers?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto">
            Check out our FAQ section for commonly asked questions about playlists, interviews, and more.
          </p>
          <Button
            size="lg"
            className="bg-white text-[#3b82f6] hover:bg-gray-100 rounded-full px-10 py-7 text-lg font-bold shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            Visit FAQ
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
