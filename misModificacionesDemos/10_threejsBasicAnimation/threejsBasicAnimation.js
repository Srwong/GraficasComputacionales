var renderer = null,
scene = null,
camera = null,
directionalLight = null,
root = null,
group = null,
cube = null;

var animator = null,
duration = 2, // sec
loopAnimation = false;

function run()
{
    requestAnimationFrame(function() { run(); });

    // Render the scene
    renderer.render( scene, camera );

    // Update the animations
    KF.update();

    // Update the camera controller
    orbitControls.update();
}

function createScene(canvas)
{

    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(0, 0, 8);
    scene.add(camera);

    // Add a directional light to show off the object
    directionalLight = new THREE.DirectionalLight( 0xffffff, 1);

    // Create a group to hold all the objects
    root = new THREE.Object3D;

    // Create and add all the lights
    directionalLight.position.set(0, 1, 2);
    root.add(directionalLight);

    // Create a group to hold the objects
    group = new THREE.Object3D;
    root.add(group);

    // And put some geometry and material together into a mesh
    geometry = new THREE.CubeGeometry(2, 2, 2);
    var color = 0xffffff;
    ambient = 0x888888;
    cube = new THREE.Mesh(geometry,
            new THREE.MeshPhongMaterial({color:color}));
    cube.rotation.x = Math.PI / 4;

    // Add the mesh to our group
    group.add( cube );

    // Now add the group to our scene
    scene.add( root );
}

function initAnimations()
{
    animator = new KF.KeyFrameAnimator;
    animator.init({
        interps:
            [
                {
                    keys:[0, .5, 1], //porcentajes en los que quieres que sucedan las cosas
                    values:[
                            { x : 0 },    //en 0 va a estar en 0
                            { x : Math.PI  }, //en 0.5 va a estar en PI
                            { x : Math.PI * 2 }, //en 1 segundo va a estar en 2 pi
                            ],
                    target:group.rotation //a que se le va a aplicar
                },
            ],
        loop: loopAnimation,
        duration:duration * 1000,
    });
}

function playAnimations()
{
    animator.start();
}
