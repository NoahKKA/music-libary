import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './componets/Gallery'
import SearchBar from './componets/SearchBar'
import ArtistView from './componets/ArtistView'
import AlbumView from './componets/AlbumView'
import { Fragment } from 'react'

function App(){
    let [search, setSearch] = useState('Lizzowadsdawdasdawda')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            document.title = `${search} Music`
            const response = await fetch(`https://itunes.apple.com/search?term=${search}`)
            const resData = await response.json()
            console.log(resData)
            if(resData.results.length){
              setData(resData.results)
            } else {
              setMessage(`We could find nothing for "${search}`)
            }
        }
        fetchData()
    }, [search])

    const handleSearch = (e, term) => {
      e.preventDefault();
      setSearch(term)
    }

      return (
        <div>
        {message}
            <Router>
                <Routes>
                    <Route path="/" element={
                        <Fragment>
                            <SearchBar handleSearch = {handleSearch}/>
                            <Gallery data={data} />
                        </Fragment>
                    } />
                    <Route path="/album/:id" element={<AlbumView />} />
                    <Route path="/artist/:id" element={<ArtistView />} />
                </Routes>
            </Router>
        </div>
      )
  
}

export default App

