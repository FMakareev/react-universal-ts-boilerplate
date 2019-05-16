
# Линтинг и форматирование

## tslint

## prettier

## JSCPD 

JSCPD - утилита для поиска copy-past в коде. В npm скриптах проекта подключена следующая команда:

```
npx jscpd ./src --ignore "**/node_modules/**,**/build/**,**/dist/**" -r html,console -o "./jscpd-report/"
```

- --ignore - какие дирекории будут проигнорированы
- -r - в каком формате получить отчет
- -o - директория для отчетов
