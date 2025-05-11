// // // // // // // import { AuthResponseDTO, LoginRequestDTO, RegisterRequestDTO } from "@/types/auth";
// // // // // // //
// // // // // // // const API_BASE_URL = "http://localhost:8080/api/auth";
// // // // // // //
// // // // // // // export const login = async (data: LoginRequestDTO): Promise<AuthResponseDTO> => {
// // // // // // //     const response = await fetch(`${API_BASE_URL}/login`, {
// // // // // // //         method: "POST",
// // // // // // //         headers: {
// // // // // // //             "Content-Type": "application/json",
// // // // // // //         },
// // // // // // //         body: JSON.stringify(data),
// // // // // // //     });
// // // // // // //
// // // // // // //     if (!response.ok) {
// // // // // // //         throw new Error("Login failed");
// // // // // // //     }
// // // // // // //
// // // // // // //     return response.json();
// // // // // // // };
// // // // // // //
// // // // // // // export const register = async (data: RegisterRequestDTO): Promise<AuthResponseDTO> => {
// // // // // // //     const token = localStorage.getItem("accessToken");
// // // // // // //     if (!token) {
// // // // // // //         throw new Error("No access token found");
// // // // // // //     }
// // // // // // //
// // // // // // //     const response = await fetch(`${API_BASE_URL}/register`, {
// // // // // // //         method: "POST",
// // // // // // //         headers: {
// // // // // // //             "Content-Type": "application/json",
// // // // // // //             Authorization: `Bearer ${token}`,
// // // // // // //         },
// // // // // // //         body: JSON.stringify(data),
// // // // // // //     });
// // // // // // //
// // // // // // //     if (!response.ok) {
// // // // // // //         throw new Error("Registration failed");
// // // // // // //     }
// // // // // // //
// // // // // // //     return response.json();
// // // // // // // };
// // // // // //
// // // // // // import { AuthResponseDTO, LoginRequestDTO, RegisterRequestDTO, UserDTO } from "@/types/auth";
// // // // // //
// // // // // // const API_BASE_URL = "http://localhost:8080/api";
// // // // // //
// // // // // // export const login = async (data: LoginRequestDTO): Promise<AuthResponseDTO> => {
// // // // // //     try {
// // // // // //         const response = await fetch(`${API_BASE_URL}/auth/login`, {
// // // // // //             method: "POST",
// // // // // //             headers: {
// // // // // //                 "Content-Type": "application/json",
// // // // // //             },
// // // // // //             body: JSON.stringify(data),
// // // // // //         });
// // // // // //
// // // // // //         if (!response.ok) {
// // // // // //             const errorData = await response.json().catch(() => ({}));
// // // // // //             throw new Error(errorData.message || `Login failed with status ${response.status}`);
// // // // // //         }
// // // // // //
// // // // // //         return response.json();
// // // // // //     } catch (error) {
// // // // // //         console.error("Login error:", error);
// // // // // //         throw error;
// // // // // //     }
// // // // // // };
// // // // // //
// // // // // // export const register = async (data: RegisterRequestDTO): Promise<AuthResponseDTO> => {
// // // // // //     try {
// // // // // //         const token = localStorage.getItem("accessToken");
// // // // // //         if (!token) {
// // // // // //             throw new Error("No access token found. Please log in again.");
// // // // // //         }
// // // // // //
// // // // // //         console.log("Register request:", { data, token }); // Дебаг
// // // // // //
// // // // // //         const response = await fetch(`${API_BASE_URL}/auth/register`, {
// // // // // //             method: "POST",
// // // // // //             headers: {
// // // // // //                 "Content-Type": "application/json",
// // // // // //                 Authorization: `Bearer ${token}`,
// // // // // //             },
// // // // // //             body: JSON.stringify(data),
// // // // // //         });
// // // // // //
// // // // // //         if (!response.ok) {
// // // // // //             const errorData = await response.json().catch(() => ({}));
// // // // // //             throw new Error(errorData.message || `Registration failed with status ${response.status}`);
// // // // // //         }
// // // // // //
// // // // // //         return response.json();
// // // // // //     } catch (error) {
// // // // // //         console.error("Register error:", error);
// // // // // //         throw error;
// // // // // //     }
// // // // // // };
// // // // // //
// // // // // // export const getAllUsers = async (): Promise<UserDTO[]> => {
// // // // // //     try {
// // // // // //         const token = localStorage.getItem("accessToken");
// // // // // //         if (!token) {
// // // // // //             throw new Error("No access token found. Please log in again.");
// // // // // //         }
// // // // // //
// // // // // //         const response = await fetch(`${API_BASE_URL}/users`, {
// // // // // //             method: "GET",
// // // // // //             headers: {
// // // // // //                 Authorization: `Bearer ${token}`,
// // // // // //             },
// // // // // //         });
// // // // // //
// // // // // //         if (!response.ok) {
// // // // // //             const errorData = await response.json().catch(() => ({}));
// // // // // //             throw new Error(errorData.message || `Failed to fetch users with status ${response.status}`);
// // // // // //         }
// // // // // //
// // // // // //         return response.json();
// // // // // //     } catch (error) {
// // // // // //         console.error("Get all users error:", error);
// // // // // //         throw error;
// // // // // //     }
// // // // // // };
// // // // // //
// // // // // // export const updateUser = async (username: string, data: UserDTO): Promise<UserDTO> => {
// // // // // //     try {
// // // // // //         const token = localStorage.getItem("accessToken");
// // // // // //         if (!token) {
// // // // // //             throw new Error("No access token found. Please log in again.");
// // // // // //         }
// // // // // //
// // // // // //         const response = await fetch(`${API_BASE_URL}/users/${username}`, {
// // // // // //             method: "PUT",
// // // // // //             headers: {
// // // // // //                 "Content-Type": "application/json",
// // // // // //                 Authorization: `Bearer ${token}`,
// // // // // //             },
// // // // // //             body: JSON.stringify(data),
// // // // // //         });
// // // // // //
// // // // // //         if (!response.ok) {
// // // // // //             const errorData = await response.json().catch(() => ({}));
// // // // // //             throw new Error(errorData.message || `Failed to update user with status ${response.status}`);
// // // // // //         }
// // // // // //
// // // // // //         return response.json();
// // // // // //     } catch (error) {
// // // // // //         console.error("Update user error:", error);
// // // // // //         throw error;
// // // // // //     }
// // // // // // };
// // // // //
// // // // // import { AuthResponseDTO, LoginRequestDTO, RegisterRequestDTO, UserDTO, AthleteDTO } from "@/types/auth";
// // // // //
// // // // // const API_BASE_URL = "http://localhost:8080/api";
// // // // //
// // // // // export const login = async (data: LoginRequestDTO): Promise<AuthResponseDTO> => {
// // // // //     try {
// // // // //         const response = await fetch(`${API_BASE_URL}/auth/login`, {
// // // // //             method: "POST",
// // // // //             headers: {
// // // // //                 "Content-Type": "application/json",
// // // // //             },
// // // // //             body: JSON.stringify(data),
// // // // //         });
// // // // //
// // // // //         if (!response.ok) {
// // // // //             const errorData = await response.json().catch(() => ({}));
// // // // //             throw new Error(errorData.message || `Login failed with status ${response.status}`);
// // // // //         }
// // // // //
// // // // //         return response.json();
// // // // //     } catch (error) {
// // // // //         console.error("Login error:", error);
// // // // //         throw error;
// // // // //     }
// // // // // };
// // // // //
// // // // // export const register = async (data: RegisterRequestDTO): Promise<AuthResponseDTO> => {
// // // // //     try {
// // // // //         const token = localStorage.getItem("accessToken");
// // // // //         if (!token) {
// // // // //             throw new Error("No access token found. Please log in again.");
// // // // //         }
// // // // //
// // // // //         console.log("Register request:", { data, token });
// // // // //
// // // // //         const response = await fetch(`${API_BASE_URL}/auth/register`, {
// // // // //             method: "POST",
// // // // //             headers: {
// // // // //                 "Content-Type": "application/json",
// // // // //                 Authorization: `Bearer ${token}`,
// // // // //             },
// // // // //             body: JSON.stringify(data),
// // // // //         });
// // // // //
// // // // //         if (!response.ok) {
// // // // //             const errorData = await response.json().catch(() => ({}));
// // // // //             throw new Error(errorData.message || `Registration failed with status ${response.status}`);
// // // // //         }
// // // // //
// // // // //         return response.json();
// // // // //     } catch (error) {
// // // // //         console.error("Register error:", error);
// // // // //         throw error;
// // // // //     }
// // // // // };
// // // // //
// // // // // export const getAllUsers = async (): Promise<UserDTO[]> => {
// // // // //     try {
// // // // //         const token = localStorage.getItem("accessToken");
// // // // //         if (!token) {
// // // // //             throw new Error("No access token found. Please log in again.");
// // // // //         }
// // // // //
// // // // //         const response = await fetch(`${API_BASE_URL}/users`, {
// // // // //             method: "GET",
// // // // //             headers: {
// // // // //                 Authorization: `Bearer ${token}`,
// // // // //             },
// // // // //         });
// // // // //
// // // // //         if (!response.ok) {
// // // // //             const errorData = await response.json().catch(() => ({}));
// // // // //             throw new Error(errorData.message || `Failed to fetch users with status ${response.status}`);
// // // // //         }
// // // // //
// // // // //         return response.json();
// // // // //     } catch (error) {
// // // // //         console.error("Get all users error:", error);
// // // // //         throw error;
// // // // //     }
// // // // // };
// // // // //
// // // // // export const updateUser = async (username: string, data: UserDTO): Promise<UserDTO> => {
// // // // //     try {
// // // // //         const token = localStorage.getItem("accessToken");
// // // // //         if (!token) {
// // // // //             throw new Error("No access token found. Please log in again.");
// // // // //         }
// // // // //
// // // // //         console.log("Update user request:", { username, data });
// // // // //
// // // // //         const response = await fetch(`${API_BASE_URL}/users/${username}`, {
// // // // //             method: "PUT",
// // // // //             headers: {
// // // // //                 "Content-Type": "application/json",
// // // // //                 Authorization: `Bearer ${token}`,
// // // // //             },
// // // // //             body: JSON.stringify(data),
// // // // //         });
// // // // //
// // // // //         if (!response.ok) {
// // // // //             const errorData = await response.json().catch(() => ({}));
// // // // //             throw new Error(errorData.message || `Failed to update user with status ${response.status}`);
// // // // //         }
// // // // //
// // // // //         return response.json();
// // // // //     } catch (error) {
// // // // //         console.error("Update user error:", error);
// // // // //         throw error;
// // // // //     }
// // // // // };
// // // // //
// // // // // export const createAthlete = async (data: AthleteDTO): Promise<AthleteDTO> => {
// // // // //     try {
// // // // //         const token = localStorage.getItem("accessToken");
// // // // //         if (!token) {
// // // // //             throw new Error("No access token found. Please log in again.");
// // // // //         }
// // // // //
// // // // //         console.log("Create athlete request:", { data });
// // // // //
// // // // //         const response = await fetch(`${API_BASE_URL}/athletes`, {
// // // // //             method: "POST",
// // // // //             headers: {
// // // // //                 "Content-Type": "application/json",
// // // // //                 Authorization: `Bearer ${token}`,
// // // // //             },
// // // // //             body: JSON.stringify(data),
// // // // //         });
// // // // //
// // // // //         if (!response.ok) {
// // // // //             const errorData = await response.json().catch(() => ({}));
// // // // //             throw new Error(errorData.message || `Failed to create athlete with status ${response.status}`);
// // // // //         }
// // // // //
// // // // //         return response.json();
// // // // //     } catch (error) {
// // // // //         console.error("Create athlete error:", error);
// // // // //         throw error;
// // // // //     }
// // // // // };
// // // //
// // // //
// // // // import { AuthResponseDTO, LoginRequestDTO, RegisterRequestDTO, UserDTO, AthleteDTO } from "@/types/auth";
// // // //
// // // // const API_BASE_URL = "http://localhost:8080/api";
// // // //
// // // // export const login = async (data: LoginRequestDTO): Promise<AuthResponseDTO> => {
// // // //     try {
// // // //         const response = await fetch(`${API_BASE_URL}/auth/login`, {
// // // //             method: "POST",
// // // //             headers: {
// // // //                 "Content-Type": "application/json",
// // // //             },
// // // //             body: JSON.stringify(data),
// // // //         });
// // // //
// // // //         if (!response.ok) {
// // // //             const errorData = await response.json().catch(() => ({}));
// // // //             throw new Error(errorData.message || `Login failed with status ${response.status}`);
// // // //         }
// // // //
// // // //         return response.json();
// // // //     } catch (error) {
// // // //         console.error("Login error:", error);
// // // //         throw error;
// // // //     }
// // // // };
// // // //
// // // // export const register = async (data: RegisterRequestDTO): Promise<AuthResponseDTO> => {
// // // //     try {
// // // //         const token = localStorage.getItem("accessToken");
// // // //         if (!token) {
// // // //             throw new Error("No access token found. Please log in again.");
// // // //         }
// // // //
// // // //         console.log("Register request:", { data, token });
// // // //
// // // //         const response = await fetch(`${API_BASE_URL}/auth/register`, {
// // // //             method: "POST",
// // // //             headers: {
// // // //                 "Content-Type": "application/json",
// // // //                 Authorization: `Bearer ${token}`,
// // // //             },
// // // //             body: JSON.stringify(data),
// // // //         });
// // // //
// // // //         if (!response.ok) {
// // // //             const errorData = await response.json().catch(() => ({}));
// // // //             throw new Error(errorData.message || `Registration failed with status ${response.status}`);
// // // //         }
// // // //
// // // //         return response.json();
// // // //     } catch (error) {
// // // //         console.error("Register error:", error);
// // // //         throw error;
// // // //     }
// // // // };
// // // //
// // // // export const getAllUsers = async (): Promise<UserDTO[]> => {
// // // //     try {
// // // //         const token = localStorage.getItem("accessToken");
// // // //         if (!token) {
// // // //             throw new Error("No access token found. Please log in again.");
// // // //         }
// // // //
// // // //         const response = await fetch(`${API_BASE_URL}/users`, {
// // // //             method: "GET",
// // // //             headers: {
// // // //                 Authorization: `Bearer ${token}`,
// // // //             },
// // // //         });
// // // //
// // // //         if (!response.ok) {
// // // //             const errorData = await response.json().catch(() => ({}));
// // // //             throw new Error(errorData.message || `Failed to fetch users with status ${response.status}`);
// // // //         }
// // // //
// // // //         return response.json();
// // // //     } catch (error) {
// // // //         console.error("Get all users error:", error);
// // // //         throw error;
// // // //     }
// // // // };
// // // //
// // // // export const updateUser = async (username: string, data: UserDTO): Promise<UserDTO> => {
// // // //     try {
// // // //         const token = localStorage.getItem("accessToken");
// // // //         if (!token) {
// // // //             throw new Error("No access token found. Please log in again.");
// // // //         }
// // // //
// // // //         console.log("Update user request:", { username, data });
// // // //
// // // //         const response = await fetch(`${API_BASE_URL}/users/${username}`, {
// // // //             method: "PUT",
// // // //             headers: {
// // // //                 "Content-Type": "application/json",
// // // //                 Authorization: `Bearer ${token}`,
// // // //             },
// // // //             body: JSON.stringify(data),
// // // //         });
// // // //
// // // //         if (!response.ok) {
// // // //             const errorData = await response.json().catch(() => ({}));
// // // //             throw new Error(errorData.message || `Failed to update user with status ${response.status}`);
// // // //         }
// // // //
// // // //         return response.json();
// // // //     } catch (error) {
// // // //         console.error("Update user error:", error);
// // // //         throw error;
// // // //     }
// // // // };
// // // //
// // // // export const createAthlete = async (data: AthleteDTO): Promise<AthleteDTO> => {
// // // //     try {
// // // //         const token = localStorage.getItem("accessToken");
// // // //         if (!token) {
// // // //             throw new Error("No access token found. Please log in again.");
// // // //         }
// // // //
// // // //         console.log("Create athlete request:", { data });
// // // //
// // // //         const response = await fetch(`${API_BASE_URL}/athletes`, {
// // // //             method: "POST",
// // // //             headers: {
// // // //                 "Content-Type": "application/json",
// // // //                 Authorization: `Bearer ${token}`,
// // // //             },
// // // //             body: JSON.stringify(data),
// // // //         });
// // // //
// // // //         if (!response.ok) {
// // // //             const errorData = await response.json().catch(() => ({}));
// // // //             throw new Error(errorData.message || `Failed to create athlete with status ${response.status}`);
// // // //         }
// // // //
// // // //         return response.json();
// // // //     } catch (error) {
// // // //         console.error("Create athlete error:", error);
// // // //         throw error;
// // // //     }
// // // // };
// // // //
// // // // export const getMyAthletes = async (): Promise<AthleteDTO[]> => {
// // // //     try {
// // // //         const token = localStorage.getItem("accessToken");
// // // //         if (!token) {
// // // //             throw new Error("No access token found. Please log in again.");
// // // //         }
// // // //
// // // //         const response = await fetch(`${API_BASE_URL}/athletes/my`, {
// // // //             method: "GET",
// // // //             headers: {
// // // //                 Authorization: `Bearer ${token}`,
// // // //             },
// // // //         });
// // // //
// // // //         if (!response.ok) {
// // // //             const errorData = await response.json().catch(() => ({}));
// // // //             throw new Error(errorData.message || `Failed to fetch athletes with status ${response.status}`);
// // // //         }
// // // //
// // // //         return response.json();
// // // //     } catch (error) {
// // // //         console.error("Get my athletes error:", error);
// // // //         throw error;
// // // //     }
// // // // };
// // // //
// // // // export const updateAthlete = async (id: number, data: AthleteDTO): Promise<AthleteDTO> => {
// // // //     try {
// // // //         const token = localStorage.getItem("accessToken");
// // // //         if (!token) {
// // // //             throw new Error("No access token found. Please log in again.");
// // // //         }
// // // //
// // // //         console.log("Update athlete request:", { id, data });
// // // //
// // // //         const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
// // // //             method: "PUT",
// // // //             headers: {
// // // //                 "Content-Type": "application/json",
// // // //                 Authorization: `Bearer ${token}`,
// // // //             },
// // // //             body: JSON.stringify(data),
// // // //         });
// // // //
// // // //         if (!response.ok) {
// // // //             const errorData = await response.json().catch(() => ({}));
// // // //             throw new Error(errorData.message || `Failed to update athlete with status ${response.status}`);
// // // //         }
// // // //
// // // //         return response.json();
// // // //     } catch (error) {
// // // //         console.error("Update athlete error:", error);
// // // //         throw error;
// // // //     }
// // // // };
// // //
// // //
// // // import { AuthResponseDTO, LoginRequestDTO, RegisterRequestDTO, UserDTO, AthleteDTO } from "@/types/auth";
// // //
// // // const API_BASE_URL = "http://localhost:8080/api";
// // //
// // // export const login = async (data: LoginRequestDTO): Promise<AuthResponseDTO> => {
// // //     try {
// // //         const response = await fetch(`${API_BASE_URL}/auth/login`, {
// // //             method: "POST",
// // //             headers: {
// // //                 "Content-Type": "application/json",
// // //             },
// // //             body: JSON.stringify(data),
// // //         });
// // //
// // //         if (!response.ok) {
// // //             const errorData = await response.json().catch(() => ({}));
// // //             throw new Error(errorData.message || `Login failed with status ${response.status}`);
// // //         }
// // //
// // //         return response.json();
// // //     } catch (error) {
// // //         console.error("Login error:", error);
// // //         throw error;
// // //     }
// // // };
// // //
// // // export const register = async (data: RegisterRequestDTO): Promise<AuthResponseDTO> => {
// // //     try {
// // //         const token = localStorage.getItem("accessToken");
// // //         if (!token) {
// // //             throw new Error("No access token found. Please log in again.");
// // //         }
// // //
// // //         console.log("Register request:", { data, token });
// // //
// // //         const response = await fetch(`${API_BASE_URL}/auth/register`, {
// // //             method: "POST",
// // //             headers: {
// // //                 "Content-Type": "application/json",
// // //                 Authorization: `Bearer ${token}`,
// // //             },
// // //             body: JSON.stringify(data),
// // //         });
// // //
// // //         if (!response.ok) {
// // //             const errorData = await response.json().catch(() => ({}));
// // //             throw new Error(errorData.message || `Registration failed with status ${response.status}`);
// // //         }
// // //
// // //         return response.json();
// // //     } catch (error) {
// // //         console.error("Register error:", error);
// // //         throw error;
// // //     }
// // // };
// // //
// // // export const getAllUsers = async (): Promise<UserDTO[]> => {
// // //     try {
// // //         const token = localStorage.getItem("accessToken");
// // //         if (!token) {
// // //             throw new Error("No access token found. Please log in again.");
// // //         }
// // //
// // //         const response = await fetch(`${API_BASE_URL}/users`, {
// // //             method: "GET",
// // //             headers: {
// // //                 Authorization: `Bearer ${token}`,
// // //             },
// // //         });
// // //
// // //         if (!response.ok) {
// // //             const errorData = await response.json().catch(() => ({}));
// // //             throw new Error(errorData.message || `Failed to fetch users with status ${response.status}`);
// // //         }
// // //
// // //         return response.json();
// // //     } catch (error) {
// // //         console.error("Get all users error:", error);
// // //         throw error;
// // //     }
// // // };
// // //
// // // export const updateUser = async (username: string, data: UserDTO): Promise<UserDTO> => {
// // //     try {
// // //         const token = localStorage.getItem("accessToken");
// // //         if (!token) {
// // //             throw new Error("No access token found. Please log in again.");
// // //         }
// // //
// // //         console.log("Update user request:", { username, data });
// // //
// // //         const response = await fetch(`${API_BASE_URL}/users/${username}`, {
// // //             method: "PUT",
// // //             headers: {
// // //                 "Content-Type": "application/json",
// // //                 Authorization: `Bearer ${token}`,
// // //             },
// // //             body: JSON.stringify(data),
// // //         });
// // //
// // //         if (!response.ok) {
// // //             const errorData = await response.json().catch(() => ({}));
// // //             throw new Error(errorData.message || `Failed to update user with status ${response.status}`);
// // //         }
// // //
// // //         return response.json();
// // //     } catch (error) {
// // //         console.error("Update user error:", error);
// // //         throw error;
// // //     }
// // // };
// // //
// // // export const createAthlete = async (data: AthleteDTO): Promise<AthleteDTO> => {
// // //     try {
// // //         const token = localStorage.getItem("accessToken");
// // //         if (!token) {
// // //             throw new Error("No access token found. Please log in again.");
// // //         }
// // //
// // //         console.log("Create athlete request:", { data });
// // //
// // //         const response = await fetch(`${API_BASE_URL}/athletes`, {
// // //             method: "POST",
// // //             headers: {
// // //                 "Content-Type": "application/json",
// // //                 Authorization: `Bearer ${token}`,
// // //             },
// // //             body: JSON.stringify(data),
// // //         });
// // //
// // //         if (!response.ok) {
// // //             const errorData = await response.json().catch(() => ({}));
// // //             throw new Error(errorData.message || `Failed to create athlete with status ${response.status}`);
// // //         }
// // //
// // //         return response.json();
// // //     } catch (error) {
// // //         console.error("Create athlete error:", error);
// // //         throw error;
// // //     }
// // // };
// // //
// // // export const getMyAthletes = async (): Promise<AthleteDTO[]> => {
// // //     try {
// // //         const token = localStorage.getItem("accessToken");
// // //         if (!token) {
// // //             throw new Error("No access token found. Please log in again.");
// // //         }
// // //
// // //         const response = await fetch(`${API_BASE_URL}/athletes/my`, {
// // //             method: "GET",
// // //             headers: {
// // //                 Authorization: `Bearer ${token}`,
// // //             },
// // //         });
// // //
// // //         if (!response.ok) {
// // //             const errorData = await response.json().catch(() => ({}));
// // //             throw new Error(errorData.message || `Failed to fetch athletes with status ${response.status}`);
// // //         }
// // //
// // //         return response.json();
// // //     } catch (error) {
// // //         console.error("Get my athletes error:", error);
// // //         throw error;
// // //     }
// // // };
// // //
// // // export const updateAthlete = async (id: number, data: AthleteDTO): Promise<AthleteDTO> => {
// // //     try {
// // //         const token = localStorage.getItem("accessToken");
// // //         if (!token) {
// // //             throw new Error("No access token found. Please log in again.");
// // //         }
// // //
// // //         console.log("Update athlete request:", { id, data });
// // //
// // //         const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
// // //             method: "PUT",
// // //             headers: {
// // //                 "Content-Type": "application/json",
// // //                 Authorization: `Bearer ${token}`,
// // //             },
// // //             body: JSON.stringify(data),
// // //         });
// // //
// // //         if (!response.ok) {
// // //             const errorData = await response.json().catch(() => ({}));
// // //             throw new Error(errorData.message || `Failed to update athlete with status ${response.status}`);
// // //         }
// // //
// // //         return response.json();
// // //     } catch (error) {
// // //         console.error("Update athlete error:", error);
// // //         throw error;
// // //     }
// // // };
// // //
// // // export const deleteAthlete = async (id: number): Promise<void> => {
// // //     try {
// // //         const token = localStorage.getItem("accessToken");
// // //         if (!token) {
// // //             throw new Error("No access token found. Please log in again.");
// // //         }
// // //
// // //         console.log("Delete athlete request:", { id });
// // //
// // //         const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
// // //             method: "DELETE",
// // //             headers: {
// // //                 Authorization: `Bearer ${token}`,
// // //             },
// // //         });
// // //
// // //         if (!response.ok) {
// // //             const errorData = await response.json().catch(() => ({}));
// // //             throw new Error(errorData.message || `Failed to delete athlete with status ${response.status}`);
// // //         }
// // //     } catch (error) {
// // //         console.error("Delete athlete error:", error);
// // //         throw error;
// // //     }
// // // };
// //
// //
// // import { AuthResponseDTO, LoginRequestDTO, RegisterRequestDTO, UserDTO, AthleteDTO, CompetitionApplicationDTO } from "@/types/auth";
// //
// // const API_BASE_URL = "http://localhost:8080/api";
// //
// // export const login = async (data: LoginRequestDTO): Promise<AuthResponseDTO> => {
// //     try {
// //         const response = await fetch(`${API_BASE_URL}/auth/login`, {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify(data),
// //         });
// //
// //         if (!response.ok) {
// //             const errorData = await response.json().catch(() => ({}));
// //             throw new Error(errorData.message || `Login failed with status ${response.status}`);
// //         }
// //
// //         return response.json();
// //     } catch (error) {
// //         console.error("Login error:", error);
// //         throw error;
// //     }
// // };
// //
// // export const register = async (data: { username: string; password: string; roles: string[] }): Promise<AuthResponseDTO> => {
// //     try {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             throw new Error("No access token found. Please log in again.");
// //         }
// //
// //         console.log("Register request:", { data, token });
// //
// //         const response = await fetch(`${API_BASE_URL}/auth/register`, {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json",
// //                 Authorization: `Bearer ${token}`,
// //             },
// //             body: JSON.stringify(data),
// //         });
// //
// //         if (!response.ok) {
// //             const errorData = await response.json().catch(() => ({}));
// //             throw new Error(errorData.message || `Registration failed with status ${response.status}`);
// //         }
// //
// //         return response.json();
// //     } catch (error) {
// //         console.error("Register error:", error);
// //         throw error;
// //     }
// // };
// //
// // export const getAllUsers = async (): Promise<UserDTO[]> => {
// //     try {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             throw new Error("No access token found. Please log in again.");
// //         }
// //
// //         const response = await fetch(`${API_BASE_URL}/users`, {
// //             method: "GET",
// //             headers: {
// //                 Authorization: `Bearer ${token}`,
// //             },
// //         });
// //
// //         if (!response.ok) {
// //             const errorData = await response.json().catch(() => ({}));
// //             throw new Error(errorData.message || `Failed to fetch users with status ${response.status}`);
// //         }
// //
// //         return response.json();
// //     } catch (error) {
// //         console.error("Get all users error:", error);
// //         throw error;
// //     }
// // };
// //
// // export const updateUser = async (username: string, data: UserDTO): Promise<UserDTO> => {
// //     try {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             throw new Error("No access token found. Please log in again.");
// //         }
// //
// //         console.log("Update user request:", { username, data });
// //
// //         const response = await fetch(`${API_BASE_URL}/users/${username}`, {
// //             method: "PUT",
// //             headers: {
// //                 "Content-Type": "application/json",
// //                 Authorization: `Bearer ${token}`,
// //             },
// //             body: JSON.stringify(data),
// //         });
// //
// //         if (!response.ok) {
// //             const errorData = await response.json().catch(() => ({}));
// //             throw new Error(errorData.message || `Failed to update user with status ${response.status}`);
// //         }
// //
// //         return response.json();
// //     } catch (error) {
// //         console.error("Update user error:", error);
// //         throw error;
// //     }
// // };
// //
// // export const createAthlete = async (data: AthleteDTO): Promise<AthleteDTO> => {
// //     try {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             throw new Error("No access token found. Please log in again.");
// //         }
// //
// //         console.log("Create athlete request:", { data });
// //
// //         const response = await fetch(`${API_BASE_URL}/athletes`, {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json",
// //                 Authorization: `Bearer ${token}`,
// //             },
// //             body: JSON.stringify(data),
// //         });
// //
// //         if (!response.ok) {
// //             const errorData = await response.json().catch(() => ({}));
// //             throw new Error(errorData.message || `Failed to create athlete with status ${response.status}`);
// //         }
// //
// //         return response.json();
// //     } catch (error) {
// //         console.error("Create athlete error:", error);
// //         throw error;
// //     }
// // };
// //
// // export const getMyAthletes = async (): Promise<AthleteDTO[]> => {
// //     try {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             throw new Error("No access token found. Please log in again.");
// //         }
// //
// //         const response = await fetch(`${API_BASE_URL}/athletes/my`, {
// //             method: "GET",
// //             headers: {
// //                 Authorization: `Bearer ${token}`,
// //             },
// //         });
// //
// //         if (!response.ok) {
// //             const errorData = await response.json().catch(() => ({}));
// //             throw new Error(errorData.message || `Failed to fetch athletes with status ${response.status}`);
// //         }
// //
// //         return response.json();
// //     } catch (error) {
// //         console.error("Get my athletes error:", error);
// //         throw error;
// //     }
// // };
// //
// // export const updateAthlete = async (id: number, data: AthleteDTO): Promise<AthleteDTO> => {
// //     try {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             throw new Error("No access token found. Please log in again.");
// //         }
// //
// //         console.log("Update athlete request:", { id, data });
// //
// //         const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
// //             method: "PUT",
// //             headers: {
// //                 "Content-Type": "application/json",
// //                 Authorization: `Bearer ${token}`,
// //             },
// //             body: JSON.stringify(data),
// //         });
// //
// //         if (!response.ok) {
// //             const errorData = await response.json().catch(() => ({}));
// //             throw new Error(errorData.message || `Failed to update athlete with status ${response.status}`);
// //         }
// //
// //         return response.json();
// //     } catch (error) {
// //         console.error("Update athlete error:", error);
// //         throw error;
// //     }
// // };
// //
// // export const deleteAthlete = async (id: number): Promise<void> => {
// //     try {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             throw new Error("No access token found. Please log in again.");
// //         }
// //
// //         console.log("Delete athlete request:", { id });
// //
// //         const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
// //             method: "DELETE",
// //             headers: {
// //                 Authorization: `Bearer ${token}`,
// //             },
// //         });
// //
// //         if (!response.ok) {
// //             const errorData = await response.json().catch(() => ({}));
// //             throw new Error(errorData.message || `Failed to delete athlete with status ${response.status}`);
// //         }
// //     } catch (error) {
// //         console.error("Delete athlete error:", error);
// //         throw error;
// //     }
// // };
// //
// // export const createApplication = async (data: CompetitionApplicationDTO): Promise<CompetitionApplicationDTO> => {
// //     try {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             throw new Error("No access token found. Please log in again.");
// //         }
// //
// //         console.log("Create application request:", { data });
// //
// //         const response = await fetch(`${API_BASE_URL}/competition-applications`, {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json",
// //                 Authorization: `Bearer ${token}`,
// //             },
// //             body: JSON.stringify(data),
// //         });
// //
// //         if (!response.ok) {
// //             const errorData = await response.json().catch(() => ({}));
// //             throw new Error(errorData.message || `Failed to create application with status ${response.status}`);
// //         }
// //
// //         return response.json();
// //     } catch (error) {
// //         console.error("Create application error:", error);
// //         throw error;
// //     }
// // };
// //
// // export const getMyApplications = async (): Promise<CompetitionApplicationDTO[]> => {
// //     try {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             throw new Error("No access token found. Please log in again.");
// //         }
// //
// //         const response = await fetch(`${API_BASE_URL}/competition-applications/my`, {
// //             method: "GET",
// //             headers: {
// //                 Authorization: `Bearer ${token}`,
// //             },
// //         });
// //
// //         if (!response.ok) {
// //             const errorData = await response.json().catch(() => ({}));
// //             throw new Error(errorData.message || `Failed to fetch applications with status ${response.status}`);
// //         }
// //
// //         return response.json();
// //     } catch (error) {
// //         console.error("Get my applications error:", error);
// //         throw error;
// //     }
// // };
// //
// // export const updateApplication = async (id: number, data: CompetitionApplicationDTO): Promise<CompetitionApplicationDTO> => {
// //     try {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             throw new Error("No access token found. Please log in again.");
// //         }
// //
// //         console.log("Update application request:", { id, data });
// //
// //         const response = await fetch(`${API_BASE_URL}/competition-applications/${id}`, {
// //             method: "PUT",
// //             headers: {
// //                 "Content-Type": "application/json",
// //                 Authorization: `Bearer ${token}`,
// //             },
// //             body: JSON.stringify(data),
// //         });
// //
// //         if (!response.ok) {
// //             const errorData = await response.json().catch(() => ({}));
// //             throw new Error(errorData.message || `Failed to update application with status ${response.status}`);
// //         }
// //
// //         return response.json();
// //     } catch (error) {
// //         console.error("Update application error:", error);
// //         throw error;
// //     }
// // };
// //
// // export const deleteApplication = async (id: number): Promise<void> => {
// //     try {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             throw new Error("No access token found. Please log in again.");
// //         }
// //
// //         console.log("Delete application request:", { id });
// //
// //         const response = await fetch(`${API_BASE_URL}/competition-applications/${id}`, {
// //             method: "DELETE",
// //             headers: {
// //                 Authorization: `Bearer ${token}`,
// //             },
// //         });
// //
// //         if (!response.ok) {
// //             const errorData = await response.json().catch(() => ({}));
// //             throw new Error(errorData.message || `Failed to delete application with status ${response.status}`);
// //         }
// //     } catch (error) {
// //         console.error("Delete application error:", error);
// //         throw error;
// //     }
// // };
//
//
// //--------
// import { AuthResponseDTO, LoginRequestDTO, RegisterRequestDTO, UserDTO, AthleteDTO, CompetitionApplicationDTO, ContactCompetitionApplicationDTO } from "@/types/auth";
//
// const API_BASE_URL = "http://localhost:8080/api";
//
// export const login = async (data: LoginRequestDTO): Promise<AuthResponseDTO> => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/auth/login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Login failed with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Login error:", error);
//         throw error;
//     }
// };
//
// export const register = async (data: { username: string; password: string; roles: string[] }): Promise<AuthResponseDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Register request:", { data, token });
//
//         const response = await fetch(`${API_BASE_URL}/auth/register`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Registration failed with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Register error:", error);
//         throw error;
//     }
// };
//
// export const getAllUsers = async (): Promise<UserDTO[]> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         const response = await fetch(`${API_BASE_URL}/users`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to fetch users with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Get all users error:", error);
//         throw error;
//     }
// };
//
// export const updateUser = async (username: string, data: UserDTO): Promise<UserDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Update user request:", { username, data });
//
//         const response = await fetch(`${API_BASE_URL}/users/${username}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to update user with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Update user error:", error);
//         throw error;
//     }
// };
//
// export const createAthlete = async (data: AthleteDTO): Promise<AthleteDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Create athlete request:", { data });
//
//         const response = await fetch(`${API_BASE_URL}/athletes`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to create athlete with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Create athlete error:", error);
//         throw error;
//     }
// };
//
// export const getMyAthletes = async (): Promise<AthleteDTO[]> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         const response = await fetch(`${API_BASE_URL}/athletes/my`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to fetch athletes with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Get my athletes error:", error);
//         throw error;
//     }
// };
//
// export const updateAthlete = async (id: number, data: AthleteDTO): Promise<AthleteDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Update athlete request:", { id, data });
//
//         const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to update athlete with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Update athlete error:", error);
//         throw error;
//     }
// };
//
// export const deleteAthlete = async (id: number): Promise<void> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Delete athlete request:", { id });
//
//         const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to delete athlete with status ${response.status}`);
//         }
//     } catch (error) {
//         console.error("Delete athlete error:", error);
//         throw error;
//     }
// };
//
// export const createApplication = async (data: CompetitionApplicationDTO): Promise<CompetitionApplicationDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Create application request:", { data });
//
//         const response = await fetch(`${API_BASE_URL}/competition-applications`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to create application with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Create application error:", error);
//         throw error;
//     }
// };
//
// export const getMyApplications = async (): Promise<CompetitionApplicationDTO[]> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         const response = await fetch(`${API_BASE_URL}/competition-applications/my`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to fetch applications with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Get my applications error:", error);
//         throw error;
//     }
// };
//
// export const updateApplication = async (id: number, data: CompetitionApplicationDTO): Promise<CompetitionApplicationDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Update application request:", { id, data });
//
//         const response = await fetch(`${API_BASE_URL}/competition-applications/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to update application with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Update application error:", error);
//         throw error;
//     }
// };
//
// export const deleteApplication = async (id: number): Promise<void> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Delete application request:", { id });
//
//         const response = await fetch(`${API_BASE_URL}/competition-applications/${id}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to delete application with status ${response.status}`);
//         }
//     } catch (error) {
//         console.error("Delete application error:", error);
//         throw error;
//     }
// };
//
// export const createContactApplication = async (data: ContactCompetitionApplicationDTO): Promise<ContactCompetitionApplicationDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Create contact application request:", { data });
//
//         const response = await fetch(`${API_BASE_URL}/contact-competition-applications`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to create contact application with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Create contact application error:", error);
//         throw error;
//     }
// };
//
// export const getMyContactApplications = async (): Promise<ContactCompetitionApplicationDTO[]> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         const response = await fetch(`${API_BASE_URL}/contact-competition-applications/my`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to fetch contact applications with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Get my contact applications error:", error);
//         throw error;
//     }
// };
//
// export const updateContactApplication = async (id: number, data: ContactCompetitionApplicationDTO): Promise<ContactCompetitionApplicationDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Update contact application request:", { id, data });
//
//         const response = await fetch(`${API_BASE_URL}/contact-competition-applications/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to update contact application with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Update contact application error:", error);
//         throw error;
//     }
// };
//
// export const deleteContactApplication = async (id: number): Promise<void> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Delete contact application request:", { id });
//
//         const response = await fetch(`${API_BASE_URL}/contact-competition-applications/${id}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to delete contact application with status ${response.status}`);
//         }
//     } catch (error) {
//         console.error("Delete contact application error:", error);
//         throw error;
//     }
//
//
//
// };
//
// import { AuthResponseDTO, LoginRequestDTO, RegisterRequestDTO, UserDTO, AthleteDTO, CompetitionApplicationDTO, ContactCompetitionApplicationDTO } from "@/types/auth";
//
// const API_BASE_URL = "http://localhost:8080/api";
//
// export const login = async (data: LoginRequestDTO): Promise<AuthResponseDTO> => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/auth/login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Login failed with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Login error:", error);
//         throw error;
//     }
// };
//
// export const register = async (data: { username: string; password: string; roles: string[] }): Promise<AuthResponseDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Register request:", { data, token });
//
//         const response = await fetch(`${API_BASE_URL}/auth/register`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Registration failed with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Register error:", error);
//         throw error;
//     }
// };
//
// export const getAllUsers = async (): Promise<UserDTO[]> => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) throw new Error("No access token found");
//
//     const response = await fetch(`${API_BASE_URL}/users`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//         },
//     });
//
//     if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || "Failed to fetch users");
//     }
//
//     return response.json();
// };
//
// export const deleteUser = async (id: number): Promise<void> => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) throw new Error("No access token found");
//
//     const response = await fetch(`${API_BASE_URL}/users/${id}`, {
//         method: "DELETE",
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//         },
//     });
//
//     if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || "Failed to delete user");
//     }
// };
// export const updateUser = async (username: string, data: UserDTO): Promise<UserDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Update user request:", { username, data });
//
//         const response = await fetch(`${API_BASE_URL}/users/${username}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to update user with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Update user error:", error);
//         throw error;
//     }
// };
//
// export const createAthlete = async (data: AthleteDTO): Promise<AthleteDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Create athlete request:", { data });
//
//         const response = await fetch(`${API_BASE_URL}/athletes`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to create athlete with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Create athlete error:", error);
//         throw error;
//     }
// };
//
// export const getMyAthletes = async (): Promise<AthleteDTO[]> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         const response = await fetch(`${API_BASE_URL}/athletes/my`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to fetch athletes with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Get my athletes error:", error);
//         throw error;
//     }
// };
//
// export const updateAthlete = async (id: number, data: AthleteDTO): Promise<AthleteDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Update athlete request:", { id, data });
//
//         const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to update athlete with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Update athlete error:", error);
//         throw error;
//     }
// };
//
// export const deleteAthlete = async (id: number): Promise<void> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Delete athlete request:", { id });
//
//         const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to delete athlete with status ${response.status}`);
//         }
//     } catch (error) {
//         console.error("Delete athlete error:", error);
//         throw error;
//     }
// };
//
// export const createApplication = async (data: CompetitionApplicationDTO): Promise<CompetitionApplicationDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Create application request:", { data });
//
//         const response = await fetch(`${API_BASE_URL}/competition-applications`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to create application with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Create application error:", error);
//         throw error;
//     }
// };
//
// export const getMyApplications = async (): Promise<CompetitionApplicationDTO[]> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         const response = await fetch(`${API_BASE_URL}/competition-applications/my`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to fetch applications with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Get my applications error:", error);
//         throw error;
//     }
// };
//
// export const updateApplication = async (id: number, data: CompetitionApplicationDTO): Promise<CompetitionApplicationDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Update application request:", { id, data });
//
//         const response = await fetch(`${API_BASE_URL}/competition-applications/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to update application with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Update application error:", error);
//         throw error;
//     }
// };
//
// export const deleteApplication = async (id: number): Promise<void> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Delete application request:", { id });
//
//         const response = await fetch(`${API_BASE_URL}/competition-applications/${id}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to delete application with status ${response.status}`);
//         }
//     } catch (error) {
//         console.error("Delete application error:", error);
//         throw error;
//     }
// };
//
// export const createContactApplication = async (data: ContactCompetitionApplicationDTO): Promise<ContactCompetitionApplicationDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Create contact application request:", { data });
//
//         const response = await fetch(`${API_BASE_URL}/contact-competition-applications`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to create contact application with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Create contact application error:", error);
//         throw error;
//     }
// };
//
// export const getMyContactApplications = async (): Promise<ContactCompetitionApplicationDTO[]> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         const response = await fetch(`${API_BASE_URL}/contact-competition-applications/my`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to fetch contact applications with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Get my contact applications error:", error);
//         throw error;
//     }
// };
//
// export const updateContactApplication = async (id: number, data: ContactCompetitionApplicationDTO): Promise<ContactCompetitionApplicationDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Update contact application request:", { id, data });
//
//         const response = await fetch(`${API_BASE_URL}/contact-competition-applications/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to update contact application with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Update contact application error:", error);
//         throw error;
//     }
// };
//
// export const deleteContactApplication = async (id: number): Promise<void> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Delete contact application request:", { id });
//
//         const response = await fetch(`${API_BASE_URL}/contact-competition-applications/${id}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to delete contact application with status ${response.status}`);
//         }
//     } catch (error) {
//         console.error("Delete contact application error:", error);
//         throw error;
//     }
// };
//

