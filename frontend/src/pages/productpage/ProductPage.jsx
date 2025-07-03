import { useEffect, useState } from 'react';

import additional from './assets/additional.png';
import photoframe from './assets/photoframe.png'
import { useNavigate } from 'react-router-dom';
import GetAllProducts from '../../hooks/GetAllProducts';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProduct } from '../../redux/productsSlice';

function ProductPage() {
    const [favorited, setFavorited] = useState(Array(12).fill(false));

    const { allProducts } = useSelector(store => store.product);

    const dispatch = useDispatch();

    GetAllProducts();
    const navigate = useNavigate();
    const handleFavoriteClick = (index) => {
        const newFavorited = [...favorited];
        newFavorited[index] = !newFavorited[index];
        setFavorited(newFavorited);
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="p-8">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <nav className="text-sm mb-6">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <a href="#" className="font-normal text-[16px] leading-[100%] tracking-[0%] font-[Inter] text-black hover:text-gray-800 hover:underline">Home</a>
                            <i className="fas fa-chevron-right mx-2 text-gray-500 text-xs"></i>
                        </li>
                        <li className="flex items-center">
                            <a href="#" className="font-normal text-[16px] leading-[100%] tracking-[0%] font-[Inter] text-black hover:text-gray-800 hover:underline">Categories</a>
                            <i className="fas fa-chevron-right mx-2 text-gray-500 text-xs"></i>
                        </li>
                        <li className="flex items-center">
                            <a href="#" className="font-normal text-[16px] leading-[100%] tracking-[0%] font-[Inter] text-black hover:text-gray-800 hover:underline">Photo Frames</a>
                            <i className="fas fa-chevron-right mx-2 text-gray-500 text-xs"></i>
                        </li>
                    </ol>
                </nav>

                {/* Filter and Sort Options */}
                <div className="flex flex-wrap items-center justify-between mb-8">
                    <div className="flex flex-wrap items-center space-x-4">
                        <div className="relative shadow-sm">
                            <select className="font-normal text-[16px] leading-[100%] tracking-[0%] font-[Inter] border-transparent bg-[#E2E2E2] rounded-full px-4 py-2 text-black appearance-none pr-8 hover:bg-gray-100 transition-all duration-300">
                                <option>Sort</option>
                            </select>
                            <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"></i>
                        </div>
                        <div className="relative shadow-sm">
                            <select className="font-normal text-[16px] leading-[100%] tracking-[0%] font-[Inter] border-transparent bg-[#E2E2E2] rounded-full px-4 py-2 text-black appearance-none pr-8 hover:bg-gray-100 transition-all duration-300">
                                <option>Size</option>
                            </select>
                            <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"></i>
                        </div>
                        <div className="relative shadow-sm">
                            <select className="font-normal text-[16px] leading-[100%] tracking-[0%] font-[Inter] border-transparent bg-[#E2E2E2] rounded-full px-4 py-2 text-black appearance-none pr-8 hover:bg-gray-100 transition-all duration-300">
                                <option>Colour</option>
                            </select>
                            <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"></i>
                        </div>
                        <div className="relative shadow-sm">
                            <select className="font-normal text-[16px] leading-[100%] tracking-[0%] font-[Inter] border-transparent bg-[#E2E2E2] rounded-full px-4 py-2 text-black appearance-none pr-8 hover:bg-gray-100 transition-all duration-300">
                                <option>Price</option>
                            </select>
                            <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"></i>
                        </div>
                        <div className="relative shadow-sm">
                            <select className="font-normal text-[16px] leading-[100%] tracking-[0%] font-[Inter] border-transparent bg-[#E2E2E2] rounded-full px-4 py-2 text-black appearance-none pr-8 hover:bg-gray-100 transition-all duration-300">
                                <option>Categories</option>
                            </select>
                            <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"></i>
                        </div>
                        <div className="relative shadow-sm">
                            <select className="font-normal text-[16px] leading-[100%] tracking-[0%] font-[Inter] border-transparent bg-[#E2E2E2] rounded-full px-4 py-2 text-black appearance-none pr-8 hover:bg-gray-100 transition-all duration-300">
                                <option>Appearance</option>
                            </select>
                            <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"></i>
                        </div>
                        <div className="relative shadow-sm">
                            <select className="font-normal text-[16px] leading-[100%] tracking-[0%] font-[Inter] border-transparent bg-[#E2E2E2] rounded-full px-4 py-2 text-black appearance-none pr-8 hover:bg-gray-100 transition-all duration-300">
                                <option>Custom rating</option>
                            </select>
                            <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"></i>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Product Card */}
                    {allProducts?.map((singleProduct, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:scale-105" onClick={() => {
                            navigate(`/product/view/${singleProduct._id}`)
                            dispatch(setSelectedProduct(singleProduct))
                        } } >
                            <img src={singleProduct?.image[0]} alt="Photo frame" className="w-full h-64 object-contain" />
                            <div className={`absolute top-2 right-2 cursor-pointer ${favorited[index] ? 'text-red-500' : 'text-gray-500'}`} onClick={() => handleFavoriteClick(index)}>
                                <i className="fas fa-heart"></i>
                            </div>
                            <div className="p-3">
                                <h3 className="font-normal text-[17px] leading-[100%] tracking-[0%] font-[Inter] mb-1">{singleProduct?.name}</h3>
                                <p className="text-gray-600 font-normal text-[12px] leading-[100%] tracking-[0%] font-[Inter] mb-2">Description, size, colour, type</p>
                                <p className="font-bold text-[14px] leading-[100%] tracking-[0%] font-[Inter] text-gray-900 mb-2">Rs. <span className='font-normal text-[28px] leading-[24px] tracking-[0%] align-bottom font-[Inter]'>{singleProduct?.price}/-</span>  <span className="font-bold text-[14px] leading-[100%] tracking-[0%] font-[Inter] text-gray-600">only</span></p>
                                <div className="flex items-center mb-4">
                                    {/* Stars */}
                                    <div className="flex text-yellow-400">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                    </div>

                                </div>
                                <p className="text-gray-600 font-normal text-[12px] leading-[100%] tracking-[0%] font-[Inter] mb-4">More options</p>
                                <div className="flex space-x-2 mb-6">
                                    {/* Option Thumbnails */}
                                    {singleProduct?.image?.map((si, i) => (
                                        <img src={si} alt="Option 1" className="w-12 h-12 border rounded transform transition-all duration-300 hover:shadow-md hover:scale-105" key={i} />
                                    ))}
                                    {/* <img src={additional} alt="Option 2" className="w-12 h-12 border rounded transform transition-all duration-300 hover:shadow-md hover:scale-105" />
                                    <img src={additional} alt="Option 3" className="w-12 h-12 border rounded transform transition-all duration-300 hover:shadow-md hover:scale-105" />
                                    <img src={additional} alt="Option 4" className="w-12 h-12 border rounded transform transition-all duration-300 hover:shadow-md hover:scale-105" /> */}
                                </div>
                                <button className="font-bold text-[18px] leading-[100%] tracking-[0%] font-[Inter] w-full bg-[#653C28] hover:bg-black text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 mb-2 transform transition-all duration-300 hover:shadow-lg hover:scale-105">BUY NOW</button>
                                <button className="font-bold text-[18px] leading-[100%] tracking-[0%] font-[Inter] w-full bg-[#653C28] hover:bg-black text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transform transition-all duration-300 hover:shadow-lg hover:scale-105">ADD TO CART</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductPage