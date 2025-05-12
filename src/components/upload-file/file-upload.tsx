import { useRef } from 'react'

interface FileUploadProps {
  multiple?: boolean
  accept?: string
  onChange: (files: FileList | null) => void
  children: React.ReactNode
  id?: string
  className?: string
  ariaLabel?: string
}

const FileUpload = ({
  multiple = false,
  accept = 'image/*',
  onChange,
  children,
  id,
  className = '',
  ariaLabel = 'Upload file'
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleTriggerClick = () => {
    inputRef.current?.click()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleTriggerClick()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files)
  }

  return (
    <>
      <div
        role='button'
        className={className}
        aria-label={ariaLabel}
        tabIndex={0}
        onClick={handleTriggerClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
      <input
        ref={inputRef}
        id={id}
        type='file'
        accept={accept}
        multiple={multiple}
        className='hidden'
        onChange={handleFileChange}
        aria-label={ariaLabel}
        tabIndex={-1}
      />
    </>
  )
}

export default FileUpload
