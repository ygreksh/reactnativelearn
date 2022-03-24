import create from "zustand";

const usePCodeStore = create (
    set => ({
        pcode: null,
        setPCode: (pcode) => set(state => ({pcode: pcode})),
        resetPCode: () => set(state => ({pcode: null}))
    })
)
export default usePCodeStore;