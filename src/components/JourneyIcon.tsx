import React from "react";

const JourneyIcon = ({
  length,
  showTraillingDots,
  showLastDot = false,
}: {
  length: number;
  showTraillingDots: boolean;
  showLastDot?: boolean;
}) => {
  return (
    <div className="flex flex-col  pt-1  ">
      {Array.from({ length }).map((_, idx) => (
        <div
          key={idx}
          className=" relative rounded-lg  h-12 flex flex-col justify-center items-center   flex-1 "
        >
          <div className="border w-[12px] h-[12px] rounded-full"></div>
          {showTraillingDots &&
            (!showLastDot ? idx !== length - 1 : idx !== length) && (
              <>
                <div className="absolute top-[50px]  w-[6px] h-[6px] bg-gray-500 rounded-full"></div>
                <div className="absolute top-[62px]  w-[6px] h-[6px] bg-gray-500 rounded-full"></div>
              </>
            )}
        </div>
      ))}
    </div>
  );
};

export default JourneyIcon;
