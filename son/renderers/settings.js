module.exports = function(data) {
    var check_hobby = function(data, hobby){
        if(data.hobbies.indexOf(hobby) >= 0){
            return 'checked';
        }
        return '';
    };
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="/static/css/settings.css">
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

    <div id="content">
        <img src="/static/img/logo.svg" id="logo">
        <h2><span id="msg">Welcome back, ${data.username}!</span></h2>
        <a href="/linked/fb/login" class="button">Link facebook</a>
        <a href="/linked/twitter/login" class="button">Link twitter</a>
        <a href="/linked/lastfm/login" class="button">Link lastfm</a>
        <div id="graphs">
        

            <form id="user">
                <div class="textbox">
                    <label for="username">Chage your username:</label> <br/>
                    <input type="text" id="username" name="username" placeholder="New username"> <br/>  
                </div> <br/>
                
                <button type="submit" class="button">Make change</button>
            </form>
        </div>

        <div id="hob">
            <form id="hobby">
                <p>Choose your hobbies:</p>
                <div class="check">
                    <input type="checkbox" id="watchtv" name="watchtv" value="watchtv" ${check_hobby(data, 'watchtv')}>Watch TV <br/>
                    <input type="checkbox" id="gaming" name="gaming" value="gaming" ${check_hobby(data, 'gaming')}>Play video games <br/>
                    <input type="checkbox" id="reading" name="reading" value="reading" ${check_hobby(data, 'reading')}>Read <br/>
                    <input type="checkbox" id="friends" name="friends" value="friends" ${check_hobby(data, 'friends')}>Go out with friends <br/>
                    <input type="checkbox" id="sports" name="sports" value="sports" ${check_hobby(data, 'sports')}>Sports <br/>
                    <input type="checkbox" id="travel" name="travel" value="travel" ${check_hobby(data, 'travel')}>Travel <br/>
                </div>
                <button type="submit" class="sendhobbies">Submit hobbies</button>
            </form>
        </div>

    </div>
    <script type="application/javascript" src="/static/js/settings.js"></script>

</body>
</html>`}