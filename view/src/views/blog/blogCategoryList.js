import React, { useState, useEffect } from 'react'
import { CAvatar, CBadge, CButton, CCollapse, CSmartTable } from '@coreui/react-pro'

const getBadge = (status) => {
  switch (status) {
    case 1: return 'success'   // Active
    case 0: return 'secondary' // Inactive
    default: return 'primary'
  }
}

const BlogCategoryList = () => {
  const [details, setDetails] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/categories/all-category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
         console.log("get categoy data",data.data)
        setItems(Array.isArray(data.data) ? data.data : [])
      })
      .catch(() => setItems([]))
  }, [])

  const columns = [
    { key: 'cat_name', label: 'Category Name', _style: { width: '20%' } },
    { key: 'cat_slugs', label: 'Slug', _style: { width: '20%' } },
    { key: 'status', label: 'Status', _style: { width: '10%' } },
    { key: 'show_details', label: '', _style: { width: '1%' }, filter: false, sorter: false },
  ]

  const toggleDetails = (id) => {
    const position = details.indexOf(id)
    let newDetails = [...details]
    if (position === -1) {
      newDetails = [...details, id]
    } else {
      newDetails.splice(position, 1)
    }
    setDetails(newDetails)
  }

  return (
    <CSmartTable
      columns={columns}
      items={items}
      columnFilter
      columnSorter
      pagination
      scopedColumns={{
        status: (item) => (
          <td>
            <CBadge color={getBadge(item.status)}>
              {item.status === 1 ? 'Active' : 'Inactive'}
            </CBadge>
          </td>
        ),
        show_details: (item) => (
          <td className="py-2">
            <CButton
              color="primary"
              variant="outline"
              shape="square"
              size="sm"
              onClick={() => toggleDetails(item.id)}
            >
              {details.includes(item.id) ? 'Hide' : 'Show'}
            </CButton>
          </td>
        ),
        details: (item) => (
          <CCollapse visible={details.includes(item.id)}>
            <div className="p-3">
              <h4>{item.cat_name}</h4>
              <p className="text-body-secondary">Slug: {item.cat_slugs}</p>
              <CButton size="sm" color="info">Edit</CButton>
              <CButton size="sm" color="danger" className="ms-1">Delete</CButton>
            </div>
          </CCollapse>
        ),
      }}
    />
  )
}

export default BlogCategoryList
