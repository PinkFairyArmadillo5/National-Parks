import React, { Component } from 'react';


class SignUp extends Component {
constructor (props){
 super(props);
 this.state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email:''
 };

 this.handleChangeUsername = this.handleChangeUsername.bind(this);
 this.handleChangePassword = this.handleChangePassword.bind(this);
 this.handleChangefirstName = this.handleChangefirstName.bind(this);
 this.handleChangelastName = this.handleChangelastName.bind(this);
 this.handleChangeEmail = this.handleChangeEmail.bind(this);
 this.handleSubmit = this.handleSubmit.bind(this);
}


handleChangeUsername (event){

this.setState({username: event.target.value})


// console.log(stateToUpdate)
// console.log(this.state.stateToUpdate)
    // this.setState({username: event.target.value});
}

handleChangePassword (event){
    this.setState({password: event.target.value})   
}

handleChangefirstName (event){
    this.setState({firstName: event.target.value})   
}

handleChangelastName (event){
    this.setState({lastName: event.target.value})   
}

handleChangeEmail (event){
    this.setState({email: event.target.value})   
}


handleSubmit() {
    // console.log(this.state)
    
    // on submit this is going to send all the info to the database to be added into SQL

    const newPerson = this.state
    console.log(newPerson)
    const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(newPerson),
      };
  
    fetch('/nps', postOptions)
    .then((res) => res.json())
    .then(data => {
        console.log('success: ' , data)
    })
    .catch((err) =>{
        console.error('Error:', err);
    });
}


// // form  each text box to have its own habdler 

// // function handleChange(e){ 
// //     const stateToUpdate = e.target.name
// // //set the state, and update using syntax like
// //     //stateToUpdate: e.target.value
// // }

// {/* <input text name =  "username" onChange = () =>  */}

render () {


    return(
        <div>
        {/* <form > */}
        <label>
          Username:
          <input type="text" name = "username" onChange={this.handleChangeUsername} />
          Password:
          <input type="text" name = "password" onChange={this.handleChangePassword} />
          First Name:
          <input type="text" name = "firstName" onChange={this.handleChangefirstName} />
          Last Name:
          <input type="text" name = "lastName" onChange={this.handleChangelastName} />
          Email:
          <input type="text" name = "email" onChange={this.handleChangeEmail} />

        </label>
        <input type="submit" value="Submit" onClick={this.handleSubmit}/>
      {/* </form> */}
        </div>
    )


}

}

export default SignUp;