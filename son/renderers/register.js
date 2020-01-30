module.exports = function(data) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8">
        <title>SingUp</title>
        <link rel="stylesheet" href="/static/css/login.css">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800&display=swap" rel="stylesheet">
    </head>
    
    <body>
    
    
        <div id="rightPanel">
            <img src="/static/img/logo.svg" class="logo" alt="logo">
            <img src="/static/img/people.svg" id="people" alt="people">
            <h1>A TITLE HERE</h1>
            <h3>Some shitty ass text over here.
                And maybe here</h3>
        </div>
    
        <div id="leftPanel">
            <h1>SIGN UP</h1>
    

            <form id="register">
                <div class="textbox">
                    <input type="email" name="email" id="email" placeholder="Email" required>
                </div>
                <div class="textbox">
                    <input type="text" id="username" name="username" placeholder="username" required>
                </div>
                <div class="textbox">
                    <input type="password" id="password" name="password" placeholder="Password" required>
                </div>
                <div class="textbox">
                    <input type="password" id="retypepassword" name="retypepassword" placeholder="Retype Password" required>
                </div>
    
                <button type="submit" class="button">Sign Up</button>
                <p id="errorMessages"></p>
    
            </form>
            <p>You already have an account? </p> 
            <h4 style="font-weight:600;margin-bottom:4px"><a href="/login">Login</a></h4>
       
           
    
           
    
        </div>
        <script type="application/javascript" src="/static/js/register.js"></script>
    
    
    
    
    
    
    </body>
    
    </html>`
}