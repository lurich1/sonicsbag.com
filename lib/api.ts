// API Configuration and helper functions for backend integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const apiConfig = {
  baseUrl: API_BASE_URL,
  endpoints: {
    products: `${API_BASE_URL}/api/products`,
    product: (id: number | string) => `${API_BASE_URL}/api/products/${id}`,
    orders: `${API_BASE_URL}/api/orders`,
    order: (id: number | string) => `${API_BASE_URL}/api/orders/${id}`,
    blog: `${API_BASE_URL}/api/blog`,
    blogPost: (id: number | string) => `${API_BASE_URL}/api/blog/${id}`,
    upload: `${API_BASE_URL}/api/upload`,
  },
};

// Helper function to fetch with error handling
export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}

// Product API functions
export const productApi = {
  getAll: async () => apiFetch<any[]>(apiConfig.endpoints.products),
  getById: async (id: number | string) => apiFetch<any>(apiConfig.endpoints.product(id)),
  create: async (product: any, token?: string) =>
    apiFetch<any>(apiConfig.endpoints.products, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(product),
    }),
  update: async (id: number | string, product: any, token?: string) =>
    apiFetch<any>(apiConfig.endpoints.product(id), {
      method: "PUT",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(product),
    }),
  delete: async (id: number | string, token?: string) =>
    apiFetch<void>(apiConfig.endpoints.product(id), {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }),
};

// Upload API function
export const uploadApi = {
  uploadImage: async (file: File, token?: string) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(apiConfig.endpoints.upload, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
};

// Order API functions
export const orderApi = {
  getAll: async (token?: string) =>
    apiFetch<any[]>(apiConfig.endpoints.orders, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }),
  getById: async (id: number | string, token?: string) =>
    apiFetch<any>(apiConfig.endpoints.order(id), {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }),
  create: async (order: any) =>
    apiFetch<any>(apiConfig.endpoints.orders, {
      method: "POST",
      body: JSON.stringify(order),
    }),
  updateStatus: async (id: number | string, status: string, token?: string) =>
    apiFetch<any>(`${apiConfig.endpoints.order(id)}/status`, {
      method: "PUT",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ status }),
    }),
};

// Blog API functions
export const blogApi = {
  getAll: async () => apiFetch<any[]>(apiConfig.endpoints.blog),
  getById: async (id: number | string) => apiFetch<any>(apiConfig.endpoints.blogPost(id)),
  create: async (post: any, token?: string) =>
    apiFetch<any>(apiConfig.endpoints.blog, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(post),
    }),
  update: async (id: number | string, post: any, token?: string) =>
    apiFetch<any>(apiConfig.endpoints.blogPost(id), {
      method: "PUT",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(post),
    }),
  delete: async (id: number | string, token?: string) =>
    apiFetch<void>(apiConfig.endpoints.blogPost(id), {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }),
};
