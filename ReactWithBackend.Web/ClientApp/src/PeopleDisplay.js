import React from 'react';
import PersonForm from './PersonForm';
import PersonRow from './PersonRow';
import { produce } from 'immer';
import axios from 'axios';
import { data } from 'jquery';

class PeopleDisplay extends React.Component {
    state = {
        people: [],
        selectedPeople: [],
        person: {},
        onAdd: true

    }
    componentDidMount = () => {
        axios.get('/api/people/getpeople').then(({ data }) => {
            this.setState({ people: data });
        });
    }


    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }
    onAddClick = () => {

        axios.post('api/people/addperson', this.state.person).then(() => {
            axios.get('api/people/getpeople').then(({ data }) => {
                this.setState({
                    person: { firstName: "", lastName: "", age: "" },
                    people: data
                });
            });
        })
    }
    onUpdateClick = () => {
        axios.post('api/people/updateperson', this.state.person).then(() => {
            axios.get('api/people/getpeople').then(({ data }) => {
                this.setState({
                    people: data,
                    person: { firstName: "", lastName: "", age: "" },
                    onAdd: true
                })
            });

        });
    }
    onDeleteAll = () => {
        axios.post('api/people/deleteAll', this.state.selectedPeople).then(() => {
            axios.get('api/people/getpeople').then(({ data }) => {
                this.setState({ people: data, selectedPeople: [] })
            })
        })
    }
    onSelectAll = () => {
        this.setState({ selectedPeople: this.state.people.map(p => p.id) })
    }
    onUnselectAll = () => {
        this.setState({ selectedPeople: [] })
    }
    onEditClick = (p) => {
        this.setState({ person: p, onAdd: false })
    }
    onDeleteClick = (p) => {

        axios.post('api/people/DeletePerson', p).then(() => {
            axios.get('api/people/getpeople').then(({ data }) => {
                this.setState({
                    people: data
                })
            })
        })

    }
    onChecked = (id) => {
        let selected = [];
        if (this.state.selectedPeople.includes(id)) {
            selected = this.state.selectedPeople.filter(i => i !== id);
        }
        else {
            selected = [... this.state.selectedPeople, id];
        }
        this.setState({ selectedPeople: selected })
    }   
    cancelClick = () => {
        this.setState({ person: { firstName: "", lastName: "", age: "" }, onAdd: true })
    }

    render() {
        return (
            <div className="container">
                <PersonForm
                    person={this.state.person}
                    firstNameChange={this.onTextChange}
                    lastNameChange={this.onTextChange}
                    ageChange={this.onTextChange}
                    addMode={this.state.onAdd}
                    addClick={this.onAddClick}
                    updateClick={this.onUpdateClick}
                    cancelClick={this.cancelClick}
                />
                <table className="table table-striped table-hover table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>
                                <button className="btn btn-danger btn-block" onClick={this.onDeleteAll}>Delete All</button>
                                <button className="btn btn-info btn-block" onClick={this.onSelectAll}>Select All</button>
                                <button className="btn btn-info btn-block" onClick={this.onUnselectAll}>Unselect All</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.people.map(p => {                           
                            return (
                                <PersonRow key={p.id}
                                    isChecked={this.state.selectedPeople.includes(p.id)}                                    
                                    onChecked={() => this.onChecked(p.id)}
                                    person={p}
                                    onDeleteClick={() => this.onDeleteClick(p)}
                                    onEditClick={() => this.onEditClick(p)}
                                />)
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default PeopleDisplay;