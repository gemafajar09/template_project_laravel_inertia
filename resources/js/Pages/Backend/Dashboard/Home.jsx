import Template from "@/Components/Admin/Template";
import { usePage } from "@inertiajs/react";

export default function Home({auth}) {
    const {props} = usePage();
    
    return (
        <Template user={auth}>
            <div className="p-6">
                <h1 className="text-3xl font-semibold">Welcome to the Dashboard</h1>
            </div>
        </Template>
    );
}