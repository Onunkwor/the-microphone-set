import { Mail, MessageSquare, Send, MapPin, Phone, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    // Add your form submission logic here
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
      value: "hello@themicrophoneset.com",
      href: "mailto:hello@themicrophoneset.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our team",
      value: "Available Mon-Fri, 9am-5pm EST",
      href: "#",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Give us a call",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
      color: "from-orange-500 to-red-500",
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      handle: "@themicrophoneset",
      href: "#",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: Twitter,
      name: "Twitter",
      handle: "@themicset",
      href: "#",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Youtube,
      name: "YouTube",
      handle: "The Microphone Set",
      href: "#",
      color: "from-red-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full border-4 border-black"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full border-8 border-black"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-black/5 rounded-full px-4 py-2 mb-6">
            <MessageSquare className="w-5 h-5 text-[var(--electric-blue)]" />
            <span className="text-sm font-medium">Get in Touch</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Let's <span className="gradient-ocean-text">Connect</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a question, suggestion, or just want to say hi? We'd love to
            hear from you.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method) => (
              <Card
                key={method.title}
                className={`p-8 hover-lift hover-glow border-0 bg-gradient-to-br ${method.color} text-white relative overflow-hidden group cursor-pointer`}
              >
                <a
                  href={method.href}
                  className="block relative z-10"
                >
                  <method.icon className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{method.title}</h3>
                  <p className="text-white/80 mb-2">{method.description}</p>
                  <p className="font-semibold">{method.value}</p>
                </a>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
              </Card>
            ))}
          </div>

          {/* Contact Form & Info */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 border-gray-200">
                <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--electric-blue)] focus:border-transparent"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--electric-blue)] focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--electric-blue)] focus:border-transparent"
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
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--electric-blue)] focus:border-transparent resize-none"
                      placeholder="Tell us what's on your mind..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gradient-bg-ocean text-white hover:opacity-90"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Location */}
              <Card className="p-6 border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--electric-blue)] to-[var(--vibrant-purple)] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Our Office</h3>
                    <p className="text-gray-600">
                      123 Music Street
                      <br />
                      Los Angeles, CA 90001
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </Card>

              {/* Social Media */}
              <Card className="p-6 border-gray-200">
                <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r ${social.color} text-white hover-lift transition-all`}
                    >
                      <social.icon className="w-5 h-5" />
                      <div>
                        <div className="font-semibold">{social.name}</div>
                        <div className="text-sm opacity-90">
                          {social.handle}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </Card>

              {/* Business Hours */}
              <Card className="p-6 border-gray-200 bg-gray-50">
                <h3 className="font-bold text-lg mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    * All times in Eastern Standard Time (EST)
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Looking for quick answers?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Check out our FAQ section for commonly asked questions
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-[var(--electric-blue)] text-[var(--electric-blue)] hover:bg-[var(--electric-blue)] hover:text-white"
          >
            Visit FAQ
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
