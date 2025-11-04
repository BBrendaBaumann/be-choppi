import { Repository } from 'typeorm';
import { Store } from '@/entities/store.entity';
import { CreateStoreDto } from '@/common/dto/create-store.dto';
import { UpdateStoreDto } from '@/common/dto/update-store.dto';
export declare class StoresService {
    private repo;
    private readonly logger;
    constructor(repo: Repository<Store>);
    create(dto: CreateStoreDto): Promise<Store>;
    findAll(query?: {
        page?: number;
        limit?: number;
        q?: string;
    }): Promise<{
        items: Store[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    findOne(id: number): Promise<Store>;
    update(id: number, dto: UpdateStoreDto): Promise<Store>;
    remove(id: number): Promise<{
        success: boolean;
        id: number;
    }>;
}
