import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOffOutlined';
import { MenuItem } from '@mui/material';
import { CustomInput, CustomSelect } from '../../../components/StyledComponent';

const doneIconStyle = {
    height: '20px',
    width: '20px',
    color: '#6ac17b'
};

const dontIconStyle = {
    height: '20px',
    width: '20px',
    color: '#ed1d24'
};

export const columns = [
    {
        title: 'نام و نام خانوادگی',
        field: 'fullName',
        cellStyle: {
            borderColor: '#d4d4d4',
            borderStyle: 'solid',
            borderRightStyle: 'solid',
            borderLeftStyle: 'solid',
            borderWidth: '1px',
            fontSize: '12px',
            textAlign: 'center',
            padding: '0px',
            width: '42%'
        },
        searchable: true,
        filterComponent: ({ columnDef, onFilterChanged }) => (
            <CustomInput
                // placeholder="نام کاربری..."
                onChange={(e) => {
                    // Calling the onFilterChanged with the current tableId and the new value
                    onFilterChanged(columnDef.tableData.id, e.target.value);
                }}
            />
        )
    },
    {
        title: 'نام کاربری',
        field: 'userName',
        cellStyle: {
            borderColor: '#d4d4d4',
            borderStyle: 'solid',
            borderRightStyle: 'solid',
            borderLeftStyle: 'solid',
            borderWidth: '1px',
            fontSize: '12px',
            textAlign: 'center',
            padding: '0px',
            width: '42%'
        },
        searchable: true,
        filterComponent: ({ columnDef, onFilterChanged }) => (
            <CustomInput
                // placeholder="نام کاربری..."
                onChange={(e) => {
                    // Calling the onFilterChanged with the current tableId and the new value
                    onFilterChanged(columnDef.tableData.id, e.target.value);
                }}
            />
        )
        // sorting: false
    },
    {
        title: 'فعال',
        field: 'isActive',
        cellStyle: {
            borderColor: '#d4d4d4',
            borderStyle: 'solid',
            borderRightStyle: 'solid',
            borderLeftStyle: 'solid',
            borderWidth: '1px',
            fontSize: '12px',
            textAlign: 'center',
            padding: '0px',
            width: '10%'
        },
        render: (rowData) => {
            return rowData.isActive ? <CheckCircleOutlineIcon style={doneIconStyle} /> : <HighlightOffIcon style={dontIconStyle} />;
        },
        filterComponent: ({ columnDef, onFilterChanged }) => (
            <CustomSelect
                defaultValue={2}
                variant={'standard'}
                onChange={(e) => {
                    // Calling the onFilterChanged with the current tableId and the new value
                    onFilterChanged(columnDef.tableData.id, e.target);
                }}
            >
                <MenuItem selected={true} key={2} value={2}>
                    همه
                </MenuItem>
                <MenuItem key={1} value={1}>
                    بله
                </MenuItem>
                <MenuItem key={0} value={0}>
                    خیر
                </MenuItem>
            </CustomSelect>
        ),
        lookup: {
            2: 'همه',
            1: 'بله',
            0: 'خیر'
        },
        type: 'enum'
    }
];
