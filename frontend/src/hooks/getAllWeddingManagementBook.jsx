import axios from "axios";
import { useEffect } from "react";
import { baseUrl } from "../utils/baseurl";
import { useDispatch } from "react-redux";
import { setWeddingProducts } from "../redux/productsSlice";

const getAllWeddingManagementBook = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllWeddingProducts = async () => {
            try {
                const category = "Wedding Management"; // Your desired category
                const encodedCategory = encodeURIComponent(category);
                const res = await axios.get(`${baseUrl}/api/v1/products/products/category?cat=${encodedCategory}`);
                dispatch(setWeddingProducts(res.data.products));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchAllWeddingProducts();
    }, []);

    return null; 
};

export default getAllWeddingManagementBook;
