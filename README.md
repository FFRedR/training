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
$ npm run dev
```
**Особенности**
-----------------------------------
***
1.  Если не подгружаются какие-либо файлы(картинки, видео и пр.) подключенные в ``html`` в папку ``diist``.
    1.  Особенности подгрузки файлов: ``webpack`` лоадер ``html`` автоматом подгружает картинки только, если это тэг ``img``, для остальных случаев нужно использовать `require``, например
        ```
        div(style="background-image: url(${require(`./img/logo.png`)}))
        ```
2.  Внешние скрипты.
    1.  Все внешние скрипты можно устанавливать через ``npm i`` и подключать уже по месту требования, например
        ```
        import * as $ from "jquery";
        ```
        Скрипт будет подтянут из ``node_modules`` и записан в файл ``lib/chunk-commons.js``. При этом все скрипты из ``node_modules`` при статчином импорте через ``import from`` запишутся в `lib/chunk-commons.js``.

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
4.  Xnj,s
# 3. Работа с npm scripts
**Собрать проект**
-----------------------------------
***
```
$ npm run prod:build
```
**Быстрые команды**
-----------------------------------
***

Запустить ``lite server`` и watchers для ``sass``, ``pug``, ``typescript`` и ``cpx``:
```
$ npm run start:all
```
Запустить без ``typescript``:
```
$ npm run start:lspc
```
Запустить без ``lite server``:
```
$ npm run start:sptc
```
Запустить без ``typescript`` и ``lite server``:
```
$ npm run start:spc
```

**Одиночные команды**
-----------------------------------
***
1.  Запуск сервера отладки
    ```
    $ npm run lite
    ```
2. Команды ``sass/scss/css``:
    1.  Запуск watcher'а ``sass/scss``:
        ```
        $ npm run sass:w
        ```
    2.  Сборка ``sass/scss`` с компрессией:
        ```
        $ npm run sass:build
        ```
    3.  Сборка ``sass/scss`` с компрессией и префиксацией:
        ```
        $ npm run css:build
        ```
    4.  Запуск префиксера ``css``:
        ```
        $ npm run autoprefixer
        ```
3.  Команды ``pug``:
    1.  Запуск встроенного watcher'а ``pug`` (баги при добавлении новых файлов):
        ```
        $ npm run pug:w
        ```
    2.  Запуск стороннего watcher'а ``pug`` (без багов):
        ```
        $ npm run pug:w2
        ```
    3.  Сборка ``pug``:
        ```
        $ npm run pug:build
        ```
4.  Команды ``typescript``:
    1.  Запуск watcher'а ``typescript``:
        ```
        $ npm run tsc:w
        ```
    2.  Сборка ``typescript``:
        ```
        $ npm run tsc:build
        ```
5.  Остальные команды
    1.  Запуск watcher'а файлов ``html, png, jpg, svg, js, css, mp4, eot, ttf, woff, woff2, webm``:
        ```
        $ npm run cpx:w
        ```
    2.  Сборка файлов ``html, png, jpg, svg, js, css, mp4, eot, ttf, woff, woff2, webm``:
        ```
        $ npm run cpx:build
        ```