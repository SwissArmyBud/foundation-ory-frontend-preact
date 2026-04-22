
export const DATASOURCE_UNAVAILABLE = "The data source is currently not available or loaded."

let lastConfigLoaded : any;

// Fetch user info from Django API
export const reloadConfig = async (): Promise<any | null> => {
  const CONFIG_FILE = "/env.json";
  try {
    const response = await fetch(CONFIG_FILE);
    if (response.ok) {
      let config = await response.json();
      lastConfigLoaded = config;
      console.log("SET LATEST CONFIG:", config)
      return lastConfigLoaded;
    }
    return null;
  } catch (error) {
    console.warn("Failed to fetch config info:", error);
    alert("Failed to load website connection to data source. Please reload.")
    return null;
  }
};

// Fetch user info from local cache
export const loadConfig = async (): Promise<any> => {
  if (!lastConfigLoaded) await reloadConfig();
  return lastConfigLoaded;
};

// Quick fetch the backend URL
export const backendDataSource = () : any | null => {
  return lastConfigLoaded.BACKEND_BASE_URL;
}
