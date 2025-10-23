const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}
export const userInfo = {
  async ChangeInfoProfile(
    avatarBase64: string | null,
    name: string,
    last_name: string
  ) {
    const token = getCookie("accessToken");
    console.log(token);
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(`${API_BASE_URL}/api/auth/change-profile`, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify({ avatar: avatarBase64, name, last_name }),
    });
    return res.json();
  },
  async GetInfoContacts(name_profile: string) {
    const res = await fetch(
      `${API_BASE_URL}/api/auth/get-contacts?name_profile=${encodeURIComponent(
        name_profile
      )}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    return res.json();
  },
  async GetInfoUser() {
    const res = await fetch(`${API_BASE_URL}/api/auth/get-user`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return res.json();
  },
};
