// import Filtersidebar from '@/components/Filtersidebar'
// import React, { useEffect, useState } from 'react'
// import axios from "@/api/axios";
// import Productcard from '@/components/Productcard'
// import { useDispatch, useSelector } from 'react-redux'
// import { setProducts } from '@/redux/productSlice'

// const Product = () => {
//   const dispatch = useDispatch()
//   const { products } = useSelector((state) => state.product)

//   const [filteredProducts, setFilteredProducts] = useState([])
//   const [loading, setLoading] = useState(false)

//   const [filters, setFilters] = useState({
//     keyword: "",
//     category: "All",
//     brand: "All",
//     maxPrice: 100000
//   })

//   useEffect(() => {
//     let ignore = false

//     const loadProducts = async () => {
//       try {
//         setLoading(true)
//         const res = await axios.get("/api/user/product/getallproducts")

//         if (!ignore && res.data?.products) {
//           dispatch(setProducts(res.data.products))
//           setFilteredProducts(res.data.products)
//         }
//       } catch (error) {
//         if (!ignore) {
//           console.log(error)
//         }
//       } finally {
//         if (!ignore) {
//           setLoading(false)
//         }
//       }
//     }

//     void loadProducts()

//     return () => {
//       ignore = true
//     }
//   }, [dispatch])

//   useEffect(() => {
//     let temp = [...products];

//     if (filters.keyword) {
//       temp = temp.filter(p =>
//         p.productName.toLowerCase().includes(filters.keyword.toLowerCase())
//       );
//     }

//     if (filters.category !== "All") {
//       temp = temp.filter(p => p.category === filters.category);
//     }

//     if (filters.brand !== "All") {
//       temp = temp.filter(p => p.brand === filters.brand);
//     }

//     temp = temp.filter(p => p.productPrice <= filters.maxPrice);

//     setFilteredProducts(temp);
//   }, [filters, products]);

//   return (
//     <div className="pt-24 px-4 md:px-8 bg-gray-50 min-h-screen">
//       <div className="flex flex-col md:flex-row gap-6">
//         <div className="w-full md:w-1/4 lg:w-1/5">
//           <div className="bg-white p-4 rounded-xl shadow sticky top-24">
//             <Filtersidebar
//               allProducts={products}
//               filters={filters}
//               setFilters={setFilters}
//             />
//           </div>
//         </div>

//         <div className="flex-1">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl md:text-2xl font-bold">
//               Products ({filteredProducts.length})
//             </h2>
//           </div>

//           {loading ? (
//             <p className="text-center mt-10">Loading...</p>
//           ) : filteredProducts.length === 0 ? (
//             <p className="text-center mt-10 text-gray-500">
//               No products found
//             </p>
//           ) : (
//             <div className="
//               grid
//               grid-cols-1
//               sm:grid-cols-2
//               md:grid-cols-2
//               lg:grid-cols-3
//               xl:grid-cols-4
//               gap-5
//             ">
//               {filteredProducts.map((item) => (
//                 <Productcard key={item._id} product={item} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Product





import Filtersidebar from '@/components/Filtersidebar'
import React, { useEffect, useState } from 'react'
import axios from "@/api/axios";
import Productcard from '@/components/Productcard'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '@/redux/productSlice'
import { Search } from 'lucide-react'

