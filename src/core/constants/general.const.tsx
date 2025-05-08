import { IconDashboard } from '@/assets/icons'
import { type TSidebarLinks } from '@/models/types/general.type'

export const sidebarLinks: TSidebarLinks[] = [
  {
    title: 'Dashboard',
    icon: <IconDashboard />,
    path: '/admin/dashboard'
  }
]
