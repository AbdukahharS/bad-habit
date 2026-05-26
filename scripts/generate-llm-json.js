const fs = require('node:fs')

const data = JSON.parse(fs.readFileSync('lib/data/projects.json', 'utf8'))
const output = data.map((p) => ({
  ...p,
  description: p.description.llm,
}))

fs.writeFileSync('public/projects.json', JSON.stringify(output, null, 2))
console.log('Generated public/projects.json for LLM consumption')
