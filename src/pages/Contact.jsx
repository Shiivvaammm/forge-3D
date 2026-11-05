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

  const find = (label) => contact.methods.find((m) => m.label === label);
  const phone = find("Phone");
  const email = find("Email");
  const concierge = find("Concierge");
  const visit = find("Visit Us");

  return (
    <main ref={root} className="page ct">
      <PageHero eyebrow="Contact" lines={contact.lines} text={contact.formText}>
        <div className="ct-hero-actions hero-fade">
          <a href="#form" className="btn btn--solid">
            {contact.cta} →
          </a>
          <a href={phone.href} className="btn">
            {phone.value}
          </a>
        </div>
      </PageHero>

      {/* ways to get in touch */}
      <section className="ct-bento">
        <a className="ct-card ct-card--phone reveal" href={phone.href}>
          <span className="eyebrow">{phone.label}</span>
          <span className="ct-big">{phone.value}</span>
          <span className="ct-note">{phone.note}</span>
          <span className="ct-arrow" aria-hidden="true">↗</span>
        </a>

        <a className="ct-card ct-card--mail reveal" href="#form">
          <span className="eyebrow">{email.label}</span>
          <span className="ct-big ct-big--sm">{email.value}</span>
          <span className="ct-note">{email.note}</span>
          <span className="ct-arrow" aria-hidden="true">↓</span>
        </a>

        <div className="ct-card ct-card--concierge reveal">
          <span className="eyebrow">{concierge.label}</span>
          <span className="ct-big ct-big--sm">{concierge.value}</span>
          <span className="ct-note">{concierge.note}</span>
        </div>

        <div className="ct-card ct-card--visit reveal">
          <span className="eyebrow">{visit.label}</span>
          <span className="ct-big ct-big--sm">{visit.value}</span>
          <span className="ct-note">{visit.note}</span>
          <div className="ct-studios">
            {visit.links.map((l) => (
              <a key={l.label} className="ct-studio mono" href={l.href} target="_blank" rel="noreferrer">
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* the form */}
      <section id="form" className="form-section">
        <div className="form-intro stack reveal">
          <p className="eyebrow">Enquiry</p>
          <h2 className="h2">{contact.formTitle}</h2>
          <p className="body-text">{contact.formText}</p>
          <p className="body-text form-direct">
            Prefer to talk? <a href={phone.href}>{phone.value}</a>
          </p>
        </div>
        <EnquiryForm />
      </section>

      {/* the process */}
      <section className="ct-process">
        <h2 className="h2 reveal">{contact.processTitle}</h2>
        <ol className="ct-steps">
          {contact.process.map((step, i) => (
            <li className="ct-step reveal" key={step.title}>
              <span className="ct-dot" aria-hidden="true" />
              <span className="ct-stepnum mono">Step 0{i + 1}</span>
              <h3 className="ct-steptitle">{step.title}</h3>
              <p className="body-text">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <Brands />
      <Footer />
    </main>
  );
}