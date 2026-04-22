
import { backendDataSource, DATASOURCE_UNAVAILABLE } from "../service/Config";

export type UserFetchResult = any

const fetchJson = async (url : string, options : any) => {
    const BACKEND_URL = backendDataSource()
    if (!BACKEND_URL) throw new Error(DATASOURCE_UNAVAILABLE)

    const response = await fetch(BACKEND_URL + url, options);
    if (response.ok) {
        return await response.json();;
    }
    console.warn("UserAPI fetch failed:", response)
    return null;
}

export const UserAPI = {
    fetch: async () : Promise<UserFetchResult> => {
        try {
            const jsonResponse = await fetchJson("/auth/user", {
                credentials: "include", // Important: include cookies for session
            })
            if (jsonResponse) return jsonResponse;
        } catch (error) {
            console.warn("Error when trying to fetch user info:", error);
        }
    },
    logout: async () : Promise<any> => {
        try {
            const jsonResponse = await fetchJson("/auth/logout", {
                credentials: "include",
                headers: {
                Accept: "application/json", // SPA-mode for logout - get a JSON packet back
                },
            })
            if (!jsonResponse) return;
            let redirector = () => {
                window.location.href = jsonResponse.url;
            };
            setTimeout(redirector, 100);
        } catch (error) {
            console.warn("Error when trying to logout user:", error);
        }

    }
}