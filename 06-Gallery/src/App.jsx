import { useState } from 'react'

import { Header } from './components/Header.jsx'
import {SearchPage} from './pages/SearchPage.jsx'
import { Footer } from './components/Footer.jsx'
import {useRouter} from './hooks/useRouter.jsx'
export function App() {

  //Provisional
  const [path, setPath] = useRouter()
  return (
    <>
      <Header/>

      <main>
        <SearchPage/>
      </main>

      <Footer/>
    </>
  )
}
