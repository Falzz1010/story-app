import axios from 'axios';
import { getToken, removeToken, removeUserInfo } from '../utils/auth.js';

const BASE_URL = 'https://story-api.dicoding.dev/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// Request interceptor — attach auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor — handle global errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Token expired or invalid
        removeToken();
        removeUserInfo();
        window.location.href = '/login.html';
      }
    }
    return Promise.reject(error);
  },
);

// ─── Auth Endpoints ───

export const register = async (name, email, password) => {
  try {
    const response = await apiClient.post('/register', { name, email, password });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Registration failed. Please try again.';
    throw new Error(message);
  }
};

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/login', { email, password });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
    throw new Error(message);
  }
};

// ─── Story Endpoints ───

export const getAllStories = async () => {
  try {
    const response = await apiClient.get('/stories');
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to load stories. Please try again.';
    throw new Error(message);
  }
};

export const addStory = async (description, photo) => {
  try {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);

    const response = await apiClient.post('/stories', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to add story. Please try again.';
    throw new Error(message);
  }
};
