# About page
just testing cannon's physics

# Notes
- @react-three/cannon lib handles physics
## Physics
- Physics object from cannon is like a context that contains all objects that interacts with themselves

## Debug
- Debug object from cannon is like a context whatever object in it will display what cannon sees of the object.

## Plane
- To create a plane we use planeGeometry.
- To make it interacts with the physics of cannon we use the 'usePlane' hook, parsing the ref it returns as an prop of the plane's mesh.

## CompoundBody
- To create a compound body we use the group tag.
- To give it physics we use the useCompoundBody hook, parsing the ref it returns as an prop of the group of meshes.

## Interaction
- When we set the physics to an object we can receive an api, this api have the methods to interact with the object physics.