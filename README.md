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
