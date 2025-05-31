import { create } from 'zustand'

type ModalState = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const useModalIsOpen = create<ModalState>((set) => ({
  isOpen: true,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }), 
  toggle: () => set((state) => ({ isOpen: !state.isOpen }))
}))

export default useModalIsOpen
