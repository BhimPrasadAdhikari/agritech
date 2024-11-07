"use client";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1),
  productUrl: z.string(),
  discount: z.string(),
  description: z.string(),
});
type OfferFormValues = z.infer<typeof formSchema>;

const OfferForm = ({
  products
}: {
  products: { id: string; name: string; images: { url: string }[]}[];
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<OfferFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      discount: "0",
      productUrl: "",
      description: "",
    },
  });

  const onSubmit = async (data: OfferFormValues) => {
    console.log("offer Form values", data);

    setLoading(true);
    try {
        const offerDetails = {
                title:data.title,
                description:data.description,
                url:data.productUrl,
                discount:Number(data.discount )
                
            }

      const response = await axios.post('/api/offers',offerDetails)
      if(response.data.success){
        toast.success(response.data.message)
      }
    } catch (error) {
      console.error("Offer_post", error);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full mx-10"
        >
          <FormField
            name="title"
            control={form.control}
            disabled={loading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="offer title"
                    value={field.value}
                    onChange={(name) => field.onChange(name)}
                    className="w-[500px]"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            name="productUrl"
            control={form.control}
            disabled={loading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose Product</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="choose product Name" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-black">
                      {products?.map((product) => (
                        <SelectItem
                          key={product?.id}
                          value={product?.images[0].url}
                        >
                          {product?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            name="discount"
            control={form.control}
            disabled={loading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg. 2 "
                    value={field.value}
                    onChange={(name) => field.onChange(name)}
                    className="w-[500px]"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            disabled={loading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell user a little bit about this offer"
                    className="resize-none w-[500px] h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-center">
            <Button type="submit" className="bg-blue-600 text-white">
              Create
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default OfferForm;
