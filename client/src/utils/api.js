const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Get auth token from localStorage or cookies
    getAuthToken() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token') || Cookies.get('token');
        }
        return null;
    }

    // Set auth token
    setAuthToken(token) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
            Cookies.set('token', token, { expires: 7 });
        }
    }

    // Remove auth token
    removeAuthToken() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            Cookies.remove('token');
        }
    }

    // Make API request
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const token = this.getAuthToken();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                // Handle session expiration
                if (response.status === 401) {
                    this.removeAuthToken();
                    localStorage.removeItem('user');
                    alert('Session expired. Please log in again.');
                    window.location.href = '/login';
                    return; // Stop further execution
                }
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // GET request
    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return this.request(url, { method: 'GET' });
    }

    // POST request
    async post(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // PUT request
    async put(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    // DELETE request
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    // Auth endpoints
    auth = {
        register: (userData) => this.post('/auth/register', userData),
        login: (credentials) => this.post('/auth/login', credentials),
        getProfile: () => this.get('/auth/profile'),
        updateProfile: (profileData) => this.put('/auth/profile', profileData),
        getDoctors: (params) => this.get('/auth/doctors', params),
        getDoctorById: (id) => this.get(`/auth/doctors/${id}`),
    };

    // Appointment endpoints
    appointments = {
        create: (appointmentData) => this.post('/appointments', appointmentData),
        getAll: (params) => this.get('/appointments', params),
        getById: (id) => this.get(`/appointments/${id}`),
        updateStatus: (id, statusData) => this.put(`/appointments/${id}/status`, statusData),
        cancel: (id, reason) => this.put(`/appointments/${id}/cancel`, { cancellationReason: reason }),
        rate: (id, ratingData) => this.post(`/appointments/${id}/rate`, ratingData),
        getDoctorSchedule: (doctorId, date) => this.get(`/appointments/doctor/${doctorId}/schedule`, { date }),
    };

    // Health check
    health = () => this.get('/health');
}

// Create and export a singleton instance
const apiClient = new ApiClient();
export default apiClient;