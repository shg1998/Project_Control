import { styled } from '@mui/material/styles';
import { Divider, Input, Select } from '@mui/material';

export const CustomInput = styled(Input)(() => ({
    height: '15px',
    borderStyle: 'hidden',
    fontSize: '12px',
    borderRadius: 4,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
    margin: '1px',
    fontWeight: 'bold'
}));

export const CustomSelect = styled(Select)(() => ({
    height: '15px',
    borderStyle: 'hidden',
    fontSize: '12px',
    borderRadius: 4,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    margin: '1px',
    fontWeight: 'bold'
}));

export const CustomDivider = styled(Divider)(() => ({
    borderColor: `gray !important`,
    flexGrow: 1,
    boxShadow: '0 5px 10px 0 black'
}));
