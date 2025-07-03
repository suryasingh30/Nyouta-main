import axios from "axios";
import { useEffect } from "react";
import { baseUrl } from "../utils/baseurl";
import { useDispatch } from "react-redux";
import { setFreeGreetingsProducts } from "../redux/productsSlice";

const GetAllFreeGreetingsroducts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllFreeGreetingsProducts = async () => {
            try {
                const category = "Guest Management"; // Your desired category
                const encodedCategory = encodeURIComponent(category);
                const res = await axios.get(`${baseUrl}/api/v1/products/products/category?cat=${encodedCategory}`);
                dispatch(setFreeGreetingsProducts(res.data.products));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchAllFreeGreetingsProducts();
    }, []);

    return null; 
};

export default GetAllFreeGreetingsroducts;
