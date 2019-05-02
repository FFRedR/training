import { FormValidation as vf } from './form-validate';
import { Navigation as nv } from './navigation';
export function MainApp() {
    vf.init();
    nv.init();
    console.log('red')
    return "main application initiated";
}


