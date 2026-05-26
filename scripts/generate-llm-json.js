const fs = require('node:fs')

const SITE_URL = 'https://abdukahhar.uz'
const data = JSON.parse(fs.readFileSync('lib/data/projects.json', 'utf8'))
const output = data.map((p) => ({
  ...p,
  description: p.description.llm,
  image: `${SITE_URL}/projects/${p.image}`,
}))

fs.writeFileSync('public/projects.json', JSON.stringify(output, null, 2))
console.log('Generated public/projects.json for LLM consumption')
