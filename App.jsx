import { useState,useEffect } from 'react'
import './App.css'

function App() {
const [data, setData]=useState([]);
const [cart, setCart]=useState([]);
const [keyword, setKeyword] = useState('');
let price = 0;
let num;
  useEffect(()=>{

    fetch("https://api.itbook.store/1.0/new").then(async(res)=>{
      const dat= await res.json();
      console.log(dat.books)
      setData(dat.books);
    })
  },[])




  return (
    <>
      <div className="search">
        <input type="text" placeholder="Search for a Book" 
        value={keyword} onChange={(event) => {setKeyword(event.target.value)}} />
      </div>
      
      <div className="flex-container">
          {data
          .filter(dat => {
            return keyword.toLowerCase() === '' ?dat:
            dat.title.toLowerCase().includes(keyword);})
          .map((d, index)=>(
            <div className="box" key={index}>
                <img src={d.image} w-100 alt={d.title}/>
                <h4>{d.title}</h4>
                <p>{d.price}</p>
                <button onClick={() =>{
                  setCart([...cart,d]);
                  price=0;
                  for(let i of cart){
                    console.log("Hello")
                    num = Number(i.price.slice(1));
                    price +=num;
                  }
                    console.log(price);
                }}>Add to Cart</button>
            </div>  
          ))
          }
        </div>
        <div className="Cart">
          <h1>Cart</h1>
          <div className="flex-container">
            {cart.map((d,index) =>
              <div className="box" key={index}>
                <img src={d.image} w-100 alt={d.title}/>
                <h4>{d.title}</h4>
                <p>{d.price}</p>
              </div>  
            )}
          </div>
          <p>Cost = {price}</p>
        </div>
    </>
  )
}

export default App
