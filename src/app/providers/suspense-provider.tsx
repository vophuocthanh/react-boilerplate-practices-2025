import { type ReactNode, Suspense } from 'react'

import LoadingSpinner from '@/components/ui/loading-spinner'

export default function SuspenseProvider({ children }: { children: ReactNode }) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
}
