import Cookies from "js-cookie";

export const cookieStorage = {
  getItem: (name: string): string | null => {
    return Cookies.get(name) || null;
  },
  setItem: (name: string, value: string) => {
    // Set cookie expiration as needed (here: 7 days)
    Cookies.set(name, value, { expires: 7 });
  },
  removeItem: (name: string) => {
    Cookies.remove(name);
  },
};
