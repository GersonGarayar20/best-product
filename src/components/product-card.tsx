import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg py-0">
      <div className="aspect-square relative bg-gray-100">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="object-cover"
          />
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-2xl font-bold text-gray-800 mb-2">
          {product.price.toLocaleString("es-ES", {
            style: "currency",
            currency: "EUR",
          })}
        </p>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-gray-800 hover:bg-gray-700">
          Ver producto
        </Button>
      </CardFooter>
    </Card>
  );
}
