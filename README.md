

## Instalacion del proyecto (Desarrollo) 
1. Renombrar archivo ``.env.template`` a ``.env``.

2. Realizar la instalacion en la terminal ejecutando el siguiente comando.
```bash
$   npm i --force
```

## Correr el proyecto 

```bash
$   npm run dev
```


### Migrar datos
1. Crear cliente prisma
```bash
$   npx prisma generate
```

2. Generar base de datos en MongoDB
```bash
$   npx prisma db push
```

3. Correr el seeder con datos iniciales desde el navevador o cliente introduciendo la ruta ``http://localhost:3000/api/seed``


## Instalacion del proyecto (Produccion) 
1. Renombrar archivo ``.env.template`` a ``.env``.

2. Realizar la instalacion en la terminal ejecutando el siguiente comando.
```bash
$   npm i --force
```

### Construir el proyecto

```bash
$   npm run build
```


### Migrar datos
1. Crear cliente prisma
```bash
$   npx prisma generate
```

2. Generar base de datos en MongoDB
```bash
$   npx prisma db push
```

### Correr en produccion
```bash
$   npm run start
```