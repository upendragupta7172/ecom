// import React, { useState } from "react";

// const Filtersidebar = ({ allProducts, setFilteredProducts }) => {

//     const [selectedCategory, setSelectedCategory] = useState("");
//     const [selectedBrand, setSelectedBrand] = useState("");

//     // 🔥 UNIQUE CATEGORIES
//     const categories = [...new Set(allProducts.map(p => p.category))];

//     // 🔥 UNIQUE BRANDS
//     const brands = [...new Set(allProducts.map(p => p.brand))];

//     // 🔥 FILTER FUNCTION
//     const applyFilter = (category, brand) => {
//         let filtered = allProducts;

//         if (category) {
//             filtered = filtered.filter(p => p.category === category);
//         }

//         if (brand) {
//             filtered = filtered.filter(p => p.brand === brand);
//         }

//         setFilteredProducts(filtered);
//     };

//     return (
//         <div className="w-60 border p-4 rounded-lg shadow">

//             <h2 className="font-bold mb-3">Filters</h2>

//             {/* CATEGORY */}
//             <div className="mb-4">
//                 <h3 className="font-semibold mb-2">Category</h3>

//                 {categories.map((cat, i) => (
//                     <div key={i}>
//                         <input
//                             type="radio"
//                             name="category"
//                             value={cat}
//                             onChange={(e) => {
//                                 setSelectedCategory(e.target.value);
//                                 applyFilter(e.target.value, selectedBrand);
//                             }}
//                         />
//                         <label className="ml-2">{cat}</label>
//                     </div>
//                 ))}
//             </div>

//             {/* BRAND */}
//             <div className="mb-4">
//                 <h3 className="font-semibold mb-2">Brand</h3>

//                 {brands.map((b, i) => (
//                     <div key={i}>
//                         <input
//                             type="radio"
//                             name="brand"
//                             value={b}
//                             onChange={(e) => {
//                                 setSelectedBrand(e.target.value);
//                                 applyFilter(selectedCategory, e.target.value);
//                             }}
//                         />
//                         <label className="ml-2">{b}</label>
//                     </div>
//                 ))}
//             </div>

//             {/* RESET BUTTON */}
//             <button
//                 className="bg-black text-white px-3 py-1 rounded mt-2"
//                 onClick={() => {
//                     setSelectedCategory("");
//                     setSelectedBrand("");
//                     setFilteredProducts(allProducts);
//                 }}
//             >
//                 Reset
//             </button>

//         </div>
//     );
// };

// export default Filtersidebar;









// import React from "react";
// const Filtersidebar = ({ allProducts }) => {
//   const Categories = allProducts.map(p => p.category)
//   const UniqueCategory = ["All", ...new Set(Categories)];

//   const Brands = allProducts.map(p => p.brand)
//   const UniqueBrand = ["All", ...new Set(Brands)];
//   console.log(UniqueBrand);

//   return (
//     <div className='bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64'>
//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search..."
//         className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
//       />

//       {/* category */}
//       <h1 className='mt-5 font-semibold text-xl'>Category</h1>

//       <div className='flex flex-col gap-2 mt-3'>
//         {
//           UniqueCategory.map((item, index) => (
//             <div key={index} className='flex items-center gap-2'>
//               <input type="radio" />
//               <label htmlFor="">{item}</label>
//             </div>
//           ))
//         }
//       </div>

//       {/* brand */}

//        <h1 className='mt-5 font-semibold text-xl'>Brand</h1>

//       <div className='flex flex-col gap-2 mt-3'>
//         {
//           UniqueBrand.map((item, index) => (
//             <div key={index} className='flex items-center gap-2'>
//               <input type="radio" />
//               <label htmlFor="">{item}</label>
//             </div>
//           ))
//         }
//       </div>



//     </div>
//   )
// }

//  export default Filtersidebar;



// import React from "react";
// import { Button } from "./ui/button";

// const Filtersidebar = ({ allProducts ,PriceRange , search ,}) => {
//   const Categories = allProducts.map((p) => p.category);
//   const UniqueCategory = ["All", ...new Set(Categories)];

//   const Brands = allProducts.map((p) => p.brand);
//   const UniqueBrand = ["All", ...new Set(Brands)];

//   return (
//     <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64">
//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search..."
//         className="bg-white p-2 rounded-md border-gray-400 border-2 w-full outline-none focus:border-blue-500"
//       />

//       {/* Category Section (Still Radios) */}
//       <h1 className="mt-5 font-semibold text-xl border-b pb-1">Category</h1>
//       <div className="flex flex-col gap-2 mt-3">
//         {UniqueCategory.map((item, index) => (
//           <div key={index} className="flex items-center gap-2">
//             <input
//               type="radio"
//               id={`cat-${index}`}
//               name="category"
//               value={item}
//               className="cursor-pointer"
//             />
//             <label htmlFor={`cat-${index}`} className="cursor-pointer text-sm">
//               {item}
//             </label>
//           </div>
//         ))}
//       </div>

//       {/* Brand Section (Converted to Select Field) */}
//       <h1 className="mt-5 font-semibold text-xl border-b pb-1">Brand</h1>
//       <div className="mt-3">
//         <select 
//           name="brand" 
//           className="w-full p-2 bg-white border-2 border-gray-400 rounded-md outline-none focus:border-blue-500 cursor-pointer text-sm"
//         >
//           {UniqueBrand.map((item, index) => (
//             <option key={index} value={item}>
//               {item}
//             </option>
//           ))}
//         </select>

