import Image from "next/image";
export default function ChatsSearchBar() {
  return (
    <div>
      <header className="flex items-center justify-between bg-[#2C2F33] p-4 shadow-md">
        <div className="flex items-center">
          <Image
            src="/images/logo.jpg"
            alt="App Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-white text-xl font-semibold ml-2">Mazrof</h1>
        </div>

        <div className="relative flex-grow mx-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#3E4146] text-white rounded-full py-2 px-4 focus:outline-none"
          />
        </div>

        <div className="flex space-x-4">
          <button className="text-white hover:text-blue-500 transition duration-200">
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}
