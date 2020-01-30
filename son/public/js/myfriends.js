const form = document.getElementById('searchform');
form.addEventListener('submit',event => {
    event.preventDefault();
    let search = form['searchbar'].value;
    const hobbies = form['filter'].checked;
    let filters = [];
    if(Array.from(document.querySelectorAll('input')).some(el => {
        return el.checked;
    })) {
        filters.push(document.querySelector('input[name="filter"]:checked').value);
    }
    filters = filters.join(',');

    search = search.split(/[\s;,]+/).join(',');
    let url = new URL('http://localhost:3000/api/myfriends');
    let params = {filters,search};
    url.search = new URLSearchParams(params).toString();
    let imageLegend = {
        facebook: {
            friends: 'https://image.flaticon.com/icons/svg/124/124010.svg',
            notfriends: 'https://image.flaticon.com/icons/svg/123/123717.svg' 
        },
        twitter: {
            friends: 'https://image.flaticon.com/icons/svg/124/124021.svg',
            notfriends: 'https://image.flaticon.com/icons/svg/123/123728.svg'
        },
        lastfm: {
            friends: 'https://image.flaticon.com/icons/svg/143/143664.svg',
            notfriends: 'https://image.flaticon.com/icons/svg/121/121546.svg'
        }
    }
    fetch(url)
    .then(response => response.json())
    .then(data => {
        function createFriend(friendData) {
            let friendDiv = document.createElement('div');
            friendDiv.setAttribute('class','friend-wrapper');
            let friendUsername = document.createElement('p');
            friendUsername.textContent = friendData.user.username;
            friendDiv.appendChild(friendUsername);
            let iconsDiv = document.createElement('div');
            iconsDiv.setAttribute('class','icons-wrapper');
            let facebookIcon = document.createElement('div');
            facebookIcon.style.width="30px";
            facebookIcon.style.height = "30px";
            if(friendData.networks.facebook == 'none') {
                facebookIcon.style.backgroundColor ="gray";
            }
            else {
                facebookIcon.style.backgroundImage = `url(${imageLegend.facebook[friendData.networks.facebook]})`;
            }

            let twitterIcon = document.createElement('div');
            twitterIcon.style.width="30px";
            twitterIcon.style.height = "30px";
            if(friendData.networks.twitter == 'none') {
                twitterIcon.style.backgroundColor ="gray";
            }
            else {
                twitterIcon.style.backgroundImage = `url(${imageLegend.twitter[friendData.networks.twitter]})`;
            }

            let lastfmIcon = document.createElement('div');
            lastfmIcon.style.width="30px";
            lastfmIcon.style.height = "30px";
            if(friendData.networks.lastfm == 'none') {
                lastfmIcon.style.backgroundColor ="gray";
            }
            else {
                lastfmIcon.style.backgroundImage = `url(${imageLegend.lastfm[friendData.networks.lastfm]})`;
            }
            facebookIcon.setAttribute('class','networkIcon');
            twitterIcon.setAttribute('class','networkIcon');
            lastfmIcon.setAttribute('class','networkIcon');
            iconsDiv.appendChild(facebookIcon);
            iconsDiv.appendChild(twitterIcon);
            iconsDiv.appendChild(lastfmIcon);
            friendDiv.appendChild(iconsDiv);
            return friendDiv;
        }
        let mainDiv = document.createElement('div');
        mainDiv.setAttribute('class','friends-wrapper');
        for(let friendData of data) {
            mainDiv.appendChild(createFriend(friendData));
        }
        let friendsContentDiv = document.getElementById('friends-content');
        if(friendsContentDiv.childNodes.length == 0) {
            friendsContentDiv.appendChild(mainDiv);
        }
        else {
            friendsContentDiv.replaceChild(mainDiv,friendsContentDiv.childNodes[0]);
        }
    })

})