import React from "react";
import { Link } from "@inertiajs/react";

const Button = ({onClick}) => {
  return (
    <div className=" bg-transparent p-4">
      <DrawOutlineButton onClick={onClick} href="/companyform">Start Your Own Company</DrawOutlineButton>
    </div>
  );
};

const DrawOutlineButton = ({ children, to, ...rest }) => {
  return (
    <Link
       href={to} 
      {...rest}
      className="group 
      relative px-8 py-2 
      px-6 py-2 font-medium bg-indigo-500  w-fit transition-all shadow-[3px_3px_0px_black] 
      dark:shadow-[0px_0px_0px_white] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]
      bg-violet-500 dark:bg-transparent font-medium text-lg text-white dark:text-violet-500 
      transition-colors duration-[400ms]  hover:text-indigo-500 hover:bg-stone-50 dark:hover:text-violet-500"
    >
      <span>{children}</span>

      <span className="absolute left-0 top-0 h-[2px] w-0 bg-indigo-500 dark:bg-violet-500 transition-all duration-100 group-hover:w-full" />

      <span className="absolute right-0 top-0 h-0 w-[2px] bg-indigo-500 dark:bg-violet-500 transition-all delay-100 duration-100 group-hover:h-full" />

   
      <span className="absolute bottom-0 right-0 h-[2px] bg-indigo-500 w-0 dark:bg-violet-500 transition-all delay-200 duration-100 group-hover:w-full dark:w-full" />

      <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-indigo-500 dark:bg-violet-500 transition-all delay-300 duration-100 group-hover:h-full" />
    </Link>
  );
};

export default Button;