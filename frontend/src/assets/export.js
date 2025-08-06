
import { create, useStore } from 'zustand'

const useAuth=create((set, get) => ({
    count: 0,
    increment: (x) => set({ count: get().count + x }),
    decrement: () => set({ count: get().count - 1 }),
    display: () => console.log(get().count)
}))

export default useAuth