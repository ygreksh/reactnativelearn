import create from "zustand";

const useSidStore = create (
    set => ({
        sid: null,
        setSid: (sid) => set(state => ({sid: sid})),
        resetSid: () => set(state => ({sid: null}))
    })
)
export default useSidStore;