import { Repository } from 'typeorm';
import { Product } from '@/entities/product.entity';
import { CreateProductDto } from '@/common/dto/create-product.dto';
export declare class ProductsService {
    private repo;
    constructor(repo: Repository<Product>);
    create(dto: CreateProductDto): Promise<Product>;
    findOne(id: number): Promise<Product>;
    findAll(query?: {
        page?: number;
        limit?: number;
        q?: string;
        sort?: 'ASC' | 'DESC';
    }): Promise<{
        items: Product[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    update(id: number, dto: Partial<CreateProductDto>): Promise<Product>;
    remove(id: number): Promise<{
        success: boolean;
        id: number;
    }>;
}
