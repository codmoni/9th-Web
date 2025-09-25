import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
        <nav className="navbar">
            <Link to = "/">HOME</Link>
            <Link to = "/popular">인기 영화</Link>
            <Link to = "/now-playing">상영 중</Link>
            <Link to = "/upcoming">개봉 예정</Link>
            <Link to = "/top-rated">평점 높은</Link>
        </nav>
        </>
    )
}

export default Navbar;