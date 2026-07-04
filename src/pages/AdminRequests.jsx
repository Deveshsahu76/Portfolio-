import React, { useState } from 'react';
import { getFreelanceRequests, getRecruiterRequests } from '../services/api';

export default function AdminRequests() {
  const [adminKey, setAdminKey] = useState('');
  const [recruiterRequests, setRecruiterRequests] = useState([]);
  const [freelanceRequests, setFreelanceRequests] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError('');

      const recruiterData = await getRecruiterRequests(adminKey);
      const freelanceData = await getFreelanceRequests(adminKey);

      setRecruiterRequests(recruiterData.data.requests || []);
      setFreelanceRequests(freelanceData.data.requests || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-container">
      <div className="mb-10 max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-600 dark:text-violet-300">
          Admin
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          Recruiter & Freelance Requests
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
          Enter admin key to view backend requests.
        </p>
      </div>

      <div className="card-3d glass-3d rounded-[2rem] p-6">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            className="input-field"
            placeholder="Enter admin key"
          />
          <button onClick={fetchRequests} className="btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Requests'}
          </button>
        </div>

        {error && (
          <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 font-bold text-red-700 dark:text-red-200">
            {error}
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="card-3d glass-3d rounded-[2rem] p-6">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Recruiter Requests
          </h2>

          <div className="mt-5 space-y-4">
            {recruiterRequests.map((item) => (
              <div key={item._id} className="rounded-2xl border border-slate-900/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="font-black text-slate-950 dark:text-white">{item.companyName}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.recruiterName} · {item.email}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Role: {item.role}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Type: {item.requestType}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Date: {item.interviewDate || 'N/A'} {item.interviewTime || ''}</p>
              </div>
            ))}

            {recruiterRequests.length === 0 && (
              <p className="text-slate-600 dark:text-slate-400">No recruiter requests loaded.</p>
            )}
          </div>
        </div>

        <div className="card-3d glass-3d rounded-[2rem] p-6">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Freelance Requests
          </h2>

          <div className="mt-5 space-y-4">
            {freelanceRequests.map((item) => (
              <div key={item._id} className="rounded-2xl border border-slate-900/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="font-black text-slate-950 dark:text-white">{item.service}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.clientName} · {item.clientEmail}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Budget: {item.budget || 'N/A'}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Timeline: {item.timeline || 'N/A'}</p>
              </div>
            ))}

            {freelanceRequests.length === 0 && (
              <p className="text-slate-600 dark:text-slate-400">No freelance requests loaded.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}