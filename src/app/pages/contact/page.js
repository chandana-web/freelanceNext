"use client";

import "@/app/styles/contact.css";
import Image from "next/image";
import { useState } from "react";

const faqData = [
  {
    question: "What methods of payments are supported?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt risus nec justo blandit varius.",
  },
  {
    question: "Can I cancel at anytime?",
    answer:
      "Cras vitae ac nunc orci. Purus amet tortor non at phasellus ultricies hendrerit. Eget a, sit morbi nunc sit id massa. Metus, scelerisque volutpat nec sit vel donec. Sagittis, id volutpat erat vel.",
  },
  {
    question: "How do I get a receipt for my purchase?",
    answer:
      "Receipts are emailed when your purchase is complete. You can also download them from your account dashboard.",
  },
  {
    question: "Which license do I need?",
    answer:
      "Choosing a license depends on whether your usage is personal, commercial or enterprise. Check our pricing page.",
  },
  {
    question: "How do I get access to a theme I purchased?",
    answer:
      "Once the purchase is completed, your theme will be available in your account under 'downloads'.",
  },
];

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
     const [activeIndex, setActiveIndex] = useState(); // open second by default

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <div className="contact-page">
      {/* ----- Top Section ----- */}
      <div className="contact-header">
        <h2>Contact us</h2>
        <p>We’d love to talk about how we can help you.</p>
      </div>

      {/* ------- Body Section -------- */}
      <div className="container contact-content">
        <div className="row g-5">
          
          {/* LEFT SIDE */}
          <div className="contact-left col-lg-6 ">
            <h4>Keep In Touch With Us.</h4>
            <p className="text-muted">
              Neque convallis a cras semper auctor. 
            </p>

            <div className="contact-info ">
              <p><strong><Image src="/assets/freheroloc.png" alt="" width={30} height={30}/> Address</strong><br/>328 Queensberry Street, Melbourne VIC 3051</p>
              <p><strong><Image src="/assets/contactphone.png" alt="" width={25} height={25}/> Phone</strong><br/>+ (0) 392 94 03 01</p>
              <p><strong><Image src="/assets/contactmail.png" alt="" width={25} height={25}/> Email</strong><br/>hello@freeio.com</p>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="col-lg-6">
            <div className="contact-card p-4">
              <h5>Tell us about yourself</h5>
              <p className="text-muted">
                Whether you have questions or you would just like to say hello, contact us.
              </p>

              <form onSubmit={handleSubmit} className="mt-3">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input 
                      type="text" 
                      name="name" 
                      className="form-control" 
                      placeholder="Name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input 
                      type="email" 
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <textarea 
                  className="form-control mb-3"
                  rows="5"
                  placeholder="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                ></textarea>

                <button type="submit" className="btn btn-success w-100">
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
       <section className="faq-section">
      <div className="text-center mb-5">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <p className="faq-subtitle">Lorem ipsum dolor sit amet, consectetur.</p>
      </div>

      <div className="faq-wrapper container">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              onClick={() => toggleFAQ(index)}
              className="faq-question"
            >
              {item.question}
              <span className="faq-icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>

            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
    </div>
  )
}

export default Contact