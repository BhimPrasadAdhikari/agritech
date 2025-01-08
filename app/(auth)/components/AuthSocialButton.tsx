import { Button } from '@/components/ui/Button'
import {IconType} from 'react-icons'
interface AuthSocialButtonProps{
    icon:IconType
    disabled:boolean
    onClick:()=>void
}
const AuthSocialButton:React.FC<AuthSocialButtonProps> = ({
    icon:Icon,
    disabled,
    onClick

}) => {
  return (
    <Button
    type='button'
    disabled={disabled}
    variant='outline'
    onClick={onClick}
    className='rounded-md inline-flex w-full justify-center bg-green-600 text-white     hover:bg-green-500'>
        <Icon />
    </Button>
  )
}

export default AuthSocialButton