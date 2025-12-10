import Partner from './Partner'

const PARTNERS = [
	{ name: 'Stripe', logo: '/partners/stripe.png' },
	{ name: 'PayPal', logo: '/partners/paypal.png' },
	{ name: 'Visa', logo: '/partners/visa.png' },
	{ name: 'Mastercard', logo: '/partners/mastercard.png' },
	{ name: 'AWS', logo: '/partners/aws.png' },
	{ name: 'Vercel', logo: '/partners/vercel.png' },
	{ name: 'Google Cloud', logo: '/partners/google-cloud.png' },
]

export default function InvestorMarquee() {
	return (
		<div className='w-full py-8 bg-slate-50 overflow-hidden relative'>
			<p className='text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6'>
				Trusted by industry leaders
			</p>
			<div className='flex w-full'>
				<div className='flex infinite-scroll gap-16 min-w-full items-center justify-around px-8'>
					{PARTNERS.map((partner, index) => (
						<Partner
							key={index}
							{...partner}
						/>
					))}

					{PARTNERS.map((partner, index) => (
						<Partner
							key={index + PARTNERS.length}
							{...partner}
						/>
					))}
				</div>
			</div>

			<div className='absolute inset-y-0 left-0 w-20 bg-linear-to-r from-slate-50 to-transparent pointer-events-none'></div>
			<div className='absolute inset-y-0 right-0 w-20 bg-linear-to-l from-slate-50 to-transparent pointer-events-none'></div>
		</div>
	)
}
