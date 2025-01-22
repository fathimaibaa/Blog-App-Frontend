import Navbar from "../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

function HomePage() {
  
  return (
    <>
      <Navbar />
      <div className="mt-[6.4rem] w-full flex justify-end pr-[4rem] ">
        <div className="flex rounded-md border-2 border-green-500 p-2 items-center gap-3">
          <Link className=" w-fit p-1  text-green-500 tracking-tighter font-semibold text-base" to={'/allblogs'}>
            View All Posts
          </Link>
          <FaArrowRightLong className="text-green-500 " />
        </div>
      </div>
      <div className=" w-full   p-[2rem] flex gap-4">
        <div className="w-1/2 h-[36rem] bg-red-500 rounded-2xl">
          <img
            src="https://plus.unsplash.com/premium_photo-1661265944044-bc7248ae54f9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
            alt=""
            className="w-[100%] h-[100%] object-cover rounded-2xl"
          />
        </div>
        <div className="flex-1 bg flex flex-wrap p-1 ">
          <div className=" w-1/2 h-1/2  p-1 ">
            <img src="https://media.istockphoto.com/id/887987150/photo/blogging-woman-reading-blog.jpg?s=612x612&w=0&k=20&c=7SScR_Y4n7U3k5kBviYm3VwEmW4vmbngDUa0we429GA=" alt="" className="w-full h-full rounded-md" />
          </div>
          <div className=" w-1/2 h-1/2  p-1">
            <img src="https://www.shutterstock.com/image-photo/internet-data-flow-blogging-concept-600nw-2227075035.jpg" alt="" className="w-full h-full rounded-md " />
          </div>
          <div className=" w-1/2 h-1/2  p-1">
            <img src="data:image/jpeg;base64,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" alt="" className="w-full h-full rounded-md" />
          </div>{" "}
          <div className=" w-1/2 h-1/2  p-1">
            <img src="/img.jpg" alt="" className="w-full h-full rounded-md" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
