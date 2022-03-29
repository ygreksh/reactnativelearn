import create from "zustand";

const useHideStore = create (
    set => ({
        hide: 0,
        setHideOn: () => set(state => ({hide: 1})),
        setHideOff: () => set(state => ({hide: 0}))
    })
)
export default useHideStore;