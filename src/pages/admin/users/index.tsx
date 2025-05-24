import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

export default function Users() {
  const handleSearch = () => {
    // Add your search logic here
    console.log('Search clicked')
  }

  return (
    <div>
      <Input
        iconOnClick={handleSearch}
        placeholder='Search'
        error='Error'
        label='Search'
        helperText='Helper text'
        icon={<Search className='w-4 h-4' />}
        required
      />
    </div>
  )
}
