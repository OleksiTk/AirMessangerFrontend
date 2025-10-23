const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const contactsApi = {
  addContacts: async (name_profile: string) => {
    const res = await fetch(`${API_BASE_URL}/api/users/contacts-add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name_profile }),
      credentials: "include",
    });
    return res.json();
  },
  getContacts: async () => {
    const res = await fetch(`${API_BASE_URL}/api/users/contacts-get`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return res.json();
  },
};
