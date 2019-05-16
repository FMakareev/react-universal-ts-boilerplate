# Маршрутизация


## Decorators

* GetCurrentRouteHOC - метод получает пропсы, находит по текущему location.pathname 
подходящий компонент в объекте маршрутов и передает его в children
* DefaultComponentDecorator - изначально метод просто обычный декоратор который 
принимает на вход компонент и возвращает его между этими действиями мы можем его изменять. 
В версии по умолчанию декоратор добавляет асинхронный загрузчик компонента.

## Helpers

* CreateRouterConfig - главный метод, он формирует объект маршрутизации из модулей
* CreateRoutes - этот метод по сути трансформирует наши маршруты в удобный для нас вид, тут же на асинхронные 
страницы вешается обработчик асинхроннойзагрузки
* transformModulesObjectToArray - преобразует объект модулей в массив объектов
* DefaultRoutesDecorator - это компонент который сортирует  маршруты модулей по отдельным слоям
* startsWithSegment - метод проверяет есть ли в начале указанная подстрока, 
удобно при определении к какому лейауту относится маршрут

## Components

* ErrorComponent - компонент по умолчанию для вывода ошибки при асинхронной загрузке страницы
* PageNotFound - обычная страница 404
* LoadingComponent - компонент прелоадер асинхронной загрузки страницы
* DefaultLayoutController -  компонент находит к какому лейауту принадлежит 
текущий маршрут и возвращает его компонент + все данные маршрутизации

## Shared

Тут 4 базовых константы для названий лейаутов:

* root
* app
* admin
* auth

## Рецепты 

### Кастомные слои (layout)

Создаем конфиг для слоев:

```js
const customLayoutConfig = {
  'custom_layout': {
    layout: 'custom_layout',
    path: '/',
    component: GetCurrentRouteHOC(CustomLayout),
    routes: [],
  },
};
```

где:

* 'custom_layout' - название вашего лейаута, по нему сортируются маршруты
* CustomLayout - ваш компонент для лейаута

Далее передаем конфиг в `CreateRouterConfig`:

```js
const customLayoutConfig = {
  'custom_layout': {
    layout: 'custom_layout',
    path: '/',
    component: GetCurrentRouteHOC(CustomLayout),
    routes: [],
  },
};
const routes = CreateRouterConfig({
  modules: transformModulesObjectToArray(Modules),
  routesDecorator: (routes) => DefaultRoutesDecorator(routes, customLayoutConfig)
});
```

### Кастомная страница 404

to be continued...

### Проверка доступа к лейауту

to be continued...

### Проверка доступа к маршруту

to be continued...

### Проверка доступа к маршруту

to be continued...
