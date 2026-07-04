const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong.');
  }

  return data;
};

export const submitRecruiterRequest = (formData) => {
  return request('/api/recruiter/schedule', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

export const submitFreelanceRequest = (formData) => {
  return request('/api/freelance/request', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

export const getRecruiterRequests = (adminKey) => {
  return request('/api/recruiter/requests', {
    method: 'GET',
    headers: {
      'x-admin-key': adminKey,
    },
  });
};

export const getFreelanceRequests = (adminKey) => {
  return request('/api/freelance/requests', {
    method: 'GET',
    headers: {
      'x-admin-key': adminKey,
    },
  });
};