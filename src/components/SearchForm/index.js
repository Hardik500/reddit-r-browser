import './style.css'

export default function SearchForm({handleInputChange}){
    return (
        <div className="search-input--container">
            <form>
                <input type="text" name="title" onChange={handleInputChange} className="search-input--tag" placeholder="Search for a title"/>
            </form>
        </div>
    )
}