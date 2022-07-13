# Fitness Tracker v14

Description TBA.

## Primary Todos - MEASUREMENTS VIEW

- [ ] `Created At` label changed to `Created Date` (also Finished At!)
- [ ] Default visible columns should be `id` and `createdAt`? (save in a meta settings table?)
- [ ] Might need to do the dialogs as seperate pages (routes)
- [ ] Might want to manage with state (createItem, editItem, etc.)

  - [ ] `CreateDialog` on `openCreateDialog` load defaults into `input` state (reset on save)
  - [ ] `EditDialog` on `openEditDialog` load id data into `input` state (reset on save)

- [ ] Complete `MeasurementsView` to figure out how to complete similar views
  - [ ] `Create` action (fullscreen dialog)
    - [] New `Measurement Activity`
    - [ ] New `Measurement Record`
  - [ ] `Edit` action (fullscreen dialog)
    - [ ] Existing `Measurement Activity`
    - [ ] Existing `Measurement Record`
  - [ ] `Details` action (fullscreen dialog)
    - [ ] Make it more readable
  - [ ] `Report` action (fullscreen dialog)
    - [ ] Viewable `Measurement Records` as a graphed `Report`

## Secondary Todos

- [ ] Additional `Measurements`

  - [ ] `Water Intake` (oz or ml)
  - [ ] `Calories` (value?)

- [ ] Build out core `Input` components

  - [ ] `ExerciseSet`
    - [ ] Component setup
    - [ ] Control based on Track Booleans

- [ ] Global `Dialogs` (less repeated code)

  - [ ] Use STATE to manage them
  - [ ] `ConfirmDialog`
    - [ ] confirmFunc
    - [ ] STATE for activation
  - [ ] `FullscreenDialog`
    - [ ] saveFunc
    - [ ] STATE for activation

- [ ] `App Logs` View

  - [x] Clear
  - [ ] Report
  - [x] Details
  - [x] Delete

- [ ] `Measurements` View

  - [ ] `Activities` Tab
    - [ ] Create
    - [x] Clear
    - [ ] Report
    - [x] Details
    - [ ] Edit
    - [x] Delete
  - [ ] `Records` Tab
    - [ ] Create
    - [x] Clear
    - [ ] Report
    - [x] Details
    - [ ] Edit
    - [x] Delete

- [ ] `Exercises` View

  - [ ] `Activities` Tab
    - [ ] Create
    - [x] Clear
    - [ ] Report
    - [x] Details
    - [ ] Edit
    - [x] Delete
  - [ ] `Records` Tab
    - [ ] Create
    - [x] Clear
    - [ ] Report
    - [x] Details
    - [ ] Edit
    - [x] Delete

- [ ] `Workouts` View

  - [ ] `Activities` Tab
    - [ ] Create
    - [x] Clear
    - [ ] Report
    - [x] Details
    - [ ] Edit
    - [x] Delete
  - [ ] `Records` Tab
    - [ ] Create
    - [x] Clear
    - [ ] Report
    - [x] Details
    - [ ] Edit
    - [x] Delete

- [ ] How to overwrite route history
- [ ] Fix `Options` View
- [ ] Build reusable components for activity/record views

  - [ ] Remove options that are no longer needed

- [ ] Build basic tests for composable files (`use`)

- [ ] Complete `ActiveWorkout` view
  - [ ] Layout (header/footer)
  - [ ] Input fields for exercises
  - [ ] Placeholder page if workout id is gone (search if its done?)
- [ ] App Functionality
  - [ ] Find out how to unit test your `composables`
  - [ ] UseVue for days before/since
  - [ ] Workouts and exercises (with varying fields)
  - [ ] Record history and charts
  - [ ] Enitity editing (CRUD)
  - [ ] Field validation
  - [ ] Fitness data importer/exporter
  - [ ] Validators for LocalDatabase creates and edits
- [ ] `LAST!!!` Flesh out app theme/design elements

## Various Ideas

New fields for certain types:

```javascript
const _Entity = {
  updatedAt: 'equals createdAt when made',
}
const Activity = {
  categories: 'array of Category enums',
  equipment: 'array of Equipment enums',
}
```

## Notes from Jest Talk

- ts-jest
- JestConfig
  - Coverage Reports
  - Max concurrency
- package.json > args = `--watch --verbose --silent`
  - silent means no console logs
- Typescript: `Partial<T>`
- Jest object comparison using `.toStrictEqual(...)`
- `npx jest` vs `npm jest`
- Process: `Given` > `When` > `Then`
- Jest coverageThreshold \*
- Setup TS info for mock
  - jest.mock('...')
- use `as const` to see extra TS info
- aws-sdk-client-mock (v3)
  - mockClient(...) <- S3, etc.
- Example repo: `swftdev/typescript-testing`

## Ideas

Hygen Updates (`hygen class new`)

- Parameters
  - Parameter name:
  - Parameter type:
    - Simple types...
    - Custom type
  - Parameter usage:
    - Required
    - Optional
    - Defaulted
  - Parameter default value:
  - Parameter updatable? (LocalDatabase classes only)
    - boolean
  - Parameter inherited?
    - boolean

