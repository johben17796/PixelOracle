/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_RAWG_API_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  /*if (!import.meta.env.VITE_RAWG_API_KEY) {
  setError('API key is missing. Please configure it in your .env file.');
  return;
*/

