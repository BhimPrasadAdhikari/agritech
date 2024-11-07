/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import useUser from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(10),
  address: z.string().min(3),
});
type ShipingFormValues = z.infer<typeof formSchema>;
export const ShipingForm: React.FC = () => {
  const User = useUser();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<ShipingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: User.info.firstName,
      lastName: User.info.lastName,
      phone: User.info.phone,
      address: User.info.address,
    },
  });
  const onSubmit = async ({
    phone,
    address,
    firstName,
    lastName,
  }: ShipingFormValues) => {
    const fullName = `${firstName} ${lastName}`;

    setOpen(true);
    User.addItem({ info: { firstName, lastName, phone, address } });
    toast.success("success");
    setLoading(false);
    window.location.href= `productpurchase`
  };

  return (
    <>
      <div className="flex flex-col dark:bg-black ">
        <div className="flex items-center justify-between">
          <Heading
            title="Shipping Details"
            description="fill up deliver  details"
          />
        </div>
        <hr />
        <div className="flex items-center justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 lg:space-y-16 w-full grid grid-cols-2 items-end gap-5"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="first name"
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Last Name"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder=" "
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="as butwal, milanchauk"
                        value={field.value}
                        onChange={(name) => field.onChange(name)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="dark:border">
                submit
              </Button>
            </form>
          </Form>
        </div>
        <hr className="mt-2" />
      </div>
    </>
  );
};
