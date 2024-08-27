import React, { useState } from 'react';

const GridTable: React.FC = () => {
    // Define the initial x-axis and y-axis labels
    const initialXLabels = ['x', 'y', 'z', 'units', 'click to record', 'measured'];
    const initialYLabels = ['1', '2', '3'];

    // Define available units of measure
    const unitsOptions = ['inches', 'feet', 'meters', 'centimeters']

    // State for x-axis and y-axis labels
    const [xLabels, setXLabels] = useState(initialXLabels);
    const [yLabels, setYLabels] = useState(initialYLabels);

    // State for grid data
    const [gridData, setGridData] = useState(
        initialXLabels.reduce((acc, x) => {
            acc[x] = initialYLabels.reduce((rowAcc, y) => {
                rowAcc[y] = x === 'units' ? unitsOptions[0] : '';
                return rowAcc;
            }, {} as Record<string, string>);
            return acc;
        }, {} as Record<string, Record<string, string>>)
    );

    // Handle input change
    const handleInputChange = (x: string, y: string, value: string) => {
        setGridData(prev => ({
            ...prev,
            [x]: {
                ...prev[x],
                [y]: value,
            }
        }));
    };

    // Handle unit selection change
    const handleUnitChange = (y: string, value: string) => {
        setGridData(prev => ({
            ...prev,
            units: {
                ...prev.units,
                [y]: value,
            }
        }));
    };

    // Add a new row
    const addRow = () => {
        const newRowLabel = (parseInt(yLabels[yLabels.length - 1]) + 1).toString();
        setYLabels([...yLabels, newRowLabel]);
        setGridData(prev => ({
            ...prev,
            ...initialXLabels.reduce((acc, x) => {
                acc[x] = {
                    ...prev[x],
                    [newRowLabel]: x === 'units' ? unitsOptions[0] : ''
                };
                return acc;
            }, {} as Record<string, string>)
        }));
    };

    // Delete a row
    const deleteRow = (rowLabel: string) => {
        setYLabels(yLabels.filter(y => y !== rowLabel));
        setGridData(prev => {
            const newData = { ...prev };
            Object.keys(newData).forEach(x => {
                const { [rowLabel]: _, ...rest } = newData[x];
                newData[x] = rest;
            });
            return newData;
        });
    };

    // Handle button click in "click to record" column
    const handleRecordClick = (y: string) => {
        console.log(`Recording data for row ${y}`);
    };

    return (
        <div className="p-4">
            <div className="mb-4 flex flex-col gap-2 items-start">
                <button
                    onClick={addRow}
                    className="bg-blue-500 text-white px-4 py-2 rounded transition-transform transform focus:outline-none active:scale-95"
                >
                    Add Row
                </button>
                <button
                    onClick={() => { }}
                    className="bg-blue-500 text-white px-4 py-2 rounded transition-transform transform focus:outline-none active:scale-95"
                >
                    Fit transform
                </button>
            </div>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300"></th>
                        {xLabels.map(x => (
                            <th key={x} className="border border-gray-300 p-2 text-center">{x}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {yLabels.map(y => (
                        <tr key={y}>
                            <td className="border border-gray-300 p-2 text-center">
                                {y}
                                {y !== '1' && (
                                    <button
                                        onClick={() => deleteRow(y)}
                                        className="ml-2 text-red-500 transition-transform transform focus:outline-none active:scale-95"
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                            {xLabels.map(x => (
                                <td key={x} className="border border-gray-300 p-2 ">
                                    {x === 'units' ? (
                                        <select
                                            value={gridData[x]?.[y] || ''}
                                            onChange={(e) => handleUnitChange(y, e.target.value)}
                                            className="w-full border border-gray-300 p-1 rounded"
                                        >
                                            {unitsOptions.map(unit => (
                                                <option key={unit} value={unit}>
                                                    {unit}
                                                </option>
                                            ))}
                                        </select>
                                    ) : x === 'click to record' ? (
                                        <div className="flex justify-center items-center h-full">
                                            <button
                                                onClick={() => handleRecordClick(y)}
                                                className="bg-slate-200 text-black px-2 py-1 rounded transition-transform transform focus:outline-none active:scale-95"
                                            >
                                                Measure
                                            </button>
                                        </div>
                                    ) : (
                                        <input
                                            type="text"
                                            value={gridData[x]?.[y] || ''}
                                            onChange={(e) => handleInputChange(x, y, e.target.value)}
                                            className="w-full border border-gray-300 p-1 rounded"
                                        />
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GridTable;