//=============

//
//
// import { AuthResponseDTO, LoginRequestDTO, RegisterRequestDTO, UserDTO, AthleteDTO, CompetitionApplicationDTO, ContactCompetitionApplicationDTO } from "@/types/auth";
//
// const API_BASE_URL = "http://localhost:8080/api";
//
// export const login = async (data: LoginRequestDTO): Promise<AuthResponseDTO> => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/auth/login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Login failed with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Login error:", error);
//         throw error;
//     }
// };
//
// export const register = async (data: { username: string; password: string; roles: string[] }): Promise<AuthResponseDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Register request:", { data, token });
//
//         const response = await fetch(`${API_BASE_URL}/auth/register`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Registration failed with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Register error:", error);
//         throw error;
//     }
// };
//
// export const getAllUsers = async (): Promise<UserDTO[]> => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) throw new Error("No access token found");
//
//     const response = await fetch(`${API_BASE_URL}/users`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//         },
//     });
//
//     if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || "Failed to fetch users");
//     }
//
//     return response.json();
// };
//
// export const deleteUser = async (id: number): Promise<void> => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) throw new Error("No access token found");
//
//     const response = await fetch(`${API_BASE_URL}/users/${id}`, {
//         method: "DELETE",
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//         },
//     });
//
//     if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || "Failed to delete user");
//     }
// };
//
// export const updateUser = async (username: string, data: UserDTO): Promise<UserDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Update user request:", { username, data });
//
//         const response = await fetch(`${API_BASE_URL}/users/${username}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to update user with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Update user error:", error);
//         throw error;
//     }
// };
//
// export const createAthlete = async (data: AthleteDTO): Promise<AthleteDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Create athlete request:", { data });
//
//         const response = await fetch(`${API_BASE_URL}/athletes`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to create athlete with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Create athlete error:", error);
//         throw error;
//     }
// };
//
// export const getMyAthletes = async (): Promise<AthleteDTO[]> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         const response = await fetch(`${API_BASE_URL}/athletes/my`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to fetch athletes with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Get my athletes error:", error);
//         throw error;
//     }
// };
//
// export const updateAthlete = async (id: number, data: AthleteDTO): Promise<AthleteDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Update athlete request:", { id, data });
//
//         const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to update athlete with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Update athlete error:", error);
//         throw error;
//     }
// };
//
// export const deleteAthlete = async (id: number): Promise<void> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Delete athlete request:", { id });
//
//         const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to delete athlete with status ${response.status}`);
//         }
//     } catch (error) {
//         console.error("Delete athlete error:", error);
//         throw error;
//     }
// };
//
// export const createApplication = async (data: CompetitionApplicationDTO): Promise<CompetitionApplicationDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Create application request:", { data });
//
//         const response = await fetch(`${API_BASE_URL}/competition-applications`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to create application with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Create application error:", error);
//         throw error;
//     }
// };
//
// export const getMyApplications = async (): Promise<CompetitionApplicationDTO[]> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         const response = await fetch(`${API_BASE_URL}/competition-applications/my`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to fetch applications with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Get my applications error:", error);
//         throw error;
//     }
// };
//
// export const updateApplication = async (id: number, data: CompetitionApplicationDTO): Promise<CompetitionApplicationDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Update application request:", { id, data });
//
//         const response = await fetch(`${API_BASE_URL}/competition-applications/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to update application with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Update application error:", error);
//         throw error;
//     }
// };
//
// export const deleteApplication = async (id: number): Promise<void> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Delete application request:", { id });
//
//         const response = await fetch(`${API_BASE_URL}/competition-applications/${id}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to delete application with status ${response.status}`);
//         }
//     } catch (error) {
//         console.error("Delete application error:", error);
//         throw error;
//     }
// };
//
// export const createContactApplication = async (data: ContactCompetitionApplicationDTO): Promise<ContactCompetitionApplicationDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Create contact application request:", { data });
//
//         const response = await fetch(`${API_BASE_URL}/contact-competition-applications`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to create contact application with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Create contact application error:", error);
//         throw error;
//     }
// };
//
// export const getMyContactApplications = async (): Promise<ContactCompetitionApplicationDTO[]> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         const response = await fetch(`${API_BASE_URL}/contact-competition-applications`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to fetch contact applications with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Get my contact applications error:", error);
//         throw error;
//     }
// };
//
// export const updateContactApplication = async (id: number, data: ContactCompetitionApplicationDTO): Promise<ContactCompetitionApplicationDTO> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Update contact application request:", { id, data });
//
//         const response = await fetch(`${API_BASE_URL}/contact-competition-applications/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(data),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to update contact application with status ${response.status}`);
//         }
//
//         return response.json();
//     } catch (error) {
//         console.error("Update contact application error:", error);
//         throw error;
//     }
// };
//
// export const deleteContactApplication = async (id: number): Promise<void> => {
//     try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             throw new Error("No access token found. Please log in again.");
//         }
//
//         console.log("Delete contact application request:", { id });
//
//         const response = await fetch(`${API_BASE_URL}/contact-competition-applications/${id}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(errorData.message || `Failed to delete contact application with status ${response.status}`);
//         }
//     } catch (error) {
//         console.error("Delete contact application error:", error);
//         throw error;
//     }
// };
//


