import axios from 'axios'

export const register = newUser => {
  return axios
    .post('api/users/register', {
      fullname: newUser.fullname,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('api/users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      if (response.data != null){
        localStorage.setItem('usertoken', response.data)
        return response.data
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export const getProfile = user => {
  return axios
    .get('api/users/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}