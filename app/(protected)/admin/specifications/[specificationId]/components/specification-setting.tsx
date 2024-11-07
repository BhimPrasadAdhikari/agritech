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
import { Category, Specification } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import axios from 'axios';
import { TrashIcon, PlusIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';

interface SpecificationFormProps {
  categories: Category[];
  initialData: Specification | null;
}

const formSchema = z.object({
  categoryId: z.string().min(1),
  specifications: z.array(
    z.object({
      name: z.string().min(1),
      values: z.string().min(1), // Now using values instead of value
    })
  ),
});

type SpecificationFormValues = z.infer<typeof formSchema>;

export const SpecificationForm: React.FC<SpecificationFormProps> = ({
  categories,
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit Specification' : 'Create Specification';
  const description = initialData ? 'Edit a specification' : 'Add a specification';
  const toastMessage = initialData ? 'Specification updated.' : 'Specification Created.';
  const action = initialData ? 'Save Changes' : 'Create';

  const form = useForm<SpecificationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          categoryId: initialData.categoryId,
          specifications: [{ name: initialData.name, values: initialData.values.join(', ') }], // Adjusting this line
        }
      : {
          categoryId: '',
          specifications: [{ name: '', values: '' }],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'specifications',
  });

  const onSubmit = async (data: SpecificationFormValues) => {
    try {
      setLoading(true);
      // Convert the values field to an array
      const specificationsToSubmit = data.specifications.map(spec => ({
        name: spec.name,
        values: spec.values.split(',').map(v => v.trim()), // Split by comma and trim whitespace
      }));

      if (initialData) {
        await axios.patch(
          `/api/specifications/${params.specificationId}`,
          { categoryId: data.categoryId, specifications: specificationsToSubmit }
        );
      } else {
        await axios.post(`/api/specifications`, {
          categoryId: data.categoryId,
          specifications: specificationsToSubmit,
        });
      }
      router.push(`/admin/specifications`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = () => {
    try {
      setLoading(true);
      axios.delete(`/api/specifications/${params.specificationId}`);
      router.refresh();
      router.push(`/${params.storeId}/specifications`);
      toast.success('Specification deleted');
    } catch (error) {
      toast.error('Something went wrong!');
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue defaultValue={field.value} placeholder='Select a category' />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
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

          {/* Render specifications inputs */}
          {fields.map((field, index) => (
            <div key={field.id} className="flex space-x-4 items-center">
              <FormField
                control={form.control}
                name={`specifications.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Specification Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`specifications.${index}.values`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Values (comma-separated)</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="e.g., Cotton, Silk"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="button" variant="destructive" onClick={() => remove(index)}>
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() => append({ name: '', values: '' })}
            variant="outline"
            className="mt-4"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Specification
          </Button>

          <Button type="submit">{action}</Button>
        </form>
      </Form>
      <hr className="mt-2" />
    </>
  );
};
