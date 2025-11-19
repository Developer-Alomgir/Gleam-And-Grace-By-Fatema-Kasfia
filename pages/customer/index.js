import Link from 'next/link'
import { products } from '../../lib/products'
export default function Customer(){
  return (
    <div className="container">
      <header className="header">
        <div className="brand">Gleam & Grace</div>
        <nav>
          <Link href="/"><a className="link">Home</a></Link>
        </nav>
      </header>

      <h2 style={{marginBottom:12}}>Customer Panel — Products</h2>
      <div className="grid">
        {products.map(p => (
          <div className="card" key={p.id}>
            <div className="product-image"></div>
            <div className="info">
              <h3 style={{margin:'8px 0'}}>{p.name}</h3>
              <div className="small">৳{p.price}</div>
              <p className="small">{p.category}</p>
              <div style={{marginTop:12,display:'flex',gap:8}}>
                <Link href={`/customer/${p.id}`}><a className="btn">View Details</a></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
