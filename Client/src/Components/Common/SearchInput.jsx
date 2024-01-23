import React from 'react'
import { Input, Space } from 'antd';
const { Search } = Input;

const SearchInput = ({search}) => {
const onSearch = (value, _e, info) =>{
  search(value)
}
return (
    <>
    <Search
      placeholder="input search text"
      allowClear
      onSearch={onSearch}
      style={{
        width: 200,
        marginLeft : 10,
        marginRight : 10
      }}
    />
    </>
  )
}

export default SearchInput
