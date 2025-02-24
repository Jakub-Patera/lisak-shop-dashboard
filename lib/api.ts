export interface Product {
  id?: number;
  name: string;
  price: number;
  stockQuantity: number;
}

const BASE_URL = "http://localhost:3000";

// GET /products
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
  if (!res.ok) {
    const errText = await res.text();
    console.error("Chyba při načítání:", errText);
    throw new Error(`Failed to fetch products. Status: ${res.status}`);
  }
  return res.json();
}

// POST /products
export async function createProduct(product: Product): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product), // posíláme stockQuantity
  });
  if (!res.ok) {
    const errText = await res.text();
    console.error("Chyba při vytváření produktu:", errText);
    throw new Error(`Failed to create product. Status: ${res.status}`);
  }
  return res.json();
}

// PUT /products/:id
export async function updateProduct(
  id: number,
  product: Product
): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product), // posíláme stockQuantity
  });
  if (!res.ok) {
    const errText = await res.text();
    console.error("Chyba při úpravě produktu:", errText);
    throw new Error(`Failed to update product. Status: ${res.status}`);
  }
  return res.json();
}

// DELETE /products/:id
export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/products/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const errText = await res.text();
    console.error("Chyba při mazání produktu:", errText);
    throw new Error(`Failed to delete product. Status: ${res.status}`);
  }
}

// Příklad: PATCH /products/:id/hide nebo PUT s isActive=false
export async function hideProduct(id: number): Promise<Product> {
  // Pokud je endpoint jiný, upravte ho
  const res = await fetch(`${BASE_URL}/products/${id}/hide`, {
    method: "PATCH",
  });
  if (!res.ok) {
    const errText = await res.text();
    console.error("Chyba při skrývání produktu:", errText);
    throw new Error(`Failed to hide product. Status: ${res.status}`);
  }
  return res.json();
}
