module.exports = function(data) {
    
    
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="/static/css/dashboard.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/static/icon/flaticon.css">
    <style>
    #graph-container {
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      widht:100%;
      height:100%;
    }
  </style>
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
            <i class="flaticon-adjust"></i><a href="#" style="display:inline">Settings</a>
            <br>
        </div>
        <hr>
        <div class=menuItem>
            <i class="flaticon-logout"></i><a href="login.html" style="display:inline">Logout</a>
        </div>
    </div>

    <div id="content">
        <img src="/static/img/logo.svg" id="logo">
        <h2><span id="msg">Welcome back, ${data.username}</span></h2>
        <button onclick="getFriends('facebook')" id='fb'>facebook</button>
        <button onclick="getFriends('twitter')" id='twitter'>twitter</button>
        <button onclick="getFriends('lastfm')" id='lastfm'>lastfm</button>
        <button id="export" type="export">Export SVG</button>
        <button id="export2" type="export">Export PNG</button>
        <button id="export3" type="export">Export FOAF</button>

        <div id="graphs">
            <div class="graph">
                <div class="graphTab"><h2>Div Title</h2></div>
                <div id="graph-container">
                
           
                </div>
            </div>
        </div>
    </div>

<script src="/static/js/sigma/src/sigma.core.js"></script>
<script src="/static/js/sigma/src/conrad.js"></script>
<script src="/static/js/sigma/src/utils/sigma.utils.js"></script>
<script src="/static/js/sigma/src/utils/sigma.polyfills.js"></script>
<script src="/static/js/sigma/src/sigma.settings.js"></script>
<script src="/static/js/sigma/src/classes/sigma.classes.dispatcher.js"></script>
<script src="/static/js/sigma/src/classes/sigma.classes.configurable.js"></script>
<script src="/static/js/sigma/src/classes/sigma.classes.graph.js"></script>
<script src="/static/js/sigma/src/classes/sigma.classes.camera.js"></script>
<script src="/static/js/sigma/src/classes/sigma.classes.quad.js"></script>
<script src="/static/js/sigma/src/classes/sigma.classes.edgequad.js"></script>
<script src="/static/js/sigma/src/captors/sigma.captors.mouse.js"></script>
<script src="/static/js/sigma/src/captors/sigma.captors.touch.js"></script>
<script src="/static/js/sigma/src/renderers/sigma.renderers.canvas.js"></script>
<script src="/static/js/sigma/src/renderers/sigma.renderers.webgl.js"></script>
<script src="/static/js/sigma/src/renderers/sigma.renderers.svg.js"></script>
<script src="/static/js/sigma/src/renderers/sigma.renderers.def.js"></script>
<script src="/static/js/sigma/src/renderers/webgl/sigma.webgl.nodes.def.js"></script>
<script src="/static/js/sigma/src/renderers/webgl/sigma.webgl.nodes.fast.js"></script>
<script src="/static/js/sigma/src/renderers/webgl/sigma.webgl.edges.def.js"></script>
<script src="/static/js/sigma/src/renderers/webgl/sigma.webgl.edges.fast.js"></script>
<script src="/static/js/sigma/src/renderers/webgl/sigma.webgl.edges.arrow.js"></script>
<script src="/static/js/sigma/src/renderers/canvas/sigma.canvas.labels.def.js"></script>
<script src="/static/js/sigma/src/renderers/canvas/sigma.canvas.hovers.def.js"></script>
<script src="/static/js/sigma/src/renderers/canvas/sigma.canvas.nodes.def.js"></script>
<script src="/static/js/sigma/src/renderers/canvas/sigma.canvas.edges.def.js"></script>
<script src="/static/js/sigma/src/renderers/canvas/sigma.canvas.edges.curve.js"></script>
<script src="/static/js/sigma/src/renderers/canvas/sigma.canvas.edges.arrow.js"></script>
<script src="/static/js/sigma/src/renderers/canvas/sigma.canvas.edges.curvedArrow.js"></script>
<script src="/static/js/sigma/src/renderers/canvas/sigma.canvas.edgehovers.def.js"></script>
<script src="/static/js/sigma/src/renderers/canvas/sigma.canvas.edgehovers.curve.js"></script>
<script src="/static/js/sigma/src/renderers/canvas/sigma.canvas.edgehovers.arrow.js"></script>
<script src="/static/js/sigma/src/renderers/canvas/sigma.canvas.edgehovers.curvedArrow.js"></script>
<script src="/static/js/sigma/src/renderers/canvas/sigma.canvas.extremities.def.js"></script>
<script src="/static/js/sigma/src/renderers/svg/sigma.svg.utils.js"></script>
<script src="/static/js/sigma/src/renderers/svg/sigma.svg.nodes.def.js"></script>
<script src="/static/js/sigma/src/renderers/svg/sigma.svg.edges.def.js"></script>
<script src="/static/js/sigma/src/renderers/svg/sigma.svg.edges.curve.js"></script>
<script src="/static/js/sigma/src/renderers/svg/sigma.svg.labels.def.js"></script>
<script src="/static/js/sigma/src/renderers/svg/sigma.svg.hovers.def.js"></script>
<script src="/static/js/sigma/src/middlewares/sigma.middlewares.rescale.js"></script>
<script src="/static/js/sigma/src/middlewares/sigma.middlewares.copy.js"></script>
<script src="/static/js/sigma/src/misc/sigma.misc.animation.js"></script>
<script src="/static/js/sigma/src/misc/sigma.misc.bindEvents.js"></script>
<script src="/static/js/sigma/src/misc/sigma.misc.bindDOMEvents.js"></script>
<script src="/static/js/sigma/src/misc/sigma.misc.drawHovers.js"></script>
<script src="/static/js/sigma/plugins/sigma.plugins.animate/sigma.plugins.animate.js"></script>
<script src="/static/js/sigma/plugins/sigma.layout.noverlap/sigma.layout.noverlap.js"></script>
<script src="/static/js/sigma/plugins/sigma.layout.forceAtlas2/worker.js"></script>
<script src="/static/js/sigma/plugins/sigma.layout.forceAtlas2/supervisor.js"></script>
<script src="/static/js/sigma/plugins/sigma.exporters.svg/sigma.exporters.svg.js"></script>
<script src="/static/js/sigma/plugins/sigma.renderers.snapshot/sigma.renderers.snapshot.js"></script>

