// frontend/src/api/authApi.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const authApi = {
  register: async (email: string, password: string, name_profile: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name_profile }),
      credentials: "include",
    });
    return res.json();
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    return res.json();
  },

  refreshToken: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });
    return res.json();
  },

  logout: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    return res.json();
  },
};

// Функція для отримання постів
export const postsApi = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/posts`);
    return res.json();
  },

  create: async (title: string, content: string, accessToken: string) => {
    const res = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title, content }),
    });
    return res.json();
  },
};
