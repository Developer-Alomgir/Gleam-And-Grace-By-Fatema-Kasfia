import { useRouter } from 'next/router'
import Link from 'next/link'
import { products } from '../../lib/products'
export default function ProductPage(){
  const router = useRouter()
  const { id } = router.query
  const product = products.find(p => String(p.id) === String(id))

  if (!product) {
    return <div className="container"><p>Product not found</p><p><Link href="/customer"><a className="link">Back to products</a></Link></p></div>
  }

  return (
    <div className="container">
      <header className="header">
        <div className="brand">Gleam & Grace</div>
        <nav>
          <Link href="/customer"><a className="link">Back</a></Link>
        </nav>
      </header>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,alignItems:'start'}}>
        <div className="card">
          <div className="product-image" style={{height:320}}></div>
        </div>
        <div>
          <h1 style={{marginTop:0}}>{product.name}</h1>
          <p className="small">Category: {product.category}</p>
          <h2>৳{product.price}</h2>
          <p style={{marginTop:16}}>{product.description}</p>

          <div style={{marginTop:20}}>
            <button className="btn" onClick={() => { alert('Order placed (demo)'); }}>Order Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}
