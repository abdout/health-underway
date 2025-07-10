'use client'

import { useState, useEffect } from 'react'
import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { PopoverContent, Popover, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandItem, CommandList } from '@/components/ui/command'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useModal } from "@/components/atom/modal/context"
import Modal from "@/components/atom/modal/modal"
import FilterModal from './filter-modal'
import { Filter } from '@/components/atom/icon'
import { useRouter } from 'next/navigation'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  statusOptions: { value: string; label: string }[]
  roleOptions: { value: string; label: string }[]
  onStatusChange: (status: string) => void
  onRoleChange: (role: string) => void
  currentStatus: string
  currentRole: string
}

export function UserTable<TData, TValue>({
  columns,
  data,
  statusOptions,
  roleOptions,
  onStatusChange,
  onRoleChange,
  currentStatus,
  currentRole
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    universityCountry: false,
    workCountry: false,
    institution: false,
  });
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [isResponseOpen, setIsResponseOpen] = useState(false)
  const [isRoleOpen, setIsRoleOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { modal, openModal, closeModal } = useModal()
  const router = useRouter()

  // Check for mobile screen on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkIfMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile)
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Response filter options
  const responseOptions = [
    { value: "ALL", label: "All" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
    { value: "NO_RESPONSE", label: "Pending" },
  ]

  // Handler for response filter
  const handleResponseChange = (value: string) => {
    if (value === "APPROVED") {
      onStatusChange("APPROVED");
    } else if (value === "REJECTED") {
      onStatusChange("REJECTED");
    } else if (value === "NO_RESPONSE") {
      onStatusChange("NO_RESPONSE");
    } else {
      onStatusChange("ALL");
    }
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  // Render the filter modal content
  const filterModalContent = (
    <FilterModal
      statusOptions={statusOptions}
      responseOptions={responseOptions}
      roleOptions={roleOptions}
      onStatusChange={onStatusChange}
      onResponseChange={handleResponseChange}
      onRoleChange={onRoleChange}
      currentStatus={currentStatus}
      currentRole={currentRole}
      closeModal={closeModal}
    />
  )

  return (
    <>
      {/* Filters */}
      <div className='flex items-center gap-4 flex-wrap'>
        <div className='flex items-center py-4'>
          <Input
            placeholder='Search by name...'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={event =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className='max-w-sm h-9'
          />
        </div>
        {/* Column visibility dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Choose columns"
              variant="outline"
              className="gap-2 flex items-center bg-white"
            >
              <MixerHorizontalIcon className="mr-2 size-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Mobile Filter Button */}
        {isMobile && (
          <Button 
            variant="outline" 
            size="icon"
            className="md:hidden rounded-full bg-white"
            onClick={() => openModal('filter')}
          >
            <Filter className=" " />
          </Button>
        )}
        
        {/* Desktop Filters */}
        {!isMobile && (
          <>
            {/* Country Filter */}
            <Popover open={isStatusOpen} onOpenChange={setIsStatusOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 bg-white">
                  <PlusCircledIcon className="mr-2 size-4" />
                  Country
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[180px]" align="start">
                <Command>
                  <CommandList>
                    <CommandEmpty>No results.</CommandEmpty>
                    <CommandItem
                      key="ALL"
                      onSelect={() => {
                        table.getColumn('countryOfWork')?.setFilterValue("");
                        setIsStatusOpen(false);
                      }}
                    >
                      All Countries
                    </CommandItem>
                    {[...new Set((data as any[]).map((u: any) => u.countryOfWork).filter(Boolean))].map((option) => (
                      <CommandItem
                        key={option as string}
                        onSelect={() => {
                          table.getColumn('countryOfWork')?.setFilterValue(option);
                          setIsStatusOpen(false);
                        }}
                      >
                        {option}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {/* Position Filter */}
            <Popover open={isResponseOpen} onOpenChange={setIsResponseOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 bg-white">
                  <PlusCircledIcon className="mr-2 size-4" />
                  Position
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[180px]" align="start">
                <Command>
                  <CommandList>
                    <CommandEmpty>No results.</CommandEmpty>
                    <CommandItem
                      key="ALL"
                      onSelect={() => {
                        table.getColumn('stageOfCareer')?.setFilterValue("");
                        setIsResponseOpen(false);
                      }}
                    >
                      All Positions
                    </CommandItem>
                    {[...new Set((data as any[]).map((u: any) => u.stageOfCareer).filter(Boolean))].map((option) => (
                      <CommandItem
                        key={option as string}
                        onSelect={() => {
                          table.getColumn('stageOfCareer')?.setFilterValue(option);
                          setIsResponseOpen(false);
                        }}
                      >
                        {option}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {/* University Filter */}
            <Popover open={isRoleOpen} onOpenChange={setIsRoleOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 bg-white">
                  <PlusCircledIcon className="mr-2 size-4" />
                  University
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[180px]" align="start">
                <Command>
                  <CommandList>
                    <CommandEmpty>No results.</CommandEmpty>
                    <CommandItem
                      key="ALL"
                      onSelect={() => {
                        table.getColumn('universityOfPrimaryGraduation')?.setFilterValue("");
                        setIsRoleOpen(false);
                      }}
                    >
                      All Universities
                    </CommandItem>
                    {[...new Set((data as any[]).map((u: any) => u.universityOfPrimaryGraduation).filter(Boolean))].map((option) => (
                      <CommandItem
                        key={option as string}
                        onSelect={() => {
                          table.getColumn('universityOfPrimaryGraduation')?.setFilterValue(option);
                          setIsRoleOpen(false);
                        }}
                      >
                        {option}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </>
        )}

        {/* Column visibility */}
        {/* 
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Choose columns"
              variant="outline"
              className="ml-auto gap-2 lg:flex reveal"
            >
              <MixerHorizontalIcon className="mr-2 size-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        */}
      </div>

      {/* Table */}
      <div className='border-b bg-white rounded-t-lg rounded-b-lg overflow-hidden'>
        <Table>
          <TableHeader className='rounded-t-xl'>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="bg-neutral-800 text-white py-2  ">
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="bg-neutral-800 text-white py-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow 
                  key={row.id} 
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={(e) => {
                    // Don't navigate if clicking on a dropdown or button
                    if (
                      e.target instanceof HTMLElement && 
                      (e.target.closest('button') || e.target.closest('[role="menu"]'))
                    ) {
                      return;
                    }
                    
                    const user = row.original as any;
                    if (user?.id) {
                      router.push(`/dashboard/profile/${user.id}`);
                    }
                  }}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  لا توجد نتائج.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      {/* Modal */}
      {modal.open && modal.id === 'filter' && (
        <Modal content={filterModalContent} />
      )}
    </>
  )
} 