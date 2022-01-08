import React, { Component } from 'react';


class Login extends Component {
constructor (props){
 super(props);
 this.state = {
    username: '',
    password: ''
   
 };

 this.handleChangeUsername2 = this.handleChangeUsername2.bind(this);
 this.handleChangePassword2 = this.handleChangePassword2.bind(this);
 this.handleSubmit = this.handleSubmit.bind(this);

}


handleChangeUsername2 (event){

this.setState({username: event.target.value})


// console.log(stateToUpdate)
// console.log(this.state.stateToUpdate)
    // this.setState({username: event.target.value});
}

handleChangePassword2 (event){
    this.setState({password: event.target.value})   
}




handleSubmit() {
    console.log(this.state)
    
    // on submit this is going to send all the info to the database to be added into SQL

    const loginData = this.state
    console.log(loginData)
    const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(loginData),
      };
  
    fetch('/nps/login', postOptions)
    .then((res) => res.json())
    .then(data => {
        console.log('success: ' , data)
        
    })
    .catch((err) =>{
        console.error('Error:', err);
    });
}

// if data is sent coreectly, then send to parks 

render () {


    return(
      <div>
      <h1>SAM'S TEST HERE</h1>
      </div> )
         {/*<div>*/}
        {/* <form > */}
        {/* <h1>TEST</h1> */}
        {/* <label>
          Username:
          <input type="text" name = "username" onChange={this.handleChangeUsername2} />
          Password:
          <input type="text" name = "password" onChange={this.handleChangePassword2} />

        </label>
        <input type="submit" value="Submit" onClick={this.handleSubmit}/> */}
      {/* </form> */}
        {/* </div> */}
    //)


}

}

export default Login;