import MaterialTable, { Column } from "material-table";
import React from "react";
import { tableIcons } from "./_tableIcons";


function Editable() {
    const { useState } = React;

    //   const [columns, setColumns] = useState<Column<RowData>>([
    //     { title: 'Name', field: 'name' },
    //     { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
    //     { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    //     {
    //       title: 'Birth Place',
    //       field: 'birthCity',
    //       lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    //     },
    //   ]);

    const [data, setData] = useState([
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    ]);

    return (
        <MaterialTable
            icons={tableIcons}
            title="Editable Preview"
            columns={[
                { title: 'Name', field: 'name' },
                { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
                { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                {
                    title: 'Birth Place',
                    field: 'birthCity',
                    lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                },
            ]}
            data={data}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            setData([...data, newData]);

                            resolve();
                        }, 1000)
                    }),
                onRowUpdate: (newData, oldData: any) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);

                            resolve();
                        }, 1000)
                    }),
                onRowDelete: (oldData: any) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);

                            resolve()
                        }, 1000)
                    }),
            }}
        />
    )
}

export default Editable;


