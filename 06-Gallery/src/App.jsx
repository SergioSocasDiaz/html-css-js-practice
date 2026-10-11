import { Header } from './components/Header.jsx'
import {SearchPage} from './pages/SearchPage.jsx'
import { Footer } from './components/Footer.jsx'
import {useRouter} from './hooks/useRouter.jsx'
import { Route } from './components/Route.jsx'
import { PrincipalPage } from './pages/PrincipalPage.jsx'
import {AsideMenu} from './components/AsideMenu.jsx'
import {useState} from 'react'
export function App() {

  const [path, setPath] = useRouter()

  const [isOpen, setIsOpen] = useState(false)
      function handleMenuClick() {
          setIsOpen(!isOpen)
      }
  

  return (
    <>
      <Header handleMenuClick={handleMenuClick}/>
      <AsideMenu isOpen={isOpen}/>
      <main>
        <Route path='/' component={PrincipalPage}/>
        <Route path='/search' component={SearchPage}/>
      </main>

      <Footer/>
    </>
  )
}
