"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/Button"
import { AddProductType } from "@/config"
import Image from "next/image"

// This type is used to define the shape of our data.
export type ProductType = {
  _id: string,
  image: string,
  title: string,
  description: string,
  category: string,
  brand: string,
  price: number,
  salePrice: number,
  totalStock: number
}

export const getColumns = (handleEdit: (product: AddProductType & { _id: string }) => void, handleDelete: (_id: string) => void): ColumnDef<ProductType>[] => [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    header: "Image",
    cell: ({ row }) => <Image src={row.original.image} alt={row.original.title} width={60} height={40}>{ }</Image>
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>${row.original.price}</span>,
  },
  {
    accessorKey: "salePrice",
    header: "Sale Price",
    cell: ({ row }) => <span>${row.original.salePrice}</span>,
  },
  {
    accessorKey: "totalStock",
    header: "Total Stock",
  },
  {
    id: "actions",
    enablePinning: true,
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button onClick={() => handleEdit(row.original)}>Edit</Button>
        <Button variant="destructive" onClick={() => handleDelete(row.original._id)}>Delete</Button>
      </div>
    )
  }
];
