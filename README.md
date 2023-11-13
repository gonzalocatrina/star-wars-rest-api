## Description

Challenge para perfil backend:
Implementar una RESTful API que tome la información de la API de Star Wars (https://swapi.dev/).
Las techs a utilizar son NodeJS, queda a libre elección la herramienta para armar el API.

Objetivos:
1. Crear una sincronización de información que corra en un cron para mandar los datos a una base de datos propia usando MongoDB. (Se puede usar cualquier ORM/ODM).
2. Las entidades que se deberian implementar son:
* People
* Films
* Starships
* Planets
3. Solo se deben implementar endpoints de obtención de información.
4. Los 4 endpoints de listado de elementos deberia permitirme filtrar la informacion por al menos un atributo.
5. Implementar los tests unitarios.

Criterios de Evaluación:
Este test va a estar evaluado de la siguiente manera:
1. Funcional: ¿La aplicación cumple con todos los puntos?
2. Code Quality: ¿El código se encuentra bien estructurado, limpio y es escalable?
3. Testing: ¿Todos los test unitarios del backend están desarrollados para realmente probar la funcionalidad?

## Installation

```bash
$ npm install

$ npm run build
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

