import apiService from "../API";
import { IUserSession } from "../Types";

export async function login(email: string, password: string): Promise<any> {
  const sessionData = await apiService.post(`/user/login`, { email, password });

  if (sessionData && sessionData.data)
    localStorage.setItem("user", JSON.stringify(sessionData.data));

  return sessionData.data ? sessionData.data : null;
}

export function logout(): void {
  return localStorage.removeItem("user");
}

export async function register(
  clinicId: number,
  email: string,
  password: string
): Promise<any> {
  const sessionData = await apiService.post(`/user`, {
    clinicId,
    email,
    password,
  });
  if (sessionData && sessionData.data)
    localStorage.setItem("user", JSON.stringify(sessionData.data));

  return sessionData.data ? sessionData.data : null;
}

export function getCurrentUser(): IUserSession | null {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
}

export function getClinicId(): number | null {
  const user = getCurrentUser();

  if (user) {
    return user.clinicId;
  }

  return null;
}
