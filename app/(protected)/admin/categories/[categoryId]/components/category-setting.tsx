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
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard, Category,Specification } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import axios from 'axios';
import { TrashIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';
interface CategoryFormProps {
  billboards: Billboard[];
  initialData: Category | null;
}
const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),

});
type CategoryFormValues = z.infer<typeof formSchema>;
export const CategoryForm: React.FC<CategoryFormProps> = ({billboards, initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit Category' : 'create category';
  const description = initialData ? 'Edit a category' : 'add a caegory';
  const toastMessage = initialData ? 'Category updated.' : 'Category Created.';
  const action = initialData ? 'Save Changes' : 'Create';

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      billboardId: '',
    },
  });
  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/categories/${params.categoryId}`,
          data
        );
      } else {
        await axios.post(`/api/categories`, data);
      }
      router.refresh();
      router.push('/admin/categories')
      toast.success(toastMessage);
    } catch (error) {
      toast.error('something went wrong');
    } finally {
      setLoading(false);
    }
  };
  const onDelete = () => {
    try {
      setLoading(true);
      axios.delete(`/api/categories/${params.categoryId}`);
      router.refresh();
      router.push(`/admin/categories`);
      toast.success('Category deleted');
    } catch (err) {
      toast.error(
        'Something went wrong!'
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModel
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <TrashIcon className="w-4 h-4 " />
          </Button>
        )}
      </div>
      <hr />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
        
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="category name"
                    value={field.value}
                    onChange={(name) => field.onChange(name)}
                  />
                </FormControl>
                <FormMessage className='text-red-500 text-sm'/>
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billboardId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard </FormLabel>
                <FormControl>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue defaultValue={field.value} placeholder='select a billboard' />
                    </SelectTrigger>
                    <SelectContent className='bg-white     '>
                      {billboards.map((billboard)=>(
                      <SelectItem key={billboard.id} value={billboard.id}>
                        {billboard.label}
                      </SelectItem>
  ))}
                      
                    </SelectContent>
                 </Select>
                  </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{action}</Button>
        </form>
      </Form>
      <hr className="mt-2" />
    </>
  );
};
