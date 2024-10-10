# CMPE360 Computer Graphics

## Project 2 - Transformations 

In this project you will implement transformations using JavaScript. You have received an HTML
file that features a basic simulation of Drone.

The absent part of this application (which you will be adding) comprises two JavaScript functions.
The initial one, GetTransform, yields a 3x3 matrix for transformation based on the provided
transformation parameters. Successfully implementing this function is adequate for applying the
accurate transformation to the Drone body. The function is defined as follows: 

- **function GetTransform(positionX, positionY, rotation, scale)**

This function accepts four input parameters: positionX and positionY determine the translation
element, while the remaining two parameters specify the rotation (in degrees) and scale
elements. The resultant transformation should initially apply the scale, followed by rotation, and
finally translation. The transformation matrix is returned as a one-dimensional array of values in
a column-major format. This means that the array indices correspond to the matrix values in the
following manner: 

```
[array[0], array[3], array[6],
 array[1], array[4], array[7],
 array[2], array[5], array[8]]
```

The next function to be developed, **ApplyTransform**, accepts two 3x3 transformation matrices
and produces the resulting transformation as a unified 3x3 transformation matrix, maintaining
the same column-major format as described earlier. The function is outlined as follows: 

- **function ApplyTransform(transform1, transform2)**

The resulting
transformation should initially incorporate trans1, followed by trans2. This second function is
essential for applying the localized transformations of the four propellers prior to applying the
transformation of the Drone body. This is how the propeller are correctly positioned.

You will write the following function also:

- **resetTransform**: This function resets the drone’s position, rotation, scale, and altitude. 
- **boostSpeed**: Temporarily increases the drone's speed for 5 seconds and then resets it to
  the speed is 0. 
- **hoverMode**: Increases the altitude to 50 units and stops the drone from moving
  horizontally. 
- **mouseMovement**: The drone follows the mouse unless it is in hover mode.

To assist you in this project, you have been provided with the following files:

- **project2.html**: This file encompasses the en re implementation, excluding the two
  functions you will be working on. 
- **project2.js**: This file contains the placeholders for the two functions and is included in
  the project2.html file. Ensure both files are in the same directory. 
- The project2.html file also includes several image files: **drone.png, propeller.png,
  shadow.png, and grass.jpeg**. 

Your task is to complete the six functions in the project2.js file so that the UAV moves in tandem
with its shadow.

It is advisable to review how the entire application is structured by examining the JavaScript
code in the project2.html file.

Figure 1 : When you run firstly, you will see this screen:

![Figure 1](https://github.com/fsaltunyuva/CMPE360-Project2-Transformation/blob/main/README%20Figures/Figure%201.png)

Figure 2: After finishing the work, you will see this screen:

![Figure 2](https://github.com/fsaltunyuva/CMPE360-Project2-Transformation/blob/main/README%20Figures/Figure%202.png)