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
import { useForm } from 'react-hook-form'
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
	buttonRef: RefObject<HTMLButtonElement | null>
}

export const CategoryModal: FC<CategoryModalProps> = ({
	categories,
	category,
	setCategories,
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
		formState: { errors },
	} = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: '',
			parentId: '',
		},
	})

	useEffect(() => {
		if (category) {
			reset({
				name: category.name,
				thumbnail: category.thumbnail || '',
				parentId: category.parentId || '',
			})
		} else {
			reset({
				name: '',
				thumbnail: '',
				parentId: '',
			})
		}
	}, [category])

	const onSubmit = async (data: CategoryFormValues) => {
		setIsDisabled(true)

		try {
			let key: string | null = null

			const formData = new FormData()
			formData.append('resource', 'categories')

			if (file) {
				formData.append('file', file)

				const { data: uploadData } =
					await uploadService.uploadFile(formData)

				key = uploadData.data
			}

			data.thumbnail = key
			if (data.parentId?.length === 0) data.parentId = null

			if (category) {
				await categoriesService.update(category.slug, data)

				setCategories((prev) =>
					prev.map((cat) => {
						if (cat.id === category.id) {
							return { ...cat, ...data }
						}
						return cat
					}),
				)

				toast.success('Category updated successfully.')
			} else {
				const { data: newCategory } =
					await categoriesService.create(data)

				setCategories((prev) => [...prev, newCategory.data])
				toast.success('Category created successfully.')
			}
		} catch (error) {
			toast.error(`${title} failed. Please try again.`)
		} finally {
			setIsDisabled(false)
			reset()
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

					<Field>
						<FieldLabel>Parent Id</FieldLabel>

						<Select>
							<SelectTrigger>
								<SelectValue placeholder='Select Parent Id' />
							</SelectTrigger>

							<SelectContent>
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
