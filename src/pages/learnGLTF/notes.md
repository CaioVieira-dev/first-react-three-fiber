# Notes
## Generate GLTF(".glb")
 - Get a 3D model and import it in blender.
 - export as GTLF
### Models from mixamo
 - Download the model
 - Import in blender
 - Rename the animation
 - export as GTLF

 ## Creating the React component
 - Go to [https://gltf.pmnd.rs/](https://gltf.pmnd.rs/) and drop your GLTF file.
 - Copy the generated code and paste it at your project
 ### Typescript bugfix
   If you're using typescript, check the types box at the configuration bar, this will create the types for the model

 ## Using the Model component
 - Put you model (the GLTF file) in the public folder
 - Insert the model component inside a Canvas

 ## Animations
 - use the actions variable returned from useAnimations hook to handle animation events, like play and stop
 ### Typescript bugfix
 If you're using typescript and you have created your react model component like this note says, you may have a bug with your animation, to fix it follow [this issue solution](https://github.com/pmndrs/gltfjsx/issues/101)
 
