import { IconDashboard, IconUser } from '@/assets/icons'
import { path } from '@/core/constants/path'
import { type TSidebarLinks } from '@/models/types/general.type'

export const sidebarLinks: TSidebarLinks[] = [
  {
    title: 'Dashboard',
    icon: <IconDashboard />,
    path: path.admin.dashboard
  },
  {
    title: 'Users',
    icon: <IconUser />,
    path: path.admin.users
  }
]
