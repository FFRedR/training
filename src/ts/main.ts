
declare let Swiper: any;
import { FormValidation as vf } from './form-validate';
import { Navigation as nv } from './navigation';
export function MainApp() {
    vf.init();
    nv.init();
    return "main application initiated";
}


