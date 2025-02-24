import React, { useState } from "react";
import { Product } from "@/lib/api";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id?: number) => void;
}

export default function ProductList({
  products,
  onEdit,
  onDelete,
}: ProductListProps) {
  const [sortKey, setSortKey] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Řazení produktů
  const sortedProducts = [...products].sort((a, b) => {
    let valueA = a[sortKey as keyof Product];
    let valueB = b[sortKey as keyof Product];

    if (sortKey === "createdAt" || sortKey === "updatedAt") {
      valueA = new Date(valueA as string).getTime();
      valueB = new Date(valueB as string).getTime();
    }

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }

    return 0;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <button className="btn" onClick={() => handleSort("name")}>
          Řadit podle názvu{" "}
          {sortKey === "name" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button className="btn" onClick={() => handleSort("price")}>
          Řadit podle ceny{" "}
          {sortKey === "price" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button className="btn" onClick={() => handleSort("stockQuantity")}>
          Řadit podle skladu{" "}
          {sortKey === "stockQuantity" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button className="btn" onClick={() => handleSort("createdAt")}>
          Řadit podle data přidání{" "}
          {sortKey === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button className="btn" onClick={() => handleSort("updatedAt")}>
          Řadit podle data úpravy{" "}
          {sortKey === "updatedAt" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
      </div>

      {/* Seznam produktů */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => onEdit(product)}
            onDelete={() => onDelete(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
