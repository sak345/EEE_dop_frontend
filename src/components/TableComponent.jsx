import React from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import './TableComponent.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Highlighter from 'react-highlight-words';
import NoDataMessage from './NoDataMessage';

const handleDelete = (journal, deleteJournal) => {
    confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure you want to delete this journal?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => deleteJournal(journal)
            },
            {
                label: 'No',
                onClick: () => { }
            }
        ]
    });
};

function TableComponent({ data, deleteJournal, searchTerm, selectedColumns }) {


    const columns = React.useMemo(() => {
        if (data && data[0]) {
            return [
                { Header: 'SlNo', accessor: 'SlNo' },
                ...Object.keys(data[0] || {})
                    .filter(key => key !== '_id' && key !== 'SlNo' && key != '__v')
                    .map(key => ({
                        Header: key, accessor: key, Cell: ({ value }) => (
                            <Highlighter
                                highlightClassName="YourHighlightClass"
                                searchWords={[searchTerm]}
                                autoEscape={true}
                                textToHighlight={value ? value.toString() : ''}
                            />
                        ),
                    })),
                {
                    Header: 'Actions',
                    Cell: ({ row }) => (
                        localStorage.getItem('role') === 'admin' && (
                            <button className="delete-button" onClick={() => handleDelete(row.original, deleteJournal)}>
                                Delete
                            </button>
                        )
                    ),
                },
            ]
        } else {
            return []
        }
    }, [data, deleteJournal]);
    const tableInstance = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 10, sortBy: [{ id: 'SlNo', desc: false }] } }, useSortBy, usePagination);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = tableInstance;

    if (!data || data.length === 0) {
        return <NoDataMessage data={"Journal"} />;
    }

    return (
        <div style={{ padding: '24px 24px 24px 0', minHeight: 380 }}>
            <div style={{ maxWidth: "100%", overflowX: "auto" }}>
                <table {...getTableProps()} className="styled-table">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    (selectedColumns.includes(column.id) || column.id === 'Actions') && (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? ' 🔽'
                                                        : ' 🔼'
                                                    : ''}
                                            </span>
                                        </th>
                                    )
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} >
                                    {row.cells.map(cell => (
                                        (selectedColumns.includes(cell.column.id) || cell.column.id === 'Actions') && (
                                            <td {...cell.getCellProps()}>
                                                <div style={{
                                                    maxHeight: "120px",
                                                    overflowY: "auto",
                                                }}>
                                                    {cell.render('Cell')}
                                                </div>
                                            </td>
                                        )
                                        // <td {...cell.getCellProps()}>
                                        //     <div style={{
                                        //         maxHeight: "120px",
                                        //         overflowY: "auto",
                                        //     }}>
                                        //         {cell.render('Cell')}
                                        //     </div>
                                        // </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {data.length > 0 && (
                <div className="pagination-container" >
                    <button className="pagination-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>{' '}
                    <button className="pagination-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>{' '}
                    <button className="pagination-button" onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>{' '}
                    <button className="pagination-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>{' '}
                    <span className="page-info">
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <span className="page-input">
                        | Go to page:{' '}
                        <input
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(page);
                            }}
                            className="page-number-input"
                        />
                    </span>{' '}
                </div>
            )}
        </div>
    );
}

export default TableComponent;