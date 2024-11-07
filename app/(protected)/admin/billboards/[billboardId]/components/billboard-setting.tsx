'use client';
import { AlertModel } from '@/components/models/alert-model';
import { Button } from '@/components/ui/Button';
import { 
    Form, 
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import ImageUpload from '@/components/image-upload';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard } from '@prisma/client';
import axios from 'axios';
import { TrashIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';
interface BillboardFormProps {
  initialData: Billboard | null;
}
const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),

});
type BillboardFormValues = z.infer<typeof formSchema>;
export const BillboardForm: React.FC<BillboardFormProps> = ({
     initialData }) => {
        const params=useParams();
        const router=useRouter();
    const [open,setOpen]=useState(false);
    const [loading,setLoading]=useState(false);
    const title=initialData?"Edit Billboard":"create billboard";
    const description=initialData?"Edit a billboard":"add a billboard";
    const toastMessage=initialData?"Billboard updated.":"Billboard Created.";
    const action=initialData?"Save Changes":"Create";

    const form=useForm<BillboardFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData || {
            label:'',
            imageUrl:''
        }
    })
    const onSubmit=async(data:BillboardFormValues)=>{
        console.log(data)
      try{
            setLoading(true);
            if(initialData){
              try{
            await axios.patch(`/api/billboards/${params.billboardId}`,data)
          }catch(error){
            console.error("BILLBOARD_PATCH",error)
            toast.error("update billboards failed");
          }
          }
            else{
            await axios.post(`/api/billboards`,data)
               }
               router.refresh();
               router.push(`/admin/billboards`);
               toast.success(toastMessage)
           }catch(error){
            console.error("something went wrong",error)
            toast.error("something went wrong")
        }finally{
            setLoading(false)

        }

    }
    const onDelete=()=>{
      try{
        setLoading(true);
        axios.delete(`/api/billboards/${params.billboardId}`);
        router.refresh();
        router.push(`/admin/billboards`);
        toast.success("Billboard deleted")

      }catch(error){
        console.error("BILLBOARD_DELETE",error)
        toast.error("Make sure you removed all categories using billboard first.")
      }finally{
        setLoading(false);
        setOpen(false)
      }
    }

    return (
    <>
    <AlertModel 
    isOpen={open}
    onClose={()=>setOpen(false)}
    onConfirm={onDelete}
    loading={loading}
    />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (<Button
        disabled={loading}
         variant="destructive" size="icon"
          onClick={() => setOpen(true)}>
          <TrashIcon className="w-4 h-4 " />
        </Button>)
     }
      </div>
      <hr />
      <Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
<FormField
    control={form.control}
    name="imageUrl"
    render={({field})=>(
        <FormItem>
            <FormLabel>
                    Background Image
            </FormLabel>
            <FormControl>
               <ImageUpload
               value={field.value?[field.value]:[]}
               disabled={loading}
               onChange={(url)=>field.onChange(url)}
               onRemove={()=>field.onChange("")}
              name='adminform'
                />
            </FormControl>
            <FormMessage/>
        </FormItem>

    )}
    />

    <FormField
    control={form.control}
    name="label"
    render={({field})=>(
        <FormItem>
            <FormLabel>
                    Label
            </FormLabel>
            <FormControl>
                <Input
                disabled={loading}
                placeholder='billboard name'
                value={field.value}
                onChange={(name)=>field.onChange(name)}
                />
            </FormControl>
            <FormMessage/>
        </FormItem>

    )}
    />
<Button type='submit'>
{action}
</Button>
</form>
      </Form>
      <hr className='mt-2'/>
     
    </>
  );
};
