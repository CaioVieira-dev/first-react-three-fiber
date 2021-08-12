# Notes
## GLTF with multiple animations
- Download a character from mixamo
- Download the animations you want to use
- Import the character and one animation in blender
- change the animation name
- change to blender's animation tab
- run the animation at least one time
- delete the armature of the animation
- change from dope sheet to action editor
- select the animation
- click on push down
*repeat this process for each animation*
- export as gltf file

For more info check [this](https://blender.stackexchange.com/questions/228453/exporting-multiple-nla-actions-to-gltf)

## Import from assets folder (Typescript)
To be able to import your models from the assets folder, you will need to declare a module for your model.
To make this, simply create an archive with *".d.ts"* and paste this code:
````
declare module "*.glb" {
    const value: any;
    export default value;
};

````
Then stop and run your project again. 