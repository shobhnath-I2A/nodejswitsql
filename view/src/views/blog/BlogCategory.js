import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CButton, CForm, CFormInput, CRow,CFormSelect  } from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { redirect } from 'react-router-dom'

const BlogCategory = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    cat_name: '',
    cat_slugs: '',
    meta_title: '',
    meta_desc: '',
    meta_keys: '',
    tags: '',
    status: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/api/v1/categories/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (response.ok && data.success) {
        toast.success(data.message)
        setForm({
          cat_name: '',
          cat_slugs: '',
          meta_title: '',
          meta_desc: '',
          meta_keys: '',
          tags: '',
          status: '',
        })
        navigate('/blog/category-list')
      } else {
        toast.error(data.message || data.error || 'Failed to create category')
      }
    } catch (error) {
      toast.error('Network error')
    }
  }

  return (
    <>
      <ToastContainer />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Category</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3" onSubmit={handleSubmit}>
                <CCol md={6}>
                  <CFormInput name="cat_name" value={form.cat_name} onChange={handleChange} placeholder="Category Name" />
                </CCol>
                <CCol md={6}>
                  <CFormInput name="cat_slugs" value={form.cat_slugs} onChange={handleChange} placeholder="Category Slug" />
                </CCol>
                <CCol md={6}>
                  <CFormInput name="meta_title" value={form.meta_title} onChange={handleChange} placeholder="Meta Title" />
                </CCol>
                <CCol md={6}>
                  <CFormInput name="meta_desc" value={form.meta_desc} onChange={handleChange} placeholder="Meta Description" />
                </CCol>
                <CCol md={6}>
                  <CFormInput name="meta_keys" value={form.meta_keys} onChange={handleChange} placeholder="Meta Keys" />
                </CCol>
                <CCol md={6}>
                  <CFormInput name="tags" value={form.tags} onChange={handleChange} placeholder="Tags" />
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    aria-label="Select status"
                    options={[
                      { label: 'Open this select menu', value: '' },
                      { label: 'Active', value: '1' },
                      { label: 'Inactive', value: '0' }
                    ]}
                  />
                </CCol>
                <CCol xs={12}>
                  <CButton color="primary" type="submit">
                    Submit
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default BlogCategory
