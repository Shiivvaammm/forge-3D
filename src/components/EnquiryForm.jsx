import { useState } from "react";
import { contact } from "../data/content";

const empty = {
  fullName: "",
  method: "",
  email: "",
  phone: "",
  postcode: "",
  site: "",
  carModel: "",
  carReg: "",
  message: "",
};

const required = ["fullName", "method", "email", "phone", "postcode", "site", "carModel", "carReg"];

function Field({ label, error, optional, full, children }) {
  return (
    <label className={`field${full ? " field--full" : ""}`}>
      <span className="field-label">
        {label}
        {optional && <em>optional</em>}
      </span>
      {children}
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}

export default function EnquiryForm() {
  const [values, setValues] = useState(empty);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const okType = ["image/jpeg", "image/png"].includes(f.type);
    const okSize = f.size <= 10 * 1024 * 1024;

    if (!okType || !okSize) {
      setFile(null);
      setFileError("Please choose a JPG or PNG up to 10MB");
      e.target.value = "";
      return;
    }
    setFileError("");
    setFile(f);
  };

  const validate = () => {
    const next = {};
    required.forEach((k) => {
      if (!values[k].trim()) next[k] = "Required";
    });
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
      next.email = "Enter a valid email address";
    }
    return next;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    // TODO: send `values` and `file` to your backend or a form service.
    // For now this only runs in the browser: nothing is sent anywhere.
    console.log("Enquiry", values, file);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="form-sent stack">
        <h3 className="h2">Thank you</h3>
        <p className="body-text">
          Your enquiry has been received. We aim to respond within 1–3 business days.
        </p>
      </div>
    );
  }

  return (
    <form className="enquiry" onSubmit={onSubmit} noValidate>
      <Field label="Full Name" error={errors.fullName}>
        <input className="input" name="fullName" value={values.fullName} onChange={onChange} autoComplete="name" />
      </Field>

      <Field label="Preferred Method of Contact" error={errors.method}>
        <select className="input" name="method" value={values.method} onChange={onChange}>
          <option value="">Please choose an option</option>
          {contact.contactMethods.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </Field>

      <Field label="Email Address" error={errors.email}>
        <input className="input" type="email" name="email" value={values.email} onChange={onChange} autoComplete="email" />
      </Field>

      <Field label="Phone Number" error={errors.phone}>
        <input className="input" type="tel" name="phone" value={values.phone} onChange={onChange} autoComplete="tel" />
      </Field>

      <Field label="Postcode" error={errors.postcode}>
        <input className="input" name="postcode" value={values.postcode} onChange={onChange} autoComplete="postal-code" />
      </Field>

      <Field label="Preferred Site" error={errors.site}>
        <select className="input" name="site" value={values.site} onChange={onChange}>
          <option value="">Please choose an option</option>
          {contact.sites.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Field>

      <Field label="Car Make / Model" error={errors.carModel}>
        <input className="input" name="carModel" value={values.carModel} onChange={onChange} />
      </Field>

      <Field label="Car Registration" error={errors.carReg}>
        <input className="input" name="carReg" value={values.carReg} onChange={onChange} />
      </Field>

      <div className="field field--full">
        <span className="field-label">
          Your Current Car<em>optional</em>
        </span>
        <label className="dropzone">
          <input type="file" accept="image/jpeg,image/png" onChange={onFile} />
          <span className="mono">{file ? file.name : "Click to upload or drag and drop"}</span>
          <span className="mono dropzone-hint">JPG, PNG up to 10MB</span>
        </label>
        {fileError && <span className="field-error">{fileError}</span>}
      </div>

      <Field label="Message" optional full>
        <textarea className="input" name="message" value={values.message} onChange={onChange} />
      </Field>

      <div className="field--full">
        <button type="submit" className="btn">
          Submit Enquiry →
        </button>
      </div>
    </form>
  );
}