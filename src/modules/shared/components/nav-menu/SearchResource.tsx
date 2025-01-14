import { Search01Icon } from "hugeicons-react"

export const SearchResource = () => {
    return (
        <div className='navmenu__search'>
            <input
                placeholder='Buscar recurso'
                type="text"
            />
            <span className='cursor-pointer'>
                <Search01Icon className="text-slate-400" size={20} />
            </span>
        </div>
    )
}
