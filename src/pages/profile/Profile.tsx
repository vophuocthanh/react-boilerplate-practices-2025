import { useState } from 'react'

import { Camera, Mail, MapPin, Phone } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import FileUpload from '@/components/upload-file/file-upload'
import { useAuthStore } from '@/core/store/features/auth/authStore'
import AccountSetting from '@/pages/profile/components/account-setting'
import RecentActivity from '@/pages/profile/components/recent-activity'

export default function Profile() {
  const { user } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)

  const handleAvatarUpload = (files: FileList | null) => {
    if (files && files[0]) {
      // TODO: handle upload or preview here
      // Example: uploadAvatar(files[0])
      // For now, just log
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className='max-w-5xl mx-auto px-4 py-10'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <Card className='col-span-1 flex flex-col items-center p-0 overflow-hidden'>
          <div className='w-full h-28 bg-gradient-to-r from-blue-500 to-purple-500 relative flex items-center justify-center'>
            <div className='absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2'>
              <Avatar className='h-24 w-24 border-4 border-white shadow-lg'>
                <AvatarImage src='/images/avatar.png' alt={user?.name} />
                <AvatarFallback className='text-lg'>{getInitials(user?.name || '')}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className='mt-16 w-full flex flex-col items-center px-6 pb-8'>
            <CardTitle className='text-2xl text-center'>{user?.name}</CardTitle>
            <CardDescription className='text-base text-center'>{user?.email}</CardDescription>
            <div className='flex flex-col gap-2 mt-6 w-full'>
              <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 justify-center'>
                <Mail className='h-4 w-4' />
                <span>{user?.email}</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 justify-center'>
                <Phone className='h-4 w-4' />
                <span>{'0912832123'}</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 justify-center'>
                <MapPin className='h-4 w-4' />
                <span>Location not set</span>
              </div>
            </div>
            <FileUpload onChange={handleAvatarUpload} ariaLabel='Upload avatar'>
              <Button
                variant='outline'
                size='icon'
                className='rounded-full mt-6'
                aria-label='Upload avatar'
                tabIndex={0}
              >
                <Camera className='h-4 w-4' />
              </Button>
            </FileUpload>
          </div>
        </Card>

        <AccountSetting user={user} isEditing={isEditing} setIsEditing={setIsEditing} />
      </div>

      <RecentActivity />
    </div>
  )
}
