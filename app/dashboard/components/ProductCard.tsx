"use client";

import React from "react";
import { Product } from "@/lib/api";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id?: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>

        <p className="font-semibold mt-2">
          Cena: {product.price} Kč | Skladem: {product.stockQuantity} ks
        </p>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-sm" onClick={() => onEdit(product)}>
            Upravit
          </button>

          <button
            className="btn btn-sm btn-error"
            onClick={() => onDelete(product.id)}
          >
            Smazat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
