import React, { useEffect, useState } from "react";
// import './App.css';
import main from './assets/main.svg';
import arrow from './assets/arrow.svg';
import small from './assets/small.svg';
import icon from './assets/icon.svg';
import share from './assets/share.svg';
import heart from './assets/heart.svg';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useGetSingleProduct from "../../hooks/useGetSingleProduct";
import {useNavigate} from 'react-router-dom';


const Product = () => {

    const { productId } = useParams();
    const navigate = useNavigate();
    useGetSingleProduct({ productId });

    const [quantity, setQuantity] = useState(1);
    const { selectedProduct } = useSelector(store => store.product);
    const handleQuantityChange = (change) => {
        setQuantity((prev) => Math.max(1, prev + change));
    };
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0)

        if (selectedProduct?.image?.length > 0) {
            setSelectedImage(selectedProduct.image[0]);
        }
    }, [selectedProduct]);

    console.log(selectedProduct);


    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="flex items-center gap-x-1 font-semibold Class	Description
cursor-pointer overflow-x-auto whitespace-nowrap">
                <span className="text-sm">Home</span>
                <img src={arrow} alt="" className="w-4 h-4" />
                <span className="text-sm">Categories</span>
                <img src={arrow} alt="" className="w-4 h-4" />
                <span className="text-sm">Photo Frames</span>
                <img src={arrow} alt="" className="w-4 h-4" />
                <span className="text-sm">Coloured Square, 4*6</span>
            </div> <br />
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Image Section */}
                <div className="md:w-1/2 flex gap-4">
                    {/* Small Images on the Left */}
                    <div className="flex flex-col gap-2">
                        {selectedProduct?.image?.map((singleImage, idx) => (
                            <img
                                key={idx}
                                src={singleImage}
                                alt={`Thumbnail ${idx + 1}`}
                                className={`w-14 h-14 rounded border cursor-pointer ${selectedImage === singleImage ? 'border-orange-700' : ''
                                    }`}
                                onClick={() => setSelectedImage(singleImage)}
                            />
                        ))}
                    </div>

                    {/* Main Image on the Right */}
                    <div className="flex-1">
                        <img
                            src={selectedImage}
                            alt="Main Product"
                            className="w-full h-auto rounded"
                        /> <br />
                        <p className="text-black-900">
                            Lorem ipsum dolor sit amet consectetur. Morbi ut et magna sed. Aliquam quam
                            adipiscing at elementum ac erat bibendum sed.

                        </p>
                        <br />

                        <p className="text-sm text-gray-500">Delivery and Gift wrap prices not included</p>

                        <button className="text-sm bg-gray-200 rounded-lg mt-9 mb-2 text-black-500">Item No: 86893166</button>
                    </div>
                </div>


                {/* Right Product Info Section */}
                <div className="md:w-1/2 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold mt-6">{selectedProduct?.name}</h2>
                        <div className="flex gap-2">
                            <img src={share} alt="Share" className="w-5 h-5 cursor-pointer" />
                            <img src={heart} alt="Wishlist" className="w-5 h-5 cursor-pointer" />
                        </div>
                    </div>
                    <p className="text-gray-600">Description, size, colour, type</p>
                    <div className="text-xl font-bold">
                        Rs. {selectedProduct?.price}/- <del className="text-gray-500">198</del>{" "}
                        <span className="text-green-600">50% OFF</span>
                    </div>
                    <p className="text-sm text-gray-500">Price incl. of all taxes</p>
                    <div className="text-yellow-500 text-lg">★★★★☆</div>

                    <hr />

                    <div>
                        <strong>Choose Size:</strong> 13×18 cm
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            className="px-3 py-1 bg-gray-200 rounded"
                            onClick={() => handleQuantityChange(-1)}
                            style={{ cursor: 'pointer' }}
                        >
                            -
                        </button>
                        <input
                            type="text"
                            readOnly
                            value={quantity}
                            className="w-12 text-center border rounded"
                        />
                        <button
                            className="px-3 py-1 bg-gray-200 rounded"
                            onClick={() => handleQuantityChange(1)}
                            style={{ cursor: 'pointer' }}
                        >
                            +
                        </button>
                    </div>

                    <div className=" gap-4">
                        <button style={{ cursor: 'pointer' }} className="px-4 py-2 bg-orange-900 text-white rounded-lg">ADD TO CART</button>
                        <br />
                        <br />
                        <button style={{ cursor: 'pointer' }} className="px-2 py-2 bg-orange-900 text-white w-full rounded-lg">BUY NOW</button>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <button style={{ cursor: 'pointer' }} className="px-2 py-2 bg-red-600 text-white w-full rounded-lg">DELETE</button>
                        <button style={{ cursor: 'pointer' }} className="px-2 py-2 bg-gray-900 text-white w-full rounded-lg"
                            onClick={()=>navigate('/product/create')}
                        >UPDATE</button>
                    </div>


                </div>
            </div>

            <hr className="my-8" />

            {/* Product Tabs */}
            <div className="grid  gap-6 mb-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-medium">Product Details</h3>
                    <img src={icon} alt="" className="w-5 h-5" />
                </div><hr />
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-medium">Measurements</h3>
                    <img src={icon} alt="" className="w-5 h-5" />
                </div> <hr />
            </div>

            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="border p-4 rounded shadow-sm">
                        <h4 className="font-medium">Great Product</h4>
                        <div className="text-yellow-500 mb-2">★★★★☆</div>
                        <p className="text-sm text-gray-600">
                            Lorem ipsum dolor sit amet consectetur. Morbi ut et magna sed.
                        </p>
                        <p className="text-xs text-gray-400 mt-2">lorem, india</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;