# Project Dependencies and Requirements

## 📋 Overview

This document lists all dependencies and requirements needed to run the Secure Task Management System.

---

## 🔧 System Requirements

### Required Software

| Software    | Minimum Version | Recommended | Purpose            |
| ----------- | --------------- | ----------- | ------------------ |
| **Node.js** | v18.0.0         | v20.19.9    | JavaScript runtime |
| **npm**     | v9.0.0          | v10.0.0+    | Package manager    |
| **Git**     | v2.30.0         | Latest      | Version control    |

### Optional Software

| Software    | Purpose                              |
| ----------- | ------------------------------------ |
| **pnpm**    | Alternative package manager (faster) |
| **Yarn**    | Alternative package manager          |
| **VS Code** | Recommended IDE                      |
| **Postman** | API testing                          |

---

## 📦 Node.js Dependencies

### Production Dependencies

#### Backend Framework (NestJS)

```json
"@nestjs/common": "^11.0.0"           // Core NestJS framework
"@nestjs/core": "^11.0.0"             // NestJS core functionality
"@nestjs/platform-express": "^11.0.0" // Express platform adapter
```

#### Database & ORM

```json
"typeorm": "^0.3.28"                  // TypeORM for database operations
"sqlite3": "^5.1.7"                   // SQLite database driver
"@nestjs/typeorm": "^11.0.0"          // NestJS TypeORM integration
```

#### Authentication & Security

```json
"@nestjs/passport": "^11.0.5"         // Passport integration
"@nestjs/jwt": "^11.0.2"              // JWT token handling
"passport": "^0.7.0"                  // Authentication middleware
"passport-jwt": "^4.0.1"              // JWT strategy for Passport
"passport-local": "^1.0.0"            // Local strategy for Passport
"bcrypt": "^6.0.0"                    // Password hashing
```

#### Validation & Transformation

```json
"class-validator": "^0.14.3"          // Decorator-based validation
"class-transformer": "^0.5.1"         // Object transformation
```

#### Configuration

```json
"@nestjs/config": "^4.0.3"            // Configuration management
"@nestjs/mapped-types": "*"           // DTO mapping utilities
```

#### Frontend Framework (Angular)

```json
"@angular/core": "~21.1.0"            // Angular core
"@angular/common": "~21.1.0"          // Common Angular utilities
"@angular/compiler": "~21.1.0"        // Angular compiler
"@angular/platform-browser": "~21.1.0" // Browser platform
"@angular/platform-browser-dynamic": "~21.1.0" // Dynamic browser platform
"@angular/router": "~21.1.0"          // Routing module
"@angular/forms": "~21.1.0"           // Forms module
"@angular/animations": "^21.1.3"      // Animations module
"@angular/cdk": "^21.1.3"             // Component Dev Kit (Drag & Drop)
```

#### Utilities

```json
"rxjs": "^7.8.0"                      // Reactive programming
"reflect-metadata": "^0.1.13"         // Metadata reflection
"jwt-decode": "^4.0.0"                // JWT token decoding
```

---

### Development Dependencies

#### Build Tools & Monorepo

```json
"nx": "22.4.5"                        // Nx monorepo tool
"@nx/angular": "^22.4.5"              // Nx Angular plugin
"@nx/nest": "^22.4.5"                 // Nx NestJS plugin
"@nx/node": "22.4.5"                  // Nx Node plugin
"@nx/workspace": "22.4.5"             // Nx workspace utilities
"@nx/web": "22.4.5"                   // Nx web utilities
"@nx/webpack": "22.4.5"               // Nx webpack plugin
"@nx/js": "22.4.5"                    // Nx JavaScript plugin
```

#### Angular Build Tools

```json
"@angular/cli": "~21.1.0"             // Angular CLI
"@angular/compiler-cli": "~21.1.0"    // Angular compiler CLI
"@angular/build": "~21.1.0"           // Angular build system
"@angular-devkit/core": "~21.1.0"     // Angular DevKit core
"@angular-devkit/schematics": "~21.1.0" // Angular schematics
"@schematics/angular": "~21.1.0"      // Angular schematics
```

#### TypeScript

```json
"typescript": "~5.9.2"                // TypeScript compiler
"ts-node": "10.9.1"                   // TypeScript execution
"ts-jest": "^29.4.0"                  // TypeScript Jest support
"tslib": "^2.3.0"                     // TypeScript runtime library
```

#### Testing

