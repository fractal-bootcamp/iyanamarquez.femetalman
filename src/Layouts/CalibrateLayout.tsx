const CalibrateLayout = () => {
    return (
        <div>
            <div className="flex flex-row justify-around items-center gap-4 pt-20">
                <h1 className="text-4xl font-bold">Left Arm</h1>
                <h1 className="text-4xl font-bold">Right Arm</h1>
            </div>

            <div className="flex flex-row justify-around items-center gap-4 pt-20">
                <div className="flex flex-col gap-4">
                    <button className="bg-gray-500 text-white px-4 py-4 rounded-md text-3xl">Button 1</button>
                    <button className="bg-gray-500 text-white px-4 py-4 rounded-md text-3xl">Button 2</button>
                </div>
                <div className="flex flex-col gap-4">
                    <button className="bg-gray-500 text-white px-4 py-4 rounded-md text-3xl">Button 3</button>
                    <button className="bg-gray-500 text-white px-4 py-4 rounded-md text-3xl">Button 4</button>
                </div>
            </div>
        </div>
    )
}

export default CalibrateLayout;