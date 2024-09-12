import { Product } from "./Product";

export interface ProdutosEstoqueProps {
    products: Product[];
    removeProduct: (id: number) => Promise<void>;
    updateProductAdd: (id: number) => Promise<void>;
    updateProductRemove: (id: number) => Promise<void>;
}
