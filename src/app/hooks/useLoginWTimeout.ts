import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export function useLoginWTimeout(timeoutMs = 10000) {
  const router = useRouter();
  const { login } = useAuth();

  interface LoginResult {
    token?: string;
    error?: string;
    [key: string]: unknown;
  }

  const loginWTimeout = async (
    form: HTMLFormElement,
    loggingIn: (form: HTMLFormElement) => Promise<LoginResult>
  ) => {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeoutMs)
    );

    try {
      const result = await Promise.race([
        loggingIn(form),
        timeoutPromise,
      ]) as LoginResult;
      if (result && result.token) {
        login(result.token);
        return { success: true };
      }
      if (result && result.error) {
        return { error: result.error };
      }
    } catch (err) {
      router.replace("/oopsPage");
      console.error("Login timed out:", err);
      return { error: "Login timed out. Please try again later." };
    }
  };

  return { loginWTimeout };
}