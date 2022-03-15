import create from "zustand";

const useStore = create (
    set => ({
        sid: null,
        setSid: (sid) => set(state => ({sid: sid})),
        resetSid: () => set(state => ({sid: null}))
    })
)
export default useStore;