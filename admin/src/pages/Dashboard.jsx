import React from "react";

const Dashboard = () => {
    return (
        <div className="flex flex-col min-h-screen w-full border-2 border-orange-600">
            <div className="flex flex-wrap gap-5 text-white justify-center">
                <div className="bg-stone-600 h-48 w-full">Box</div>
                <div className="bg-stone-600 h-48 w-1/3">Box</div>
                <div className="bg-stone-600 h-48 w-1/2">Box</div>
            </div>
        </div>
    )
}

export default Dashboard;