import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = ({ target: { value }}) => {
    this.setState({
      ...this.state,
      filters: {
        type: value
      }
    })
    
  }

  onFindPetsClick = () => {
    this.state.filters.type === "all" ? this.fetchAllPets() : this.fetchPetsByType()
  }

  fetchAllPets = () => {
    fetch("/api/pets")
    .then(res => res.json())
    .then(pets => this.putPetsInState(pets))
  }

  fetchPetsByType = () => {
    fetch(`/api/pets?type=${this.state.filters.type}`)
    .then(res => res.json())
    .then(selectedPets => this.putPetsInState(selectedPets))
  }

  putPetsInState = (selectedPets) => {
    this.setState({
      ...this.state,
      pets: selectedPets
    })
  }

  onAdoptPet = id => {
    const updatedPets = this.state.pets.map(pet => pet.id === id ? {...pet, isAdopted: !pet.isAdopted} : pet)
    this.setState(previousState => ({
      ...previousState,
      pets: updatedPets
    }))
    
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
