import React, { Component } from 'react'

const OauthLoginForm = (props) => {
  return (
    // <div>
    //   <div className="g-signin2"></div>
    //   <button type='submit'>Sign In With Google</button>      
    // </div>
    <form methods='get' action='/auth/google'>
      <button type='submit'>Sign In With Google</button>
    </form>
  )
}

export default OauthLoginForm