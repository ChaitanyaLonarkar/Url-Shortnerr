const PageLoader = () => {
  return (
    <>
      <div className=" flex flex-col  gap-3 justify-center items-center fixed overflow-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg- bg-opacity-80 z-50 text-center ">
        <div className="flex flex-col justify-center items-center max-[470px]:scale-90">
          <div className=" flex-flex-col  font-bold text-2xl font-mono ">
            <div className="w-max">
              <h1 className="typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-3xl  font-bold max-[478px]:text-2xl ">
                Setting Up...
              </h1>
            </div>
          </div>
          <div className="flex justify-center items-center gap-7 mt-10 max-[478px]:gap-3">
            <div>
              <div className=" bg-blue-300 animate-bounce border-2  p-5 shadow-[3px_3px_0_0_#482307] rounded-full">
                <img
                  src="/magic.gif"
                  alt=""
                  width={50}
                  height={50}
                  className="mix-blend-multiply"
                />
              </div>
              <div className="max-[478px]:text-sm font-mono font-semibold ">
                Logic
              </div>
            </div>
            <div>
              <div className=" bg-yellow-200  animate-bounce animation-delay-200 border-2  p-5 shadow-[3px_3px_0_0_#482307] rounded-full">
                <img
                  src="/sss.gif"
                  alt=""
                  width={50}
                  height={50}
                  className="mix-blend-multiply"
                />
              </div>
              <div className="max-[478px]:text-sm font-mono font-semibold ">
                Coding
              </div>
            </div>
            <div>
              <div className=" bg-[#fa9b92]  animate-bounce animation-delay-400 border-2  p-5 shadow-[3px_3px_0_0_#482307] rounded-full">
                <img
                  src="/website.gif"
                  width={50}
                  height={50}
                  alt=""
                  className="mix-blend-multiply"
                />
              </div>
              <div className="max-[478px]:text-sm font-mono font-semibold ">
                Deploying
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLoader;