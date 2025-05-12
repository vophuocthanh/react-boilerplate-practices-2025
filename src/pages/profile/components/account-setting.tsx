import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface AccountSettingProps {
  user: any
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
}

export default function AccountSetting({ user, isEditing, setIsEditing }: AccountSettingProps) {
  return (
    <Card className='col-span-1 md:col-span-2'>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='profile' className='w-full'>
          <TabsList className='grid w-full grid-cols-2 mb-6'>
            <TabsTrigger value='profile'>Profile</TabsTrigger>
            <TabsTrigger value='security'>Security</TabsTrigger>
          </TabsList>
          <TabsContent value='profile' className='space-y-4'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Full Name</Label>
                <div className='flex gap-2'>
                  <Input id='name' defaultValue={user?.name} disabled={!isEditing} />
                  <Button variant='outline' onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Save' : 'Edit'}
                  </Button>
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' defaultValue={user?.email} disabled />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone</Label>
                <Input id='phone' defaultValue={'0912832123'} disabled={!isEditing} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value='security' className='space-y-4'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='current-password'>Current Password</Label>
                <Input id='current-password' type='password' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='new-password'>New Password</Label>
                <Input id='new-password' type='password' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='confirm-password'>Confirm New Password</Label>
                <Input id='confirm-password' type='password' />
              </div>
              <Button className='w-full'>Update Password</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
