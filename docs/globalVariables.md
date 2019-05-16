# Глобальны переменные


> В npm скриптах заранее проставлены эти переменные, через cli можно переопределить любую из них
 ~*Пример:*~ yarn build:ssr:dev --endpoint='http://localhost:5001'
* [watch](https://webpack.js.org/configuration/watch/#watch) -**default: 'false'** 
* [mode](https://webpack.js.org/concepts/mode/) -**default: 'development'** 'development' или 'production'
* public_url -**default: 'build'** - название дирректории где будет хранится ваш билд проекта 
* clientEntry -**default: './src/client/index.tsx'** - точка входа для клиента (это js с методом render/hydration)
* serverEntry -**default: './src/server/index.tsx'** - точка входя для сервера (это js с инициализацией express)
* ssrFetch -**default: true** отвечает за включение запросов graphql на сервере (стоит отключить если сервер не работает)
* port -**default: 3000** - номер порта на котором запускается express сервер
* endpointClient -*default: 'http://localhost:5001'* - адрес куда будут уходить graphql запросы из браузера 
(на production стоит ставить пустую строку чтобы браузер подставлял адрес домена) 
* endpointServer -*default: 'http://localhost:5001'* - адрес куда будут уходить graphql запросы из express сервера
* debug -**default: true** - от этого зависит код на выходе лио минифицирован либо нет.
