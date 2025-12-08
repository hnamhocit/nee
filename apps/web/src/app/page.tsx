import Header from "@/components/Header";

export const ECOMMERCE_CATEGORIES = [
  {
    id: 1,
    name: "Men's Fashion",
    slug: "mens-fashion",
    image: "/categories/men-fashion.jpg",
  },
  {
    id: 2,
    name: "Phones & Accessories",
    slug: "phones-accessories",
    image: "/categories/phones.webp",
  },
  {
    id: 3,
    name: "Consumer Electronics",
    slug: "consumer-electronics",
    image: "/categories/electronics.jpeg",
  },
  {
    id: 4,
    name: "Computers & Laptops",
    slug: "computers-laptops",
    image: "/categories/computers.png",
  },
  { id: 5, name: "Cameras", slug: "cameras", image: "/categories/cameras.png" },
  { id: 6, name: "Watches", slug: "watches", image: "/categories/watches.png" },
  {
    id: 7,
    name: "Men's Shoes",
    slug: "mens-shoes",
    image: "/categories/men-shoes.png",
  },
  {
    id: 8,
    name: "Home Appliances",
    slug: "home-appliances",
    image: "/categories/home-appliances.png",
  },
  {
    id: 9,
    name: "Sports & Travel",
    slug: "sports-travel",
    image: "/categories/sports-travel.png",
  },
  {
    id: 10,
    name: "Automotive & Motorbikes",
    slug: "automotive-motorbikes",
    image: "/categories/vehicles.png",
  },
  {
    id: 11,
    name: "Women's Fashion",
    slug: "womens-fashion",
    image: "/categories/women-fashion.png",
  },
  {
    id: 12,
    name: "Mother & Baby",
    slug: "mother-baby",
    image: "/categories/mom-baby.png",
  },
  {
    id: 13,
    name: "Home & Living",
    slug: "home-living",
    image: "/categories/home-living.png",
  },
  { id: 14, name: "Beauty", slug: "beauty", image: "/categories/beauty.png" },
  { id: 15, name: "Health", slug: "health", image: "/categories/health.png" },
  {
    id: 16,
    name: "Women's Shoes",
    slug: "womens-shoes",
    image: "/categories/women-shoes.png",
  },
  {
    id: 17,
    name: "Women's Bags",
    slug: "womens-bags",
    image: "/categories/women-bags.png",
  },
  {
    id: 18,
    name: "Jewelry & Accessories",
    slug: "jewelry-accessories",
    image: "/categories/accessories.png",
  },
  {
    id: 19,
    name: "Groceries",
    slug: "groceries",
    image: "/categories/groceries.png",
  },
  {
    id: 20,
    name: "Books & Stationery",
    slug: "books-stationery",
    image: "/categories/books.png",
  },
  {
    id: 21,
    name: "Men's Bags",
    slug: "mens-bags",
    image: "/categories/men-bags.png",
  },
  { id: 22, name: "Toys", slug: "toys", image: "/categories/toys.png" },
  { id: 23, name: "Pet Care", slug: "pet-care", image: "/categories/pets.png" },
  {
    id: 24,
    name: "Tools & Home Improvement",
    slug: "tools-home-improvement",
    image: "/categories/tools.png",
  },
  {
    id: 25,
    name: "Kids' Fashion",
    slug: "kids-fashion",
    image: "/categories/kids-fashion.png",
  },
  {
    id: 26,
    name: "Laundry & Cleaning",
    slug: "laundry-cleaning",
    image: "/categories/laundry.png",
  },
  {
    id: 27,
    name: "Vouchers & Services",
    slug: "vouchers-services",
    image: "/categories/vouchers.png",
  },
];

const HomePage = () => {
  return (
    <>
      <Header />

      <div className="container mx-auto space-y-24 py-8 min-h-screen">
        <div className="flex gap-4 py-8">
          <div
            className="flex-1 bg-cover bg-center bg-no-repeat h-120 rounded-sm"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-vector/gradient-mountain-landscape_23-2149152831.jpg?semt=ais_hybrid&w=740&q=80')",
            }}
          ></div>

          <div className="shrink-0 w-96 flex flex-col gap-4">
            <div
              className="h-58 bg-cover bg-center bg-no-repeat rounded-sm"
              style={{
                backgroundImage:
                  'url("https://cdn.pixabay.com/photo/2025/09/18/07/06/winding-path-9840681_1280.jpg")',
              }}
            ></div>

            <div
              className="h-58 bg-cover bg-center bg-no-repeat rounded-sm"
              style={{
                backgroundImage:
                  'url("https://marketplace.canva.com/EAGK_VGJ-wk/1/0/1600w/canva-purple-illustrative-lavender-desktop-wallpaper-IJjKe9JIOeM.jpg")',
              }}
            ></div>
          </div>
        </div>

        <div className="space-y-7">
          <div className="text-3xl font-bold font-serif">Categories</div>

          <div className="grid grid-cols-8">
            {ECOMMERCE_CATEGORIES.slice(0, 16).map((category) => (
              <div
                key={category.id}
                className="p-2 flex flex-col items-center gap-4"
              >
                <div
                  className="h-24 w-24 bg-cover bg-center bg-no-repeat rounded-sm"
                  style={{
                    backgroundImage: `url(${category.image})`,
                  }}
                ></div>

                <div className="text-center">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
