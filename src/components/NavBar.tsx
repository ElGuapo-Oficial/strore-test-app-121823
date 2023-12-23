import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <Link to='/'><button>Home</button></Link>
            <Link to='/products'><button>Products</button></Link>
            <Link to='/cart'><button>Cart</button></Link>
            <Link to='/checkout'><button>Checkout</button></Link>
        </nav>
    )
}

export default NavBar;