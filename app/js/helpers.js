   let throttle = function(func, ms){
    let isThrottled = false, 
      savedArgs, 
      savedThis;



    function wrapper () {
      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;


        return;
      }

      // console.log(arguments);

      func.apply(this, arguments);

      isThrottled = true;

      setTimeout(function(){
        isThrottled = false;
        if(savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms)
    }
    return wrapper;
  }


  let serialize = (form) => {

    // Setup our serialized data
    let serialized = [];

    // Loop through each field in the form
    for (var i = 0; i < form.elements.length; i++) {

        let field = form.elements[i];



        // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
        if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

        // If a multi-select, get all selections
        if (field.type === 'select-multiple') {
            for (let n = 0; n < field.options.length; n++) {
                if (!field.options[n].selected) continue;
                serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
            }
        }

        // Convert field data to a query string
        else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {

            serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
        }
    }



    return serialized.join('&');

};



  export {
    throttle,
    serialize
  }