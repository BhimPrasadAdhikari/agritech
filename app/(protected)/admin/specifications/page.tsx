import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { SpecificationClient } from "./components/client";
import { SpecificationColumn } from "./components/columns";

const SpecificationsPage = async () => {
  const specifications = await prismadb.specification.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSpecifications: SpecificationColumn[] = specifications.map(
    (item) => ({
      id: item.id,
      name: item.name,
      values: item.values.join(", "), // Joining values into a string for display
      categoryName: item.category.name,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SpecificationClient data={formattedSpecifications} />
      </div>
    </div>
  );
};

export default SpecificationsPage;
