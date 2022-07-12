function get(sets, set_name, input) {
  const removed = []
  const addded = [...input]
  for (let value of sets[set_name]) {
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
    set_name: set_name,
    included: addded,
    excluded: removed
  }
}

export const getNameGroup = (patterns, areaCode) => {
  const { set_name, included, excluded } = SetBelonging(patterns, areaCode)
  let name = set_name
  if (included.length > 0) {
    name = name + '-COM_' + included.join('_')
  }
  if (excluded.length > 0) {
    name = name + '-SEM_' + excluded.join('_')
  }
  return name
}

export default function SetBelonging(sets, input) {

  let ret = { set_name: '', included: { length: Infinity }, excluded: { length: Infinity } }
  for (let set_name in sets) {
    const obj = get(sets, set_name, input)
    if (obj.included.length + obj.excluded.length < ret.included.length + ret.excluded.length) {
      ret = obj
    }
  }

  return ret
}
