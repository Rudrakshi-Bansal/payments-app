export default function Appbar({ user }) {
    return <div className="shadow h-14 flex justify-between">
        <div className="font-bold flex flex-col justify-center h-full ml-4">
            Payments App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello, {user ? user.firstname : "User"}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user ? user.firstname[0].toUpperCase() : "U"}
                </div>
            </div>
        </div>
    </div>
}