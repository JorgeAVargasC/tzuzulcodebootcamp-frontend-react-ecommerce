import { useContext, useEffect, useState } from "react";
import { get, post } from "../api";
import { MdOutlineBrokenImage } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { cartContext } from "../context/CartContext";
import { data } from "autoprefixer";

export default function Store() {
	const [products, setProducts] = useState([]);
	const [modal, setModal] = useState(false);
	const { setItems } = useContext(cartContext);

	const openModal = (id) => {
		setModal(products.find((product) => product._id === id));
	};

	const changeQuantity = (action, id) => {
		if (action === "add") {
			setProducts();
		} else if (action === "sub") {
		}
	};

	useEffect(() => {
		get("/api/products")
			.then(({ data }) => {
				let newProducts = data.map((d) => {
					return {
						...d,
						quantity: 1,
					};
				});
				setProducts(newProducts);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const add = (id) => {
		post("/api/cart/add", {
			idProduct: id,
			amount: 1,
		})
			.then((data) => {
				setItems({
					type: "UPDATE",
					payload: data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			{modal && (
				<div className="animate__animated animate__fadeIn fixed z-50 top-0 w-full min-h-screen flex justify-center items-center">
					<div
						className="absolute top-0 w-full min-h-screen bg-slate-900 opacity-70"
						onClick={() => setModal(false)}
					></div>

					<div className="animate__animated animate__fadeInDown z-50 w-3/4 md:w-1/3 bg-gray-900 rounded-lg">
						<MdClose
							className="absolute bg-emerald-500 rounded hover:bg-white hover:text-emerald-500 hover:cursor-pointer duration-300 w-8 top-2 right-2 h-auto"
							onClick={() => setModal(false)}
						/>
						{modal.images[0] ? (
							<img
								src={modal.images[0]}
								className="rounded-lg w-full h-64 object-cover"
								alt={modal.name}
							/>
						) : (
							<div className="flex flex-col justify-center items-center rounded-lg h-64 bg-emerald-500">
								<MdOutlineBrokenImage className="w-1/3 h-auto" />
								<p className="text-lg">Oops!</p>
							</div>
						)}

						<div className="flex flex-col p-4 h-full justify-between">
							<p className="mb-1">{modal.name}</p>
							<p className="mb-2 text-white bg-emerald-500 px-2 rounded-full w-fit">{`$ ${modal.price}`}</p>
							<p className="mb-2 max-h-32 text-slate-400 overflow-y-scroll pr-4 text-justify">
								{modal.description}
							</p>
							<button className="h-10 bg-emerald-500 border-emerald-500 border-2 rounded flex items-center justify-center hover:bg-emerald-600 duration-200 hover:border-emerald-600">
								Add to cart
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="w-11/12 mt-20 mb-20 flex flex-col justify-center items-center">
				<h1 className="mb-4">Store</h1>
				<div className="w-full grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
					{products.map((product) => {
						return (
							<div
								key={product._id}
								className="item rounded-lg flex flex-col justify-between bg-slate-800 hover:scale-105 duration-200"
							>
								{product.images[0] ? (
									<img
										src={product.images[0]}
										className="rounded-lg w-full h-40 object-cover hover:cursor-pointer"
										onClick={() => openModal(product._id)}
										alt={product.name}
									/>
								) : (
									<div
										onClick={() => openModal(product._id)}
										className="flex flex-col justify-center items-center rounded-lg h-40 bg-emerald-500 hover:cursor-pointer"
									>
										<MdOutlineBrokenImage className="w-1/3 h-auto" />
										<p className="text-lg">Oops!</p>
									</div>
								)}

								<div className="flex flex-col p-4">
									<p className="mb-1">{product.name}</p>
									<p className="mb-2 text-white bg-emerald-500 px-2 rounded-full w-fit">{`$ ${product.price}`}</p>
									{/* <div className="flex justify-between items-center mb-2">
										<button className="h-8 w-1/6 flex justify-center items-center bg-emerald-500 rounded hover:bg-emerald-600 duration-200">
											<AiOutlineMinus />
										</button>
										<p className="bg-slate-700 h-full mx-1 rounded w-4/6 flex justify-center items-center">
											{product.quantity}
										</p>
										<button className="h-8 w-1/6 flex justify-center items-center bg-emerald-500 rounded hover:bg-emerald-600 duration-200">
											<AiOutlinePlus />
										</button>
									</div> */}
									<button
										onClick={() => add(product._id)}
										className="h-10 bg-emerald-500 border-emerald-500 border rounded flex items-center justify-center hover:bg-emerald-600 duration-200 hover:border-emerald-600"
									>
										Add to cart
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
