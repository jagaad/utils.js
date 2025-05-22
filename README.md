# @jagaad/utils

A comprehensive JavaScript/TypeScript utility library that provides a collection of helper functions for Jagaad projects.

[![npm version](https://img.shields.io/npm/v/@jagaad/utils.svg)](https://www.npmjs.com/package/@jagaad/utils)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

`@jagaad/utils` is a collection of utility functions designed to simplify common programming tasks in JavaScript/TypeScript projects. The library provides a wide range of functions categorized by type (array, string, date, etc.) with proper TypeScript typing to enhance developer experience.

## Installation

You can install the package using npm:

```bash
npm install @jagaad/utils
```

## Usage

Import the entire library:

```typescript
import { clamp } from '@jagaad/utils';

// Use any utility
const clampedValue = clamp(10, 20, 30);
```

## Available Utilities

Please browse the repository [source code](./src/) to know more details

<!-- API-MARKER -->

<!-- API-MARKER -->

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

> [!NOTE]
> Please make sure that you add only generic types and utilities.  
> Anything that is more specific, should live in the project repository itself.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## Building from Source

```bash
# Clone the repository
git clone https://github.com/jagaad/utils.js.git
cd utils.js

# Install dependencies
npm install

# Build the library
npm run build
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Developed and maintained by the Jagaad Team
- Inspired by utility libraries like lodash, ramda, type-fest and others.
