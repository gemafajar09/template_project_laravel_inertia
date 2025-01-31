import Template from "@/Components/Admin/Template";
import DatatableComponent from "@/Components/Datatable";
import { usePage } from "@inertiajs/react";

export default function Home({auth}) {
    const {props} = usePage();
    
    return (
        <Template user={auth}>
            <div className="p-6">
                <DatatableComponent title={['No','Nama','Alamat','Aksi']}>
                    <tbody>
                        <tr className="border-t">
                            <td className="px-4 py-2">1</td>
                            <td className="px-4 py-2">Adit</td>
                            <td className="px-4 py-2">Padang</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">2</td>
                            <td className="px-4 py-2">Danu</td>
                            <td className="px-4 py-2">Pariaman</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">3</td>
                            <td className="px-4 py-2">Kean</td>
                            <td className="px-4 py-2">Payakumbuh</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">4</td>
                            <td className="px-4 py-2">Adit</td>
                            <td className="px-4 py-2">Padang</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">5</td>
                            <td className="px-4 py-2">Danu</td>
                            <td className="px-4 py-2">Pariaman</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">6</td>
                            <td className="px-4 py-2">Kean</td>
                            <td className="px-4 py-2">Payakumbuh</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">7</td>
                            <td className="px-4 py-2">Adit</td>
                            <td className="px-4 py-2">Padang</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">8</td>
                            <td className="px-4 py-2">Danu</td>
                            <td className="px-4 py-2">Pariaman</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">9</td>
                            <td className="px-4 py-2">Kean</td>
                            <td className="px-4 py-2">Payakumbuh</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">10</td>
                            <td className="px-4 py-2">Adit</td>
                            <td className="px-4 py-2">Padang</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">11</td>
                            <td className="px-4 py-2">Danu</td>
                            <td className="px-4 py-2">Pariaman</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">12</td>
                            <td className="px-4 py-2">Kean</td>
                            <td className="px-4 py-2">Payakumbuh</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">13</td>
                            <td className="px-4 py-2">Adit</td>
                            <td className="px-4 py-2">Padang</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">14</td>
                            <td className="px-4 py-2">Danu</td>
                            <td className="px-4 py-2">Pariaman</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 py-2">15</td>
                            <td className="px-4 py-2">Bastian</td>
                            <td className="px-4 py-2">Jogja</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                    </tbody>
                </DatatableComponent>
            </div>
        </Template>
    );
}