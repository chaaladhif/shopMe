import { useEffect, useState } from "react";
import Banner from "../../components/banner/index";
import "./style.css";
import Product from "../../components/product/index";
import Favorie from "../../components/favorie/index";
function Home({ searchTerm, favorites, setFavorites, cart, setCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("/datas.json")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error loading products:", error));
    }, []);

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleAddToCart = (product) => {
        setCart([...cart, product]);
        setFavorites(favorites.filter((fav) => fav.id !== product.id));
    };
    return (
        <div>
            <Banner />
            <div className="products">
                {filteredProducts.map((product) => (
                    <Product
                        key={product.id}
                        imageURL={product.imageUrl}
                        title={product.title}
                        price={product.price}
                        product={product}
                        onFavoriteToggle={(product) => {
                            if (
                                favorites.some((fav) => fav.id === product.id)
                            ) {
                                setFavorites(
                                    favorites.filter(
                                        (fav) => fav.id !== product.id
                                    )
                                );
                            } else {
                                setFavorites([...favorites, product]);
                            }
                        }}
                        isFavorite={favorites.some(
                            (fav) => fav.id === product.id
                        )}
                    />
                ))}
            </div>
            <Favorie
                favorites={favorites}
                handleAddToCart={handleAddToCart} // Passer handleAddToCart en tant que prop
            />{" "}
        </div>
    );
}

export default Home;