//========
import { AuthResponseDTO, LoginRequestDTO, RegisterRequestDTO, UserDTO, AthleteDTO, CompetitionApplicationDTO, ContactCompetitionApplicationDTO } from "@/types/auth";

const API_BASE_URL = "http://localhost:8080/api";

export const login = async (data: LoginRequestDTO): Promise<AuthResponseDTO> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Login failed with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const register = async (data: { username: string; password: string; roles: string[] }): Promise<AuthResponseDTO> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        console.log("Register request:", { data, token });

        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Registration failed with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Register error:", error);
        throw error;
    }
};

export const getAllUsers = async (): Promise<UserDTO[]> => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found");

    const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch users");
    }

    return response.json();
};

export const deleteUser = async (id: number): Promise<void> => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found");

    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to delete user");
    }
};

export const updateUser = async (username: string, data: UserDTO): Promise<UserDTO> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        console.log("Update user request:", { username, data });

        const response = await fetch(`${API_BASE_URL}/users/${username}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to update user with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Update user error:", error);
        throw error;
    }
};

export const createAthlete = async (data: AthleteDTO): Promise<AthleteDTO> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        console.log("Create athlete request:", { data });

        const response = await fetch(`${API_BASE_URL}/athletes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to create athlete with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Create athlete error:", error);
        throw error;
    }
};

