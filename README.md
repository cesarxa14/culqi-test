# 📝 Prueba Tecnica Culqi

**Cesar Torres** 

Diseño de la aplicación

![propuesta](https://github.com/cesarxa14/culqi-test/blob/master/assets/propuesta.png)

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

Sigue estos pasos para correr el proyecto en tu máquina local usando Docker y MongoDB.

### 1. Clona el repositorio

```bash
git clone https://github.com/cesarxa14/culqi-test.git
cd culqi-test
```

### 2. Levanta MongoDB con Docker

```bash
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

MongoDB quedará accesible en mongodb://localhost:27017

### 3. Construye y ejecuta la imagen Docker de la aplicación

```bash
docker build -t culqi-test .
docker run -p 3000:3000 --env MONGODB_URI="mongodb://host.docker.internal:27017/culqi culqi-test
```

### 4. Verifica el arranque de la aplicación
Abre tu navegador y entra a http://localhost:3000

## Endpoints

### 1. Generate Token:
- Metodo: POST
- Header: x-api-key=pk_test_CESAR_KEY
- URI: http://localhost:3000/tokens 
- Body: 
```json
{
    "email": "cesar@gmail.com",
    "card_number": 4557789612518226,
    "cvv": 124,
    "expiration_month": "12",
    "expiration_year": "2028"
}
```

### 2. Get Card Data:
- Metodo: GET
- Header: x-api-key=pk_test_CESAR_KEY
- URI: http://localhost:3000/tokens?tokenData='token'
- Params: 
```json
tokenData=jz7aAhovA9yemEtJ
```
    
## Demostración

Endpoint donde genera el token según los datos de las tarjetas

![Generate Token](https://github.com/cesarxa14/culqi-test/blob/master/assets/api_generate_token.png)

<br>

Endpoint donde se puede extraer el valor de la tarjeta de crédito mediante el token.

![Get Card Data](https://github.com/cesarxa14/culqi-test/blob/master/assets/api_get_card.png)

<br>

Documento en Mongo de la información encriptada de la tarjeta

![Mongo](https://github.com/cesarxa14/culqi-test/blob/master/assets/mongodata.png)

<br>

Cluster Desplegado en EKS AWS
![Cluster EKS](https://github.com/cesarxa14/culqi-test/blob/master/assets/cluster.png)

<br>


Imagenes desplegadas en ECR AWS

![ECR Images](https://github.com/cesarxa14/culqi-test/blob/master/assets/ecr.png)

<br>

Test Unitarios

![Test](https://github.com/cesarxa14/culqi-test/blob/master/assets/tests.png)












