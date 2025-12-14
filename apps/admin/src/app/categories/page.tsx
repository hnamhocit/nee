'use client'

import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { Category } from '@repo/db'
import { categoriesService } from '@repo/shared'
import { Loading } from '@repo/ui'
import { CategoryModal, getColumns } from './components'

export default function CategoriesPage() {
	const [categories, setCategories] = useState<Category[]>([])
	const [category, setCategory] = useState<Category | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const buttonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		;(async () => {
			const { data } = await categoriesService.getAdminCategories()
			setCategories(data.data)
			setIsLoading(false)
		})()
	}, [])

	const handleDelete = async (category: Category) => {
		if (confirm(`Are you sure you want to delete ${category.name}?`)) {
			await categoriesService.delete(category.slug)
			setCategories((prev) => prev.filter((c) => c.id !== category.id))
		}
	}

	const handleEdit = async (category: Category) => {
		setCategory(category)
		buttonRef.current?.click()
	}

	// --- TABLE CONFIG ---
	const columns = getColumns({ onEdit: handleEdit, onDelete: handleDelete })
	const table = useReactTable({
		data: categories,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	if (isLoading) {
		return <Loading />
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-bold tracking-tight'>
						Categories
					</h1>

					<p className='text-muted-foreground'>
						Manage your product categories and hierarchy.
					</p>
				</div>

				<CategoryModal
					buttonRef={buttonRef}
					setCategories={setCategories}
					categories={categories}
					category={category}
					setCategory={setCategory}
				/>
			</div>

			{/* DATA TABLE */}
			<div className='rounded-md border bg-card'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder ? null : (
											flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows?.length ?
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && 'selected'
									}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						:	<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						}
					</TableBody>
				</Table>

				<div className='flex items-center justify-end space-x-2 py-4 px-4'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>

					<Button
						variant='outline'
						size='sm'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}
