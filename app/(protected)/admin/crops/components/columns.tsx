"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FaLeaf, FaBug, FaShieldAlt, FaSeedling } from "react-icons/fa"; // Icons for agriculture theme
import CellAction from "./cell-action";

export type CropColumn = {
  id: string;
  name: string;
  diseases: {
    diseaseName: string;
    symptoms: string;
    preventions: string;
    fertilizers: string | undefined;
  }[];
  createdAt: string;
};

export const columns: ColumnDef<CropColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="text-green-700 font-bold">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "diseases",
    header: "Diseases",
    cell: ({ row }) => {
      const diseases = row.original.diseases;

      return (
        <div className="flex flex-col gap-y-4 bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm">
          {diseases.map((disease, index) => (
            <div
              key={index}
              className="flex flex-col gap-y-2 p-4 bg-white dark:bg-black rounded-md shadow-sm"
            >
              <strong className="text-green-900 text-lg">
                <FaLeaf className="inline-block text-green-500 mr-1" />
                Disease Name: {disease.diseaseName}
              </strong>
              <span className="flex items-center text-gray-700">
                <FaBug className="inline-block text-red-500 mr-2" />
                Symptoms: {disease.symptoms}
              </span>
              <span className="flex items-center text-gray-700">
                <FaShieldAlt className="inline-block text-blue-500 mr-2" />
                Preventions: {disease.preventions}
              </span>
              <span className="flex items-center text-gray-700">
                <FaSeedling className="inline-block text-yellow-500 mr-2" />
                Fertilizers:{" "}
                {disease.fertilizers ? disease.fertilizers : "N/A"}
              </span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <div className="text-sm text-gray-500">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions",
  },
];
