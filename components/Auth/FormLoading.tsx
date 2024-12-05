export default function FormLoading() {
    return (
        <div role="status" className="animate-pulse">
            <div className="space-y-2">
                <label className="block h-4 w-24 rounded bg-gray-300"></label>
                <div className="h-10 rounded bg-gray-200"></div>
            </div>

            <div className="mt-4 space-y-2">
                <label className="block h-4 w-32 rounded bg-gray-300"></label>
                <div className="h-10 rounded bg-gray-200"></div>
            </div>
            <div className="mt-6">
                <div className="h-10 w-32 rounded bg-blue-300"></div>
            </div>
            <div className="mt-4 h-4 w-48 rounded bg-gray-200"></div>
        </div>
    );
}
