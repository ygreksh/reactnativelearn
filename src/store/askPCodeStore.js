import create from "zustand";

const useAskPCodeStore = create (
    set => ({
        askPCode: true,
        setAskPCode: (askPCode) => set(state => ({askPCode: askPCode}))
    })
)
export default useAskPCodeStore;