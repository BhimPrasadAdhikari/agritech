"use client";
import { AlertModel } from "@/components/models/alert-model";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Heading } from "@/components/ui/heading";
import ImageUpload from "@/components/image-upload";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Image,
  Product,
  Category,
  SubCategory,
  Specification,
} from "@prisma/client";
import axios from "axios";
import { TrashIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
interface ProductFormProps {
  categories: Category[];
  subCategories: SubCategory[];
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
}
const formSchema = z.object({
  name: z.string().min(1),
  detail: z.string().min(1),
  images: z.object({ url: z.string().min(1) }).array(),
  productSpecification: z
    .array(z.object({ name: z.string(), value: z.string() }))
    .min(1, "At least one specification is required"),
  price: z.coerce.number().min(1),
  discount: z.coerce.number().nullable().optional(),
  stock: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  subCategoryId: z.string().nullable().optional(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});
type ProductFormValues = z.infer<typeof formSchema>;
export const ProductForm: React.FC<ProductFormProps> = ({
  categories,
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Product" : "create Product";
  const description = initialData ? "Edit a Product" : "add a Product";
  const toastMessage = initialData ? "Product updated." : "Product Created.";
  const action = initialData ? "Save Changes" : "Create";

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    initialData?.categoryId || ""
  );
  const [categorySpecifications, setCategorySpecifications] = useState<
    Specification[]
  >([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      detail: "",
      images: [],
      productSpecification: [],
      discount: 0,
      stock: 0,
      price: 0,
      subCategoryId: "",
      categoryId: "",
      isFeatured: false,
      isArchived: false,
    },
  });
  const onSubmit = async (data: ProductFormValues) => {
    console.log("submitted data", data);
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/products/${params.productId}`, data);
      } else {
        await axios.post(`/api/products`, data);
      }
      router.refresh();
      router.push(`/admin/products`);
      toast.success(toastMessage);
    } catch (error) {
      console.error("product_post", error);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    async function categorySpecificationsFetch() {
      try {
        const categorySpecification = await axios.get(
          `/api/specifications/${selectedCategoryId}`
        );
        const subCategories = await axios.get(
          `/api/subcategories/${selectedCategoryId}`
        );
        console.log("Category Specifications", categorySpecification);
        console.log(subCategories);
        setCategorySpecifications(categorySpecification.data);
        setSubCategories(subCategories.data);
      } catch (error) {
        console.log("specifications_error", error);
      }
    }
    categorySpecificationsFetch();
  }, [selectedCategoryId]);

  const onCategorySelect = (id: string) => {
    setSelectedCategoryId(id);
  };
  const onDelete = () => {
    try {
      setLoading(true);
      axios.delete(`/api/products/${params.productId}`);
      router.refresh();
      router.push(`/admin/products`);
      toast.success("Product deleted");
    } catch (error) {
      console.error("product_delete", error);
      toast.error("Make sure you removed all categories using Product first.");
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
      <div className="flex items-center justify-between mb-4">
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
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={
                      field.value ? field.value.map((image) => image.url) : []
                    }
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url != url),
                      ])
                    }
                    name="adminform"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product/Brand Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="name"
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
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>details</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="details"
                      value={field.value}
                      onChange={(name) => field.onChange(name)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-10 ">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="0"
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
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="0"
                      value={field.value ? field.value : 0}
                      onChange={(name) => field.onChange(name)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="0"
                      value={field.value}
                      onChange={(name) => field.onChange(name)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-10 ">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category </FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={(newValue) => {
                        field.onChange(newValue);
                        onCategorySelect(newValue);
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="select a category"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-black">
                        {categories.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Category </FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={(newValue) => {
                        field.onChange(newValue);
                      }}
                      value={field.value ? field.value : ""}
                      defaultValue={field.value ? field.value : ""}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          defaultValue={field.value ? field.value : ""}
                          placeholder="select a sub category"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-black">
                        {subCategories &&
                          subCategories.length > 0 &&
                          subCategories.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-10 flex-wrap ">
            {categorySpecifications.length > 0
              ? categorySpecifications.map((catSpec) => {
                  return (
                    <FormField
                      control={form.control}
                      name="productSpecification"
                      key={catSpec.id}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{catSpec.name}</FormLabel>
                          <FormControl>
                            <Select
                              disabled={loading}
                              onValueChange={(newValue) => {
                                // Check if the specification already exists
                                const existingIndex = field.value.findIndex(
                                  (productSpecification) =>
                                    productSpecification.name.toLowerCase() ===
                                    catSpec.name.toLowerCase()
                                );

                                let updatedProductSpecifications;

                                if (existingIndex && existingIndex > -1) {
                                  // Update the existing specification
                                  updatedProductSpecifications =
                                    field.value &&
                                    field.value.map(
                                      (productSpecification, index) =>
                                        index === existingIndex
                                          ? {
                                              ...productSpecification,
                                              value: newValue,
                                            } // Update the value
                                          : productSpecification
                                    );
                                } else {
                                  // Add a new specification if it doesn't exist
                                  updatedProductSpecifications =
                                    field.value && [
                                      ...field.value,
                                      { name: catSpec.name, value: newValue },
                                    ];
                                }

                                console.log(updatedProductSpecifications);
                                field.onChange(updatedProductSpecifications);
                              }}
                              value={
                                (field.value &&
                                  field.value.find(
                                    (productSpecification) =>
                                      productSpecification.name.toLowerCase() ===
                                      catSpec.name.toLowerCase()
                                  )?.value) ||
                                ""
                              }
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue
                                  //show the default value if it exists, otherwise , show the placeholder
                                  defaultValue={
                                    (field.value &&
                                      field.value.find(
                                        (spec) =>
                                          spec.name.toLowerCase() ===
                                          catSpec.name.toLowerCase()
                                      )?.value) ||
                                    ""
                                  }
                                  placeholder={`select ${catSpec.name}`}
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-white dark:bg-black">
                                {catSpec.values.map((value, index) => (
                                  <SelectItem key={index} value={value}>
                                    {value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>

                          {form.formState.errors.productSpecification && (
                            <FormMessage>
                              {
                                form.formState.errors.productSpecification
                                  .message
                              }
                            </FormMessage>
                          )}
                        </FormItem>
                      )}
                    />
                  );
                })
              : "Selected category has no specifications"}
          </div>

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={loading}
                    defaultValue="false"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Featured</FormLabel>
                  <FormDescription>
                    Product will be shown in featured page.
                  </FormDescription>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isArchived"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={loading}
                    defaultValue="false"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Archived</FormLabel>
                  <FormDescription>
                    Product will not be shown in the product list.
                  </FormDescription>
                </div>

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