export const getMyAthletes = async (): Promise<AthleteDTO[]> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        const response = await fetch(`${API_BASE_URL}/athletes/my`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to fetch athletes with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Get my athletes error:", error);
        throw error;
    }
};

export const getAllAthletes = async (): Promise<AthleteDTO[]> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        const response = await fetch(`${API_BASE_URL}/athletes`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to fetch all athletes with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Get all athletes error:", error);
        throw error;
    }
};

export const updateAthlete = async (id: number, data: AthleteDTO): Promise<AthleteDTO> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        console.log("Update athlete request:", { id, data });

        const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to update athlete with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Update athlete error:", error);
        throw error;
    }
};

export const deleteAthlete = async (id: number): Promise<void> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        console.log("Delete athlete request:", { id });

        const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to delete athlete with status ${response.status}`);
        }
    } catch (error) {
        console.error("Delete athlete error:", error);
        throw error;
    }
};

export const createApplication = async (data: CompetitionApplicationDTO): Promise<CompetitionApplicationDTO> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        console.log("Create application request:", { data });

        const response = await fetch(`${API_BASE_URL}/competition-applications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to create application with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Create application error:", error);
        throw error;
    }
};

export const getMyApplications = async (): Promise<CompetitionApplicationDTO[]> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        const response = await fetch(`${API_BASE_URL}/competition-applications/my`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to fetch applications with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Get my applications error:", error);
        throw error;
    }
};

