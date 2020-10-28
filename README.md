# Steps to create this project
## More or less in order

```bash
yarn create next-app --example with-chakra-ui lireddit-web
```
After, delete example components.
Add Typescript:
```bash
yarn add --dev typescript @types/node
```
Rename Files to TSX
Keep `_app.tsx` as it is. It contains the Theming from Chakra

Modify Index for Hello world.

Create Register. Every new component in `pages/` is a route.

Workflow for creating queries or mutations:
 
* Add mutation/query in the `graphql/queries` or `graphql/mutations` folder.
* run the code generation from the package.json.
```json
    "gen-graphql-types": "graphql-codegen --config codegengraphql.yml"
```
* hooks should be generated based on the name of the Query/mutation.

This generates hooks for the queries/mutations based on the names given in the .graphql files
This is good because 
Urql-hooks automatically investigate the cache before they send a new data request to the outside world.

Update the cache through `exchange-graphcache` to share the updated cache data.
All the hook-callers (in a way subscribers) have access to the cache-pool, and update the props based on it.
The urql-cache disappears after browser refresh and urql sends new requests.
