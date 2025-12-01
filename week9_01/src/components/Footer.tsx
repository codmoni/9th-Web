import clsx from "clsx";
import cartItems from "../constants/cartItem";
import Item from "./Item";

type FooterProps = {
    isOpen: boolean;
    onClose: () => void;
    onDeleteAll: () => void;
}

const Footer = ({ isOpen, onClose, onDeleteAll }: FooterProps) => {
    return (
        <>
            {/* Overlay - 외부 영역 클릭 감지 */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-opacity-50 z-40"
                    onClick={onClose}
                />
            )}
            
            {/* Footer */}
            <div 
                className={clsx(
                    "fixed bottom-0 left-0 w-full p-2 bg-white shadow-[0_-8px_25px_rgba(0,0,0,0.1)] z-50 transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-y-0" : "translate-y-full"
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col h-80">
                    <header className="h-14 flex items-center border-b border-gray-200">장바구니</header>
                    <div className="flex-1 overflow-y-auto p-2">
                        {cartItems.map((item) => (
                            <Item key={item.id} item={item} />
                        ))}
                    </div>
                    <div className="w-full flex justify-center">
                        <button onClick={onDeleteAll} className="border border-gray-400 rounded-md p-3 cursor-pointer">전체 삭제</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;
