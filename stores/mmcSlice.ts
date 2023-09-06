import { StateCreator } from 'zustand'

export interface StoreInterface {
  mmc: boolean
  update: (mmc: boolean) => void
}

export const createmmclSlice: StateCreator<StoreInterface> = (set, get) => ({
    mmc: false,
    update: (mmc) => {set({mmc: mmc},)},
  })

