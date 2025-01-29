import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Template = ({user, children}) => {
  return (
    <>
        <Navbar/>
        <Sidebar/>

        <div className="p-4 sm:ml-64 md:pt-20 pt-16">
            {children}
        </div>
    </>
  );
};

export default Template;
