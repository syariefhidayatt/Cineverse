export default function Loading() {
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-purple-400 text-4xl animate-spin flex items-center justify-center border-t-purple-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-rose-400 text-2xl animate-spin flex items-center justify-center border-t-rose-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