//         {/* price range */}

//         {/* <h1>price range</h1> */}
//         {/* <div>
//             <label htmlFor="">price range   {PriceRange[0]}- {PriceRange[1]}</label>
//             <div>
//                 <input type="number" min={0} max={99}/>
//                 <span>-</span>

//                  <input type="number" min={0} max={99}/>
//             </div>

//             <input type="range" min= "0" max = "500"   step= "100"/>




//         </div> */}



//         {/* price range */}
// <h1 className='mt-5 font-semibold text-xl mb-3'>Price Range</h1>
// <div className='flex flex-col gap-2'>
//   <label>
//     Price Range: ₹{PriceRange[0]} - ₹{PriceRange[1]}
//   </label>
//   <div className='flex gap-2 items-center'>
//     <input type="number" min="0" max="5000" className='w-20 p-1 border border-gray-300 rounded' />
//     <span>-</span>
//     <input type="number" min="0" max="999999" className='w-20 p-1 border border-gray-300 rounded' />
//   </div>
//   <input type="range" min="0" max="5000" step="100" className='w-full' />
//   <input type="range" min="0" max="999999" step="100" className='w-full' />
// </div>

// {/* Reset button */}
// <Button className="bg-pink-600 text-white mt-5 cursor-pointer w-full">Reset Filters</Button>





//       </div>
//     </div>
//   );
// };

// export default Filtersidebar;




// import React from "react";
// import { Button } from "./ui/button";

// const Filtersidebar = ({ allProducts, setFilters, filters }) => {
//   const UniqueCategory = ["All", ...new Set(allProducts.map((p) => p.category))];
//   const UniqueBrand = ["All", ...new Set(allProducts.map((p) => p.brand))];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64">
//       <input
//         type="text"
//         name="keyword"
//         placeholder="Search..."
//         value={filters.keyword}
//         onChange={handleInputChange}
//         className="bg-white p-2 rounded-md border-gray-400 border-2 w-full outline-none focus:border-blue-500"
//       />

//       <h1 className="mt-5 font-semibold text-xl border-b pb-1">Category</h1>
//       <div className="flex flex-col gap-2 mt-3">
//         {UniqueCategory.map((item, index) => (
//           <div key={index} className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="category"
//               value={item}
//               checked={filters.category === item}
//               onChange={handleInputChange}
//               id={`cat-${index}`}
//             />
//             <label htmlFor={`cat-${index}`} className="text-sm cursor-pointer">{item}</label>
//           </div>
//         ))}
//       </div>

//       <h1 className="mt-5 font-semibold text-xl border-b pb-1">Brand</h1>
//       <select 
//         name="brand" 
//         value={filters.brand}
//         onChange={handleInputChange}
//         className="w-full p-2 mt-3 bg-white border-2 border-gray-400 rounded-md outline-none"
//       >
//         {UniqueBrand.map((item, index) => (
//           <option key={index} value={item}>{item}</option>
//         ))}
//       </select>

//       <h1 className='mt-5 font-semibold text-xl mb-3'>Price Range</h1>
//       <div className='flex flex-col gap-2'>
//         <label className="text-sm">Max Price: ₹{filters.maxPrice}</label>
//         <input 
//           type="range" 
//           name="maxPrice"
//           min="0" 
//           max="100000" 
//           value={filters.maxPrice}
//           onChange={handleInputChange}
//           className='w-full' 
//         />
//       </div>

//       <Button 
//         onClick={() => setFilters({ keyword: "", category: "All", brand: "All", maxPrice: 100000 })}
//         className="bg-pink-600 text-white mt-5 w-full"
//       >
//         Reset Filters
//       </Button>
//     </div>
//   );
// };

// export default Filtersidebar;





import React from "react";
import { Button } from "./ui/button";

const Filtersidebar = ({ allProducts, setFilters, filters }) => {
  const UniqueCategory = ["All", ...new Set(allProducts.map((p) => p.category || "Other"))];
  const UniqueBrand = ["All", ...new Set(allProducts.map((p) => p.brand || "Other"))];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64">
      <input
        type="text"
        name="keyword"
        placeholder="Search..."
        value={filters.keyword}
        onChange={handleInputChange}
        className="bg-white p-2 rounded-md border-2 w-full"
      />

      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      {UniqueCategory.map((item, index) => (
        <div key={index}>
          <input
            type="radio"
            name="category"
            value={item}
            checked={filters.category === item}
            onChange={handleInputChange}
          />
          <label>{item}</label>
        </div>
      ))}

      <h1 className="mt-5 font-semibold text-xl">Brand</h1>
      <select name="brand" value={filters.brand} onChange={handleInputChange}>
        {UniqueBrand.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>

      <h1 className='mt-5 font-semibold text-xl'>Price</h1>
      <input 
        type="range" 
        name="maxPrice"
        min="0" 
        max="100000" 
        value={filters.maxPrice}
        onChange={handleInputChange}
      />

      <Button 
        onClick={() => setFilters({ keyword: "", category: "All", brand: "All", maxPrice: 100000 })}
      >
        Reset
      </Button>
    </div>
  );
};

export default Filtersidebar;