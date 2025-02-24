"use client";

import React, { useEffect, useState } from "react";
import { Product, fetchProducts,deleteProduct } from "@/lib/api";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const getAllProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error("Chyba při načítání produktů:", err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    getAllProducts();
  };
  const handleDelete = async (id?: number) => {
    if (!id) return;
    try {
      await deleteProduct(id);
      getAllProducts(); 
    } catch (error) {
      console.error("Chyba při mazání produktu:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-3 mt-8">
      {!showForm && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Seznam produktů</h2>
          <button className="btn btn-primary" onClick={handleAdd}>
            Přidat produkt
          </button>
        </div>
      )}
  
      {showForm && (
        <ProductForm
          product={selectedProduct}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)} 
        />
      )}
  
      {/* Seznam produktů */}
      {!showForm && (
        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}