# 📝 Prueba Tecnica Culqi

**Cesar Torres** 

## 🚀 Tecnologías Usadas

- **NestJS**: Framework backend utilizado para estructurar el sistema de tokenización de manera modular y escalable.
- **Servicio AWS - EKS**: Plataforma de orquestación de contenedores usada para desplegar y escalar la aplicación en un entorno seguro y altamente disponible.
- **BD NoSQL - MongoDB**: Base de datos utilizada para almacenar los datos encriptados de tarjetas de crédito. Se aprovechó su funcionalidad de TTL (Time-To-Live) para que los documentos expiren automáticamente a los 15 minutos de ser creados.
- **Test - Jest / Postman**: Herramientas utilizadas para realizar pruebas unitarias y pruebas manuales de los endpoints durante el desarrollo.

## Arquitectura

Implementé Arquitectura Hexagonal en esta prueba porque me permite separar claramente la lógica de negocio del resto de la infraestructura. Esto facilita el mantenimiento del código, hace que las pruebas sean más sencillas y me permite cambiar tecnologías externas, como la base de datos o servicios externos sin afectar el núcleo de la aplicación. Además, mejora la escalabilidad y la organización del proyecto a largo plazo.

## Diseño

**Patrones de Diseño**:
Al haber usado Arquitectura Hexagonal eso con lleva a usar algunos patrones de diseño tales como:
- Repository Pattern: Me permitíó que la lógica de negocio trabaje con interfaces y no con detalles de persistencia.
- Dependency Inversion: Las capas internas no dependes de las capas de afuera. En mi caso, por ejemplo, la capa de Dominio no depende de la capa Aplicación o Infraestructura
- Strategy Pattern: Se aplica el patrón Strategy al desacoplar la lógica de negocio del repositorio de persistencia, permitiendo intercambiar fácilmente la implementación concreta (como MongoDB u otro almacenamiento) sin modificar el caso de uso.

## Instalación


## Demostración

Endpoint donde genera el token según los datos de las tarjetas

![Generate Token](https://github.com/cesarxa14/culqi-test/blob/master/assets/api_generate_token.png)

Endpoint donde se puede extraer el valor de la tarjeta de crédito mediante el token.

![Get Card Data](https://github.com/cesarxa14/culqi-test/blob/master/assets/api_get_card.png)


Documento en Mongo de la información encriptada de la tarjeta

![Mongo](https://github.com/cesarxa14/culqi-test/blob/master/assets/mongodata.png)


Cluster Desplegado en EKS AWS
![Cluster EKS](https://github.com/cesarxa14/culqi-test/blob/master/assets/cluster.png)


Imagenes desplegadas en ECR AWS

![ECR Images](https://github.com/cesarxa14/culqi-test/blob/master/assets/ecr.png)

Test Unitarios

![Test](https://github.com/cesarxa14/culqi-test/blob/master/assets/tests.png)


- List of blog posts from json-server

- Filter posts by title using an input box

- View detailed post pages using dynamic routing

- Uses @Input() and @Output() for communication between components

- Responsive UI styled with Bootstrap

- Angular animations applied between route transitions

- Redirect to homepage if the route does not exist

## 📦 Installation & Setup

Follow the steps below to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/cesarxa14/blog-cesar
cd blog-cesar
```

### 2. Install all dependencies 

```bash
npm install
```

### 3. Install json-server globally (if not already installed)

```bash
npm install -g json-server
```

### 4. Run the mock API server

```bash
json-server --watch db.json --port 3000
```
This will serve data from db.json at:
http://localhost:3000/posts

### 5. Run the Angular app

```bash
ng serve -o
```










