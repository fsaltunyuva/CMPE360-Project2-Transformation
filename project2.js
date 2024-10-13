// TO DO 1: Provides a 3x3 transformation matrix represented as an array containing 9 values arranged in column-major sequence.
// Initially, the transformation employs scaling, followed by rotation, and ultimately, translation.
// The specified rotation measurement is in degrees.
function GetTransform(positionX, positionY, rotation, scale) {
    var angle = rotation * Math.PI / 180; // Convert the rotation angle to radians
    var cos = Math.cos(angle); // Cosine of the angle
    var sin = Math.sin(angle); // Sine of the angle

    // Scaling Matrix
    var scaling_matrix = [scale, 0, 0, 0, scale, 0, 0, 0, 1];

    // Rotation Matrix
    var rotation_matrix = [cos, sin, 0, -sin, cos, 0, 0, 0, 1];

    // Translation Matrix
    var translation_matrix = [1, 0, 0, 0, 1, 0, positionX, positionY, 1];

    // Merging the three matrices with the order of scaling, rotation, and translation

    // Applying scaling and rotation
    var scale_and_rotate = ApplyTransform(scaling_matrix, rotation_matrix);

    // Applying translation
    var final_transform = ApplyTransform(scale_and_rotate, translation_matrix);

    return final_transform;
}

// TO DO 2:Provides a 3x3 transformation matrix represented as an array containing 9 values arranged in column-major sequence.
// The inputs consist of transformation matrices following the identical format.
// The resulting transformation initially employs trans1 and subsequently applies trans2.
function ApplyTransform(trans1, trans2) {
    var result = [1, 0, 0, 0, 1, 0, 0, 0, 1]; // Identity Matrix

    // Matrix Multiplication
    for (var i = 0; i < 3; i++) { // Row
        for (var j = 0; j < 3; j++) { // Column
            result[i * 3 + j] = 0; // Initialize the result matrix
            for (var k = 0; k < 3; k++) {
                result[i * 3 + j] += trans1[i * 3 + k] * trans2[k * 3 + j]; // Matrix Multiplication Formula
            }
        }
    }

    return result;
}


//You will write the function for ResetTransform
//This function resets the drone’s position, rotation, scale, and altitude
function resetTransform() {
    drone.positionX = window.innerWidth / 2; // Reset the position X to the center of the window (from https://stackoverflow.com/questions/39203250/center-position-of-current-screen-position)
    drone.positionY = window.innerHeight / 2; // Reset the position Y to the center of the window (from https://stackoverflow.com/questions/39203250/center-position-of-current-screen-position)
    drone.rotation = 0; // Reset the rotation
    drone.scale = 1; // Reset the scale
    drone.altitude = 0; // Reset the altitude
}


//You will write the function for boostSpeed
//Temporarily increases the drone's speed for 5 seconds and then resets it to the normal speed.
function boostSpeed() {
    // drone.speed += 25; // Increase the speed (does not work because speed is related to altitude)
    drone.altitude += 25; // Increase the altitude

    // Reset the speed to normal after 5 seconds (from the tutorial https://www.w3schools.com/jsref/met_win_settimeout.asp)
    setTimeout(slowDown, 5000);
    function slowDown() {
        //drone.speed = 0; // Does not work because speed is related to altitude
        drone.altitude = 0;
    }
}

//You will write the function for hoverMode
//Increases the altitude to 50 units and stops the drone from moving horizontally.
function hoverMode() {
    drone.altitude = 50; // Increase the altitude to 50 units
    //drone.speed = 0; // Stop the drone from moving horizontally

    //TODO: Stop the drone from moving horizontally
    //TODO: Record the demo video
}

//You will write the function for mouseMovement
//The drone follows the mouse unless it is in hover modes
function mouseMovement() {
    window.removeEventListener('mousemove', Movedrone); // Ensure old listeners are removed

    window.addEventListener('mousemove', function(event) {
        // Check if the drone is in hover mode (altitude = 50 and speed = 0)
        if (drone.speed === 0) { //TODO: If you change the hover mode logic, update this condition
            // If in hover mode, do nothing (drone shouldn't follow the mouse)
            return;
        }

        // Update the drone's position based on mouse movement
        drone.positionX = event.clientX;
        drone.positionY = event.clientY;

        // Call the update function to reflect the changes
        UpdateTrans();
    });
}