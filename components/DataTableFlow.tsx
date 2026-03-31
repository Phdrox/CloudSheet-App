'use client'
import { ColumnDef,flexRender,getCoreRowModel,useReactTable } from "@tanstack/react-table"
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table"
import { LoaderCircleIcon } from "lucide-react"

interface DataTableProps<TData,TValue>{
  columns:ColumnDef<TData,TValue>[]
  data:TData[],
  isLoading:any
}

export default function DataTableFlow<TData,TValue>({data,columns,isLoading}:DataTableProps<TData,TValue>) {
  
  const table=useReactTable({data,columns,getCoreRowModel:getCoreRowModel(),})
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-white">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading? (
            <TableRow>
                <TableCell colSpan={columns.length} className="h-24">
                  <div className="flex items-center justify-center w-full">
                    <LoaderCircleIcon className="animate-spin text-white" />
                  </div>
                </TableCell>
            </TableRow>): table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className=" text-white"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
