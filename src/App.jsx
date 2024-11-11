import './App.css'
import { Header } from './component/Header'
import { ListPost } from './component/ListPost'
import { Banner } from './component/Banner'

function App() {
  return (
    <>
      <div>
        <div className="relative z-10">
          <Header/>
        </div>   
        <div className='py-28'>
          <Banner/>
        </div>
        <div className='items-center mx-[18rem]'>
          <ListPost/>
        </div>
      </div>
    </>
  )
}

export default App
