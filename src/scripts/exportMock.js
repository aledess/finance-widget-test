const fs = require('fs')
const { mockCatalog } = require('../src/mock/catalog')

fs.writeFileSync('public/mock-catalog.json', JSON.stringify(mockCatalog, null, 2))
