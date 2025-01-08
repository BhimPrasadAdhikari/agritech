"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Category {
  id: string;
  name: string;
  subCategories: { id: string; name: string }[];
}

interface MobileCategoryListProps {
  categories: Category[] | undefined;
  setFilter: (category: string) => void;
}

const MobileCategoryList: React.FC<MobileCategoryListProps> = ({ categories, setFilter }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleSubCategories = (categoryId: string) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <div className="flex flex-wrap">
      {categories?.map((category) => (
        <div key={category.id} className="relative">
          <Button
            onClick={() => toggleSubCategories(category.id)}
            className="hover:text-green-600 w-full text-left"
          >
            {category.name}
          </Button>
          {activeCategory === category.id && (
            <div className="mt-1 pl-4 absolute bg-white      z-50">
              {category.subCategories.map((sub) => (
                <Button
                  key={sub.id}
                  onClick={() => {
                    setFilter(sub.name);
                    setActiveCategory(null); // Close the subcategory list after selection
                  }}
                  className="block px-4 py-2 hover:bg-green-100 w-full text-left"
                >
                  {sub.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileCategoryList;
