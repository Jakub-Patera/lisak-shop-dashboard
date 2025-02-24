"use client";

import React, { useEffect, useState } from "react";
import { Product, createProduct, updateProduct } from "@/lib/api";

interface Props {
  product: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSuccess, onCancel }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stockQuantity, setStockQuantity] = useState<number>(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStockQuantity(product.stockQuantity);
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (product && product.id) {
        // Úprava existujícího produktu
        await updateProduct(product.id, {
          ...product,
          name,
          price,
          stockQuantity,
        });
      } else {
        // Vytvoření nového produktu
        await createProduct({
          name,
          price,
          stockQuantity,
        });
      }
      onSuccess();
    } catch (err) {
      console.error("Chyba při ukládání produktu:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-base-100 rounded shadow flex flex-col gap-4 max-w-xl"
    >
      <h2 className="text-xl font-bold">
        {product ? "Upravit produkt" : "Nový produkt"}
      </h2>

      <div className="form-control">
        <label className="label font-semibold">Název produktu:</label>
        <input
          type="text"
          className="input input-bordered"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-control">
        <label className="label font-semibold">Cena:</label>
        <input
          type="number"
          className="input input-bordered"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>

      <div className="form-control">
        <label className="label font-semibold">Počet ks skladem:</label>
        <input
          type="number"
          className="input input-bordered"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(Number(e.target.value))}
          required
        />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary">
          Uložit
        </button>
        <button type="button" className="btn" onClick={onCancel}>
          Zrušit
        </button>
      </div>
    </form>
  );
}
