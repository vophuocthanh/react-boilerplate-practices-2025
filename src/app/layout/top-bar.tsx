import { Link } from 'react-router-dom'

const TopBar = () => {
  return (
    <div className='flex items-center justify-between px-5 py-4 bg-[#FCFCFC]'>
      <div className='flex items-center gap-[82px] flex-1'>
        <Logo />
      </div>
    </div>
  )
}

function Logo() {
  return (
    <Link to='/' className='flex items-center gap-4 ml-10'>
      <img
        src={'https://adminvov1.vov.gov.vn/UploadImages/vov1/2016/thang_5/TCMR.jpg?w=100%'}
        alt='logo'
        className='w-24 h-10'
      />
    </Link>
  )
}

export default TopBar