export const getAllApplications = async (): Promise<CompetitionApplicationDTO[]> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        const response = await fetch(`${API_BASE_URL}/competition-applications`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to fetch all applications with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Get all applications error:", error);
        throw error;
    }
};

export const updateApplication = async (id: number, data: CompetitionApplicationDTO): Promise<CompetitionApplicationDTO> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        console.log("Update application request:", { id, data });

        const response = await fetch(`${API_BASE_URL}/competition-applications/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to update application with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Update application error:", error);
        throw error;
    }
};

export const deleteApplication = async (id: number): Promise<void> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        console.log("Delete application request:", { id });

        const response = await fetch(`${API_BASE_URL}/competition-applications/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to delete application with status ${response.status}`);
        }
    } catch (error) {
        console.error("Delete application error:", error);
        throw error;
    }
};

export const createContactApplication = async (data: ContactCompetitionApplicationDTO): Promise<ContactCompetitionApplicationDTO> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        console.log("Create contact application request:", { data });

        const response = await fetch(`${API_BASE_URL}/contact-competition-applications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to create contact application with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Create contact application error:", error);
        throw error;
    }
};

export const getMyContactApplications = async (): Promise<ContactCompetitionApplicationDTO[]> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        const response = await fetch(`${API_BASE_URL}/contact-competition-applications`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to fetch contact applications with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Get my contact applications error:", error);
        throw error;
    }
};

export const getAllContactApplications = async (): Promise<ContactCompetitionApplicationDTO[]> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        const response = await fetch(`${API_BASE_URL}/contact-competition-applications`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to fetch all contact applications with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Get all contact applications error:", error);
        throw error;
    }
};

export const updateContactApplication = async (id: number, data: ContactCompetitionApplicationDTO): Promise<ContactCompetitionApplicationDTO> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        console.log("Update contact application request:", { id, data });

        const response = await fetch(`${API_BASE_URL}/contact-competition-applications/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to update contact application with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Update contact application error:", error);
        throw error;
    }
};

export const deleteContactApplication = async (id: number): Promise<void> => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found. Please log in again.");
        }

        console.log("Delete contact application request:", { id });

        const response = await fetch(`${API_BASE_URL}/contact-competition-applications/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to delete contact application with status ${response.status}`);
        }
    } catch (error) {
        console.error("Delete contact application error:", error);
        throw error;
    }
};