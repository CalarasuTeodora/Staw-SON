let update_user = document.getElementById('user');
let new_username = update_user['username'];
let hobbies = document.getElementById('hobby');
let watch = hobbies['watchtv'];
let gaming = hobbies['gaming'];
let reading = hobbies['reading'];
let sports = hobbies['sports'];
let friends = hobbies['friends'];
let travel = hobbies['travel'];


update_user.addEventListener('submit',(event) => {
    event.preventDefault();
    let formData = new FormData();
    for(let input of update_user) {
        if (input.name) {
            formData.append(input.name,input.value);
        }  
    }
    let hhr = new XMLHttpRequest();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            // fv.restoreInputBorders();
        }
    };
    xhttp.open("POST", "/api/settings/username", true);
    xhttp.send(formData);
});


hobbies.addEventListener('submit',(event) => {
    event.preventDefault();
    let formData = new FormData();
    let list_hobbies = [];
    for(let input of hobbies) {
        if (input.checked) {
            list_hobbies.push(input.name);
        }  
    }
    formData.append('hobbies', JSON.stringify(list_hobbies));
    
    let hhr = new XMLHttpRequest();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
        }
    };
    xhttp.open("POST", "/api/settings/hobbies", true);
    xhttp.send(formData);
});