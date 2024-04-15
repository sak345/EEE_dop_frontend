import React from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import './TableComponent.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Highlighter from 'react-highlight-words';

function NoDataMessage() {
    return (
        <div className="no-data-message">
            <h2>No Journal in the Database</h2>
            <p>Please add a new journal to see it here.</p>
        </div>
    );
}

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

function TableComponent({ data, deleteJournal, searchTerm }) {
    const columns = React.useMemo(() => {
        if (data && data[0]) {
            return [
                { Header: 'SlNo', accessor: 'SlNo' },
                ...Object.keys(data[0] || {})
                    .filter(key => key !== '_id' && key !== 'SlNo')
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
                        <button className="delete-button" onClick={() => handleDelete(row.original, deleteJournal)}>
                            Delete
                        </button>
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
        return <NoDataMessage />;
    }

    return (
        <div style={{ padding: 24, minHeight: 380 }}>
            <div style={{ maxWidth: "1300px", overflowX: "auto" }}>
                <table {...getTableProps()} className="styled-table">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </th>
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
                                        <td {...cell.getCellProps()}>
                                            <div style={{
                                                maxHeight: "120px",
                                                overflowY: "auto",
                                            }}>
                                                {cell.render('Cell')}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {data.length > 0 && (
                <div style={{ marginTop: 10, marginLeft: 425 }}>
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