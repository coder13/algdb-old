# Algs

For now, before I add a database, this is the static storage for algs. You manually modify here to add algs.

## Algsets:

They are all jsons even though they have a .hson extension. The algsets being hanson files just allows the json to look prettier but it's still all json.
The algsets take 3 keys to start: `id`, `name` and `abbrev`. `id` is what's used in the url. Nice lowercase and not a name with spaces. Then `name` is the Name of the algset you'll see on it's page and when listed with other algsts. And `abbrev` is a short abbreviation for when needed. It'll typically be an uppercase'd id.
Then it will contain a description and either subets, cases or both. If your algset just has subsets, add those. If it has just cases, don't add subsets. And if it by chance has both, add them.

## Subsets:

This can either be a string linking to another json in the directory or an object.
For the object: It contains either a cube object and optional name, description and either subsets or cases.

## Cube object
You can either specify what the cube should look like by using a cube object which is made up of a corners and edges which are each made up of permuation and orientation.
```json
cube: {
    corners: {
        perm: [0,1,2,3,4,5,6,7], (8 corners, starting from bl and move in a clockwise motion. First 4 are top layer, second 4 are down layer)
        orient: [0,0,0,0,0,0,0,0] (Each specify which corners are oriented, all in the same place as perm)
    }, edges: {
        perm: [0,1,2,3,4,5,6,7,8,9,10,11], (12 edges, starting from UB and going in a clockwise, then E layer edges starting from bl and clockwise, then bottom layer and clockwise)
        orient: [0,0,0,0,0,0,0,0,0,0,0,0] (which edges are flipped, all in the same place as perm)
    }
}```

Or you can individually specify these by using cp, co, ep or eo.

## Case
contains a cube object, list of algs and optional name and comment.

## Algs:
Contains a type which can either be an array or a string and can either be * or specify all or TH, OH and optimal. * will refer to TH / OH.
Then contains a auf: either nothing, U, U' or U2.
And finally the alg: a simple string.


