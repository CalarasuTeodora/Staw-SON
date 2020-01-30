module.exports = function(data) {
    
    
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="/static/css/dashboard.css">
    <link rel="stylesheet" href="/static/css/friendsPage.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/static/icon/flaticon.css">
    
</head>

<body>
    <div id="menu" class="menu">
        <img src='/static/img/soraka.png'>
        <h2>${data.username}</h2>
        <hr>

        <div class=menuItem>
        <i class="flaticon-dashboard"></i><a href="/" style="display:inline">Dashboard</a>
        <br>
    </div>
    <div class=menuItem>
        <i class="flaticon-user"></i><a href="/myfriends" style="display:inline">Friends</a>
        <br>
    </div>
    <div class=menuItem>
        <i class="flaticon-adjust"></i><a href="/settings" style="display:inline">Settings</a>
        <br>
    </div>
    <hr>
    <div class=menuItem>
        <i class="flaticon-logout"></i><a href="login.html" style="display:inline">Logout</a>
    </div>
    </div>

    <div id="content-v2">
        <form id="searchform">
            <input type="text" name="searchbar" placeholder="Search friends by hobbies, username, social network ..."></input> <br>
            <label for="hobbies">Hobbies</label>
            <input type="radio" name="filter" value="hobbies"></input>
            <br/>
            <label for="username">Username</label>
            <input type="radio" name="filter" value="username"></input>
            <br/>
            <label for="network">Network</label>
            <input type="radio" name="filter" value="network"></input>
            <br/>
            <input type="submit" value="Search"></input>
        </form>
        <div id="friends-content">

        </div>
    </div>
    <script src="/static/js/myfriends.js" type="application/javascript"></script>

</body>`}