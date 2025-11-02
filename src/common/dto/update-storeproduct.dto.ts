import { PartialType } from '@nestjs/swagger';
import { CreateStoreProductDto } from './create-storeproduct.dto';

export class UpdateStoreProductDto extends PartialType(CreateStoreProductDto) {}
