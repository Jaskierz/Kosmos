(function () {

    var container = document.createElement('div');
    document.body.appendChild(container);


    var array = [];
    var timer = {
        1: {
            start: 0,
            modified: false
        },
        2: {
            start: 0,
            modified: false
        },
        3: {
            start: 0,
            modified: false
        },
        4: {
            start: 0,
            modified: false
        },
        5: {
            start: 0,
            modified: false
        },
        6: {
            start: 0,
            modified: false
        },
        7: {
            start: 0,
            modified: false
        },
        8: {
            start: 0,
            modified: false
        }
    };

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


    function lightTheSun(jump, count, xRotation, yRotation, zRotation) {
        for (var i = 0; i < count; i++) {
            randomEffect(jump, count, xRotation, yRotation, zRotation);
        }
    }

    function planetPosition(planet, distance, frame, t, randomStart) {
        if (randomStart && !timer[t].modified) {
            timer[t].start = Math.random() * 2000 - 1000;

            timer[t].modified = true;
        }

        timer[t].start += frame;

        planet.position.x = distance * Math.cos(timer[t].start);
        planet.position.z = distance * Math.sin(timer[t].start);
    }


    function planetsSpeed(position, speed, startPosition) {
        planetPosition(mercury, position, speed, 1, startPosition);
        mercury.rotation.y += .01;
        planetPosition(venus, position * 2, speed / 2, 2, startPosition);
        venus.rotation.y += .01;
        planetPosition(earth, position * 3, speed / 4, 3, startPosition);
        earth.rotation.y += .01;
        planetPosition(mars, position * 4, speed / 8, 4, startPosition);
        mars.rotation.y += .01;
        planetPosition(jupiter, position * 5, speed / 16, 5, startPosition);
        jupiter.rotation.y += .01;
        planetPosition(saturn, position * 6, speed / 32, 6, startPosition);
        saturn.rotation.y += .01;
        planetPosition(uranus, position * 7, speed / 64, 7, startPosition);
        uranus.rotation.y += .01;
        planetPosition(neptune, position * 8, speed / 128, 8, startPosition);
        neptune.rotation.y += .01;
    }

    function starsGenerate(look, quantity, movement) {
        var geometry = new THREE.PlaneGeometry(1, 1, 1);
        for (var j = 0; j < quantity; j++) {

            var star = new THREE.Mesh(geometry, look);
            star.position.x = Math.random() * 2000 - 1000;
            star.position.y = Math.random() * 2000 - 1000;
            star.position.z = Math.random() * 4000 - 1000;
            star.rotation.x = Math.random() * 360 * ( Math.PI / 180 );
            star.rotation.y = Math.random() * 360 * ( Math.PI / 180 );

            if (!movement) {
                stars.add(star);
            }
            if (movement) {
                starsMovement.add(star);
            }
        }
    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize, false);

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
    var starsMovement = new THREE.Group();

//Camera--------------------------------------------------------------------------------------------

    var geo2 = new THREE.BoxGeometry(2, 2, 2);
    var mat2 = new THREE.MeshLambertMaterial({color: 0x004353, visible: false});
    var cameraItem = new THREE.Mesh(geo2, mat2);
    scene.add(cameraItem);
    cameraItem.position.set(0, 0, 0);

    var position = cameraItem.position;
    var target = false;
    var tweenTarget;

//planety-------------------------------------------------------------------------------------------

    var mercury = planets(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../images/mercurymap.jpg")}), 0.05 * 10, 50, 50);
    var venus = planets(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../images/venusmap.jpg")}), 0.12 * 10, 50, 50);
    var earth = planets(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../images/earthmap1k.jpg")}), 0.13 * 10, 50, 50);
    var mars = planets(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../images/marsmap1k.jpg")}), 0.07 * 10, 50, 50);
    var jupiter = planets(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../images/jupitermap.jpg")}), 1.43 * 1.5, 50, 50);
    var saturn = planets(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../images/saturnmap.jpg")}), 1.4 * 1.5, 50, 50);
    var uranus = planets(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../images/uranusmap.jpg")}), 0.5 * 2, 50, 50);
    var neptune = planets(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../images/neptunemap.jpg")}), 4.8 / 2, 50, 50);


//Slonce-------------------------------------------------------------------------------------------

    var sunHover = planets(new THREE.MeshLambertMaterial(), 5, 50, 50);

    var geor = new THREE.SphereGeometry(60, 50, 50);
    var matsy = new THREE.MeshLambertMaterial({visible: false});
    var sunHover1 = new THREE.Mesh(geor, matsy);
    var wtf = new THREE.Group();
    wtf.add(sunHover1);
    scene.add(wtf);

    var s1 = sunElement(50, 0xffc843, 7, 7, 7);
    var s2 = sunElement(50, 0xFFA500, 7, 7, 7);
    var s3 = sunElement(50, 0xFFFF00, 7, 7, 7);

    var light = new THREE.PointLight(0xffffff, 1, 0);
    light.position.set(0, 0, 0);

//Gwiazdy---------------------------------------------------------------------------------------------

    starsGenerate(new THREE.MeshNormalMaterial({opacity: .01}), 1000, true);
    starsGenerate(new THREE.MeshLambertMaterial({color: 0xffffff, opacity: .1}), 3000, false);


//Inne-----------------------------------------------------------------------------------------------

    camera.position.set(0, 0, 90);


    scene.add(stars, starsMovement, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, light, sun, sunHover);


    //-----------------------------------------------------------------------------------------


    var mouse = new THREE.Vector2(), INTERSECTED;

    var raycaster = new THREE.Raycaster();
    renderer.sortObjects = false;
    container.appendChild(renderer.domElement);


    document.addEventListener('mousemove', MouseMove, false);

    function MouseMove(event) {

        event.preventDefault();

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {

            if (INTERSECTED != intersects[0].object) {
                if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

                INTERSECTED = intersects[0].object;
                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                INTERSECTED.material.emissive.setHex(0x6F8392);

                container.style.cursor = 'pointer';

            }

        } else {

            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            INTERSECTED = null;
            container.style.cursor = 'auto';

        }
    }

    document.addEventListener('mousedown', MouseDown, false);
    function MouseDown(event) {

        /*event.preventDefault();

        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = -( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);*/

        var intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {

            INTERSECTED = intersects[0].object;
            tweenTarget = INTERSECTED.position;

        }
        if (INTERSECTED) {
            var tween = new TWEEN.Tween(position).to(INTERSECTED.position, 2000);
            zoom = true;
            tween.onUpdate(function () {
                cameraItem.position.x = position.x;
                cameraItem.position.z = position.z;
            });
            tween.onComplete(function () {
                target = true;
            });
            tween.start();
            tweenTarget = INTERSECTED;

        } else {
            target = false;
            zoom = false;
            var tween = new TWEEN.Tween(cameraItem.position).to(sunHover.position, 2000);

            tween.onUpdate(function () {
            });
            tween.start();
        }
    }


    //-----------------------------------------------------------------------------------------

    var zoom = false;

    controls.minDistance = 40;
    controls.maxDistance = 120;

    var render = function () {

        controls.enablePan = false;
        controls.minZoom = 30;
        controls.maxZoom = 120;

        requestAnimationFrame(render);

        camera.lookAt(cameraItem.position);

        if (target) {
            cameraItem.position.x = tweenTarget.position.x;
            cameraItem.position.z = tweenTarget.position.z;
        }

        TWEEN.update();

        if (zoom && camera.fov > 10) {
            camera.fov -= .3;
            camera.updateProjectionMatrix();
            controls.enableZoom = false;
        } else if (!zoom && camera.fov < 70) {
            camera.fov += .3;
            camera.updateProjectionMatrix();
            controls.enableZoom = true;
        }

        //Tlo--------------------------------------------------------------------------------------------
        renderer.setClearColor(0x000000, 1);

        //planety-----------------------------------------------------------------------------------------

        planetsSpeed(12, .01, true);


        //Slonce-----------------------------------------------------------------------------------------


        lightTheSun(0, s1.max, 0.000005, 0.000005, 0.000005);
        lightTheSun(s1.max, s1.max + s2.max, 0.000007, 0.000007, 0.000007);
        lightTheSun(s1.max + s2.max, array.length, 0.000009, 0.000009, 0.000009);

        sun.rotation.x += 0.0;
        sun.rotation.y += 0.0;


        //Gwiazdy-----------------------------------------------------------------------------------------


        starsMovement.rotation.x += 0.000000;
        starsMovement.rotation.y += 0.000000;
        starsMovement.rotation.z += 0.000000;

        //Camera-----------------------------------------------------------------------------------------

        renderer.render(scene, camera);
    };


    render();
})
();

