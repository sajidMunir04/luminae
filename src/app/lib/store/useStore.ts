import { create } from 'zustand'

interface StateData {
  favorites: string[],
  cartProducts: string[]
}

const data : StateData = {
  favorites: [],
  cartProducts: []
}

const useStore = create((set) => ({
  
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))
