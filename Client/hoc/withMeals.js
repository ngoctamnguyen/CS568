import { useEffect, useState } from "react";
import axios from "axios";

export default function withMeals(Comp) {
    function NewComp() {
        const [meals, setMeals] = useState([]);
        const [cart, setCart] = useState([]);

        useEffect(() => {
            async function fetchMeals() {
                const response = await axios.get("/meals");
                setMeals(response.data);
            }
            fetchMeals();
        }, []);     

        // eslint-disable-next-line
        function searchMeals(str) {
            const searchArr = [...meals];
            if (str !=="") {
                const keyword = str;
                const filteredArr = searchArr.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(keyword)));
               setMeals(filteredArr);
            } else {
                window.location.reload(false);
            } 
        }
        return <Comp meals={meals} searchMeals={searchMeals}/>;
    }
    return NewComp;
}