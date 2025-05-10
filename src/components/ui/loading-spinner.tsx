export default function LoadingSpinner() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-12 h-12 border-t-4 border-b-4 rounded-full border-primary animate-spin'></div>
    </div>
  )
}
