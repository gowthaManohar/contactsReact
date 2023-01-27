import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import ContactItem from './components/ContactItem'

import './App.css'

const initialContactsList = [
  {
    id: 1,
    name: 'Ram',
    mobileNo: 9999988888,
    isFavorite: false,
  },
  {
    id: 2,
    name: 'Pavan',
    mobileNo: 8888866666,
    isFavorite: true,
  },
  {
    id: 3,
    name: 'Nikhil',
    mobileNo: 9999955555,
    isFavorite: false,
  },
]

class App extends Component {
  state = {
    contactsList: initialContactsList,
    name: '',
    mobileNo: '',
  }

  onAddContact = event => {
    event.preventDefault()
    const {mobileNo, name} = this.state
    const newcontact = {id: uuid(), name, mobileNo, isFavorite: false}
    this.setState(prev => ({
      contactsList: [...prev.contactsList, newcontact],
      name: '',
      mobileNo: '',
    }))
  }

  onChangeMobileNo = event => {
    this.setState({mobileNo: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  favouriteToggle = id => {
    this.setState(prev => ({
      contactsList: prev.contactsList.map(each => {
        if (id === each.id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  render() {
    const {name, mobileNo, contactsList} = this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Contacts</h1>
          <form className="contact-form-container" onSubmit={this.onAddContact}>
            <input
              value={name}
              onChange={this.onChangeName}
              className="input"
              placeholder="Name"
            />
            <input
              className="input"
              value={mobileNo}
              onChange={this.onChangeMobileNo}
              placeholder="Mobile Number"
            />
            <button type="submit" className="button">
              Add Contact
            </button>
          </form>
          <ul className="contacts-table">
            <li className="table-header">
              <p className="table-header-cell name-column">Name</p>
              <hr className="separator" />
              <p className="table-header-cell">Mobile Number</p>
              <hr className="separator" />
            </li>
            {contactsList.map(eachContact => (
              <ContactItem
                favouriteToggle={this.favouriteToggle}
                key={eachContact.id}
                contactDetails={eachContact}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
