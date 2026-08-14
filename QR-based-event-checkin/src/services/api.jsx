import axios from 'axios';

const API_URL = 'https://6a7c9519a008c10e4cbf93e1.mockapi.io/users';

// 1. POST: Register a new participant
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, {
      ...userData,
      status: 'Pending',
      registeredAt: new Date().toISOString()
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// 2. GET: Fetch all registered users for Admin Dashboard
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// 3. GET: Fetch a single user by ID for the Ticket Page
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user ticket:", error);
    throw error;
  }
};

// 4. PUT: Mark participant as "Attended" when scanned
export const markAttendance = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, {
      status: 'Attended',
      attendedAt: new Date().toISOString()
    });
    return response.data;
  } catch (error) {
    console.error("Error updating attendance:", error);
    throw error;
  }
};