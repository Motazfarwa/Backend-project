name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x, 22.x]

    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
          
      # Check if dependencies are missing and install them if necessary
      - name: Install dependencies if not present
        run: |
          if [ ! -d "node_modules" ]; then
            npm install
          else
            echo "Dependencies already installed."
          fi

      - run: npm run build --if-present
      - run: npm test
