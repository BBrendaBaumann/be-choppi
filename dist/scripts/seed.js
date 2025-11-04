"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("../src/data-source");
const user_entity_1 = require("../src/entities/user.entity");
const store_entity_1 = require("../src/entities/store.entity");
const product_entity_1 = require("../src/entities/product.entity");
const store_product_entity_1 = require("../src/entities/store-product.entity");
async function run() {
    const ds = data_source_1.default;
    await ds.initialize();
    const usersRepo = data_source_1.default.getRepository(user_entity_1.User);
    await usersRepo.clear();
    const userRepo = ds.getRepository(user_entity_1.User);
    const storeRepo = ds.getRepository(store_entity_1.Store);
    const productRepo = ds.getRepository(product_entity_1.Product);
    const spRepo = ds.getRepository(store_product_entity_1.StoreProduct);
    console.log('Seeding...');
    const demo = userRepo.create({ email: 'demo@choppi.test', password: 'Password123!', isAdmin: true });
    await userRepo.save(demo);
    const s1 = storeRepo.create({ name: 'Choppi Central', description: 'Store central' });
    const s2 = storeRepo.create({ name: 'Choppi Norte', description: 'Sucursal norte' });
    const s3 = storeRepo.create({ name: 'Choppi Sur', description: 'Sucursal sur' });
    await storeRepo.save([s1, s2, s3]);
    const productNames = [
        'Arroz 1kg', 'Fideos 500g', 'Aceite 1L', 'Azúcar 1kg', 'Leche 1L', 'Huevos 12u', 'Pan 500g',
        'Café 250g', 'Té 100g', 'Manteca 200g', 'Queso 200g', 'Jugo 1L'
    ];
    const products = productNames.map(n => productRepo.create({ name: n, description: `${n} description` }));
    await productRepo.save(products);
    for (const s of [s1, s2, s3]) {
        for (const p of products) {
            const price = Number((Math.random() * 1000 + 100).toFixed(2));
            const stock = Math.floor(Math.random() * 50);
            const sp = spRepo.create({ store: s, product: p, price, stock });
            await spRepo.save(sp);
        }
    }
    console.log('Seed finished.');
    await ds.destroy();
}
run().catch(err => {
    console.error(err);
    process.exit(1);
});
