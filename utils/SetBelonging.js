function searchSetName(sets, value) {
  // encontrar qual o conjunto que o input pertence
  for (let set_name in sets) {
    if (sets[set_name].indexOf(value) >= 0) return set_name
  }
}

export default function SetBelonging(sets, input) {
  // contador
  const counter = {}
  for (let set_name in sets) counter[set_name] = 0

  for (let value of input) {
    const set_name = searchSetName(sets, value)
    if (set_name) counter[set_name] = counter[set_name] + 1
  }

  // verificar qual o maior contador
  let max_set = ''
  for (let set_name in counter) {
    if (counter[max_set]) {
      max_set = Math.max(counter[max_set], counter[set_name]) > counter[max_set] ? set_name : max_set
    } else {
      max_set = set_name
    }
  }

  const removed = []
  const addded = [...input]
  for (let value of sets[max_set]) {
    const index = addded.indexOf(value)
    if (index < 0) {
      // Identificando itens removidos
      removed.push(value)
    } else {
      // Identificando itens adicionados
      addded.splice(index, 1)
    }
  }

  return {
    set_name: max_set,
    included: addded,
    excluded: removed
  }
}

const s = {
  'PADRAO_1': [1, 2, 3],
  'PADRAO_2': [3, 4, 5],
}

const i = [2, 3, 4]

console.log(SetBelonging(s, i))
