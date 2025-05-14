import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface GlocalState {
  sidebarOpen: boolean
  toggleSidebar: () => void
}

const useToggleSideBar = create<GlocalState>()(
  devtools(
    persist(
      (set) => ({
        sidebarOpen: false,
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen }))
      }),
      {
        name: 'toggle-sidebar-storage'
      }
    )
  )
)

export default useToggleSideBar