```javascript
{
  parameters: [
    {
      paramName: 'sets',
      paramType: 'ExerciseSet[]',
      paramUsage: 'Defaulted',
      paramDefault: [],
      paramUpdatable: true,
      paramInherited: true,
    },
    // more parameters...
  ]
}
```

## Design Drafts

```typescript
// Importer & Exporter
interface ExportSummary {
  appVersion: number
  exporterVersion: number
  createdAt: date
  totalCategories: number
  totalEquipment: number
  totalWorkouts: number
  totalWorkoutRecords: number
  totalExercises: number
  totalExerciseRecords: number
  totalMeasurementRecords: number
  categories: []
  equipment: []
  workouts: []
  workoutRecords: []
  exercises: []
  exerciseRecords: []
  measurementRecords: []
}
```

```bash
###############################################################################
#                                                                             #
#                           POST CLONING REMINDERS:                           #
#                                                                             #
#  - Update package.json file                                                 #
#    - "name"                                                                 #
#    - "description"                                                          #
#    - "version"                                                              #
#    - "repository"                                                           #
#    - "bugs"                                                                 #
#    - "homepage"                                                             #
#  - Update this README.md file                                               #
#    - Remove unneeded sections (even this one)                               #
#    - Add detailed project description below heading                         #
#  - Update GitHub repository settings                                        #
#    - Description                                                            #
#    - Website                                                                #
#    - Topics                                                                 #
#    - The "Include in the home page" section                                 #
#                                                                             #
###############################################################################
```

## Table of Contents

- [Usage](#usage)
- [Project Setup](#project-setup)
- [Additional Notes](#additional-notes)

## Usage

Install the project dependencies.

```sh
npm i
```

Launch the dev server site.

```sh
npm run dev
```

Build the project `dist` directory.

```sh
npm run build
```

Run tests and coverage report (press `q` to quit).

```sh
npm test
```

Build and deploy the `dist` directory.

```sh
npm run deploy
```

Check for outdated packages.

```sh
npm outdated
```

Update packages based on `package.json` version settings. Test if you update to the latest version.

```sh
npm upgrade
```

## Project Setup

### Vue 3 with Vite

Initialize a new Vue 3 project with Vite and follow the prompts.

```sh
npm init vue@latest
```

### Vitest

Setup may require you to install the `c8` package when you first run `vitest`.

There are at least two test scripts in the `package.json` file. One that generates a coverage report
(slow). One that does NOT generate a coverage report (fast).

### VSCode

I've included the `.vscode` folder in this project. It has extension recommendations and some useful
code snippets.

### Git Ignore

Setup with some good defaults based on the default `node` project `.gitignore` file.

### Prettier

Setup `.prettierrc.js` and `.prettierignore` files that should work with ESLint using
`eslint-config-prettier` package.

### GitHub Pages

Install gh-pages for GitHub Pages deployments.

```sh
npm i -D gh-pages
```

Use the `deploy` script in `package.json` to build and deploy your project. It makes a copy of the
`index.html` in `dist` as `404.html` to address complications related to routing. This let's you
avoid using hash based routing (which looks ugly).

### Chart.js

The amazing chart.js package.

```sh
npm i chart.js
```

The Vue 3 wrapper for chart.js (vue-chart-3).

```sh
npm i vue-chart-3
```

### Quasar

`TODO`: Might be switching to the `Quasar CLI with Vite` setup...

Install quasar and it's extras if desired (fonts, icons, etc).

```sh
npm i quasar @quasar/extras
```

Install the Quasar Vite plugin and SASS.

```sh
npm i -D @quasar/vite-plugin sass@1.32.0
```

Use the configurator tool to help setup Quasar for your specific project. It generates the files
you'll need to copy over based on your selection.

`https://quasar.dev/start/vite-plugin`

### Dexie

A wrapper package for `IndexedDB` in the browser.

Using this package to store the apps data in an easy to use local database. I've wrapped `Dexie`
with a class called `LocalDatabase` in this project.

Installing the package.

```sh
npm i dexie
```

### Hygen

Code generator that internally makes use of the `inquirer` (or `enquirer`) package.

Install the latest version globally.

```sh
npm i -g hygen
```

Initialize in a project only **once**. You should see a `~/_templates` directory.

```sh
hygen init self
```

My Boilerplate Generators

- `class`
- `util`

Create a new Hygen generator with the following steps:

1. Create a generator **NAME** directory in `~/_templates`

   - Like `class`, `component`, or `util`

2. Create a generator **ACTION** directory in the **NAME** directory

   - Like `new`, `add`, or `help`

3. Add your generator files to the **ACTION** directory

   - `*.ejf.t`
   - `*.test.ejs.t`
   - `index.js` (if using console prompts)

You can run your generators with the following command.

```sh
hygen {NAME} {ACTION}
```

You can run your ACTION help files with the following command.

```sh
hygen {NAME} help
```

### Services

Common services you can reuse in other projects located at `~/src/services/*`

- `LocalDatabase`
- `LocalStorage`
- `Logger`

### Utils

Common utilities you can reuse in other projects located at `~/src/utils/*`

- `build-id`
- `common`
- `date-time`

## Additional Notes

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) +
[Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable
Vetur) +
[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI
with `vue-tsc` for type checking. In editors, we need
[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin)
to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a
[Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669)
that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select
      `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
