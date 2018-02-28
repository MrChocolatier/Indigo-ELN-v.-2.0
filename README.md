## Indigo ELN

Indigo ELN allows scientists to prepare, plan, and analyze experiments, access relevant information, and develop new methods in the areas of synthetic chemistry, analytical chemistry, and process chemistry.

### Features

Indigo ELN has the following immediate functionality:

 * Browse, view, and search experiments
 * Create and set up a singleton experiments and concept record page
 * Set up to run experiments and record results
 * Sign and witness experiments
 * Attach documents
 * Print reports and access offline.
 * Register and submit batches automatically
 * Structure and reaction search in Indigo ELN.

Indigo ELN will have the following functionality after integration with the corresponding services:

 * Upload analytical information
 * Retrieve analytical information


## Build dependencies

- NODEJs v6+
- GIT

## Code Style
Before start edit code, you should:
- Install plugin `SonarLint` and config its serverUrl as `https://sonar.epam.com/sonarqube/overview?id=com.epam.indigoeln`
- Import to `IndigoELN/code-style.xml` to settings `Editor/Code Style`
- Enable `Eslint` with `IndigoELN/.eslintrc.json` in `/Languages &  Frameworks/JavaScript/Code Quality Tools`

## Project Structure
IndigoEln client code can be found under src/scripts, it is structured similarly to projects generated by angular-fullstack
```
webapp
├── index.html                        - Application starting page that loads everything
├── bower_components                  - Dependencies retrieved by bower
├── assets
│   ├── fonts                         - Fonts
│   ├── images                        - Images
│   ├── styles                        - CSS stylesheets
├── scripts
│   ├── app                           - App specific components go in here
│   │   ├── app.module.js                    - Main script
│   │   ├── app.constants.js          - Constants generated by build
│   │   ├── main
│   │   │   ├── main.js               - Component's definition like a state/route
│   │   │   ├── main.controller.js    - Component's controller
│   │   │   ├── main.html             - Component's view
│   │   │
│   ├── components                    - Our reusable components, non-specific to our app
│   │   ├── navbar
│   │   │   ├── navbar.js
│   │   │   ├── navbar.controller.js
│   │   │   ├── navbar.html
│   │   ├── util                      - Generic components like filters to format data
```

## License

Indigo ELN is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Indigo ELN is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Indigo ELN.  If not, see <http://www.gnu.org/licenses/>.

## Third-party components

Indigo ELN server part uses the following third-party components: 

- Ketcher (`src/vendors/ketcher`), licensed under the Apache License, Version 2.0
