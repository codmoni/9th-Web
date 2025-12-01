type ModalProps = {
    onClose: () => void
}

const Modal = ({onClose}:ModalProps) => {
    const handleDeleteAllItems = () => {
        console.log("delete all items");
        onClose();
    }

    return (
        <>
        <div className="fixed inset-0 z-60 flex justify-center items-center bg-black/20">
            <div className="w-40 h-30 flex flex-col items-center justify-center text-xs gap-2 bg-white shadow-2xl rounded-md">
                <h3>정말 삭제하시겠습니까?</h3>
                <div className="flex gap-4 items-center">
                    <button 
                        onClick={handleDeleteAllItems}
                        className="bg-red-800 rounded-md p-2 text-white"
                    >
                        네
                    </button>
                    <button 
                        onClick={onClose}
                        className="bg-gray-400 rounded-md p-2"
                    >
                        아니요
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Modal;