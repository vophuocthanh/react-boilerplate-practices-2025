import { type JSX } from 'react'

export type TSidebarLinks = {
  title: string
  icon?: JSX.Element
  path: string
  children?: TSidebarLinks[]
}

export type FieldType = {
  email?: string
  password?: string
  role?: string
  name?: string
}
