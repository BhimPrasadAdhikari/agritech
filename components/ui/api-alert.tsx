"use client"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CopyIcon, ServerIcon } from 'lucide-react';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from './Button';
import { toast } from 'react-hot-toast';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
};
const variantMap: Record<ApiAlertProps['variant'], BadgeProps["variant"]> = {
  public: 'secondary',
  admin: 'destructive',
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = 'public',
}) => {
    const onCopy=()=>{
        navigator.clipboard.writeText(description);
        toast.success("api route copied")
    }
  return <Alert>
    <ServerIcon className='w-4 h-4 mr-2'/>
    <AlertTitle className='flex items-center gap-x-2'>
        {title}
    <Badge variant={variantMap[variant]}>
        {textMap[variant]}
    </Badge>
    </AlertTitle>
    <AlertDescription className='mt-4 flex items-center justify-between'>
        <code className="relative px-[0.3rem] py-[0.2rem] rounded bg-muted font-semibold font-mono">
            {description}
        </code>
        <Button variant='outline' size="icon" onClick={onCopy}>
            <CopyIcon className='h-4 w-4 '/>
        </Button>
    </AlertDescription>
  </Alert>;
};
