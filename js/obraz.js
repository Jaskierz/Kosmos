(function () {

    var array = [];

    function sunElement(max, color, sunBoxX, sunBoxY, sunBoxZ) {

        for (var i = 0; i < max; i++) {
            var sunCubeMaterial = new THREE.MeshBasicMaterial({color: color});
            var SunBox = new THREE.BoxGeometry(sunBoxX, sunBoxY, sunBoxZ);
            var item = new THREE.Mesh(SunBox, sunCubeMaterial);
            item.rotation.x = Math.random() * 360 * ( Math.PI / 180 );
            item.rotation.y = Math.random() * 360 * ( Math.PI / 180 );
            item.rotation.z = Math.random() * 360 * ( Math.PI / 180 );
            sun.add(item);
            array.push(item);

        }
        return {
            item: item,
            max: max
        }
    }

    function planets(planetsMaterial, r, ws, hs) {
        var planetGemometry = new THREE.SphereGeometry(r, ws, hs);
        var planetName = new THREE.Mesh(planetGemometry, planetsMaterial);

        scene.add(planetName);
        return planetName;


    }

    function randomEffect(start, stop, xRotation, yRotation, zRotation) {
        for (var j = start; j < stop; j++) {
            array[j].rotation.x += xRotation;
            array[j].rotation.y += yRotation;
            array[j].rotation.z += zRotation;
        }
    }


    function zapalSlonce(jump, count, xRotation, yRotation, zRotation) {
        for (var i = 0; i < count; i++) {
            randomEffect(jump, count, xRotation, yRotation, zRotation);
        }
    }

    function planetStartPosition(a) {
        if (a == true) {
            mercuryMovement.rotation.y = Math.random() * 360 * ( Math.PI / 180 );
            venusMovement.rotation.y = Math.random() * 360 * ( Math.PI / 180 );
            earthMovement.rotation.y = Math.random() * 360 * ( Math.PI / 180 );
            marsMovement.rotation.y = Math.random() * 360 * ( Math.PI / 180 );
            jupiterMovement.rotation.y = Math.random() * 360 * ( Math.PI / 180 );
            saturnMovement.rotation.y = Math.random() * 360 * ( Math.PI / 180 );
            uranusMovement.rotation.y = Math.random() * 360 * ( Math.PI / 180 );
            neptuneMovement.rotation.y = Math.random() * 360 * ( Math.PI / 180 );
        }
        else {
            mercuryMovement.rotation.y = 0;
            venusMovement.rotation.y = 0;
            earthMovement.rotation.y = 0;
            marsMovement.rotation.y = 0;
            jupiterMovement.rotation.y = 0;
            saturnMovement.rotation.y = 0;
            uranusMovement.rotation.y = 0;
            neptuneMovement.rotation.y = 0;
        }

    }

    function planetsSpeed(speed) {
        mercuryMovement.rotation.y += speed;
        venusMovement.rotation.y += speed / 2;
        earthMovement.rotation.y += speed / 4;
        marsMovement.rotation.y += speed / 8;
        jupiterMovement.rotation.y += speed / 16;
        saturnMovement.rotation.y += speed / 32;
        uranusMovement.rotation.y += speed / 64;
        neptuneMovement.rotation.y += speed / 128;
    }


    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var controls = new THREE.OrbitControls(camera);

    controls.rotateSpeed = 5.0;
    controls.zoomSpeed = 5;

    controls.noZoom = false;
    controls.noPan = false;

    scene = new THREE.Scene();
    scene.add(camera);

    var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var sun = new THREE.Group();
    var stars = new THREE.Group();
    var movement = new THREE.Group();
    var mercuryMovement = new THREE.Group();
    var venusMovement = new THREE.Group();
    var earthMovement = new THREE.Group();
    var marsMovement = new THREE.Group();
    var jupiterMovement = new THREE.Group();
    var saturnMovement = new THREE.Group();
    var uranusMovement = new THREE.Group();
    var neptuneMovement = new THREE.Group();


//planety-------------------------------------------------------------------------------------------

    var mercury = planets(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../images/mercurymap.jpg")}), 0.05 * 10, 50, 50);
    var venus = planets(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../images/venusmap.jpg")}), 0.12 * 10, 50, 50);
    var earth = planets(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../images/earthmap1k.jpg")}), 0.13 * 10, 50, 50);
    var mars = planets(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../images/marsmap1k.jpg")}), 0.07 * 10, 50, 50);
    var jupiter = planets(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../images/jupitermap.jpg")}), 1.43 * 1.5, 50, 50);
    var saturn = planets(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../images/saturnmap.jpg")}), 1.4 * 1.5, 50, 50);
    var uranus = planets(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../images/uranusmap.jpg")}), 0.5 * 2, 50, 50);
    var neptune = planets(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../images/neptunemap.jpg")}), 4.8 / 2, 50, 50);

    mercuryMovement.add(mercury);
    venusMovement.add(venus);
    earthMovement.add(earth);
    marsMovement.add(mars);
    jupiterMovement.add(jupiter);
    saturnMovement.add(saturn);
    uranusMovement.add(uranus);
    neptuneMovement.add(neptune);

    movement.add(mercuryMovement, venusMovement, earthMovement, marsMovement, jupiterMovement, saturnMovement, uranusMovement, neptuneMovement);

    planetStartPosition(false);

//Slonce-------------------------------------------------------------------------------------------


    var s1 = sunElement(50, 0xffc843, 7, 7, 7);
    var s2 = sunElement(50, 0xFFA500, 7, 7, 7);
    var s3 = sunElement(50, 0xFFFF00, 7, 7, 7);

    var light = new THREE.PointLight(0xffffff, 1, 0);
    light.position.set(0, 0, 0);

//Gwiazdy---------------------------------------------------------------------------------------------

    var geom = new THREE.PlaneGeometry(1, 1, 1);
    var biel = new THREE.MeshNormalMaterial();
    for (i = 0; i < 1000; i++) {

        var gw = new THREE.Mesh(geom, biel);
        gw.position.x = Math.random() * 2000 - 1000;
        gw.position.y = Math.random() * 2000 - 1000;
        gw.position.z = Math.random() * 2000 - 1000;

        gw.rotation.x = Math.random() * 360 * ( Math.PI / 180 );
        gw.rotation.y = Math.random() * 360 * ( Math.PI / 180 );

        stars.add(gw);

    }


    var geom1 = new THREE.PlaneGeometry(1, 1, 1);
    var kolor = new THREE.MeshLambertMaterial({color: 0xffffff});
    for (var j = 0; j < 1000; j++) {

        var gw1 = new THREE.Mesh(geom1, kolor);
        gw1.position.x = Math.random() * 2000 - 1000;
        gw1.position.y = Math.random() * 2000 - 1000;
        gw1.position.z = Math.random() - 500;

        gw1.rotation.x = Math.random() * 360 * ( Math.PI / 180 );
        gw1.rotation.y = Math.random() * 360 * ( Math.PI / 180 );

        stars.add(gw1);
    }


//Inne-----------------------------------------------------------------------------------------------


    camera.position.z = 90;

    scene.add(stars, gw1, gw, light, sun, movement);

    var render = function () {


        requestAnimationFrame(render);


        //Tlo--------------------------------------------------------------------------------------------
        renderer.setClearColor(0x000000, 1);

        //Orbita-----------------------------------------------------------------------------------------

        planetsSpeed(0.01);


        //planety-----------------------------------------------------------------------------------------

        mercury.position.x = 12;
        mercury.rotation.y += 0.01;
        venus.position.x = 24;
        venus.rotation.y += 0.01;
        earth.position.x = 36;
        earth.rotation.y += 0.01;
        mars.position.x = 48;
        mars.rotation.y += 0.01;
        jupiter.position.x = 60;
        jupiter.rotation.y += 0.01;
        saturn.position.x = 72;
        saturn.rotation.y += 0.01;
        uranus.position.x = 84;
        uranus.rotation.y += 0.01;
        neptune.position.x = 96;
        neptune.rotation.y += 0.01;


        //Slonce-----------------------------------------------------------------------------------------


        zapalSlonce(0, s1.max, 0.000005, 0.000005, 0.000005);
        zapalSlonce(s1.max, s1.max + s2.max, 0.000007, 0.000007, 0.000007);
        zapalSlonce(s1.max + s2.max, array.length, 0.000009, 0.000009, 0.000009);

        sun.rotation.x += 0.0;
        sun.rotation.y += 0.0;

        sun.position.x = 0;
        sun.position.y = 0;
        sun.position.z = 0;

        //Gwiazdy-----------------------------------------------------------------------------------------


        stars.rotation.x += 0.00001;
        stars.rotation.y += 0.000001;
        stars.rotation.z += 0.000001;


        renderer.render(scene, camera);
    };


    render();
})();
