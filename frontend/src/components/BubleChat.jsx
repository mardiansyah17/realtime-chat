export default function BubleChat({ userChat, msg }) {
  return (
    <>
      {userChat ? (
        <div className="flex items-center  justify-end  mb-4 ">
          <div className="  bg-green-600 text-green-100 p-2 rounded-lg mb-2 relative w-fit">
            <div>{msg}</div>
            {/* arrow */}
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-green-600" />
            {/* end arrow */}
          </div>
        </div>
      ) : (
        <div className="flex items-center mb-4 w-fit ">
          <div className="flex-none flex flex-col items-center space-y-1 mr-4"></div>
          <div className="flex-1 bg-green-200 text-green-600 p-2 rounded-lg mb-2 relative">
            <div>{msg}</div>
            {/* arrow */}
            <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-green-200" />
            {/* end arrow */}
          </div>
        </div>
      )}
    </>
  );
}
