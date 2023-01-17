const products = [
  {
    id: 1,
    name: "피드 타이틀",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    color: "Desc",
  },
  {
    id: 1,
    name: "피드 타이틀",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    color: "Desc",
  },
  {
    id: 1,
    name: "피드 타이틀",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    color: "Desc",
  },
  {
    id: 1,
    name: "피드 타이틀",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    color: "Desc",
  },
  {
    id: 1,
    name: "피드 타이틀",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    color: "Desc",
  },
  // More products...
];

export function Grid() {
  return (
    // 사진첩 만들기
    <div className="box-border w-full h-full gap-3 p-5 pb-5 xl:overflow-hidden xl:px-16 xl:flex-row xl:flex animate-fade-in-down">
      {/* 사진 갤러리 만들기 */}{" "}
      <div className="w-full bg-white rounded-lg shadow-md">
        {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900 ml-14">
          공사중 입니다.
        </h2> */}
        <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="relative group">
                <div className="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:aspect-none lg:h-40">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  {/* 돈뜨던곳 */}
                  {/* <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
