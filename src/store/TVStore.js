import create from "zustand";

const useTVStore = create (
    set => ({
        groups: [],
        setGroups: (groups) => set(state => ({groups: groups}))
    })
)
export default useTVStore;