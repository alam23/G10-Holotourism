const moment = require("moment");


const isDate = ( value ) => {

    if( !value ) { // si no hay un valor
        return false;
    }

    const fecha = moment( value );

    if( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }

};




module.exports = {
    isDate
}