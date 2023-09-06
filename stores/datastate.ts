import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { createmmclSlice, StoreInterface } from './mmcSlice'
import { createcompound, StoreInterface3 } from './compound'

type StoreState = StoreInterface
type StoreState3 = StoreInterface3

export const useBoundStore = create<StoreState>()(persist((...a) => ({
    ...createmmclSlice(...a),
}), { name: 'app-store',}))
export const useBoundStore3 = create<StoreState3>()(persist((...a) => ({
    ...createcompound(...a),
}),{ name: 'store',}))
