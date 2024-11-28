"use client";

interface PopupProps {
    message: string;
    type: "success" | "error";
    onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, type, onClose }) => {
    return (
        <div
            className={`fixed bottom-4 right-4 rounded p-4 shadow-md ${
                type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
        >
            <p>{message}</p>
            <button onClick={onClose} className="mt-2 text-sm underline">
                Close
            </button>
        </div>
    );
};

export default Popup;