const Product = () => {

  const dispatch = useDispatch()

  const { products } = useSelector((state) => state.product)

  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const [filters, setFilters] = useState({
    keyword: "",
    category: "All",
    brand: "All",
    maxPrice: 100000
  })

  useEffect(() => {

    let ignore = false

    const loadProducts = async () => {

      try {

        setLoading(true)

        const res = await axios.get(
          "/api/user/product/getallproducts"
        )

        if (!ignore && res.data?.products) {

          dispatch(setProducts(res.data.products))
          setFilteredProducts(res.data.products)

        }

      } catch (error) {

        if (!ignore) {
          console.log(error)
        }

      } finally {

        if (!ignore) {
          setLoading(false)
        }

      }
    }

    void loadProducts()

    return () => {
      ignore = true
    }

  }, [dispatch])

  useEffect(() => {

    let temp = [...products]

    if (filters.keyword) {

      temp = temp.filter((p) =>
        p.productName
          .toLowerCase()
          .includes(filters.keyword.toLowerCase())
      )
    }

    if (filters.category !== "All") {
      temp = temp.filter(
        (p) => p.category === filters.category
      )
    }

    if (filters.brand !== "All") {
      temp = temp.filter(
        (p) => p.brand === filters.brand
      )
    }

    temp = temp.filter(
      (p) => p.productPrice <= filters.maxPrice
    )

    setFilteredProducts(temp)

  }, [filters, products])

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-pink-50 pt-24 px-4 md:px-8">

      {/* Top Heading */}

      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h1 className="text-4xl font-black text-gray-900">
            Explore Products
          </h1>

          <p className="mt-2 text-gray-500">
            Discover premium gadgets at unbeatable prices
          </p>

        </div>

        {/* Search */}

        <div className="relative w-full md:w-[350px]">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search products..."
            value={filters.keyword}
            onChange={(e) =>
              setFilters({
                ...filters,
                keyword: e.target.value
              })
            }
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-white
              py-3
              pl-11
              pr-4
              shadow-sm
              outline-none
              transition-all
              focus:border-pink-500
              focus:ring-2
              focus:ring-pink-200
            "
          />

        </div>

      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}

        <div className="w-full lg:w-[300px]">

          <div className="
            sticky
            top-24
            rounded-3xl
            border
            border-white/40
            bg-white/80
            p-6
            shadow-xl
            backdrop-blur-lg
          ">

            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Filters
            </h2>

            {/* Price */}

            {/* <div className="mb-6">

              <div className="mb-3 flex items-center justify-between">

                <p className="font-semibold text-gray-700">
                  Max Price
                </p>

                <span className="
                  rounded-full
                  bg-pink-100
                  px-3
                  py-1
                  text-sm
                  font-bold
                  text-pink-600
                ">
                  ₹{filters.maxPrice}
                </span>

              </div>

              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    maxPrice: Number(e.target.value)
                  })
                }
                className="
                  h-2
                  w-full
                  cursor-pointer
                  appearance-none
                  rounded-lg
                  bg-gradient-to-r
                  from-pink-500
                  to-purple-500
                "
              />

              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>₹1k</span>
                <span>₹100k</span>
              </div>

            </div> */}

            <Filtersidebar
              allProducts={products}
              filters={filters}
              setFilters={setFilters}
            />

          </div>

        </div>

        {/* Products */}

        <div className="flex-1">

          {/* Product Count */}

          <div className="
            mb-6
            flex
            items-center
            justify-between
            rounded-2xl
            bg-white
            px-6
            py-4
            shadow-md
          ">

            <h2 className="text-xl font-bold text-gray-900">
              Products
            </h2>

            <span className="
              rounded-full
              bg-pink-100
              px-4
              py-2
              text-sm
              font-bold
              text-pink-600
            ">
              {filteredProducts.length} Items
            </span>

          </div>

          {/* Loading */}

          {loading ? (

            <div className="flex justify-center py-20">

              <div className="
                h-14
                w-14
                animate-spin
                rounded-full
                border-4
                border-pink-500
                border-t-transparent
              " />

            </div>

          ) : filteredProducts.length === 0 ? (

            <div className="
              rounded-3xl
              bg-white
              py-20
              text-center
              shadow-lg
            ">

              <h2 className="text-2xl font-bold text-gray-700">
                No Products Found
              </h2>

              <p className="mt-2 text-gray-500">
                Try changing your filters
              </p>

            </div>

          ) : (

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-6
            ">

              {filteredProducts.map((item) => (

                <Productcard
                  key={item._id}
                  product={item}
                />

              ))}

            </div>

          )}

        </div>

      </div>

    </div> 
  )
}

export default Product