import React, { useState } from 'react';
import axios from '@/api/axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2, UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [input, setInput] = useState({
        productName: "",
        productDesc: "",
        productPrice: "",
        category: "",
        brand: ""
    });
    const [files, setFiles] = useState([]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("productName", input.productName);
        formData.append("productDesc", input.productDesc);
        formData.append("productPrice", input.productPrice);
        formData.append("category", input.category);
        formData.append("brand", input.brand);

        for (let i = 0; i < files.length; i += 1) {
            formData.append("files", files[i]);
        }

        try {
            const res = await axios.post("/api/user/product/add", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/products");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='pt-28 pb-10 max-w-2xl mx-auto px-4'>
            <div className='bg-white p-8 rounded-2xl shadow-xl border border-gray-100'>
                <h1 className='text-3xl font-extrabold mb-6 text-gray-800'>Add New Product</h1>

                <form onSubmit={submitHandler} className='space-y-5'>
                    <div className='grid grid-cols-1 gap-4'>
                        <input type="text" name="productName" value={input.productName} onChange={changeEventHandler} placeholder="Product Name" className='w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none'/>

                        <textarea name="productDesc" rows="3" value={input.productDesc} onChange={changeEventHandler} placeholder="Product Description" className='w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none'/>

                        <div className='grid grid-cols-2 gap-4'>
                            <input type="number" name="productPrice" value={input.productPrice} onChange={changeEventHandler} placeholder="Price (Rs.)" className='border p-3 rounded-xl outline-none'/>
                            <input type="text" name="brand" value={input.brand} onChange={changeEventHandler} placeholder="Brand Name" className='border p-3 rounded-xl outline-none'/>
                        </div>

                        <select name="category" value={input.category} onChange={changeEventHandler} className='border p-3 rounded-xl outline-none bg-white'>
                            <option value="">Select Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Footwear">Footwear</option>
                            <option value="Beauty">Beauty</option>
                        </select>

                        <div className='border-2 border-dashed border-gray-200 p-6 rounded-xl text-center bg-gray-50'>
                            <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} id="file-upload" className='hidden'/>
                            <label htmlFor="file-upload" className='cursor-pointer flex flex-col items-center gap-2'>
                                <UploadCloud size={40} className='text-purple-500' />
                                <span className='text-gray-500'>{files.length > 0 ? `${files.length} files selected` : "Click to upload product images"}</span>
                            </label>
                        </div>
                    </div>

                    <Button disabled={loading} type="submit" className='w-full bg-purple-600 hover:bg-purple-700 py-6 text-lg rounded-xl transition-all'>
                        {loading ? <><Loader2 className='mr-2 animate-spin' /> Uploading...</> : "Create Product"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
