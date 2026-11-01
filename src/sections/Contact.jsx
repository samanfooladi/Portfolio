import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        "service_amokgbh",
        "template_8v5xodc",
        {
          from_name: form.name,
          to_name: "Saman",
          from_email: form.email,
          to_email: "samanfooladi2025@gmail.com",
          message: form.message,
        },
        "2HzpbWE6gJbxfJg9t",
      );
      setLoading(false);

      alert("Email sent successfully!");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Something went wrong");
    }
  };
  return (
    <section className="c-space my-20">
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <img
          src="/assets/terminal.png"
          alt="terminal background"
          className="absolute inset-0 min-h-screen"
        />
        <div className="contact-container w-full">
          <h3 className="head-text">Let's talk</h3>
          <p className="text-lg text-white-600"></p>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            class="mt-12 flex flex-col space-y-7"
          >
            <label className="space-y-7">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="field-input"
                onChange={handleChange}
                value={form.name}
                required
              />
            </label>
            <label className="space-y-7">
              <span className="field-label">Email</span>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="field-input"
                onChange={handleChange}
                value={form.email}
                required
              />
            </label>
            <label className="space-y-7">
              <span className="field-label">your message</span>
              <textarea
                name="message"
                placeholder="..."
                className="field-input"
                onChange={handleChange}
                value={form.message}
                required
                rows={5}
              />
            </label>
            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? "sending..." : "Send Message"}
              <img
                src="/assets/arrow-up.png"
                alt="arrow-up"
                className="field-btn_arrow"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Contact;
