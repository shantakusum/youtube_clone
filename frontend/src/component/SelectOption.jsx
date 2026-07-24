import React from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const SelectOption = ({colorOptions,onChange}) => {
  return (
    <>
    <Select 
      onChange={onChange}                          // select component onchange ko selected option deta hai   [{label: entertainment, value: 1}{label: movie, value: 2}] then handleSelectChange chalta hai aur selectedOption me ye array chali jati hai
      className="w-full border rounded-lg p-3"
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={colorOptions}
    />
    </>
  )
}

export default SelectOption;