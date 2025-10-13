import {
  BarChart3,
  Calendar,
  CreditCard,
  FileText,
  Mail,
  PieChart,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users
} from 'lucide-react'

import { ROUTE } from '@/core/constants/path'
import { type TSidebarLinks } from '@/models/types/general.type'

export const sidebarLinks: TSidebarLinks[] = [
  {
    title: 'Dashboard',
    icon: <BarChart3 className='w-5 h-5' />,
    path: ROUTE.ADMIN.DASHBOARD
  },
  {
    title: 'Analytics',
    icon: <PieChart className='w-5 h-5' />,
    path: ROUTE.ADMIN.ANALYTICS.ROOT,
    children: [
      {
        title: 'Overview',
        path: ROUTE.ADMIN.ANALYTICS.OVERVIEW
      },
      {
        title: 'Sales Analytics',
        path: ROUTE.ADMIN.ANALYTICS.SALES
      },
      {
        title: 'User Analytics',
        path: ROUTE.ADMIN.ANALYTICS.USERS
      },
      {
        title: 'Performance',
        path: ROUTE.ADMIN.ANALYTICS.PERFORMANCE
      }
    ]
  },
  {
    title: 'Users',
    icon: <Users className='w-5 h-5' />,
    path: ROUTE.ADMIN.USERS,
    children: [
      {
        title: 'All Users',
        path: 'users/all'
      },
      {
        title: 'Active Users',
        path: 'users/active'
      },
      {
        title: 'Inactive Users',
        path: 'users/inactive'
      },
      {
        title: 'User Roles',
        path: 'users/roles'
      },
      {
        title: 'Permissions',
        path: 'users/permissions'
      }
    ]
  },
  {
    title: 'E-Commerce',
    icon: <ShoppingCart className='w-5 h-5' />,
    path: 'ecommerce',
    children: [
      {
        title: 'Orders',
        path: 'ecommerce/orders'
      },
      {
        title: 'Products',
        path: 'ecommerce/products'
      },
      {
        title: 'Categories',
        path: 'ecommerce/categories'
      },
      {
        title: 'Inventory',
        path: 'ecommerce/inventory'
      },
      {
        title: 'Coupons',
        path: 'ecommerce/coupons'
      }
    ]
  },
  {
    title: 'Content',
    icon: <FileText className='w-5 h-5' />,
    path: 'content',
    children: [
      {
        title: 'Blog Posts',
        path: 'content/posts'
      },
      {
        title: 'Pages',
        path: 'content/pages'
      },
      {
        title: 'Media Library',
        path: 'content/media'
      },
      {
        title: 'Comments',
        path: 'content/comments'
      }
    ]
  },
  {
    title: 'Payments',
    icon: <CreditCard className='w-5 h-5' />,
    path: 'payments',
    children: [
      {
        title: 'Transactions',
        path: 'payments/transactions'
      },
      {
        title: 'Payment Methods',
        path: 'payments/methods'
      },
      {
        title: 'Refunds',
        path: 'payments/refunds'
      },
      {
        title: 'Invoices',
        path: 'payments/invoices'
      }
    ]
  },
  {
    title: 'Calendar',
    icon: <Calendar className='w-5 h-5' />,
    path: 'calendar'
  },
  {
    title: 'Messages',
    icon: <Mail className='w-5 h-5' />,
    path: 'messages',
    children: [
      {
        title: 'Inbox',
        path: 'messages/inbox'
      },
      {
        title: 'Sent',
        path: 'messages/sent'
      },
      {
        title: 'Drafts',
        path: 'messages/drafts'
      },
      {
        title: 'Templates',
        path: 'messages/templates'
      }
    ]
  },
  {
    title: 'Reports',
    icon: <TrendingUp className='w-5 h-5' />,
    path: 'reports',
    children: [
      {
        title: 'Sales Reports',
        path: 'reports/sales'
      },
      {
        title: 'User Reports',
        path: 'reports/users'
      },
      {
        title: 'Financial Reports',
        path: 'reports/financial'
      },
      {
        title: 'System Reports',
        path: 'reports/system'
      }
    ]
  },
  {
    title: 'Settings',
    icon: <Settings className='w-5 h-5' />,
    path: 'settings',
    children: [
      {
        title: 'General',
        path: 'settings/general'
      },
      {
        title: 'Security',
        path: 'settings/security'
      },
      {
        title: 'Notifications',
        path: 'settings/notifications'
      },
      {
        title: 'Integrations',
        path: 'settings/integrations'
      },
      {
        title: 'Backup',
        path: 'settings/backup'
      }
    ]
  }
]
