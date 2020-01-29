module.exports = function(data) {
    
    
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="/static/css/dashboard.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="icon/flaticon.css">
    
</head>

<body>
    <div id="menu" class="menu">
        <img src='/static/img/soraka.png'>
        <h2>${data.username}</h2>
        <i class="flaticon-social-media"></i>
        <i class="flaticon-instagram"></i>
        <i class="flaticon-linkedin"></i>

        <hr>

        <div class=menuItem>
            <i class="flaticon-dashboard"></i><a href="#" style="display:inline">Dashboard</a>
            <br>
        </div>
        <div class=menuItem>
            <i class="flaticon-user"></i><a href="#" style="display:inline">Friends</a>
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

    <div id="content">
        <form id="searchform">
            <input type="text" name="searchbar" placeholder="Search friends by hobbies, username, social network ..."></input>
            <input type="checkbox" name="hobbies">Hobbies</input>
            <input type="checkbox" name="username">Username</input>
            <input type="checkbox" name="socialnetwork">Social network</input>
            <input type="submit" value="Search"></input>
        </form>
    </div>
    <script src="/static/js/myfriends.js" type="application/javascript"></script>

</body>`}