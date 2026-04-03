import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { TelegramButton } from "@/components/TelegramButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Monitor,
  Users,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { motion } from "framer-motion";
const contactInfo = [
  { icon: Mail, label: "Email", value: "astronomer291@gmail.com" },
  { icon: Phone, label: "Phone", value: "+251 949700013" },
  { icon: MapPin, label: "Address", value: "Addis Ababa, Ethiopia" },
  { icon: Clock, label: "Hours", value: "Mon-Sat: 8AM - 6PM" },
];
const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description:
        "Thank you for reaching out to us. We appreciate your message!",
    });

    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };
  return (
    <div className="bg-background overflow-x-hidden">
      {" "}
      <Navbar bgColor="bg-gradient-secondary" />{" "}
      <main className="pt-20">
        {" "}
        <section className="py-24 bg-gradient-secondary">
          {" "}
          <div className="container mx-auto px-4 text-center">
            {" "}
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground mb-6"
              viewport={{ once: true }}
            >
              {" "}
              Contact <span className="text-primary">Us</span>{" "}
            </motion.h1>{" "}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-secondary-foreground/90 text-lg max-w-2xl mx-auto"
              viewport={{ once: true }}
            >
              {" "}
              Have questions? We're here to help. Reach out to us and we'll
              respond as soon as possible.{" "}
            </motion.p>{" "}
          </div>{" "}
        </section>{" "}
        <section className="py-24">
          {" "}
          <div className="container mx-auto px-4">
            {" "}
            <div className="grid lg:grid-cols-2 gap-12">
              {" "}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {" "}
                <h2 className="font-display text-2xl font-bold text-foreground mb-7 mt-15 ml-6 md:mt-20">
                  {" "}
                  Get in Touch{" "}
                </h2>{" "}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {" "}
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      whileHover={{ scale: 1.03 }}
                      viewport={{ once: true }}
                    >
                      {" "}
                      <Card className="bg-muted border-border shadow-md hover:shadow-lg transition-shadow">
                        {" "}
                        <CardContent className="p-4 flex items-center gap-4">
                          {" "}
                          <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-10 h-10 rounded-lg bg-gradient-secondary flex items-center justify-center shadow-sm"
                            viewport={{ once: true }}
                          >
                            {" "}
                            <item.icon className="w-5 h-5 text-secondary-foreground" />{" "}
                          </motion.div>{" "}
                          <div>
                            {" "}
                            <p className="text-sm text-muted-foreground">
                              {" "}
                              {item.label}{" "}
                            </p>{" "}
                            <p className="font-medium text-foreground">
                              {" "}
                              {item.value}{" "}
                            </p>{" "}
                          </div>{" "}
                        </CardContent>{" "}
                      </Card>{" "}
                    </motion.div>
                  ))}{" "}
                </div>{" "}
              </motion.div>{" "}
              {/* Contact Form */}{" "}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {" "}
                <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
                  {" "}
                  <CardContent className="p-8">
                    {" "}
                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                      {" "}
                      Send Us a Message{" "}
                    </h2>{" "}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {" "}
                      <div className="grid sm:grid-cols-2 gap-4">
                        {" "}
                        <div>
                          {" "}
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            {" "}
                            Name{" "}
                          </label>{" "}
                          <Input
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Your name"
                            required
                          />{" "}
                        </div>{" "}
                        <div>
                          {" "}
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            {" "}
                            Email{" "}
                          </label>{" "}
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            placeholder="Your email"
                            required
                          />{" "}
                        </div>{" "}
                      </div>{" "}
                      <div className="grid sm:grid-cols-2 gap-4">
                        {" "}
                        <div>
                          {" "}
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            {" "}
                            Phone{" "}
                          </label>{" "}
                          <Input
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            placeholder="Your phone"
                          />{" "}
                        </div>{" "}
                        <div>
                          {" "}
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            {" "}
                            Subject{" "}
                          </label>{" "}
                          <Input
                            value={formData.subject}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                subject: e.target.value,
                              })
                            }
                            placeholder="Subject"
                            required
                          />{" "}
                        </div>{" "}
                      </div>{" "}
                      <div>
                        {" "}
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          {" "}
                          Message{" "}
                        </label>{" "}
                        <Textarea
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          placeholder="Your message"
                          rows={5}
                          required
                        />{" "}
                      </div>{" "}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        viewport={{ once: true }}
                      >
                        {" "}
                        <Button
                          type="submit"
                          variant="cta"
                          size="lg"
                          className="w-full"
                        >
                          {" "}
                          Send Message{" "}
                        </Button>{" "}
                      </motion.div>{" "}
                    </form>{" "}
                  </CardContent>{" "}
                </Card>{" "}
              </motion.div>{" "}
            </div>
            <div className="mt-24">
              <h3 className="font-display text-4xl font-bold text-center text-foreground mb-12">
                Our <span className="text-gradient-secondary">Services</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                  className="overflow-hidden"
                  viewport={{ once: true }}
                >
                  <Card className="bg-muted border-border text-center shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-lg bg-yellow-300 flex items-center justify-center mb-4 shadow-md">
                        <Monitor className="w-6 h-6 text-yellow-900" />
                      </div>
                      <h4 className="font-semibold text-lg text-foreground mb-2">
                        Exam Room Service
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Professional exam facilities with reliable setup.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-muted border-border text-center shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-lg bg-purple-300 flex items-center justify-center mb-4 shadow-md">
                        <Users className="w-6 h-6 text-purple-900" />
                      </div>
                      <h4 className="font-semibold text-lg text-foreground mb-2">
                        Exam Mentorship
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Expert guidance and preparation support.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-muted border-border text-center shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-lg bg-yellow-300 flex items-center justify-center mb-4 shadow-md">
                        <ShoppingCart className="w-6 h-6 text-yellow-900" />
                      </div>
                      <h4 className="font-semibold text-lg text-foreground mb-2">
                        Exam Purchase
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Seamless exam booking experience.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
      <TelegramButton />
    </div>
  );
};

export default Contact;
