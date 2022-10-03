import React from 'react'
import './App.css'
import Main from './Main'
import { Route, HashRouter, Redirect } from 'react-router-dom';
function App(){
  return (
    <>
      <HashRouter>
        <Route path='/googleclone' exact component={Main} />
        <Redirect from='*' exact to='/googleclone'/>
      </HashRouter>
    </>
  )
}
export default App
