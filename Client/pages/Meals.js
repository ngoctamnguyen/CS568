import { Link, useNavigate } from "react-router-dom";
import MealItem from "../component/MealItem";
import withMeals from "../hoc/withMeals";
import { useState, useEffect } from "react";
import logo from "../images/logo1.jpg";

// import redux
import { useSelector, useDispatch} from "react-redux";
import { selectUser, logout} from "../features/userSlice";

function Meals({ meals, searchMeals}) {

    const navigate = useNavigate();

    // const getRoll = localStorage.getItem("myRoll");
    // const [CurrentUserRole, setCurrentUserRole] = useState("");
    const [isAdmin, setisAdmin] = useState(false);
    const mealsUnDelete = meals.filter((m) => m.isDelete === false);
    const [searchValue, setSearchValue] = useState("");

    const user = useSelector(selectUser); //get data from payload of Rerux
    // setCurrentUserRole(user.role);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user === null) {
           navigate("/login");
        } 
        setisAdmin(user.role === 'admin' ? true : false);
    }, []);

    // useEffect(() => {
    //     console.log(user)
    //     if (!sessionStorage.getItem("accessToken")) {
    //         navigate("/login");
    //     }
    //     setisAdmin(user.role === 'admin' ? true : false);
    // }, []);

    function handleLogout(e) {
        e.preventDefault();
        dispatch(logout());   //call logout of Redux to clear user
        navigate("/login");
    }

    function search() {
        searchMeals(searchValue);
    }

    function handleChanged(e) {
        setSearchValue(e.target.value);
    }

    const mealJsx = mealsUnDelete.map((m, index) => <MealItem meals={m} user={user} key={index} />);

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <nav className="navbar navbar-dark bg-primary">
                        <div className="col-md-2">
                            <img src={logo} alt={logo} style={{ padding: 1, width: 90, height: 90, borderRadius: 400 / 2 }} />
                        </div>
                        <div className="col-md-2">
                            {isAdmin && <Link to="/meals/add" style={{ color: "white" }}>Add a meal</Link>}
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-4">
                            <form className="form-inline my-2 my-lg-0">
                                <label><input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleChanged(e)}/></label>
                                <label><button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => search()}>Search</button></label>
                            </form>
                        </div>
                        <div className="col-md-2"><label>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(e) => handleLogout(e)}>
                                Logout
                            </button></label>
                        </div>

                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div className="row">

                            {mealJsx}

                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>

            </div>

        </>
    )
}

export default withMeals(Meals);