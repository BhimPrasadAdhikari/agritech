"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion"; // Import Framer Motion
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/image-upload";
import { useState } from "react";
import toast from "react-hot-toast";
import { Crop } from "@prisma/client";
import { GiFertilizerBag } from "react-icons/gi";
import {
  FaBug,
  FaClock,
  FaCloudSunRain,
  FaDisease,
  FaLeaf,
  FaPlus,
  FaSave,
  FaSeedling,
  FaShieldAlt,
  FaWater,
} from "react-icons/fa";
// Zod schema for form validation
const cropSchema = z.object({
  cropName: z.string().min(1, { message: "Crop name is required" }),
  scientificName: z.string().min(1, { message: "Scientific name is required" }),
  cultivationSeason: z
    .string()
    .min(1, { message: "Cultivation season is required" }),
  wateringSchedule: z
    .string()
    .min(1, { message: "Watering schedule is required" }),
  wateringInterval: z
    .string()
    .min(1, { message: "Watering interval is required" }),
  images: z
    .object({ url: z.string().min(1) })
    .array()
    .min(1, { message: "please upload atleast one image" }),
  diseases: z
    .array(
      z.object({
        diseaseName: z.string().min(1, { message: "Disease name is required" }),
        season: z.string().min(1, { message: "Season is required" }),
        symptoms: z.array(
          z.string().min(1, { message: "Symptom is required" })
        ),
        preventions: z.array(
          z.string().min(1, { message: "Prevention is required" })
        ),
        fertilizers: z.object({
          types: z.string().min(1, { message: "Fertilizer type is required" }),
          applicationTiming: z
            .string()
            .min(1, { message: "Application timing is required" }),
        }),
      })
    )
    .optional(), // Repeatable fields for diseases
});
type CropFormValues = z.infer<typeof cropSchema>;
const defaultValues = {
  cropName: "",
  scientificName: "",
  cultivationSeason: "",
  wateringSchedule: "",
  wateringInterval: "",
  images: [],
  diseases: [
    {
      diseaseName: "",
      season: "",
      symptoms: [""],
      preventions: [""],
      fertilizers: {
        types: "",
        applicationTiming: "",
      },
    },
  ],
};

