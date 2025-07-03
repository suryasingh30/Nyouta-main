import axios from "axios";
import { useEffect } from "react";
import { baseUrl } from "../utils/baseurl";
import { useDispatch } from "react-redux";
import { setPhotoBooksProducts } from "../redux/productsSlice";

const GetAllPhotoBooksProducts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllPhotoBooksProducts = async () => {
            try {
                const category = "Wedding Photobook"; // Your desired category
                const encodedCategory = encodeURIComponent(category);
                const res = await axios.get(`${baseUrl}/api/v1/products/products/category?cat=${encodedCategory}`);
                dispatch(setPhotoBooksProducts(res.data.products));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchAllPhotoBooksProducts();
    }, []);

    return null; 
};

export default GetAllPhotoBooksProducts;



