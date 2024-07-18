import { NextResponse } from 'next/server';

let products = [
  { id: '1', name: 'Product 1', price: 100 },
  { id: '2', name: 'Product 2', price: 200 },
 
];

const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };
  

const updateProductById = (id: string, data: { name?: string; price?: number }) => {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...data };
    return products[index];
  };
  
  const deleteProductById = (id: string) => {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) return false;
    products.splice(index, 1);
    return true;
  };



export const GET = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const product = getProductById(id);

  if (!product) {
    return NextResponse.json({ error: `Product with ID ${id} not found.` }, { status: 404 });
  }

  return NextResponse.json(product);
};




export const PATCH = async ({ params }: { params: { id: string } }, req: Request) => {
  const { id } = params;
  const body = await req.json();
  const { name, price, delete: deleteFlag } = body;

  const product = getProductById(id);

  if (!product) {
    return NextResponse.json({ error: `Product with ID ${id} not found.` }, { status: 404 });
  }

  if (deleteFlag) {
    const deletedProduct = deleteProductById(id);
    if (!deletedProduct) {
      return NextResponse.json({ error: 'Failed to delete product.' }, { status: 500 });
    }
    return NextResponse.json({ message: 'Product deleted successfully.' });
  }

  if (name && typeof name !== 'string') {
    return NextResponse.json({ error: 'Invalid name.' }, { status: 400 });
  }
  if (price && typeof price !== 'number') {
    return NextResponse.json({ error: 'Invalid price.' }, { status: 400 });
  }

  const updatedProduct = updateProductById(id, { name, price });

  if (!updatedProduct) {
    return NextResponse.json({ error: 'Failed to update product.' }, { status: 500 });
  }

  return NextResponse.json(updatedProduct);
};

