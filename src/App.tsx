import { useState } from 'react'
import './App.css'

type Product = {
  id: number
  image: string
  name: string
  category: string
  description: string
  specification: string
  rating: number
  price: number
  quantity: number
}

const initialProducts: Product[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    name: 'Laptop Pro 15',
    category: 'Electronics',
    description: 'A lightweight laptop designed for productivity and creative work.',
    specification: '15.6-inch display, 16GB RAM, 512GB SSD, Intel Core i7',
    rating: 4.8,
    price: 1299,
    quantity: 2,
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    name: 'Smart Watch X',
    category: 'Accessories',
    description: 'A sleek smartwatch with health tracking and notifications.',
    specification: 'AMOLED display, GPS, heart rate sensor, 7-day battery life',
    rating: 4.6,
    price: 249,
    quantity: 4,
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    name: 'Office Chair',
    category: 'Furniture',
    description: 'Comfortable ergonomic chair that supports long work sessions.',
    specification: 'Adjustable lumbar support, breathable mesh, 360° swivel',
    rating: 4.7,
    price: 320,
    quantity: 3,
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=800&q=80',
    name: 'Noise Cancelling Headphones',
    category: 'Electronics',
    description: 'Premium audio experience with even pressure comfort.',
    specification: 'Wireless, 30-hour battery, active noise cancellation, fast charge',
    rating: 4.9,
    price: 399,
    quantity: 1,
  },
]

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isCartOpen, setIsCartOpen] = useState(false)

  const categories = ['All', ...new Set(products.map((product) => product.category))]
  const cartProducts = products.filter((product) => product.quantity > 0)
  const cartQuantity = cartProducts.reduce(
    (sum, product) => sum + product.quantity,
    0,
  )

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory)

  const adjustQuantity = (productId: number, delta: number) => {
    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(0, product.quantity + delta) }
          : product,
      ),
    )
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Welcome to Elisan's Store</h1>
        </div>

        <div className="header-actions">
          {cartQuantity > 0 && (
            <button
              type="button"
              className="cart-button"
              onClick={() => setIsCartOpen((isOpen) => !isOpen)}
              aria-expanded={isCartOpen}
              aria-controls="cart-panel"
            >
              {isCartOpen ? 'Close Cart' : `Cart (${cartQuantity})`}
            </button>
          )}
        </div>
      </header>

      {isCartOpen && cartQuantity > 0 && (
        <section className="panel cart-panel" id="cart-panel" aria-label="Shopping cart">
          <div className="section-header">
            <h2>Your Cart</h2>
            <strong>{cartQuantity} items</strong>
          </div>
          <ul className="cart-list">
            {cartProducts.map((product) => (
              <li key={product.id}>
                <span>{product.name} × {product.quantity}</span>
                <strong>₱{(product.price * product.quantity).toFixed(2)}</strong>
              </li>
            ))}
          </ul>
        </section>
      )}

      <main className="product-layout">
        <section className="panel product-panel">
          <div className="section-header">
            <h2>Products</h2>
            <label className="category-filter">
              <span>Choose category</span>
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <img className="product-image" src={product.image} alt={product.name} />
                <div className="product-details">
                  <div className="product-heading">
                    <div>
                      <span className="product-category">{product.category}</span>
                      <h3>{product.name}</h3>
                    </div>
                    <span className="product-rating" aria-label={`Rating ${product.rating} out of 5`}>
                      ★ {product.rating}
                    </span>
                  </div>
                  <p className="product-description">{product.description}</p>
                  <p className="product-specification">{product.specification}</p>
                  <div className="product-purchase">
                    <div>
                      <strong className="product-price">₱{product.price.toFixed(2)}</strong>
                      <small>Subtotal: ₱{(product.price * product.quantity).toFixed(2)}</small>
                    </div>
                    <div className="product-cart-actions">
                      <div className="quantity-controls">
                        <button
                          type="button"
                          className="qty-button"
                          onClick={() => adjustQuantity(product.id, -1)}
                          disabled={product.quantity === 0}
                          aria-label={`Decrease quantity for ${product.name}`}
                        >
                          −
                        </button>
                        <span>{product.quantity}</span>
                      </div>
                      <button
                        type="button"
                        className="add-to-cart-button"
                        onClick={() => adjustQuantity(product.id, 1)}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
