import { Store } from '@/entities/store.entity';
import { StoresService } from './stores.service';
import { CreateStoreDto } from '@/common/dto/create-store.dto';
import { UpdateStoreDto } from '@/common/dto/update-store.dto';
export declare class StoresController {
    private svc;
    private readonly logger;
    constructor(svc: StoresService);
    findAll(page?: number, limit?: number, q?: string): Promise<{
        items: Store[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    findOne(id: number): Promise<Store>;
    create(dto: CreateStoreDto): Promise<Store>;
    update(id: number, dto: UpdateStoreDto): Promise<Store>;
    remove(id: number): Promise<{
        success: boolean;
        id: number;
    }>;
}
