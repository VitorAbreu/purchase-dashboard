# PurchaseDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

## Project Overview + some TODOs

This was an interesting and fun project to develop. Although there are still some aspects I would like to improve in the future, I enjoyed working on it and learning along the way.

The layout is quite simple. I didn’t use Tailwind because I would have needed to create design tokens, but I would like to implement it in the future to enhance the interface. Some parts of the implementation could be improved, such as better use of signals in the table. The form design is not very polished yet, and I plan to integrate it more fully with a backend.

Additionally, I would like to make more extensive use of RxJS, which I used sparingly in this project. Finally, I aim to create more elaborate unit tests to improve overall code quality.

## list of completed extensions

1 - used lazy routes
2 - state managemnt with angular signals with service pattern
3 - some friendly messages in the form
4 - theme switcher

live demo in: https://vitorabreu.github.io/purchase-dashboard/
