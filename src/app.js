/**
 * fonts
 */
import "@fortawesome/fontawesome-free/css/all.min.css";
import './fonts/OpenSans/stylesheet.css';
import './fonts/Roboto/stylesheet.css';

/**
 * style lib
 */
import "hamburgers/dist/hamburgers.css";
import "jquery.mmenu/dist/jquery.mmenu.all.css";

/**
 * script lib
 */
import "jquery.mmenu";
import "jquery.mmenu/dist/addons/fixedelements/jquery.mmenu.fixedelements";


/**
 * main style
 */
import './scss/main.scss';

/**
 * main script
 */
import { MainApp } from './ts/main';
console.info(MainApp())
window.$ = $;