import React from 'react';
import Select from 'react-select';
import Checkbox from '@material-ui/core/Checkbox';
import { components } from 'react-select';

function SelectColumns({ selectedColumns, setSelectedColumns }) {
    const columnOptions = [
        { value: 'SlNo', label: 'SlNo' },
        { value: 'UniqueId', label: 'UniqueId' },
        { value: 'Level', label: 'Level' },
        { value: 'Authors', label: 'Authors' },
        { value: 'Article_Title', label: 'Article Title' },
        { value: 'WebLink', label: 'WebLink' },
        { value: 'Scopus', label: 'Scopus' },
        { value: 'Web_Of_Sc', label: 'Web Of Sc' },
        { value: 'PUBMED', label: 'PUBMED' },
        { value: 'IEEE', label: 'IEEE' },
        { value: 'Indian_Citation_Index', label: 'Indian Citation Index' },
        { value: 'Google_Scholar', label: 'Google Scholar' },
        { value: 'Year', label: 'Year' },
        { value: 'Journal_Name', label: 'Journal Name' },
        { value: 'Scopus_Citation', label: 'Scopus Citation' },
        { value: 'WOS_Citation', label: 'WOS Citation' },
        { value: 'IEEE_Citation', label: 'IEEE Citation' },
        { value: 'ICI_Citation', label: 'ICI Citation' },
        { value: 'GS_Citation', label: 'GS Citation' },
        { value: 'Affiliation', label: 'Affiliation' },
        { value: 'Vol_No', label: 'Vol No' },
        { value: 'Issue_No', label: 'Issue No' },
        { value: 'B_Page', label: 'B Page' },
        { value: 'P_Page', label: 'P Page' },
        { value: 'SNIP', label: 'SNIP' },
        { value: 'SJR', label: 'SJR' },
        { value: 'Impact_Factor', label: 'Impact Factor' },
        { value: 'ISSN', label: 'ISSN' },
        { value: 'ISBN', label: 'ISBN' },
        { value: 'PublicationType', label: 'Publication Type' },
        { value: 'owner', label: 'Owner' },
        { value: 'Actions', label: 'Actions' },
    ];
    return (
        <div style={{
            marginBottom: '15px',
        }}>
            <Select
                isMulti
                options={columnOptions}
                defaultValue={columnOptions.filter(option => selectedColumns.includes(option.value))} // Default to all columns
                onChange={selectedOptions => setSelectedColumns(selectedOptions ? selectedOptions.map(option => option.value) : [])}
                styles={{
                    control: (provided) => ({
                        ...provided,
                        maxWidth: '600px',
                        minWidth: '300px',
                        marginRight: '120px',
                        display: 'inline-block',
                        minHeight: '30px', // Adjust this value to change the height of the select box
                        fontSize: '12px', // Adjust this value to change the font size
                    }),
                    option: (provided) => ({
                        ...provided,
                        maxWidth: '720px',
                        padding: '2px 12px', // Adjust this value to change the padding of the options
                    }),
                    multiValue: (provided) => ({
                        ...provided,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '250px',
                    }),
                    valueContainer: (provided) => ({
                        ...provided,
                        overflow: 'auto',
                        maxWidth: '650px',
                        maxHeight: '25px', // Adjust this value to change the maximum height of the control bar
                    }),
                }}
                components={{
                    Option: ({ children, ...props }) => (
                        <components.Option {...props}>
                            <Checkbox checked={props.isSelected} color="primary" />
                            {children}
                        </components.Option>
                    ),
                }}
            />
        </div >
    )
}
export default SelectColumns;