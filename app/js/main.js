import {app} from './controller'

if( document.readyState !== 'loading' ) {
    app.init();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        app.init();
    });
}