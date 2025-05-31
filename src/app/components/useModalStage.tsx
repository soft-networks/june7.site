import { create } from 'zustand'

type ModalStageState = {
  stage: number
  setStage: (stage: number) => void
  incrementStage: (direction: number) => void
}

const useModalStage = create<ModalStageState>((set) => ({
  stage: 0,
  setStage: (stage) => set({ stage }),
  incrementStage: (direction) => set((state) => ({ stage: state.stage + direction }))
}))

export default useModalStage
