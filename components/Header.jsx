const Header = () => {
  return (
    <header className="py-5 px-5 flex justify-between ">
      <h1 className=" text-3xl font-bold ">
        Board
        <span className="  p-1 mr-2 rounded-md  bg-gradient-to-r from-purple-400 to-yellow-400">
          Guru
        </span>
      </h1>
      <form action="">
        <input
          type="text"
          placeholder="Search Task..."
          className="shadow-lg ring-1 rounded-md ring-black/5 p-2 border-2"
        />
      </form>
      <div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100
      rounded-md filter blur-3xl opacity-50 -z-50 "
      />
    </header>
  );
};

export default Header;
