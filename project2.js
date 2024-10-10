// TO DO 1: Provides a 3x3 transformation matrix represented as an array containing 9 values arranged in column-major sequence.
// Initially, the transformation employs scaling, followed by rotation, and ultimately, translation.
// The specified rotation measurement is in degrees.
function GetTransform(positionX, positionY, rotation, scale) {
    var angle = rotation * Math.PI / 180;
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    // Scaling Matrix
    var scaling_matrix = [scale, 0, 0, 0, scale, 0, 0, 0, 1];

    // Rotation Matrix
    var rotation_matrix = [cos, sin, 0, -sin, cos, 0, 0, 0, 1];

    // Translation Matrix
    var translation_matrix = [1, 0, 0, 0, 1, 0, positionX, positionY, 1];

    // Merge the three matrices with the order of scaling, rotation, and translation

    // Step 1: Apply scaling and rotation
    // var scale_and_rotate = ApplyTransform(rotation_matrix, scaling_matrix);
    var scale_and_rotate = ApplyTransform(scaling_matrix, rotation_matrix);

    // Step 2: Apply translation
    //var final_transform = ApplyTransform(translation_matrix, scale_and_rotate);
    var final_transform = ApplyTransform(scale_and_rotate, translation_matrix);

    return final_transform; // Return the final 3x3 transformation matrix
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

    // let matrix = Array(9).fill(0);
    // for (var i = 0; i < 3; i++) {
    //     for (var j = 0; j < 3; j++) {
    //         for (var k = 0; k < 3; k++) {
    //             matrix[i * 3 + j] += trans1[i * 3 + k] * trans2[k * 3 + j];
    //         }
    //     }
    // }
    // return matrix;

    return result;
}


//You will write the function for ResetTransform
//This function resets the drone’s position, rotation, scale, and altitude
function resetTransform() {
    drone.positionX = 0;
    drone.positionY = 0;
    drone.rotation = 0;
    drone.scale = 1;
    drone.altitude = 0;
}


//You will write the function for boostSpeed
//Temporarily increases the drone's speed for 5 seconds and then resets it to the normal speed.
function boostSpeed() {
    // Increase the speed
    drone.speed = 10;
    // Reset the speed after 5 seconds
    setTimeout(function() {
        drone.speed = 5;
    }, 5000);

}

//You will write the function for hoverMode
//Increases the altitude to 50 units and stops the drone from moving horizontally.
function hoverMode() {
    drone.altitude = 50;
    drone.speed = 0; // Stop the drone from moving horizontally
}

//You will write the function for  mouseMovement
//The drone follows the mouse unless it is in hover modes
function mouseMovement() {
    // Remove the existing event listener for mouse movement, if any
    window.removeEventListener('mousemove', Movedrone);

    // Add a new mouse movement listener that respects hover mode
    window.addEventListener('mousemove', function(event) {
        // Check if the drone is in hover mode (altitude = 50 and speed = 0)
        if (drone.altitude === 50 && drone.speed === 0) {
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