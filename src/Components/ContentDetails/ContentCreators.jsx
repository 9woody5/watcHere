import React, { useEffect, useState } from "react";

function ContentCreators({ actors, director }) {
  return (
    <div className="w-full text-white mt-10 flex gap-14">
      <div className="">
        <div className="my-3 font-pretendardBold">감독</div>
        <div className="flex gap-4">
          <div className="flex flex-col justify-center items-center">
            <div className="my-2">
              <img className="w-16 h-16 rounded-full object-cover" src={director.img} alt="" />
            </div>
            <div>{director.name}</div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="my-3 font-pretendardBold">출연진</div>
        <div className="flex gap-4">
          {actors.map((actor, idx) => (
            <div key={`actor-${idx}`} className="flex flex-col justify-center items-center">
              <div className="my-2">
                <img className="w-16 h-16 rounded-full object-cover" src={actor.img} alt="" />
              </div>
              <div>{actor.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContentCreators;
