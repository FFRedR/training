import "@fortawesome/fontawesome-free/css/all.min.css";
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