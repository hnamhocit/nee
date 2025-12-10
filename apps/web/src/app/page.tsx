import Categories from '@/components/home/Categories'
import Footer from '@/components/home/Footer'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
	BadgeQuestionMarkIcon,
	BellIcon,
	CameraIcon,
	LanguagesIcon,
	ShoppingCartIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
	return (
		<>
			<div className='h-12 flex items-center justify-between container mx-auto px-4 text-sm text-gray-500'>
				<div className='flex items-center gap-4'>
					<Link href='/#'>Seller center</Link>
					<Link href='/#'>Download App</Link>
					<Separator
						orientation='vertical'
						className='h-6!'
					/>

					<div className='flex items-center gap-2'>
						Follow us:
						<Link href='/#'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='16'
								height='16'
								fill='currentColor'
								className='bi bi-facebook'
								viewBox='0 0 16 16'>
								<path d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951' />
							</svg>
						</Link>
						<Link href='/#'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='16'
								height='16'
								fill='currentColor'
								className='bi bi-twitter-x'
								viewBox='0 0 16 16'>
								<path d='M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z' />
							</svg>
						</Link>
					</div>
				</div>

				<div className='flex items-center gap-4'>
					<div className='flex items-center gap-2'>
						<BellIcon size={18} />
						<div>Notifications</div>
					</div>

					<div className='flex items-center gap-2'>
						<BadgeQuestionMarkIcon size={18} />
						<div>Help center</div>
					</div>

					<div className='flex items-center gap-2'>
						<LanguagesIcon size={18} />
						<div>English</div>
					</div>

					<Link
						href='/auth/login'
						className='font-semibold hover:underline text-red-500'>
						Login / Register
					</Link>
				</div>
			</div>

			<div
				className='h-16 bg-cover bg-center bg-no-repeat'
				style={{ backgroundImage: "url('/banner.png')" }}></div>

			<header className='sticky top-0 left-0 w-full z-20 bg-white shadow-sm'>
				<div className='p-4 flex items-center container mx-auto'>
					<div className='flex items-center gap-3 flex-1'>
						<Link href='/'>
							<Image
								src='/logo.png'
								alt='App Logo'
								width={48}
								height={48}
							/>
						</Link>

						<div className='font-heading text-xl font-bold'>
							E-Commerce
						</div>
					</div>

					<div className='flex-1 space-y-2'>
						<div className='flex items-center gap-3 border shadow rounded-2xl p-1'>
							<input
								placeholder='Eg: Men fashion'
								className='block bg-transparent outline-none p-2 flex-1'
							/>

							<Button
								variant='ghost'
								size='icon'>
								<CameraIcon />
							</Button>

							<Button
								size='lg'
								className='bg-red-500 rounded-2xl!'>
								Search
							</Button>
						</div>

						<div className='flex items-center gap-3'>
							<Link
								href='/#'
								className='text-sm text-red-500'>
								All Categories
							</Link>
							<Separator
								orientation='vertical'
								className='h-4!'
							/>
							<Link
								href='/#'
								className='text-sm text-red-500'>
								Deals
							</Link>
							<Separator
								orientation='vertical'
								className='h-4!'
							/>
							<Link
								href='/#'
								className='text-sm text-red-500'>
								What's New
							</Link>
							<Separator
								orientation='vertical'
								className='h-4!'
							/>
							<Link
								href='/#'
								className='text-sm text-gray-500'>
								Chrisamas atmosphere is good
							</Link>
						</div>
					</div>

					<div className='flex items-center justify-end flex-1'>
						<ShoppingCartIcon
							size={50}
							className='text-red-500'
						/>
					</div>
				</div>
			</header>

			<div className='min-h-screen container mx-auto px-4 py-16 space-y-16'>
				<div className='space-y-7'>
					<div className='flex gap-2'>
						<div
							className='flex-1 relative h-64 bg-cover bg-center bg-no-repeat rounded-sm shadow-lg'
							style={{
								backgroundImage:
									"url('https://down-vn.img.susercontent.com/file/sg-11134258-822xw-mi05776kptz89f@resize_w797_nl.webp')",
							}}></div>

						<div className='flex flex-col gap-2 w-96 shrink-0'>
							<div
								className='flex-1 rounded-sm bg-center bg-cover bg-no-repeat'
								style={{
									backgroundImage:
										"url('https://down-vn.img.susercontent.com/file/sg-11134258-822wx-mi05k03ds00169@resize_w398_nl.webp')",
								}}></div>

							<div
								className='flex-1 rounded-sm bg-center bg-cover bg-no-repeat'
								style={{
									backgroundImage:
										"url('https://down-vn.img.susercontent.com/file/sg-11134258-822wk-mi05k0igzqbla8@resize_w398_nl.webp')",
								}}></div>
						</div>
					</div>

					<div className='grid grid-cols-6 gap-4'>
						{Array.from({ length: 6 }).map((_, index) => (
							<div
								key={index}
								className='flex flex-col items-center gap-4'>
								<div className='w-18 h-18 rounded-md border-2 shadow-md'></div>
								<div>Category {index + 1}</div>
							</div>
						))}
					</div>
				</div>

				<Categories />

				<div className='grid grid-cols-6 gap-4'>
					{Array.from({ length: 12 }).map((_, index) => (
						<div
							key={index}
							className='flex flex-col p-4 gap-4'>
							<div
								className='w-full h-40 bg-cover bg-center bg-no-repeat rounded-md bg-gray-200 transition-all hover:ring-4 hover:ring-red-500 ring-offset-4'
								style={{
									backgroundImage:
										"url('https://img.alicdn.com/bao/uploaded/i3/2214181223328/O1CN01DU7GD71aSHCQWL7sf_!!4611686018427386784-0-item_pic.jpg_460x460q90.jpg_.webp')",
								}}></div>

							<div className='font-bold font-heading line-clamp-2 text-lg'>
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. {index + 1}
							</div>

							<div className='font-heading font-bold text-sm py-1 px-2 text-red-500 w-fit border-red-500 border-l-2 bg-red-100'>
								$19.99
							</div>
						</div>
					))}
				</div>
			</div>

			<Footer />
		</>
	)
}
