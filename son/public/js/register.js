let form = document.getElementById('register');
let email = form['email'];
let username = form['username'];
let password = form['password']
let retypepassword = form['retypepassword'];

class FormHighlighter {
    constructor(form) {
        this.form = form;
        this.borders = {};
        for(let input of form) {
            this.borders[input.name] = input.style.border;
        }
    }
    highlightInputs(inputNames) {
        for(let inputName of inputNames) {
            this.form[inputName].style.border = "3px solid red";
        }
    }
    restoreInputBorders() {
        for(let input of this.form) {
            if(input)
            input.style.border = this.borders[input.name];
        }
    }

}

let fv = new FormHighlighter(form);


form.addEventListener('submit',(event) => {
    event.preventDefault();
    let formData = new FormData();
    for(let input of form) {
        if (input.name) {
            formData.append(input.name,input.value);
        }  
    }
    let hhr = new XMLHttpRequest();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            fv.restoreInputBorders();
            document.getElementById('errorMessages').textContent = '';
            if(this.status == 200) {
                console.log('OKOKOK');
                window.location.href = "/login";
            }
            else if(this.status == 422) {
                let errorMessage = '';
                let inputErrors = [];
                function buildErrorMessage(errors) { //WILL BE CHANGED--------
                    errors.forEach(err => {
                        if(err.param.includes('+')) {
                            err.param.split('+').forEach(erParam => inputErrors.push(erParam))
                        }
                        else {
                            inputErrors.push(err.param);
                        }
                        errorMessage += err.msg;
                    })
                }
                let errors = JSON.parse(this.response);
                buildErrorMessage(errors);
                fv.highlightInputs(inputErrors);

                document.getElementById('errorMessages').textContent = errorMessage;

            }
            else console.log('500 Internal Error');
        }
    };
    xhttp.open("POST", "/api/accounts/signupviaform", true);
    xhttp.send(formData);
});