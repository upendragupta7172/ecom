
import Filtersidebar from '@/components/Filtersidebar'
import React, { useEffect, useState } from 'react'
import axios from "@/api/axios";
import Productcard from '@/components/Productcard'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '@/redux/productSlice'

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

  const getProducts = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/api/user/product/getallproducts")

      if (res.data?.products) {
        dispatch(setProducts(res.data.products))
        setFilteredProducts(res.data.products)
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    let temp = [...products];

    if (filters.keyword) {
      temp = temp.filter(p =>
        p.productName.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }

    if (filters.category !== "All") {
      temp = temp.filter(p => p.category === filters.category);
    }

    if (filters.brand !== "All") {
      temp = temp.filter(p => p.brand === filters.brand);
    }

    temp = temp.filter(p => p.productPrice <= filters.maxPrice);

    setFilteredProducts(temp);
  }, [filters, products]);

  return (
    <div className="pt-24 px-4 md:px-8 bg-gray-50 min-h-screen">

      {/* 🔥 MAIN LAYOUT */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* SIDEBAR */}
        <div className="w-full md:w-1/4 lg:w-1/5">
          <div className="bg-white p-4 rounded-xl shadow sticky top-24">
            <Filtersidebar 
              allProducts={products} 
              filters={filters} 
              setFilters={setFilters} 
            />
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="flex-1">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold">
              Products ({filteredProducts.length})
            </h2>
          </div>

          {/* LOADING */}
          {loading ? (
            <p className="text-center mt-10">Loading...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center mt-10 text-gray-500">
              No products found 😢
            </p>
          ) : (

            /* 🔥 RESPONSIVE GRID */
            <div className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-2 
              lg:grid-cols-3 
              xl:grid-cols-4 
              gap-5
            ">
              {filteredProducts.map((item) => (
                <Productcard key={item._id} product={item} />
              ))}
            </div>

          )}
        </div>

      </div>
    </div>
  )
}

export default Product