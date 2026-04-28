import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Trash2, Plus, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);

    // Saare products fetch karne ka function
    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/product/getall");
            if (res.data.success) {
                setProducts(res.data.products);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Product delete karne ka function
    const deleteHandler = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        // changes 
        try {
            const res = await axios.delete(
      `http://localhost:5000/api/user/product/delete/${id}`, // ✅ FIXED
      { withCredentials: true }
    );

            
            if (res.data.success) {
                toast.success(res.data.message);
                setProducts(products.filter(p => p._id !== id)); // List se turant hatao
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6 pt-24">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin Dashboard - Products</h1>
                <Link to="/admin/add-product">
                    <Button className="bg-purple-600 hover:bg-purple-700 flex gap-2">
                        <Plus size={18} /> Add Product
                    </Button>
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-xl overflow-hidden border">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold">Image</th>
                            <th className="p-4 font-semibold">Name</th>
                            <th className="p-4 font-semibold">Price</th>
                            <th className="p-4 font-semibold">Category</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="border-b hover:bg-gray-50 transition">
                                <td className="p-4">
                                    <img src={product.productImg?.[0]?.url} alt="" className="w-12 h-12 object-cover rounded-md" />
                                </td>
                                <td className="p-4 font-medium">{product.productName}</td>
                                <td className="p-4 text-pink-600 font-bold">₹{product.productPrice}</td>
                                <td className="p-4">
                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{product.category}</span>
                                </td>
                                <td className="p-4 text-right flex justify-end gap-3">
                                    <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50">
                                        <Edit size={18} />
                                    </Button>
                                    <Button 
                                        onClick={() => deleteHandler(product._id)}
                                        variant="ghost" size="icon" className="text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;





// import React, { useEffect, useState } from 'react';



// import axios from 'axios';
// import { toast } from 'sonner';
// import { Trash2, Plus, Edit } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';

// const AdminProducts = () => {
//     const [products, setProducts] = useState([]);

//     const fetchProducts = async () => {
//         try {
//             // Sahi URL path: /api/user/product/getall
//         const res = await axios.get("http://localhost:5000/api/user/product/getallproducts"); // ✅ FIX
//             if (res.data.success) {
//                 setProducts(res.data.products);
//             }
//         } catch (error) {
//             console.error("Fetch Error:", error);
//         }
//     };

//     const deleteHandler = async (id) => {
//         if (!window.confirm("Are you sure?")) return;
//         try {
//             // Sahi URL path: /api/user/product/delete/${id}
//             const res = await axios.delete(`http://localhost:5000/api/user/product/delete/${id}`, {
//                 withCredentials: true
//             });
//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 setProducts(products.filter(p => p._id !== id));
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Delete failed");
//         }
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     return (
//         <div className="max-w-6xl mx-auto p-6 pt-24">
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-2xl font-bold font-serif">Admin Dashboard</h1>
//                 <Link to="/admin/add-product">
//                     <Button className="bg-purple-600 hover:bg-purple-700">
//                         <Plus size={18} className="mr-2" /> Add Product
//                     </Button>
//                 </Link>
//             </div>

//             <div className="bg-white shadow-md rounded-xl overflow-hidden border">
//                 <table className="w-full text-left">
//                     <thead className="bg-gray-50 border-b">
//                         <tr>
//                             <th className="p-4">Image</th>
//                             <th className="p-4">Name</th>
//                             <th className="p-4">Price</th>
//                             <th className="p-4 text-right">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products.map((p) => (
//                             <tr key={p._id} className="border-b hover:bg-gray-50">
//                                 <td className="p-4">
//                                     <img src={p.productImg?.[0]?.url} className="w-12 h-12 object-cover rounded" alt="" />
//                                 </td>
//                                 <td className="p-4 font-medium">{p.productName}</td>
//                                 <td className="p-4 text-pink-600 font-bold">₹{p.productPrice}</td>
//                                 <td className="p-4 text-right flex justify-end gap-2">
//                                     <Button onClick={() => deleteHandler(p._id)} variant="ghost" className="text-red-600">
//                                         <Trash2 size={18} />
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AdminProducts;


