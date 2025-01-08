// components/CategoryList.tsx
"use client"
import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Category {
  id: string;
  name: string;
  subCategories: { id: string; name: string }[];
}

interface CategoryListProps {
  categories: Category[] | undefined;
  setFilter:(category:string)=>void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories,setFilter }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <nav className="bg-white      shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <ul className="flex space-x-4">
          {categories?.map((category) => (
            <li
              key={category.id}
              onMouseEnter={() => setHoveredCategory(category.id)}
              className="relative group"
            >
              <Button onClick={()=>{setFilter(category.name); setHoveredCategory(category.id) }} className="hover:text-green-600">
                {category.name}
              </Button>
              {hoveredCategory === category.id && (
                <div
                onMouseLeave={()=>setHoveredCategory(null)}
                 className="absolute left-0 mt-2 z-50 bg-white      shadow-lg rounded-md transition-opacity duration-300 opacity-100">
                  {category.subCategories.map((sub) => (
                    <Button
                      key={sub.id}
                      onClick={()=>{setFilter(sub.name);setHoveredCategory(null) }}
                      className="block px-4 py-2 hover:bg-green-100"
                    >
                      {sub.name}
                    </Button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default CategoryList;
