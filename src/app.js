/**
 * fonts
 */
import './fonts/OpenSans/stylesheet.css';

/**
 * main style
 */
import './scss/main.scss';

/**
 * script
 */
import { MainApp } from './ts/main';
console.info(MainApp())
window.$ = $;

/**
 * pages
 */
import './index.pug';