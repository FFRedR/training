# Introduction
TODO: Шаблон проектов.

# Getting Started
1.	Installation process
2.	Работа с ``webpack``
3.  Работа с ``npm`` scripts
4.	Latest releases
5.	API references

# 1. Installation process
```
$ git clone https://miralab.visualstudio.com/project%20template%20W/_git/project%20template%20W
```
Установка зависимостей:
```
$ npm i
```

# 2. Работа с webpack
**Собрать проект**
-----------------------------------
***
Комманда сборки ``webpack``:
```
$ npm run build
```
**Режим разработчика**
-----------------------------------
***
Запуск ``dev`` режима ``webpack`` (В этом режиме ниже описанные комманды уже не требуются)
```
$ npm run serve
```
**Особенности**
-----------------------------------
***
1.  Встроенные изображения и файлы в ``pug``.
    1.  Подключение ``img``:
        ```
        img(src=require("./img/logo.png"), alt="")
        ```
    2.   Подключение как ``background-image``:
        ```
        div(style="background-image: url(" + require('./img/logo.png') + ")")
        ```
2.  Внешние скрипты.
    1.  Все внешние скрипты можно устанавливать через ``npm i`` и подключать уже по месту требования, например
        ```
        import * as $ from "jquery";
        ```
        Скрипт будет подтянут из ``node_modules`` и записан в файл ``lib/chunk-vendors.js``. При этом все скрипты из ``node_modules`` при статчином импорте через ``import from`` запишутся в `lib/chunk-commons.js``.

3.  Чтобы подключить новые страницы, глобальные стили и скрипты используйте ``import`` в файле ``app.js``, например
    ```
    /**
    * fonts
    */
    import './fonts/OpenSans/stylesheet.css';
    import './fonts/Roboto/stylesheet.css';

    /**
    * main style
    */
    import './scss/main.scss';

    /**
    * script
    */
    import { MainApp } from './ts/main';

    /**
    * pages
    */
    import './index.pug';
    import './contacts.pug';
    import './products.pug';
    ```
**Динамический импорт**
-----------------------------------
***
1.  Динамический импорт позволяет подгружать модули по мере необходимости, например
    ```
    /// file: slidebars.js
    export var slidebars = function () {
        //////////any code///////////
    }

    /// file: navigation.js
    import(/* webpackChunkName: "slidebars" */"../lib/js/slidebars.js").then((importStatement: any) => {
        controller = new importStatement.slidebars();
        //////////any code///////////
    });
    ```
    Здесь ``webpackChunkName`` задает имя выходного файла для ``slidebars.js``. В данном случае выходным файлом будет ``dist/lib/chunk-slidebars.js``.

2.  Так же модули можно загружать заранее, чтобы во время выполнения кода, модуль уже был загружен.
    ```
    import(/* webpackPrefetch: true, webpackChunkName: "slidebar" */"../lib/js/slidebars.js");
    ```
    При этом сам модуль подключится в ``head`` отдельным тегом.