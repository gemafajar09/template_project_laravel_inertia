import Template from "@/Components/Admin/Template";
import { usePage } from "@inertiajs/react";

export default function Home({auth}) {
    const {props} = usePage();
    
    return (
        <Template user={auth}>
            <div className="p-6">
                <h2>Dashboard</h2>
            </div>
        </Template>
    );
}