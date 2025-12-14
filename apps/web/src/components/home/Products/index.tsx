import Product from './Product'

export default function Products() {
	return (
		<div className='grid grid-cols-5 gap-4'>
			{Array.from({ length: 12 }).map((_, index) => (
				<Product
					index={index}
					key={index}
				/>
			))}
		</div>
	)
}
