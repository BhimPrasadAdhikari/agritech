"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Assuming you are importing these components from shadcn
import ImageUpload from "./image-upload"; // Assuming you have an image upload component
import { useState } from "react";
import { Input } from "./ui/input";

// Zod schema for validation
const expertApplicationSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number should have at least 10 digits."),
  expertise: z.string().min(1, "Please select your area of expertise."),
  experience: z.string().min(1, "Please describe your experience."),
  certifications: z.array(z.string()).optional(),
  documents: z
    .array(z.object({ url: z.string() }))
    .min(1, "Please upload at least one document."),
});
type ExpertApplicationForm = z.infer<typeof expertApplicationSchema>;

const ExpertApplicationForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ExpertApplicationForm>({
    resolver: zodResolver(expertApplicationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      certifications: [],
      documents: [],
      phone: "",
      expertise: "",
      experience: "",
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = async (data: ExpertApplicationForm) => {
    console.log(data);
    setIsLoading(true);
    try {
    } catch (error) {
      console.log(error);
    }
    // Handle form submission
  };

  return (
    <div className="w-full mx-auto p-6 bg-white dark:bg-black rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Apply to be an Expert
      </h2>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col"
        >
          {/* Image Upload */}
          <FormField
            control={control}
            name="documents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Documents</FormLabel>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex"
                >
                  <FormControl>
                    <ImageUpload
                      value={
                        field.value ? field.value.map((doc) => doc.url) : []
                      }
                      disabled={isLoading}
                      onChange={(url: string) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url: string) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.url !== url
                          ),
                        ])
                      }
                      name="expert-form-documents"
                    />
                  </FormControl>
                </motion.div>
                <FormMessage>{errors.documents?.message}</FormMessage>
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            {/* firstName */}
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </FormControl>
                  <FormMessage>{errors.firstName?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </FormControl>
                  <FormMessage>{errors.lastName?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            {/* Email */}
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </FormControl>
                  <FormMessage>{errors.phone?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          {/* Expertise Area */}
          <FormField
            control={control}
            name="expertise"
            render={({ field }) => (
              <FormItem className="flex items-baseline gap-2">
                <FormLabel>Area of Expertise</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select expertise</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Soil Science">Soil Science</option>
                    <option value="Plant Diseases">Plant Diseases</option>
                    <option value="Agro Engineering">Agro Engineering</option>
                  </select>
                </FormControl>
                <FormMessage>{errors.expertise?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Experience */}
          <FormField
            control={control}
            name="experience"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Experience</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="p-2 border border-gray-300 rounded-md"
                    rows={4}
                  />
                </FormControl>
                <FormMessage>{errors.experience?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Certifications (Optional) */}
          <FormField
            control={control}
            name="certifications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certifications (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="p-2 border border-gray-300 rounded-md"
                    placeholder="Certification 1"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white dark:text-blackrounded-md hover:bg-blue-700 transition"
          >
            Submit Application
          </button>
        </form>
      </Form>
    </div>
  );
};

export default ExpertApplicationForm;
