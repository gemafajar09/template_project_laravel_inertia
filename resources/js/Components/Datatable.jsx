import 'datatables.net-dt/css/dataTables.dataTables.css'
import 'datatables.net';
import $ from 'jquery'; 
import { useEffect } from 'react';

export default function DatatableComponent({ children, title }) {
    useEffect(() => {
        $('#myTable').DataTable();

        // Bersihkan DataTable ketika komponen di-unmount
        return () => {
        $('#myTable').DataTable().destroy();
        };
    }, []);
    return (
        <div className="border rounded-md p-2">
            <table id='myTable' className="min-w-full table-auto text-sm text-left text-gray-500 border" style={{ width: '100%' }}>
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        {
                            title.map((item, index) => (
                                <th key={index} className="px-4 py-2">
                                    {item}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                {children}
            </table>
        </div>
    );
}
