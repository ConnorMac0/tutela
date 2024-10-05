import React from "react";

const Dashboard = () => {
    return (
        <div className="flex flex-col min-h-screen w-full border-2 border-orange-600">
            <div></div>
            <div className="text-2xl p-4 border-2 border-yellow-600">Dashboard</div>
            <div className="flex flex-wrap gap-5 text-white justify-center p-5">
                <div className="bg-stone-600 h-48 w-full">Box</div>
                <div className="bg-stone-600 h-48 w-1/3">Box</div>
                <div className="bg-stone-600 h-48 w-1/2">Box</div>
            </div>
            <button className="md:hidden block border-2 border-blue-600 text-sm bg-green"><i className="fa-solid fa-arrow-right-from-bracket"> LOGOUT</i></button>
        </div>
    )
}

export default Dashboard;