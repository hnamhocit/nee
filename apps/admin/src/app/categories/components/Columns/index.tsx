'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Category } from '@repo/db'
import { getDownloadURL } from '@repo/shared'
import { ReactNode } from 'react'

interface ColumnProps {
	onEdit: (category: Category) => void
	onDelete: (category: Category) => void
}

export const getColumns = ({
	onEdit,
	onDelete,
}: ColumnProps): ColumnDef<Category>[] => [
	{
		accessorKey: 'thumbnail',
		header: 'Image',
		cell: ({ row }) => (
			<div className='relative h-16 w-16 overflow-hidden rounded-md border'>
				<Image
					src={getDownloadURL(row.original.thumbnail ?? '')}
					alt={row.original.name}
					fill
					className='object-cover'
				/>
			</div>
		),
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => (
			<div className='font-semibold'>{row.getValue('name')}</div>
		),
	},
	{
		id: '_count.children',
		header: 'Variants',
		cell: ({ row }) => {
			const count = row.getValue('_count.children') || 0

			return (
				<Badge
					variant='secondary'
					className='font-mono'>
					{count as ReactNode}
				</Badge>
			)
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const category = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>

							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>

						<DropdownMenuItem onClick={() => onEdit(category)}>
							<Edit className='mr-2 h-4 w-4' /> Edit
						</DropdownMenuItem>

						<DropdownMenuItem
							variant='destructive'
							onClick={() => onDelete(category)}>
							<Trash2 className='mr-2 h-4 w-4' /> Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
