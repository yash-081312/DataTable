import React, { useState } from 'react';
import { DataTable, Column } from '../src';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const sampleProducts: Product[] = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, stock: 15 },
  { id: 2, name: 'Mouse', category: 'Electronics', price: 29.99, stock: 50 },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 199.99, stock: 8 },
  { id: 4, name: 'Coffee Mug', category: 'Kitchen', price: 12.99, stock: 100 },
  { id: 5, name: 'Wireless Headphones', category: 'Electronics', price: 89.99, stock: 25 },
];

const columns: Column<Product>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Product Name', dataIndex: 'name', sortable: true },
  { key: 'category', title: 'Category', dataIndex: 'category', sortable: true },
  { key: 'price', title: 'Price ($)', dataIndex: 'price', sortable: true },
  { key: 'stock', title: 'Stock', dataIndex: 'stock', sortable: true },
];

export function BasicUsageExample() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleRowSelect = (selected: Product[]) => {
    setSelectedProducts(selected);
    console.log('Selected products:', selected);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Product Inventory</h1>
      
      <DataTable
        data={sampleProducts}
        columns={columns}
        selectable={true}
        onRowSelect={handleRowSelect}
      />
      
      {selectedProducts.length > 0 && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
          <h3>Selected Products ({selectedProducts.length})</h3>
          <ul>
            {selectedProducts.map(product => (
              <li key={product.id}>
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
