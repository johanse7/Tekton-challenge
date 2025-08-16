import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";

const fakeUsers = [
  { email: "rick@rick.com", name: "Rick Sanchez", password: "rick" },
  { email: "morty@morty.com", name: "Morty Smith", password: "morty" },
];

type User = {
  email: string;
  name: string;
  token: string;
};

type LoginResponse = {
  user: User | null;
  errorMessage?: string;
};

type State = {
  user: User | null;
  login: (email: string, password: string) => LoginResponse;
  logout: () => void;
};

export const useAuthStore = create<State>()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        const foundUser = fakeUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (!foundUser) {
          return { user: null, errorMessage: "Invalid email or password" };
        }

        const token = `token-fake-${foundUser.email}-${new Date().getTime()}`;
        const userLogged = {
          name: foundUser.name,
          email: foundUser.email,
          token,
        };

        set({ user: userLogged });

        return { user: userLogged };
      },
      logout: () => set({ user: null }),
    }),
    { name: "auth-storage", storage: createJSONStorage(() => sessionStorage) }
  )
);
