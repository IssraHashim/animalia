import axios from 'axios'
import React, { useState } from 'react'
import { getTokenFromLocalStorage } from '../helpers/Auth'
import { useHistory } from 'react-router-dom'
import { ImageUploadField } from './ImageUploadField'



const AddAnimal = () => {
  const history = useHistory()
  // const [image, setImage] = useState('')
  // const [url, setUrl] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    class: '',
    image: '',
    interestingFact: '',
    habitat: '',
    diet: '',
    size: null,
    averageLifeSpan: ''
  })

  const handleChange = (event)=> {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleImageUrl = url => {
    setFormData({ ...formData, image: url } )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      axios.post('/api/animals', formData, {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` }
      })
      history.push('/animals')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className='section'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Add an animal</h1>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input" type="text" placeholder="Name" name ='name' value={formData.name} onChange={handleChange}/>
          </div>
        </div>

        <div className="field">
          <label className="label">Image</label>
          <div className="control">
            <ImageUploadField          
              value={formData.image}
              name="image"
              handleImageUrl={handleImageUrl}
            />
            {formData.image &&
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
              <img src={formData.image} alt='image' id='book_image_add' />
            </div>}
          </div>
        </div>

        <div className="field">
          <label className="label">Species</label>
          <div className="control">
            <input className="input " type="text" placeholder="Species" name ='species' value={formData.species} onChange={handleChange}/>
          </div>
        </div>

        <div className="field">
          <label className="label">Class</label>
          <div className="control">
            <input className="input " type="text" placeholder="Class" name ='class' value={formData.class} onChange={handleChange}/>
          </div>
        </div>

        <div className="field">
          <label className="label">Habitat</label>
          <div className="control">
            <input className='input' type='text' placeholder='Habitat' name ='habitat' value={formData.habitat} onChange={handleChange}/>
          </div>
        </div>

        <div className="field">
          <label className="label">Diet</label>
          <div className="control">
            <input className='input' type='text' placeholder='Diet' name ='diet' value={formData.diet} onChange={handleChange}/>
          </div>
        </div>
        <div className="field">
          <label className="label">Size</label>
          <div className="control">
            <input className='input' type='number' placeholder='Size' name ='size' value={formData.size} onChange={handleChange}/>
          </div>
        </div>
        <div className="field">
          <label className="label">Average Life Span</label>
          <div className="control">
            <input className='input' type='number' placeholder='Average Life Span' name ='averageLifeSpan' value={formData.averageLifeSpan} onChange={handleChange}/>
          </div>
        </div>
        <div className="field">
          <label className="label">interestingFact</label>
          <div className="control">
            <textarea className="textarea" placeholder="Interesting Fact" name ='interestingFact' value={formData.interestingFact} onChange={handleChange}></textarea>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>
    </section>
  )
}



export default AddAnimal