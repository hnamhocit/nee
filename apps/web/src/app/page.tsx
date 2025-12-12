import Banner from '@/components/home/Banner'
import Categories from '@/components/home/Categories'
import Footer from '@/components/home/Footer'
import Header from '@/components/home/Header'
import Hero from '@/components/home/Hero'
import Navbar from '@/components/home/Navbar'
import Products from '@/components/home/Products'

export default function Home() {
	return (
		<>
			<Navbar />
			<Banner />
			<Header />

			<div className='min-h-screen container mx-auto px-4 py-16 space-y-16'>
				<Hero />
				<Categories />
				<Products />
			</div>

			<Footer />
		</>
	)
}
