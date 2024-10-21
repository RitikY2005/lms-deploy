
function CarouselElements({title,description,image,currentPos,totalEle}){
  return (
    <div id={`slide${currentPos+1}`} className="carousel-item relative w-full ">
    <div className="relative">
    <div className="flex flex-col justify-center items-center  p-4 space-y-2">
      <img
        src={image}
        className="w-72 h-72 rounded-full object-cover border shadow-[0px_0px_10px_white]"
      />
      <p className="text-lg font-bold text-center">{title}</p>
      <div className="text-justify text-white text-md font-semibold line-clamp-2 ">
       {description}
      </div>
    </div>

    <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href={`#slide${currentPos!=0 ? currentPos:totalEle}`} className="btn btn-circle text-black bg-white">
        ❮
      </a>
      <a href={`#slide${(currentPos==totalEle-1)?1:currentPos+2}`}className="btn btn-circle text-black bg-white">
        ❯
      </a>
    </div>
    </div>

  </div>
  );
}

export default CarouselElements;