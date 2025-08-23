import React from "react"

type SelectOptions = {
  value:string | number
  label: string
}

type SelectInputType = {
  id:string
  name: string
  options: SelectOptions[] 
}

const SelectInput = (props:SelectInputType) => {
  return (
    <select
      id="productState"
      name="productState"
      value={productLabel}
      onChange={(e) => setProductLabel(Number(e.target.value) as ProductState)}
      className="w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
    >
      {productStateOptions.map((state) => (
        <option value={state.value}>{state.label}</option>
      ))}
    </select>
  )
}

export default SelectInput
