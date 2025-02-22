import { JSX } from 'react'

export type TSidebarLinks = {
  title: string
  icon?: JSX.Element
  path: string
}

export type FieldType = {
  email?: string
  password?: string
  role?: string
  name?: string
}
