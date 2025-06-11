import { useState } from 'react'

const useToggle = () => {
    const [isopen, setIsOpen] = useState(false)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)
    const toggle = () => setIsOpen(!isopen)


    return { open, close, toggle, isopen }
}

export default useToggle
