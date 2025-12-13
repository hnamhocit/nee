import { z } from 'zod'

export const categorySchema = z.object({
	name: z
		.string()
		.nonempty({ message: 'Please enter a category name' })
		.min(3, {
			message: 'Category name must be at least 3 characters long',
		}),

	thumbnail: z.string().optional().nullable(),

	parentId: z.string().optional().nullable(),
})

export type CategoryFormValues = z.infer<typeof categorySchema>
