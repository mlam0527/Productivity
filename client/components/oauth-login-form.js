import React, { Component } from 'react'

const OauthLoginForm = (props) => {
  return (
    <form methods='get' action='/auth/google'>
      <button type='submit'>Sign In With Google</button>
    </form>
  )
}

export default OauthLoginForm