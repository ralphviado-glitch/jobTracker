const API_URL = import.meta.env.VITE_API_URL;

export const apiRequest = async (endpoint, method = "GET", body) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: body ? JSON.stringify(body) : null,
  });

  // Attempt to parse JSON, but fallback to empty object if fails
  let data = {};
  try {
    data = await res.json();
  } catch (err) {
    data = {};
  }

  // Throw error if response not ok
  if (!res.ok) {
    throw new Error(data.message || "Server error");
  }

  return data;
};
