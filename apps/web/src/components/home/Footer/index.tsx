import {
	CreditCard,
	Facebook,
	Headphones,
	Instagram,
	ShieldCheck,
	Truck,
	Twitter,
	Youtube,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import InvestorMarquee from './InvestorMarquee'

const badges = [
	{
		name: 'Free Shipping',
		description: 'On all orders over $200',
		Icon: Truck,
	},
	{
		name: 'Secure Payment',
		description: '100% secure payment',
		Icon: ShieldCheck,
	},
	{
		name: '24/7 Support',
		description: 'Dedicated support',
		Icon: Headphones,
	},
]

export default function Footer() {
	return (
		<footer className='bg-white dark:bg-(--sub-background) border-t border-gray-200 dark:border-neutral-700 transition-colors duration-300'>
			<div className='container mx-auto px-4 py-10'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{badges.map(({ name, description, Icon }) => (
						<div
							key={name}
							className='flex items-center gap-4'>
							<div className='p-3 bg-red-50 rounded-full text-red-600 dark:bg-red-600 dark:text-white transition-colors duration-300'>
								<Icon size={24} />
							</div>

							<div>
								<h4 className='font-bold dark:text-white font-heading text-gray-900'>
									{name}
								</h4>

								<p className='text-sm text-gray-500'>
									{description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			<Separator />

			<InvestorMarquee />

			<Separator />

			{/* 3. MAIN FOOTER LINKS */}
			<div className='container mx-auto px-4 py-16'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
					{/* Brand Info */}
					<div className='lg:col-span-4 space-y-6'>
						<Link
							href='/'
							className='flex items-center gap-2'>
							<Image
								src='/logo.png'
								alt='E-Commerce Logo'
								width={40}
								height={40}
							/>

							<span className='text-xl font-bold font-heading'>
								E-Commerce
							</span>
						</Link>

						<p className='text-gray-500 leading-relaxed'>
							Your one-stop destination for fashion, technology,
							and home essentials. We bring quality products to
							your doorstep with love.
						</p>

						<div className='flex gap-4'>
							<SocialButton icon={<Facebook size={18} />} />
							<SocialButton icon={<Twitter size={18} />} />
							<SocialButton icon={<Instagram size={18} />} />
							<SocialButton icon={<Youtube size={18} />} />
						</div>
					</div>

					{/* Quick Links */}
					<div className='lg:col-span-2 space-y-6'>
						<h4 className='font-bold font-heading text-gray-900 dark:text-white'>
							Shopping
						</h4>

						<ul className='space-y-3 text-sm text-gray-500'>
							<li>
								<FooterLink href='#'>Men's Fashion</FooterLink>
							</li>
							<li>
								<FooterLink href='#'>
									Women's Fashion
								</FooterLink>
							</li>
							<li>
								<FooterLink href='#'>Accessories</FooterLink>
							</li>
							<li>
								<FooterLink href='#'>Electronics</FooterLink>
							</li>
						</ul>
					</div>

					<div className='lg:col-span-2 space-y-6'>
						<h4 className='font-bold font-heading text-gray-900 dark:text-white'>
							Company
						</h4>

						<ul className='space-y-3 text-sm text-gray-500'>
							<li>
								<FooterLink href='#'>About Us</FooterLink>
							</li>
							<li>
								<FooterLink href='#'>Contact</FooterLink>
							</li>
							<li>
								<FooterLink href='#'>Careers</FooterLink>
							</li>
							<li>
								<FooterLink href='#'>Privacy Policy</FooterLink>
							</li>
							<li>
								<FooterLink href='#'>
									Terms of Service
								</FooterLink>
							</li>
						</ul>
					</div>

					{/* Newsletter */}
					<div className='lg:col-span-4 space-y-6'>
						<h4 className='font-bold font-heading text-gray-900 dark:text-white'>
							Stay Updated
						</h4>

						<p className='text-sm text-gray-500'>
							Subscribe to our newsletter to get the latest
							updates and exclusive offers.
						</p>

						<div className='flex gap-2 p-1 border rounded-lg'>
							<input
								className='block w-full py-1 px-3 flex-1 outline-none'
								placeholder='Enter your email'
							/>
							<Button>Subscribe</Button>
						</div>
					</div>
				</div>
			</div>

			{/* 4. COPYRIGHT & PAYMENTS */}
			<div className='bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300 py-6 border-t'>
				<div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4'>
					<div className='text-sm text-gray-500 dark:text-white'>
						© 2026 E-Commerce Inc. All rights reserved.
					</div>

					<div className='flex items-center gap-4 opacity-70 grayscale'>
						<CreditCard size={24} />
						<div className='font-bold text-lg'>VISA</div>
						<div className='font-bold text-lg italic'>PayPal</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

function SocialButton({ icon }: { icon: ReactNode }) {
	return (
		<a
			href='#'
			className='w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors'>
			{icon}
		</a>
	)
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
	return (
		<Link
			href={href}
			className='hover:text-red-600 transition-colors'>
			{children}
		</Link>
	)
}
