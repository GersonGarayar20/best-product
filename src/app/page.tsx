"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/product-grid";
import { mockProducts } from "@/components/mock-products";
import useUserData from "@/hook/useUserData";
import { handleLogout } from "./login/logout";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from 'next/navigation'


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockProducts>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const user = useUserData() // obtener el usuario autenticado
  const router = useRouter()


  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    // Filtrar productos basados en la búsqueda
    const results = mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
    setHasSearched(true);
  };

  const LogOut = async () => {

    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error cerrando sesión:', error.message)
    } else {
      console.log('Sesión cerrada correctamente')
      router.push('/login')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24 bg-gray-50">
      <div>Correo:{user?.email}</div>
      <button onClick={LogOut} className="bg-red-500 text-white px-4 py-2 rounded-md mb-4">
        Logout
      </button>
      {user?.avatar_url && <img src={`${user.avatar_url}`} alt="" width={100} />}

      <div className="w-full max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8">Buscador de Productos</h1>

        <div className="w-full flex flex-col items-center justify-center mb-12">
          <div className="relative w-full max-w-2xl">
            <div className="flex">
              <Input
                type="text"
                placeholder="Buscar productos..."
                className="w-full h-14 pl-4 pr-12 text-lg rounded-lg border-2 border-gray-300 focus-visible:ring-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button
                className="ml-2 h-14 px-6 bg-gray-800 hover:bg-gray-700"
                onClick={handleSearch}
              >
                <Search className="mr-2" />
                Buscar
              </Button>
            </div>
          </div>

          {hasSearched && searchResults.length === 0 && (
            <p className="mt-8 text-gray-600">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          )}
        </div>

        {hasSearched && searchResults.length > 0 && (
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4 text-left">
              Resultados de la búsqueda
            </h2>
            <ProductGrid products={searchResults} />
          </div>
        )}
      </div>
    </main>
  );
}
