import axios from 'axios';

// Create a centralized Axios instance
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', // Falls back to relative path if not provided
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Auth Endpoints ---
export const authApi = {
  login: (credentials: any) => apiClient.post('/api/auth/login', credentials),
  signup: (userData: any) => apiClient.post('/api/auth/signup', userData),
  googleAuth: (token: string) => apiClient.post('/api/oauth/google', { token }),
};

// --- Task & Roadmap Endpoints ---
export const taskApi = {
  // Create task and get AI-generated roadmap
  createTask: (title: string, description: string) => 
    apiClient.post('/api/tasks', { title, description }),
    
  getUpcoming: () => apiClient.get('/api/tasks?status=upcoming'),
  getOngoing: () => apiClient.get('/api/tasks?status=ongoing'),
  getFinished: () => apiClient.get('/api/tasks?status=finished'),
  
  // Mark task or steps complete
  completeTask: (taskId: string) => apiClient.put(`/api/tasks/${taskId}/complete`),
  completeStep: (taskId: string, stepId: string) => 
    apiClient.put(`/api/tasks/${taskId}/steps/${stepId}/complete`),
};

// --- Focus Sessions ---
export const focusSessionApi = {
  startSession: (taskId: string, stepId: string) => 
    apiClient.post('/api/focus-sessions', { taskId, stepId }),
  endSession: (sessionId: string) => 
    apiClient.put(`/api/focus-sessions/${sessionId}/end`),
};

// --- Surveys & Rest ---
export const surveyApi = {
  submitSurvey: (taskId: string, stepId: string, answers: number[]) => 
    apiClient.post('/api/surveys', { taskId, stepId, answers }),
    
  getCurrentTip: () => apiClient.get('/api/rest-tips/current'),
  completeRest: (sessionId: string) => apiClient.post('/api/rest-sessions/complete', { sessionId }),
};