<script>
async function fetchFriend(net) {
    var result = await fetch('http://localhost:3000/api/friends?network=' + net)
    var json = await result.json()
    return json
}

var i,
    s,
    N = 100,
    E = 500,
    g = {
        nodes: [],
        edges: []
    };

async function getFriends(net) {

    var q = document.querySelector('#graph-container');
    var p = q.parentNode;
    p.removeChild(q);
    var c = document.createElement('div');
    c.setAttribute('id', 'graph-container');
    p.appendChild(c);


    N = 100;
    E = 500;
    g = {
        nodes: [],
        edges: []
    };

 
    const root = await fetchFriend(net)

    g.nodes.push({
        id: root.name,
        label: root.name + " (ME)",
        x: 0,
        y: 0,
        size: 20,
        color: '#4B0082'
    })

    rec(0, 0, root.name, root.friends);

    s = new sigma({
        graph: g
    });

    s.addRenderer({
        container: 'graph-container',
        type: 'canvas'
    });

    s.refresh();
}





document.getElementById('export').onclick = function () {
    console.log('exporting...');
    var output = s.toSVG({
        download: true,
        filename: 'mygraph.svg',
        size: 1000
    });
    // console.log(output);
};


document.getElementById('export2').onclick = function () {
    console.log(s.renderers[0].snapshot({
        format: 'png',
        background: 'white',
        filename: 'graph.png',
        labels: false,
        download: true
    }));
};

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

document.getElementById('export3').onclick = function () {
    let foaf = "";
    
    g.nodes.forEach((n) => {
        foaf += \`
        <foaf:Person>
            <foaf:name>\${n.id}</foaf:name>
            <foaf:img rdf:resource="\${n.image}" />
        </foaf:Person>
        \`
    });

    download('foaf.xml', foaf);
};



function rec(x, y, rootId, friends) {
    console.log(rootId)
    for (let i = 0; i < friends.length; i++) {
        f = friends[i]


        console.log(f)

        // if (f.id == rootId) {
        //     return;
        // }

        color = '#4B0082'

        if (g.nodes.find(x => x.id == f.name) === undefined) {
            posX = x + Math.cos(Math.PI * 2 * (i + 1) / friends.length)
            posY = y + Math.sin(Math.PI * 2 * (i + 1) / friends.length)
            g.nodes.push({
                id: f.name,
                label: f.name,
                x: posX,
                y: posY,
                size: 20,
                color: color
            })


        }

        if (g.edges.find(x => x.id == rootId + "_" + f.name) === undefined) {
            console.log(rootId)
            g.edges.push({
                id: rootId + "_" + f.name,
                source: rootId,
                target: f.name,
                size: 6,
                color: color
            });
        }

        if (f.friends.length > 0) {
            rec(posX, posY, f.name, f.friends)
        }

    }
}
</script>
</body>`}