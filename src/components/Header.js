
function Header() {
  return (
    <header className="bg-gray-200">
      <nav className="flex items-center justify-between p-6 h-20 bg-white shadow-sm">
        <div className="py-5 px-3 rounded-full bg-gradient-to-r from-red-800 to-blue-500 text-sm text-white font-semibold shadow-lg hover:cursor-pointer hover:shadow-lg">LOGO</div>
        <ul>
          <li className="space-x-5 text-xl">
            <a href="#" className="hidden sm:inline-block text-gray-700 hover:text-indigo-700">Home</a>
          </li>
          <div className="sm:hidden space-y-1 hover:cursor-pointer">
            <span className="w-10 h-1 bg-gray-600 rounded-full block"></span>
            <span className="w-10 h-1 bg-gray-600 rounded-full block"></span>
            <span className="w-10 h-1 bg-gray-600 rounded-full block"></span>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;