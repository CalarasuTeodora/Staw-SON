let form = document.getElementById('login');
let email = form['email'];
let password = form['password']

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
    console.log(1);
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
            if(this.status == 303) {
                console.log('OKOKOK');
                window.location.href = "/";
            }
            else if(this.status == 401) {
                let errorMessage = '';
                let error = JSON.parse(this.response);
                errorMessage = error.msg;
                fv.highlightInputs([error.param]);

                document.getElementById('errorMessages').textContent = errorMessage;

            }
            else console.log('500 Internal Error');
        }
    };
    xhttp.open("POST", "/api/accounts/loginviaform", true);
    xhttp.send(formData);
});