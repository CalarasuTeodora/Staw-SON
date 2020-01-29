const form = document.getElementById('searchform');
form.addEventListener('submit',event => {
    event.preventDefault();
    let search = form['searchbar'].value;
    const hobbies = form['hobbies'].checked;
    const username = form['username'].checked;
    const network = form['socialnetwork'].checked;
    let filters = [];
    console.log("/" + hobbies + "/");
    if(hobbies) {
        filters.push('hobbies');
    }
    if(username) {
        filters.push('username');
    }
    if(network) {
        filters.push('network');
    }
    filters = filters.join(',');

    search = search.split(/[\s;,]+/).join(',');
    let url = new URL('http://localhost:3000/api/myfriends');
    let params = {filters,search};
    url.search = new URLSearchParams(params).toString();
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })

})