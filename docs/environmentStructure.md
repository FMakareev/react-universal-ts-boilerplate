# Структура проекта

* .configs 
    * jest - конфигурации для jest
    * loaders - загрузчики для webpack
    * setupTests.js
    * webpack.client.js - конфиг для сборки клиентского кода
    * webpack.server.js - конфиг для сборки серверного кода
* .scripts - скрипты для запуска проекта
    * csr - client side render
    * ssr - server side render
* .storybook - конфигурация storybook
* .tools - вспмомошательные утилиты дя сборщика
* .dist - билд проекта
* docs - документация сборки
* jscpd-report - отчеты о copy-past от jscpd
* src - исходники проекта
    * apollo - [Apollo client](https://www.apollographql.com/)
        * helpers - вспомогательные методы
        * interfaces - интерфейсы описывающие gql типы и методы
        * mocks - mock resolvers, методы для создания своих заглушек на запросы и мутации
          * query
          * mutation 
        * index.client.tsx - Browser config
        * index.server.tsx - Server config
        * index.mock.tsx - mock client для разработки без сервера
        * schema.graphql - схема описывающая структуру API, должна соответствевать бекенду 
        * graphql.d.ts - заголовочный файл
        * package.json
        * ...
    * assets - картинки, шрифты, прочая статика
        * ...
    * client - Точка входа клиента
        * index.tsx 
        * index.html - шаблон html страницы, необходим для сборки проекта в режиме csr 
        * package.json
    * components - Набор компонентов
        * ...
        * index.tsx - компоненты обязательно прописываются сюда и импортирутся отсуда
        * package.json
    * containers - контейнеры приложения для клиента и сервера, в них добавляем новые провайдеры по необходимости
        * AppProvidersClient.tsx
        * AppProvidersServer.tsx
    * modules - Модули 
        * templateEmail - модуль с шаблонами html писем
        * authorization - шаблон модуля пользователя
        * home - шаблон модуля главной страницы
        * ...
        * index.tsx
        * package.json
    * server - Точка входа для сервера
        * renderers - методы рендера react на сервере
            * renderApp.tsx - главный метод, его можно переиспользовать в других методах 
            * renderEmailTemplate.tsx - генератор статики для email рассылки
        * index.tsx - точка входа для сервера
        * template.tsx - html шаблон, используется в renderApp.tsx
        * package.json
    * shared - директория содержит код который может быть использован абсолютно в любом месте приложения 
    например: константы, конфигурация роутера и т.д.
    * store - redux
        * reducers - редьюссеры
            * [название модуля]
                * actions.tsx - экшены модуля
                * reducers.tsx - редьюссер
                * types.tsx - типы модуля
            * index.tsx - сборка всех редьюсеров
        * index.tsx - инициализация стора
        * types.tsx - типы для redux
    * styles
        * styleProperty - функции пгенерирующие для css свойств styled-components методы
        * variants - варианты оформления компонентов
        * GlobalStyle.tsx - глобальные стили подробнее [тут](https://www.styled-components.com/docs/api#createglobalstyle) 
        * StyledThemeProvider.tsx - провайдер styled-components с темой
    * translations - словари приложения, используется [react-intl](https://github.com/yahoo/react-intl) + [redux](https://github.com/ratson/react-intl-redux)
        * [ключ языка].json - словарь
        * languages.json - список языков
    * utils
* stories - storybook истории 
* stories-static - статика storybook
* [.editorconfig](https://editorconfig.org/)
* [.gitignore](https://git-scm.com/docs/gitignore)
* [.prettierrc.js](https://prettier.io/docs/en/configuration.html)
* [babel.config.js](https://babeljs.io/docs/en/configuration) - конфиг обеспечивающий работу скриптов сборки проекта
* ca-config.json - конфиг содержит переменные окружения для разных вариаций запуска проекта через npm скрипты
* jest.config.js - общий конфиг jest для проекта, обеспечивает работу unit тестов react компонент
* jest.sb.config.js - конфиг для тестирования скриншотами историй storybook
* [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 
* [tslint.json](https://palantir.github.io/tslint/usage/configuration/)
