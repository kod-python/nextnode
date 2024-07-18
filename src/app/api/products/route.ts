import { NextResponse } from 'next/server';


let products = [
    { id: '1', name: 'Product 1', price: 100 },
    { id: '2', name: 'Product 2', price: 200 },
    { id: '3', name: 'Product 3', price: 300 },
    { id: '4', name: 'Product 4', price: 400 },
    { id: '5', name: 'Product 5', price: 500 },
    { id: '6', name: 'Product 6', price: 600 },
  
  ];


const getAllProducts = () => {
    return products
}


const createProduct = (data: { id: string; name: string; price: number }) => {
    products.push(data);
    return data;
  };
  

export const GET = async () => {
  const products = getAllProducts();
  return NextResponse.json(products);
};


export const POST = async (req: Request) => {
    const body = await req.json();
    const { id, name, price } = body;
  
    if (!id || !name || typeof price !== 'number') {
      return NextResponse.json({ error: 'Invalid data.' }, { status: 400 });
    }
  
    const newProduct = createProduct({ id, name, price });
    return NextResponse.json(newProduct, { status: 201 });
  };