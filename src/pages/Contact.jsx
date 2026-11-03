import { useRef } from "react";
import PageHero from "../components/PageHero";
import Brands from "../components/Brands";
import EnquiryForm from "../components/EnquiryForm";
import Footer from "../components/Footer";
import useSmoothScroll from "../hooks/useSmoothScroll";
import useReveal from "../hooks/useReveal";
import { contact } from "../data/content";

export default function Contact() {
  const root = useRef(null);

  useSmoothScroll();
  useReveal(root);

  return (
    <main ref={root} className="page">
      <PageHero eyebrow="Contact" lines={contact.lines}>
        <a href="#form" className="btn hero-fade">
          {contact.cta} →
        </a>
      </PageHero>

      <section className="contact-methods">
        {contact.methods.map((m) => (
          <div className="method reveal" key={m.label}>
            <p className="eyebrow">{m.label}</p>
            <h3 className="method-value">
              {m.href ? <a href={m.href}>{m.value}</a> : m.value}
            </h3>
            <p className="body-text">{m.note}</p>

            {m.links && (
              <div className="method-links mono">
                {m.links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      <Brands />

      <section id="form" className="form-section">
        <div className="form-intro stack reveal">
          <p className="eyebrow">Enquiry</p>
          <h2 className="h2">{contact.formTitle}</h2>
          <p className="body-text">{contact.formText}</p>
        </div>
        <EnquiryForm />
      </section>

      <section className="process">
        <h2 className="h2 reveal">{contact.processTitle}</h2>
        <div className="process-steps">
          {contact.process.map((step, i) => (
            <div className="process-step reveal" key={step.title}>
              <span className="process-num">0{i + 1}</span>
              <h3 className="method-value">{step.title}</h3>
              <p className="body-text">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}