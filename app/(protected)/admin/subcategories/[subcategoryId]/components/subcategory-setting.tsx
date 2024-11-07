/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {SubCategory,Category } from '@prisma/client';
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
interface SubCategoryFormProps {
  categories: Category[];
  initialData: SubCategory | null;
}
const formSchema = z.object({
  name: z.string().min(1),
  categoryId: z.string().min(1),

});
type SubCategoryFormValues = z.infer<typeof formSchema>;
export const SubCategoryForm: React.FC<SubCategoryFormProps> = ({categories, initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit sub-category' : 'create sub-category';
  const description = initialData ? 'Edit a sub-category' : 'add a sub-category';
  const toastMessage = initialData ? 'Sub-category updated.' : 'Sub-category Created.';
  const action = initialData ? 'Save Changes' : 'Create';

  const form = useForm<SubCategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      categoryId: '',
    },
  });
  const onSubmit = async (data: SubCategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/subcategories/${params.categoryId}`,
          data
        );
      } else {
        await axios.post(`/api/subcategories`, data);
      }
      router.push('/admin/subcategories')
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
      axios.delete(`/api/subcategories/${params.categoryId}`);
      router.refresh();
      router.push(`/admin/subcategories`);
      toast.success('SubCategory deleted');
    } catch (error) {
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
                    placeholder="sub-category name"
                    value={field.value}
                    onChange={(name) => field.onChange(name)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category </FormLabel>
                <FormControl>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue defaultValue={field.value} placeholder='select a category' />
                    </SelectTrigger>
                    <SelectContent className='bg-white dark:bg-black'>
                      {categories && categories.map((category)=>(
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
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
