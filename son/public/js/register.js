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
            console.log(this.form[inputName]);
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
            if(this.status == 200) {
                console.log(this.responseText);
            }
        }
    };
    xhttp.open("POST", "/api/accounts/signupviaform", true);
    xhttp.send(formData);
});