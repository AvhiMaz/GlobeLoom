import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface TokenStore {
  token: string;
  setToken: (data: string) => void;
  removeToken: () => void;
}

export interface UserIdStoreStore {
  userid: string;
  setUserId: (data: string) => void;
  removeUserId: () => void;
}

const useTokenStore = create<TokenStore>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (data: string) => set(() => ({ token: data })),
        removeToken: () => set(() => ({ token: "" })),
      }),
      { name: "token-store" }
    )
  )
);

const useUserIdStore = create<UserIdStoreStore>()(
  devtools(
    persist(
      (set) => ({
        userid: "",
        setUserId: (data: string) => set(() => ({ userid: data })),
        removeUserId: () => set(() => ({ userid: "" })),
      }),
      { name: "user-store" }
    )
  )
);

export { useTokenStore, useUserIdStore };
