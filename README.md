# 🍔 Choppi App
## 🌐 URLs públicas

**Frontend:** https://fe-choppi.vercel.app/

**Backend (API/Swagger):** https://be-choppi.onrender.com/api (Swagger disponible en https://be-choppi.onrender.com/api)

## 👤 Demo user

Puedes probar la aplicación con el siguiente usuario demo:

**Email:** demo@choppi.test

**Password:** Password123!

##  📂 Repositorios

**Backend:** https://github.com/BBrendaBaumann/be-choppi

**Frontend:** https://github.com/BBrendaBaumann/fe-choppi

## 🛠️ Setup local

## Backend

*Pasos para leavntar el backend*

Clonar el repositorio:

git clone https://github.com/BBrendaBaumann/be-choppi.git
cd be-choppi


Instalar dependencias:

npm install


Copiar archivo de variables de entorno:

cp .env.example .env


Configurar las variables de entorno en .env:

DB_HOST=localhost
DB_PORT=5432
DB_NAME=choppi
DB_USER=postgres
DB_PASSWORD=11071997

JWT_SECRET=supersecret
JWT_EXPIRES_IN=24h

PORT=3000
NODE_ENV=development

CORS_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost:3001,https://fe-choppi.vercel.app


Ejecutar migraciones:

npm run migration:run


Ejecutar seeds (opcional):

npm run seed


Levantar el backend:

npm run start:dev


Swagger estará disponible en http://localhost:3000/api

## Despliegue

Backend (Render)

El backend está desplegado en Render: https://be-choppi.onrender.com/

Build command: npm install && npm run build

Start command: npm run start:prod

Variables de entorno configuradas en Render incluyen  JWT_SECRET, PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, JWT_EXPIRES_IN, NODE_ENV, CORS_ORIGINS

## Notas

- CORS habilitado en backend para permitir conexiones desde el frontend desplegado.

- Usuario demo ya está en la base de datos con el email y password proporcionados.

- Las migraciones y seeds deben ejecutarse solo si quieres replicar la base de datos localmente.

***Muchísimas gracias por la oportunidad!***
