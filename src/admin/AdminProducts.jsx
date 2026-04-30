import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';
import { toast } from 'sonner';
import { Trash2, Plus, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);

    const deleteHandler = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const token = localStorage.getItem("token");
            const res = await axios.delete(`/api/user/product/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.success) {
                toast.success(res.data.message);
                setProducts((currentProducts) =>
                    currentProducts.filter((product) => product._id !== id)
                );
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
        }
    };

    useEffect(() => {
        let ignore = false;

        const loadProducts = async () => {
            try {
                const res = await axios.get("/api/user/product/getallproducts");
                if (!ignore && res.data.success) {
                    setProducts(res.data.products);
                }
            } catch (error) {
                if (!ignore) {
                    console.error(error);
                    toast.error("Failed to load products");
                }
            }
        };

        void loadProducts();

        return () => {
            ignore = true;
        };
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
                                    <img src={product.productImg?.[0]?.url} alt={product.productName} className="w-12 h-12 object-cover rounded-md" />
                                </td>
                                <td className="p-4 font-medium">{product.productName}</td>
                                <td className="p-4 text-pink-600 font-bold">Rs. {product.productPrice}</td>
                                <td className="p-4">
                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{product.category}</span>
                                </td>
                                <td className="p-4 text-right flex justify-end gap-3">
                                    <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50">
                                        <Edit size={18} />
                                    </Button>
                                    <Button
                                        onClick={() => deleteHandler(product._id)}
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-600 hover:bg-red-50"
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
