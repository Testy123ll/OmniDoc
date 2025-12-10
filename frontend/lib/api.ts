import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Conversion endpoints
export const conversionAPI = {
  convert: (sourceId: string, targetFormat: string) =>
    apiClient.post('/conversions/convert', { sourceId, targetFormat }),
  getStatus: (conversionId: string) =>
    apiClient.get(`/conversions/${conversionId}/status`),
  batchConvert: (sourceIds: string[], targetFormat: string) =>
    apiClient.post('/conversions/batch', { sourceIds, targetFormat }),
};

// File endpoints
export const fileAPI = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getFile: (fileId: string) =>
    apiClient.get(`/files/${fileId}`),
  listFiles: () =>
    apiClient.get('/files'),
  deleteFile: (fileId: string) =>
    apiClient.delete(`/files/${fileId}`),
};

// PDF editing endpoints
export const pdfAPI = {
  editText: (fileId: string, changes: any) =>
    apiClient.post(`/pdf/${fileId}/edit-text`, changes),
  addAnnotation: (fileId: string, annotation: any) =>
    apiClient.post(`/pdf/${fileId}/annotate`, annotation),
  mergePDFs: (fileIds: string[]) =>
    apiClient.post('/pdf/merge', { fileIds }),
  splitPDF: (fileId: string, pages: number[]) =>
    apiClient.post(`/pdf/${fileId}/split`, { pages }),
};

// AI endpoints
export const aiAPI = {
  write: (prompt: string, type: string) =>
    apiClient.post('/ai/write', { prompt, type }),
  edit: (text: string, editType: string, tone?: string) =>
    apiClient.post('/ai/edit', { text, editType, tone }),
  summarize: (text: string) =>
    apiClient.post('/ai/summarize', { text }),
  translate: (text: string, targetLanguage: string) =>
    apiClient.post('/ai/translate', { text, targetLanguage }),
  analyze: (text: string) =>
    apiClient.post('/ai/analyze', { text }),
};

// Auth endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  register: (email: string, password: string, name: string) =>
    apiClient.post('/auth/register', { email, password, name }),
  logout: () =>
    apiClient.post('/auth/logout'),
  getCurrentUser: () =>
    apiClient.get('/auth/me'),
};

export default apiClient;
