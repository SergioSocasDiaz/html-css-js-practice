import { useState } from 'react'

import { Header } from './components/Header.jsx'
import {SearchPage} from './pages/SearchPage.jsx'
import { Footer } from './components/Footer.jsx'
import {useRouter} from './hooks/useRouter.jsx'
import { Route } from './components/Route.jsx'
import { PrincipalPage } from './pages/PrincipalPage.jsx'
export function App() {

  const [path, setPath] = useRouter()


  return (
    <>
      <Header/>

      <main>
        <Route path='/' component={PrincipalPage}/>
        <Route path='/search' component={SearchPage}/>
      </main>

      <Footer/>
    </>
  )
}
