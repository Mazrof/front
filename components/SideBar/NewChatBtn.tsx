export default function NewChatbtn() {
    return (
      <button className="flex items-center justify-center bg-blue-500 text-white rounded-full w-12 h-12 shadow-md transition duration-200 hover:bg-blue-600 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 4h2a2 2 0 012 2v2M8 12l6-6M6 18l4-4"
          />
        </svg>
      </button>
    );
  }
  