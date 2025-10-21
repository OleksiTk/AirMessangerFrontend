const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const userInfo = {
  async ChangeInfoProfile(
    avatarBase64: string | null,
    name: string,
    last_name: string
  ) {
    const googleId = localStorage.getItem("googleId");
    const res = await fetch(`${API_BASE_URL}/auth/change-profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatar: avatarBase64, name, last_name, googleId }),
      credentials: "include",
    });
    return res.json();
  },
  async GetInfoContacts(name_profile: string) {
    const googleId = localStorage.getItem("googleId");
    if (googleId == null) {
      return console.log("null on googleId");
    }
    const res = await fetch(
      `${API_BASE_URL}/auth/get-contacts?name_profile=${encodeURIComponent(
        name_profile
      )}&googleId=${encodeURIComponent(googleId)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    return res.json();
  },
  async GetInfoUser() {
    const googleId = localStorage.getItem("googleId");
    if (googleId == null) {
      return console.log("null on googleId");
    }
    const res = await fetch(
      `${API_BASE_URL}/auth/get-user?googleId=${encodeURIComponent(googleId)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    return res.json();
  },
};
