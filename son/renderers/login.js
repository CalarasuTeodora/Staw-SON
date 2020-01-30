module.exports = function(data) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8">
        <title>Login</title>
        <link rel="stylesheet" href="/static/css/login.css">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800&display=swap" rel="stylesheet">
    </head>
    
    <body>
    
    
        <div id="rightPanel">
            <img src="/static/img/logo.svg" class="logo" alt="logo">
            <img src="/static/img/people.svg" id="people" alt="people">
            <h1>A TITLE HERE</h1>
            <h3>The best application we could make... Sorry</h3>
        </div>
    
        <div id="leftPanel">
            <h1>SIGN IN</h1>
            <form id="login">
                <div class="textbox">
                    <input type="email" name="email" id="email" placeholder="Email" required>
                </div>
                <div class="textbox">
                    <input type="password" name="password" id="password" placeholder="Password" required>
                </div>
    
                <button type="submit" class="button">LOG IN</button>
                <p id="errorMessages"></p>
            </form>
            <p>You don't have an account?</p>
            <h4><a href="/register">Sign up</a></h4>
    
        </div>
        <script type="application/javascript" src="/static/js/loginviaform.js"></script>
    
    
    
    
    
    
    </body>
    
    </html>`
}