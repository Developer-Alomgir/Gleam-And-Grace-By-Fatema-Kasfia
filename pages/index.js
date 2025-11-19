import Link from 'next/link'
import Head from 'next/head'
export default function Home(){
  return (
    <>
      <Head>
        <title>Gleam & Grace</title>
      </Head>
      <div className="container">
        <header className="header">
          <div className="brand">Gleam & Grace</div>
          <nav>
            <Link href="/customer"><a className="link">Customer Panel</a></Link>
          </nav>
        </header>

        <section style={{textAlign:'center',padding:40,background:'linear-gradient(135deg,#0b1220,#122331)',borderRadius:12,marginBottom:24}}>
          <h1 style={{margin:0}}>Welcome to Gleam & Grace</h1>
          <p className="small">Premium Jewelry & Lifestyle by Fatema Kasfia</p>
        </section>

        <section>
          <h2 style={{marginBottom:12}}>Featured Products</h2>
          <div style={{display:'flex',gap:12,overflowX:'auto'}}>
            <div className="card" style={{minWidth:260}}>
              <div className="product-image"></div>
              <div className="info">
                <h3 style={{margin:'8px 0'}}>Diamond Necklace</h3>
                <div className="small">৳15000</div>
              </div>
            </div>
            <div className="card" style={{minWidth:260}}>
              <div className="product-image"></div>
              <div className="info">
                <h3 style={{margin:'8px 0'}}>Gold Earrings</h3>
                <div className="small">৳8000</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
