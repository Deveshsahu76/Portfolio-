import React, { useMemo, useState } from 'react';
import { FiCalendar, FiCheckCircle, FiFileText, FiSend, FiZap } from 'react-icons/fi';
import assignmentData from '../data/assignmentData';
import { submitRecruiterRequest } from '../services/api';

const roles = ['Frontend Intern', 'Backend Intern', 'Full Stack Intern', 'MERN Stack Intern'];

const requestTypes = [
  { value: 'shortlist', label: 'Shortlist Resume' },
  { value: 'interview', label: 'Schedule Interview' },
  { value: 'assignment', label: 'Send Assignment' },
];

export default function RecruiterHub() {
  const [form, setForm] = useState({
    requestType: 'interview',
    recruiterName: '',
    companyName: '',
    email: '',
    phone: '',
    role: 'MERN Stack Intern',
    interviewDate: '',
    interviewTime: '',
    interviewMode: 'Google Meet',
    assignmentTitle: '',
    assignmentDetails: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const selectedAssignment = useMemo(() => assignmentData[form.role], [form.role]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'role') {
      const assignment = assignmentData[value];

      setForm((prev) => ({
        ...prev,
        role: value,
        assignmentTitle: assignment.title,
        assignmentDetails: assignment.details,
      }));

      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const useSuggestedAssignment = () => {
    setForm((prev) => ({
      ...prev,
      requestType: 'assignment',
      assignmentTitle: selectedAssignment.title,
      assignmentDetails: selectedAssignment.details,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setStatus('');

      await submitRecruiterRequest(form);

      setStatus('success');

      setForm({
        requestType: 'interview',
        recruiterName: '',
        companyName: '',
        email: '',
        phone: '',
        role: 'MERN Stack Intern',
        interviewDate: '',
        interviewTime: '',
        interviewMode: 'Google Meet',
        assignmentTitle: '',
        assignmentDetails: '',
        message: '',
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
          Recruiter Hub
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          Shortlist, schedule interview, or assign a task.
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
          Recruiters can review my resume, select my profile, schedule an interview request and send a role-based assignment directly from this portfolio.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a href="/resume.pdf" download className="btn-primary">
            <FiFileText /> Download Resume
          </a>
          <a href="/projects" className="btn-secondary">
            View Projects
          </a>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="card-3d glass-3d rounded-[2rem] p-7">
            <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-violet-100 text-2xl text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">
              <FiCheckCircle />
            </div>

            <h2 className="text-2xl font-black text-slate-950 dark:text-white">
              Why shortlist me?
            </h2>

            <ul className="mt-5 space-y-3 text-slate-600 dark:text-slate-400">
              <li>• MERN stack project experience</li>
              <li>• Live deployed projects with GitHub links</li>
              <li>• API and database understanding</li>
              <li>• Responsive UI/UX development</li>
              <li>• Open to Software Development Internships</li>
            </ul>
          </div>

          <div className="card-3d glass-3d rounded-[2rem] p-7">
            <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-blue-100 text-2xl text-blue-700 dark:bg-blue-500/15 dark:text-blue-200">
              <FiZap />
            </div>

            <h2 className="text-2xl font-black text-slate-950 dark:text-white">
              AI-Style Assignment Suggestion
            </h2>

            <p className="mt-3 font-black text-slate-950 dark:text-white">
              {selectedAssignment.title}
            </p>

            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
              {selectedAssignment.details}
            </p>

            <button type="button" onClick={useSuggestedAssignment} className="btn-secondary mt-5">
              Use this assignment
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-3d glass-3d rounded-[2rem] p-6 sm:p-8">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Recruiter Action Form
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <select
              name="requestType"
              value={form.requestType}
              onChange={handleChange}
              className="input-field sm:col-span-2"
            >
              {requestTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <input
              name="recruiterName"
              value={form.recruiterName}
              onChange={handleChange}
              className="input-field"
              placeholder="Recruiter name"
              required
            />

            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className="input-field"
              placeholder="Company name"
              required
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="input-field"
              placeholder="Recruiter email"
              required
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="input-field"
              placeholder="Phone optional"
            />

            <select name="role" value={form.role} onChange={handleChange} className="input-field sm:col-span-2">
              {roles.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>

            <input
              name="interviewDate"
              type="date"
              value={form.interviewDate}
              onChange={handleChange}
              className="input-field"
            />

            <input
              name="interviewTime"
              type="time"
              value={form.interviewTime}
              onChange={handleChange}
              className="input-field"
            />

            <select
              name="interviewMode"
              value={form.interviewMode}
              onChange={handleChange}
              className="input-field sm:col-span-2"
            >
              <option>Google Meet</option>
              <option>Phone Call</option>
              <option>Microsoft Teams</option>
              <option>Office Visit</option>
              <option>Other</option>
            </select>

            <input
              name="assignmentTitle"
              value={form.assignmentTitle}
              onChange={handleChange}
              className="input-field sm:col-span-2"
              placeholder="Assignment title optional"
            />

            <textarea
              name="assignmentDetails"
              value={form.assignmentDetails}
              onChange={handleChange}
              className="input-field min-h-[120px] sm:col-span-2"
              placeholder="Assignment details optional"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="input-field min-h-[120px] sm:col-span-2"
              placeholder="Message"
            />
          </div>

          {status === 'success' && (
            <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 font-bold text-emerald-700 dark:text-emerald-200">
              Request submitted successfully. Devesh will receive this on email and backend database.
            </div>
          )}

          {status && status !== 'success' && (
            <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 font-bold text-red-700 dark:text-red-200">
              {status}
            </div>
          )}

          <button disabled={loading} type="submit" className="btn-primary mt-6 w-full">
            <FiSend /> {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </section>
  );
}