import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<nav>
			<ul>
				<li><Link to={"/"}>Home</Link></li>
				<li><Link to={"/login"}>Login</Link></li>
				<li><Link to={"/signup"}>Sign Up</Link></li>
			</ul>
		</nav>
	);
}
