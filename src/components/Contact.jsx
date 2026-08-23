import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Detector } from "react-detect-offline";

import { styles } from "../style";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const ContactContent = ({ online }) => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("idle");

    if (!online) {
      setStatus("offline");
      return;
    }

    setLoading(true);
    const ServiceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TemplateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const options = {
      from_name: form.name,
      from_phone: form.phone,
      from_email: form.email,
      to_name: "Abdelrahman Naser",
      to_email: "abdonaser4223@gmail.com",
      message: form.message,
    };
    console.log(ServiceID, TemplateID, PublicKey, options);
    emailjs.send(ServiceID, TemplateID, options, PublicKey).then(
      () => {
        setLoading(false);
        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setStatus("success");
      },
      () => {
        setLoading(false);
        setStatus("error");
      },
    );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-12 flex flex-col items-center justify-center text-center gap-6 bg-tertiary p-10 rounded-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 15,
                  delay: 0.15,
                }}
                className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center"
              >
                <svg
                  className="w-10 h-10 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                </svg>
              </motion.div>
              <div>
                <h4 className="text-white font-bold text-xl mb-2">
                  Message Sent!
                </h4>
                <p className="text-secondary text-sm leading-relaxed">
                  Thank you for reaching out.
                  <br />I will get back to you as soon as possible.
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="bg-tertiary border border-white/20 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-black-200 transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col gap-8"
            >
              {(status === "error" || status === "offline" || !online) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 bg-red-500/10 border border-red-500/40 rounded-lg px-4 py-3"
                >
                  <span className="text-red-400 text-lg leading-none mt-0.5">
                    !
                  </span>
                  <p className="text-red-300 text-sm">
                    {status === "error"
                      ? "Something went wrong while sending your message. Please try again in a moment."
                      : "No internet connection. Please check your network and try again."}
                  </p>
                </motion.div>
              )}
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">Your Name</span>
                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your name?"
                  className="bg-tertiary py-4 px-6 text-white placeholder:text-secondary rounded-lg outline-none border-none font-medium focus:ring-1 focus:ring-white/30"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">Your Phone</span>
                <input
                  required
                  type="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="What's your Phone?"
                  className="bg-tertiary py-4 px-6 text-white placeholder:text-secondary rounded-lg outline-none border-none font-medium focus:ring-1 focus:ring-white/30"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">Your Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your Email?"
                  className="bg-tertiary py-4 px-6 text-white placeholder:text-secondary rounded-lg outline-none border-none font-medium focus:ring-1 focus:ring-white/30"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">
                  Your Message
                </span>
                <textarea
                  required
                  rows={7}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What Want To You Say?"
                  className="bg-tertiary py-4 px-6 text-white placeholder:text-secondary rounded-lg outline-none border-none font-medium focus:ring-1 focus:ring-white/30 resize-none"
                />
              </label>
              <button
                type="submit"
                disabled={loading || !online}
                className={`bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-black-200 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer`}
              >
                {loading ? "Sending..." : !online ? "Offline" : "Send"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] z-[555555]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

const Contact = () => (
  <Detector render={({ online }) => <ContactContent online={online} />} />
);

export default SectionWrapper(Contact, "contact");