```json
"jest": "^30.0.2"                     // Testing framework
"jest-environment-jsdom": "^30.0.2"   // DOM environment for Jest
"jest-environment-node": "^30.0.2"    // Node environment for Jest
"jest-preset-angular": "~16.0.0"      // Angular Jest preset
"jest-util": "^30.0.2"                // Jest utilities
"@nestjs/testing": "^11.0.0"          // NestJS testing utilities
"@types/jest": "^30.0.0"              // Jest type definitions
```

#### Linting & Formatting

```json
"eslint": "^9.8.0"                    // ESLint linter
"@eslint/js": "^9.8.0"                // ESLint JavaScript config
"@nx/eslint": "22.4.5"                // Nx ESLint plugin
"@nx/eslint-plugin": "22.4.5"         // Nx ESLint plugin
"angular-eslint": "^21.0.1"           // Angular ESLint
"typescript-eslint": "^8.40.0"        // TypeScript ESLint
"@typescript-eslint/utils": "^8.40.0" // TypeScript ESLint utils
"eslint-config-prettier": "^10.0.0"   // Prettier ESLint config
"prettier": "~3.6.2"                  // Code formatter
```

#### Styling

```json
"tailwindcss": "^3.0.2"               // TailwindCSS framework
"postcss": "^8.4.5"                   // CSS processor
"autoprefixer": "^10.4.0"             // CSS autoprefixer
```

#### Compilation & Bundling

```json
"@swc/core": "~1.5.7"                 // SWC compiler
"@swc/helpers": "~0.5.11"             // SWC helpers
"@swc-node/register": "~1.9.1"        // SWC Node registration
"webpack-cli": "^5.1.4"               // Webpack CLI
```

#### Type Definitions

```json
"@types/node": "20.19.9"              // Node.js types
"@types/bcrypt": "^6.0.0"             // bcrypt types
"@types/passport-jwt": "^4.0.1"       // Passport JWT types
"@types/passport-local": "^1.0.38"    // Passport Local types
```

#### NestJS Development

```json
"@nestjs/schematics": "^11.0.0"       // NestJS schematics
```

---

## 🚀 Installation Instructions

### 1. Install Node.js

**Windows:**

- Download from [nodejs.org](https://nodejs.org/)
- Run the installer
- Verify: `node --version` and `npm --version`

**macOS:**

```bash
brew install node
```

**Linux (Ubuntu/Debian):**

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Clone Repository

```bash
git clone <repository-url>
cd HPuppala-18023069-8027-4aa5-99dc-07eaf624ab5f
```

### 3. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

This will install all dependencies listed in `package.json`.

### 4. Verify Installation

```bash
# Check Nx installation
npx nx --version

# Check Angular CLI
npx ng version

# Check NestJS CLI
npx nest --version
```

---

## 📊 Dependency Statistics

- **Total Dependencies**: 29
- **Total Dev Dependencies**: 54
- **Total Package Count**: 83
- **Estimated Install Size**: ~500 MB (including node_modules)
- **Install Time**: ~2-5 minutes (depending on internet speed)

---

## 🔄 Updating Dependencies

### Check for Updates

```bash
npm outdated
```

### Update All Dependencies

```bash
npm update
```

### Update Specific Package

```bash
npm update <package-name>
```

### Update to Latest Versions

```bash
npx npm-check-updates -u
npm install
```

---

## 🐛 Troubleshooting

### Issue: `npm install` fails

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Version conflicts

**Solution:**

```bash
# Use legacy peer deps
npm install --legacy-peer-deps
```

### Issue: SQLite installation fails on Windows

**Solution:**

- Install Windows Build Tools:

```bash
npm install --global windows-build-tools
```

### Issue: bcrypt installation fails

**Solution:**

```bash
# Rebuild bcrypt
npm rebuild bcrypt --build-from-source
```

---

## 📝 Notes

1. **Node Version**: This project requires Node.js v18 or higher
2. **Package Manager**: npm, pnpm, or yarn can be used
3. **Monorepo**: Uses Nx for monorepo management
4. **Database**: SQLite is used (no separate installation needed)
5. **Platform**: Cross-platform (Windows, macOS, Linux)

---

## 🔗 Useful Links

- [Node.js Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [Nx Documentation](https://nx.dev/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Angular Documentation](https://angular.io/docs)
- [TypeORM Documentation](https://typeorm.io/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

---

## ✅ Quick Verification Checklist

After installation, verify:

- [ ] Node.js installed (v18+)
- [ ] npm installed (v9+)
- [ ] Git installed
- [ ] Dependencies installed (`node_modules` folder exists)
- [ ] No installation errors
- [ ] Backend starts: `npx nx serve api`
- [ ] Frontend starts: `npx nx serve dashboard`
- [ ] Can access app at `http://localhost:4200`

---

**Last Updated**: February 2026  
**Project Version**: 1.0.0
