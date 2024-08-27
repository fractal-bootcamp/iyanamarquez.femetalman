const SetupLayout = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 pt-24">
            <button className="bg-slate-500 hover:bg-slate-700 text-white text-3xl  font-bold py-2 px-4 rounded mb-2 transition-transform duration-200 ease-in-out active:scale-95 focus:outline-none ">Select config</button>
            <button className="bg-slate-500 hover:bg-slate-700 text-white text-3xl font-bold py-2 px-4 rounded mb-2 transition-transform duration-200 ease-in-out active:scale-95 focus:outline-none">Select coordinates</button>

        </div>
    )
}

export default SetupLayout;