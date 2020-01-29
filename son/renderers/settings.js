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
        <img src="/static/img/logo.svg" id="logo">
        <h2><span id="msg">Welcome back, Soraka Main Boyy!</span></h2>
        <div id="graphs">
            <div class="graph">
                <div class="graphTab"><h2>Div Title</h2></div>
                <p>yeee</p>
            </div>
            <div class="graph">
                <div class="graphTab"><h2>Div Title</h2></div>
                <p>yeee</p>
            </div>
        </div>
    </div>


</body>`}