import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function RecentActivity() {
  return (
    <Card className='mt-10'>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your recent activities and interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {[1, 2, 3].map((item) => (
            <div key={item} className='flex items-start gap-4'>
              <div className='mt-2 h-2 w-2 rounded-full bg-blue-500' />
              <div className='flex-1 space-y-1'>
                <p className='text-sm font-medium'>Activity {item}</p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p className='text-xs text-gray-400 dark:text-gray-500'>2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
