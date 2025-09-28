import { IconDashboard, IconUser } from '@/assets/icons'
import { ROUTE } from '@/core/constants/path'
import { type TSidebarLinks } from '@/models/types/general.type'

export const sidebarLinks: TSidebarLinks[] = [
  {
    title: 'Dashboard',
    icon: <IconDashboard />,
    path: ROUTE.ADMIN.DASHBOARD
  },
  {
    title: 'Users',
    icon: <IconUser />,
    path: ROUTE.ADMIN.USERS
  }
]
