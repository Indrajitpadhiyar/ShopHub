import { useState } from "react";
import { Search, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddProductDialog } from "@/components/AddProductDialog";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  image: string;
  description?: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "Electronics",
    price: 999.99,
    stock: 45,
    status: "In Stock",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "MacBook Air M2",
    category: "Electronics", 
    price: 1199.99,
    stock: 23,
    status: "In Stock",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Nike Air Max",
    category: "Clothing",
    price: 129.99,
    stock: 0,
    status: "Out of Stock",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Coffee Maker",
    category: "Home",
    price: 89.99,
    stock: 12,
    status: "Low Stock",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 67,
    status: "In Stock",
    image: "/placeholder.svg",
  },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const { toast } = useToast();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (newProduct: Omit<Product, 'id'> & { id: number }) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
    toast({
      title: "Product deleted",
      description: "The product has been removed from your inventory.",
    });
  };

  const getStatusBadge = (status: string, stock: number) => {
    if (status === "Out of Stock") {
      return <Badge variant="destructive">Out of Stock</Badge>;
    }
    if (status === "Low Stock") {
      return <Badge variant="secondary" className="bg-accent-warning/10 text-accent-warning">Low Stock</Badge>;
    }
    return <Badge variant="secondary" className="bg-accent-success/10 text-accent-success">In Stock</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Products
          </h1>
          <p className="text-muted-foreground">
            Manage your product inventory and pricing
          </p>
        </div>
        <AddProductDialog onAddProduct={handleAddProduct} />
      </div>

      {/* Filters & Search */}
      <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-background/50 border-border/50 focus:border-primary/50 transition-colors duration-300"
              />
            </div>
            <Button variant="outline" className="border-border/50 hover:bg-secondary/80">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>All Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow 
                  key={product.id} 
                  className="border-border/50 hover:bg-secondary/30 transition-colors duration-200"
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 rounded-lg border border-border/50">
                        <AvatarImage src={product.image} alt={product.name} />
                        <AvatarFallback className="rounded-lg bg-secondary text-xs">
                          {product.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="text-sm text-muted-foreground">ID: #{product.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-border/50 bg-background/50">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${
                      product.stock === 0 
                        ? "text-destructive" 
                        : product.stock < 20 
                        ? "text-accent-warning" 
                        : "text-foreground"
                    }`}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(product.status, product.stock)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:bg-secondary/80 transition-colors duration-200"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-border/50">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer text-destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}