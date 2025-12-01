import { useState } from 'react'
import Item from './components/Item'
import cartItems from './constants/cartItem'
import Footer from './components/Footer'
import Modal from './components/Modal'

function App() {
  const [isFooterOpen, setIsFooterOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFooter = () => {
    setIsFooterOpen(!isFooterOpen);
  }

  const toggleModal = () => {
    console.log('모달 열림');
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      {isModalOpen && <Modal onClose={toggleModal}/>}
      <button 
        onClick={toggleFooter}
        className="w-10 h-10 fixed bottom-10 right-10 cursor-pointer text-white bg-black rounded-full">
          +
        </button>
      <div 
        className="overflow-y-auto"
        onClick={toggleFooter}
      >
        {cartItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
      <Footer isOpen={isFooterOpen} onClose={() => setIsFooterOpen(false)} onDeleteAll={toggleModal}/>
    </>
  )
}

export default App