interface CropFormProps {
  initialData?: Crop | null;
}
const CropForm: React.FC<CropFormProps> = ({ initialData }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(initialData);
  const form = useForm({
    defaultValues,
    resolver: zodResolver(cropSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  // Field array for dynamically adding diseases
  const { fields: diseaseFields, append } = useFieldArray({
    control,
    name: "diseases",
  });

  const onSubmit = async (data: CropFormValues) => {
    setIsLoading(true);
    console.log(data);
    try {
      toast.success("crop created");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    // Submit form data to API
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 bg-gradient-to-r from-green-200 to-green-500 shadow-lg rounded-lg space-y-8">
        <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
          <FaSeedling className="text-3xl" /> Crop Management Form
        </h1>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Image Upload */}
            <FormField
              control={control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Images</FormLabel>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex"
                  >
                    <FormControl>
                      <ImageUpload
                        value={
                          field.value
                            ? field.value.map((image) => image.url)
                            : []
                        }
                        disabled={isLoading}
                        onChange={(url: string) =>
                          field.onChange([...field.value, { url }])
                        }
                        onRemove={(url: string) =>
                          field.onChange([
                            ...field.value.filter(
                              (current) => current.url != url
                            ),
                          ])
                        }
                        name="adminform"
                      />
                    </FormControl>
                  </motion.div>
                  <FormMessage className="text-red-500"></FormMessage>
                </FormItem>
              )}
            />
            {/* Crop Name */}
            <FormField
              control={control}
              name="cropName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FaLeaf className="inline-block text-green-800 mr-2" />
                    Crop Name
                  </FormLabel>

                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        type="text"
                        placeholder="Enter crop name"
                        className="w-full border-green-500 focus:ring-green-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500">
                      {errors.cropName?.message}
                    </FormMessage>
                  </motion.div>
                </FormItem>
              )}
            />

            {/* Scientific Name */}
            <FormField
              control={control}
              name="scientificName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
                    <FaLeaf className="inline-block text-green-800 mr-2" />
                    Scientific Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      type="text"
                      placeholder="Enter scientific name"
                      className="w-full border-green-500 focus:ring-green-600"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500">
                    {errors.scientificName?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Cultivation Season */}
            <FormField
              control={control}
              name="cultivationSeason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FaLeaf className="inline-block text-green-800 mr-2" />
                    Cultivation Season
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      type="text"
                      placeholder="Enter cultivation season"
                      className="w-full border-green-500 focus:ring-green-600"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500">
                    {errors.cultivationSeason?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Watering Schedule */}
            <FormField
              control={control}
              name="wateringSchedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FaWater className="inline-block text-blue-800 mr-2" />
                    Watering Schedule
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      type="text"
                      placeholder="Enter watering schedule"
                      className="w-full border-green-500 focus:ring-green-600"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500">
                    {errors.wateringSchedule?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Watering Interval */}
            <FormField
              control={control}
              name="wateringInterval"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FaWater className="inline-block text-blue-800 mr-2" />
                    Watering Interval (days)
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      type="text"
                      placeholder="Enter watering interval"
                      className="w-full border-green-500 focus:ring-green-600"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500">
                    {errors.wateringInterval?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Diseases Input (Repeatable fields) */}
            {diseaseFields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <FormLabel>
                  <FaDisease className="inline-block text-red-800 mr-2 text-2xl" />
                  Disease #{index + 1}
                </FormLabel>

                {/* Disease Name */}
                <FormField
                  control={control}
                  name={`diseases.${index}.diseaseName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Disease Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          {...field}
                          type="text"
                          placeholder="Disease Name"
                          className="w-full border-green-500 focus:ring-green-600"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500">
                        {errors.diseases?.[index]?.diseaseName?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                {/* Season */}
                <FormField
                  control={control}
                  name={`diseases.${index}.season`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <FaCloudSunRain className="inline-block text-blue-800 mr-2" />
                        Season
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          {...field}
                          type="text"
                          placeholder="Season"
                          className="w-full border-green-500 focus:ring-green-600"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500">
                        {errors.diseases?.[index]?.season?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* Symptoms */}
                <FormLabel>
                  <FaBug className="inline-block mr-2 text-red-500" />
                  Symptoms
                </FormLabel>
                {field.symptoms.map((_, sIndex) => (
                  <FormField
                    key={`symptoms-${sIndex}`}
                    control={control}
                    name={`diseases.${index}.symptoms.${sIndex}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            {...field}
                            type="text"
                            placeholder="Symptom"
                            className="w-full border-green-500 focus:ring-green-600"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500">
                          {
                            errors.diseases?.[index]?.symptoms?.[sIndex]
                              ?.message
                          }
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                ))}

                {/* Preventions */}
                <FormLabel>
                  <FaShieldAlt className="inline-block text-blue-500 mr-2" />
                  Preventions
                </FormLabel>
                {field.preventions.map((_, pIndex) => (
                  <FormField
                    key={`preventions-${pIndex}`}
                    control={control}
                    name={`diseases.${index}.preventions.${pIndex}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            {...field}
                            type="text"
                            placeholder="Prevention"
                            className="w-full border-green-500 focus:ring-green-600"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500">
                          {
                            errors.diseases?.[index]?.preventions?.[pIndex]
                              ?.message
                          }
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                ))}

                {/* Fertilizer */}
                <FormField
                  control={control}
                  name={`diseases.${index}.fertilizers.types`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <GiFertilizerBag
                          className="inline-block text-red-700 mr-2 "
                          fill="red"
                        />
                        Fertilizer Type
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          {...field}
                          type="text"
                          placeholder="Fertilizer Type"
                          className="w-full border-green-500 focus:ring-green-600"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500">
                        {errors.diseases?.[index]?.fertilizers?.types?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`diseases.${index}.fertilizers.applicationTiming`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <FaClock className="inline-block text-blue-500 mr-2" />
                        Application Timing
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          {...field}
                          type="text"
                          placeholder="Application Timing"
                          className="w-full border-green-500 focus:ring-green-600"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500">
                        {
                          errors.diseases?.[index]?.fertilizers
                            ?.applicationTiming?.message
                        }
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <motion.button whileHover={{ scale: 1.1 }}>
                  <Button
                    type="button"
                    className="bg-green-900 text-white"
                    onClick={() =>
                      append({
                        diseaseName: "",
                        season: "",
                        symptoms: [""],
                        preventions: [""],
                        fertilizers: {
                          types: "",
                          applicationTiming: "",
                        },
                      })
                    }
                  >
                    <FaPlus className="mr-2" />
                    Add Another Disease
                  </Button>
                </motion.button>
              </div>
            ))}
            {/* Submit Button */}
            <div className="flex justify-end">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button type="submit" className="bg-blue-900 text-white">
                  <FaSave className="mr-2" />
                  Save Crop
                </Button>
              </motion.div>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};
export default CropForm;
