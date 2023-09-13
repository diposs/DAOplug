import { StateCreator } from 'zustand'

export interface StoreInterface3 {
  inUser: string | null | undefined
  updateinUser: (inUser: string | null | undefined) => void
  pRecord: string | null | undefined
  updatepRecord: (pRecord: string | null | undefined) => void
  pKey: Uint8Array | null | undefined
  pvKey: Uint8Array | null | undefined
  addressed: string[]
  lighthouseapi: string | null
  updatelighthouseapi: (lighthouseapi: string | null ) => void
  setAddressed: (addressed: string[]) => void
  updatepKey: (pKey: Uint8Array | null | undefined) => void
  updatepvKey: (pvKey: Uint8Array | null | undefined) => void
}

export const createcompound: StateCreator<StoreInterface3> = (set, get) => ({
    inUser: null,
    updateinUser: (inUser) => {set({inUser: inUser},)},
    lighthouseapi: null,
    updatelighthouseapi: (lighthouseapi) => {set({lighthouseapi: lighthouseapi},)},
    pRecord: null,
    updatepRecord: (pRecord) => {set({pRecord: pRecord},)},
    pKey: null,
    updatepKey: (pKey) => {set({pKey: pKey},)},
    pvKey: null,
    updatepvKey: (pvKey) => {set({pvKey: pvKey},)},
    addressed: [''],
    setAddressed: (addressed) => {set({addressed: addressed},)},
  })

