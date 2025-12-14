'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from 'lucide-react'
import {
	Dispatch,
	FC,
	RefObject,
	SetStateAction,
	useEffect,
	useState,
} from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Category } from '@repo/db'
import {
	categoriesService,
	CategoryFormValues,
	categorySchema,
	getDownloadURL,
	uploadService,
} from '@repo/shared'
import { SingleUpload } from '@repo/ui'

interface CategoryModalProps {
	categories: Category[]
	setCategories: Dispatch<SetStateAction<Category[]>>
	category: Category | null
	setCategory: Dispatch<SetStateAction<Category | null>>
	buttonRef: RefObject<HTMLButtonElement | null>
}

export const CategoryModal: FC<CategoryModalProps> = ({
	setCategories,
	categories,
	category,
	setCategory,
	buttonRef,
}) => {
	const [file, setFile] = useState<File | null>(null)
	const [isDisabled, setIsDisabled] = useState(false)

	const title = category ? 'Update Category' : 'Create New Category'
	const description =
		category ?
			'Edit category details.'
		:	'Add a new category to your store.'
	const actionLabel = category ? 'Save Changes' : 'Create'

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: '',
			thumbnail: '',
			parentId: '',
		},
	})

	useEffect(() => {
		if (category) {
			reset({
				name: category.name,
				thumbnail: category.thumbnail || '',
				parentId: category.parentId || 'none',
			})
		} else {
			reset({
				name: '',
				thumbnail: '',
				parentId: 'none',
			})
		}
	}, [category])

	const onSubmit = async (data: CategoryFormValues) => {
		setIsDisabled(true)

		let finalKey = category?.thumbnail
		let oldKeyToDelete = null

		try {
			if (file) {
				const formData = new FormData()
				formData.append('resource', 'categories')
				formData.append('file', file)

				const { data: uploadData } =
					await uploadService.uploadFile(formData)
				finalKey = uploadData.data

				// Đánh dấu ảnh cũ cần xóa (nhưng chưa xóa vội)
				if (category?.thumbnail) {
					oldKeyToDelete = category.thumbnail
				}
			}

			const payload = {
				...data,
				thumbnail: finalKey,
				parentId: data.parentId === 'none' ? null : data.parentId,
			}

			if (category) {
				const { data: updatedResponse } =
					await categoriesService.update(category.slug, payload)

				setCategories((prev) =>
					prev.map((cat) =>
						cat.id === category.id ? updatedResponse.data : cat,
					),
				)

				if (oldKeyToDelete) {
					uploadService
						.deleteFile(oldKeyToDelete)
						.catch(console.error)
				}

				toast.success('Category updated successfully.')
			} else {
				const { data: newCategory } =
					await categoriesService.create(payload)
				setCategories((prev) => [...prev, newCategory.data])

				toast.success('Category created successfully.')
			}

			setFile(null)
			buttonRef.current?.click()
			setCategory(null)
		} catch (error) {
			console.error(error)
			toast.error(`${title} failed. Please try again.`)
		} finally {
			setIsDisabled(false)
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button ref={buttonRef}>
					<PlusIcon className='mr-2 h-4 w-4' /> Add Category
				</Button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-4'>
					<Field>
						<FieldLabel>Thumbnail</FieldLabel>

						<SingleUpload
							defaultURL={
								category ?
									getDownloadURL(category.thumbnail || '')
								:	undefined
							}
							onChange={setFile}
							className='w-40! h-40! border bg-slate-100'
						/>
					</Field>

					<Field>
						<FieldLabel>Name</FieldLabel>

						<Input
							placeholder='e.g., T-shirt'
							{...register('name')}
						/>

						{errors.name && (
							<p className='mt-1 text-sm text-red-600'>
								{errors.name.message}
							</p>
						)}
					</Field>

					<Controller
						name='parentId'
						control={control}
						render={({ field: { value, onChange } }) => (
							<Field>
								{value}
								<FieldLabel>Parent Id</FieldLabel>

								<Select
									value={value as string}
									onValueChange={onChange}>
									<SelectTrigger>
										<SelectValue placeholder='Select Parent Id' />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value='none'>
											None
										</SelectItem>
										{categories?.map((category) => (
											<SelectItem
												key={category.id}
												value={category.id}>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</Field>
						)}
					/>

					<div className='flex w-full justify-end space-x-2 pt-4'>
						<Button
							disabled={isDisabled}
							type='reset'
							variant='outline'>
							Cancel
						</Button>

						<Button
							disabled={isDisabled}
							type='submit'>
							{actionLabel}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
