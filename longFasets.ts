import abilities from './build/hero_abilities.json'

const facets: {
  id: number
  name: string
  icon: string
  color: string
  gradient_id: number
  title: string
  description: string
  len: number
}[] = []

for (const ability of Object.values(abilities)) {
  for (const facet of ability.facets) {
    facets.push({ ...facet, len: facet.description.length })
  }
}

facets.sort((a, b) => b.description.length - a.description.length)
console.log(facets)
