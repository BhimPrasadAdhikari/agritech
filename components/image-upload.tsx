/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ImagePlusIcon, TrashIcon } from "lucide-react";
import { motion } from "framer-motion";

import { CldUploadWidget } from "next-cloudinary";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  name?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  name,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative">
      {name === "chat" && (
        <div
          className={cn(
            "absolute left-0 bottom-10 mb-2 flex items-center gap-1 flex-wrap h-[50px] w-48 ",
            value.length > 0 ? "overflow-y-scroll bg-white     " : ""
          )}
        >
          {value.map((url) => {
            return (
              <div
                className="relative w-[50px] h-[50px] rounded-md overflow-hidden shadow-md bg-green-400"
                key={url}
              >
                <div className="absolute top-0 right-0 z-20">
                  <Button
                    size="icon"
                    type="button"
                    onClick={() => onRemove(url)}
                    variant="destructive"
                    className="text-red-600"
                  >
                    <TrashIcon className="w-4 h-4" fill="red" />
                  </Button>
                </div>
                <Image fill alt="image" src={url} className="object-cover" />
              </div>
            );
          })}
        </div>
      )}
      {name === "adminform" && (
        <div className="mb-2 flex items-center gap-4">
          {value.map((url) => {
            return (
              <div
                className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
                key={url}
              >
                <div className="z-10 absolute top-2 right-2">
                  <Button
                    size="icon"
                    type="button"
                    onClick={() => onRemove(url)}
                    variant="destructive"
                    className="text-red-600"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
                <Image fill alt="image" src={url} className="object-cover" />
              </div>
            );
          })}
        </div>
      )}

      <CldUploadWidget
        v-slot="{open}"
        uploadPreset="flwtkxol"
        onSuccess={onUpload}
      >
        {({ open }) => {
          const onClick = () => {
            try {
              open();
            } catch (error) {
              console.log(error);
            }
          };
          return (
            <motion.button whileHover={{ scale: 1.1 }}>
              <Button
                type="button"
                variant="secondary"
                onClick={onClick}
                disabled={disabled}
              >
                <ImagePlusIcon className=" mr-2" />
              </Button>
            </motion.button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
