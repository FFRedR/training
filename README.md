# Introduction
TODO: Шаблон проектов.

# Getting Started
1.	Installation process
2.	Usage
3.	Latest releases
4.	API references

# 1. Installation process
```
$ git clone https://miralab.visualstudio.com/_git/project%20templates
```
Установка зависимостей:
```
$ npm i
```

# 2. Usage
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
