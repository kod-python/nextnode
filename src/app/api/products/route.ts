import { NextResponse } from 'next/server';


let products = [
    { id: '1', name: 'Product 1', price: 100 },
    { id: '2', name: 'Product 2', price: 200 },
    // Add more products as needed
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