import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import serviceData from '../data/serviceData';
import { submitFreelanceRequest } from '../services/api';

export default function Freelance() {
  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    phone: '',
    service: 'Portfolio Website',
    budget: '',
    timeline: '',
    projectDetails: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const selectService = (service) => {
    setForm((prev) => ({
      ...prev,
      service,
    }));

    document.getElementById('freelance-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setStatus('');

      await submitFreelanceRequest(form);

      setStatus('success');

      setForm({
        clientName: '',
        clientEmail: '',
        phone: '',
        service: 'Portfolio Website',
        budget: '',
        timeline: '',
        projectDetails: '',
      });
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-container">
      <div className="mb-10 max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-600 dark:text-violet-300">
          Freelance Portal
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          Need a website or full-stack project?
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
          Clients can request portfolio websites, landing pages, MERN applications, e-commerce websites, bug fixing and deployment support.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {serviceData.map((service) => (
          <div key={service.title} className="card-3d glass-3d flex flex-col rounded-[2rem] p-6">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">
              {service.title}
            </h2>

            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
              {service.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">
                {service.price}
              </span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700 dark:bg-blue-500/15 dark:text-blue-200">
                {service.timeline}
              </span>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {service.includes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => selectService(service.title)}
              className="btn-primary mt-auto pt-3"
            >
              Request Quote
            </button>
          </div>
        ))}
      </div>

      <form
        id="freelance-form"
        onSubmit={handleSubmit}
        className="card-3d glass-3d mt-12 rounded-[2rem] p-6 sm:p-8"
      >
        <h2 className="text-2xl font-black text-slate-950 dark:text-white">
          Send Project Request
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <input
            name="clientName"
            value={form.clientName}
            onChange={handleChange}
            className="input-field"
            placeholder="Your name"
            required
          />

          <input
            name="clientEmail"
            type="email"
            value={form.clientEmail}
            onChange={handleChange}
            className="input-field"
            placeholder="Your email"
            required
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="input-field"
            placeholder="Phone optional"
          />

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="input-field"
          >
            {serviceData.map((service) => (
              <option key={service.title}>{service.title}</option>
            ))}
          </select>

          <input
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="input-field"
            placeholder="Budget e.g. ₹2000"
          />

          <input
            name="timeline"
            value={form.timeline}
            onChange={handleChange}
            className="input-field"
            placeholder="Timeline e.g. 5 days"
          />

          <textarea
            name="projectDetails"
            value={form.projectDetails}
            onChange={handleChange}
            className="input-field min-h-[160px] sm:col-span-2"
            placeholder="Tell me about your project requirement"
            required
          />
        </div>

        {status === 'success' && (
          <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 font-bold text-emerald-700 dark:text-emerald-200">
            Freelance request submitted successfully.
          </div>
        )}

        {status && status !== 'success' && (
          <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 font-bold text-red-700 dark:text-red-200">
            {status}
          </div>
        )}

        <button disabled={loading} type="submit" className="btn-primary mt-6 w-full sm:w-auto">
          <FiSend /> {loading ? 'Submitting...' : 'Submit Project Request'}
        </button>
      </form>
    </section>
  );
}