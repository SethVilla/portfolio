import { About } from "../About";

export const HomePage = () => {
  return (
    <div 
    className="grid grid-cols-12 h-full relative grid grid-cols-12 h-full"
  >
    <div className="col-span-2 flex flex-col items-center justify-end">
      <p className="vertical-text font-light text-md rotate-180 mb-12 text-lg drop-shadow-sm">
        The Omnibus of the Wandering Soul
      </p>
    </div>
    <div className="col-span-8 flex flex-col justify-center items-center text-6xl sm:text-8xl">
      <h1 className="drop-shadow-lg text-white">
      </h1>
      {/* <canvas id="canvas" className="w-full h-full"></canvas> */}
    </div>
    <div className="col-span-2 flex flex-col items-center gap-8">
        <About />
    </div>
  </div>
  );
};