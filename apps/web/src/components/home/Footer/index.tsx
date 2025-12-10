import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
import InvestorMarquee from './InvestorMarquee'

export default function Footer() {
	return (
		<footer className='bg-white border-t border-gray-200'>
			<div className='container mx-auto px-4 py-10'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					<div className='flex items-center gap-4'>
						<div className='p-3 bg-blue-50 rounded-full text-blue-600'>
							<Truck size={24} />
						</div>

						<div>
							<h4 className='font-bold font-heading text-gray-900'>
								Free Shipping
							</h4>

							<p className='text-sm text-gray-500'>
								On all orders over $200
							</p>
						</div>
					</div>

					<div className='flex items-center gap-4'>
						<div className='p-3 bg-blue-50 rounded-full text-blue-600'>
							<ShieldCheck size={24} />
						</div>

						<div>
							<h4 className='font-bold font-heading text-gray-900'>
								Secure Payment
							</h4>

							<p className='text-sm text-gray-500'>
								100% secure payment
							</p>
						</div>
					</div>

					<div className='flex items-center gap-4'>
						<div className='p-3 bg-blue-50 rounded-full text-blue-600'>
							<Headphones size={24} />
						</div>

						<div>
							<h4 className='font-bold font-heading text-gray-900'>
								24/7 Support
							</h4>

							<p className='text-sm text-gray-500'>
								Dedicated support
							</p>
						</div>
					</div>
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
						<h4 className='font-bold font-heading text-gray-900'>
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
						<h4 className='font-bold font-heading text-gray-900'>
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
						<h4 className='font-bold font-heading text-gray-900'>
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
			<div className='bg-gray-50 py-6 border-t border-gray-200'>
				<div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4'>
					<div className='text-sm text-gray-500'>
						© 2026 E-Commerce Inc. All rights reserved.
					</div>

					<div className='flex items-center gap-4 opacity-70 grayscale'>
						{/* Demo Payment Icons */}
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
