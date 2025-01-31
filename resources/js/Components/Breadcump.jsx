import { Link } from "@inertiajs/react"
import { IoHomeOutline } from "react-icons/io5"
import { IoIosArrowForward } from "react-icons/io";

const Breadcump = ({nama}) => {
    return (
        <div className="p-2 mt-3">
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link href={route('admin.home')} className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <IoHomeOutline/>
                            Home
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <IoIosArrowForward />
                            <Link href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">{nama}</Link>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>
    )
}

export default Breadcump