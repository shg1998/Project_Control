import React, { forwardRef } from 'react';
import MaterialTable from '@material-table/core';
import { capitalizeWordFirstLetter, getToken, logout } from '../../utils/generalUtils';
import AddBox from '@mui/icons-material/AddBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';
import { statusCodes } from 'api/urls';
import { useState } from 'react';
import { useEffect } from 'react';
import localization from './localization';
import './style.css';

const TOOLBAR_COLOR = 'rgb(242, 242, 242)';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

/**
 * this Component Display Tables (General)
 *
 * using material-table library
 *
 * has optional props like :
 *  filtering (boolean) is for Enable filter bar for all column or not
 *  customQuery (str) is for set filter query when loading Component
 *  rowCount (number) is for set Count of rows for Filtering Checks!
 *  data (Array) is for initial table data manual from parrent Component instead of pass url for fetch
 *
 */

const DataTableComponent = (props) => {
    const [limit, setLimit] = useState(null);
    const [skip, setSkip] = useState(null);
    const [actionHeader, setActionHeader] = useState(localization.header.actions);

    useEffect(() => {
        setStyles();
    });

    const setStyles = () => {
        customizePaginationDisplayedRows();
        setStyleOfTableContent();
        setStyleOfLastColumnInTitleHeader();
    };

    const customizePaginationDisplayedRows = () => {
        let displayedRow = document.getElementsByClassName('MuiTablePagination-displayedRows');
        displayedRow[0].style['direction'] = 'ltr';
    };

    const setStyleOfTableContent = () => {
        let inputs = document.getElementsByClassName('MuiTableCell-root MuiTableCell-body');
        let InpEls = Array.from(inputs);
        InpEls.forEach((e) => {
            e.style['text-align'] = 'center';
        });
    };

    const setStyleOfLastColumnInTitleHeader = () => {
        let columnsHeader = Array.from(document.getElementsByClassName('MuiTableCell-root MuiTableCell-head MuiTableCell-alignLeft'));
        let elements = document.getElementsByClassName('MuiTableCell-root MuiTableCell-body');
        let els = Array.from(elements);
        const columnsFilter = props.columns.filter((x) => x.searchable);
        let lastColumnHeaderFreeSpace = els[columnsHeader.length];
        if (lastColumnHeaderFreeSpace && columnsFilter.length > 0) {
            lastColumnHeaderFreeSpace.style['background-color'] = TOOLBAR_COLOR;
        }
    };

    const handleIfDataSizeLowerThanSkip = (query) => {
        let condition = props.fetchFromFirstWhenUpdate === undefined || props.fetchFromFirstWhenUpdate === true;
        if (limit === query.pageSize && skip === query.page * query.pageSize && props.query && condition) {
            query.page = 0;
        }
        setSkip(query.page * query.pageSize);
        setLimit(query.pageSize);
        return true;
    };

    const logoutFromApp = () => {
        logout();
        location.reload();
    };

    return (
        <div style={{ maxWidth: '100%' }} className="material-table-component">
            <MaterialTable
                onRowClick={props.onRowClick}
                style={{
                    margin: props.tableMargin,
                    padding: '24px',
                    columnGap: '10%',
                    borderRadius: 4,
                    borderCollapse: 'collapse',
                    boxShadow: props.hideTabelShadow === true ? 'none' : '0 1px 20px 0 rgb(69 90 100 / 12%)'
                }}
                icons={tableIcons}
                actions={props.tableActions}
                columns={props.columns}
                localization={{
                    ...localization,
                    header: {
                        actions: actionHeader
                    }
                }}
                title=""
                tableRef={props.tableRef}
                onSelectionChange={props.onSelectionChange}
                options={{
                    paginationAlignment: 'center',
                    searchFieldAlignment: 'left',
                    // thirdSortClick: false,
                    showTitle: false,
                    draggable: false,
                    loadingType: 'overlay',
                    pageSize: 10,
                    showFirstLastPageButtons: true,
                    paginationType: 'stepped',
                    headerStyle: {
                        borderColor: '#d4d4d4',
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        padding: '2px',
                        backgroundColor: '#fefefe',
                        color: '#111',
                        fontWeight: 'bold',
                        height: '32px'
                    },
                    rowStyle: (rowData, index) => {
                        let style = {
                            fontSize: '0.8rem',
                            fontWeight: 'bolder',
                            height: 20,
                            textAlign: 'center'
                        };

                        if (index % 2) {
                            style['backgroundColor'] = 'rgb(242, 242, 242)';
                        }
                        return style;
                    },
                    search: props.searchable !== undefined ? props.searchable : true,
                    actionsColumnIndex: -1,
                    actionsCellStyle: {
                        color: '#233b55'
                    },
                    filtering: props.filtering !== undefined ? props.filtering : true,
                    filterCellStyle: {
                        borderColor: '#d4d4d4',
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        paddingTop: 0,
                        borderBottomWeight: 'bolder',
                        paddingBottom: 0,
                        backgroundColor: TOOLBAR_COLOR
                    },
                    searchFieldStyle: {
                        marginLeft: '0px',
                        marginRight: '-23px',
                        backgroundColor: '#fff',
                        border: `1px solid rgba(144, 144, 144, 0.698)`,
                        borderRadius: 4
                    },
                    tableLayout: 'auto',
                    selection: props.selection
                }}
                data={
                    props.data === undefined
                        ? (query) =>
                              new Promise((resolve, reject) => {
                                  handleIfDataSizeLowerThanSkip(query);
                                  let url = props.urlAddress;
                                  let queryUrl = `top=${query.pageSize}&skip=${query.page * query.pageSize}`;
                                  if (props.customQuery) {
                                      const customQ = '&filter=' + props.customQuery;
                                      queryUrl += customQ;
                                  }
                                  if (query.orderBy) {
                                      queryUrl += `&orderby=${capitalizeWordFirstLetter(query.orderBy.field.toString())} ${
                                          query.orderDirection
                                      }`;
                                  } else if (props.orderBy) {
                                      queryUrl += `&orderby=${props.orderBy} desc, id desc`;
                                  }
                                  let hasSearch = false;
                                  if (query.search && query.search !== '' && (!props.rowCount || props.rowCount > 1)) {
                                      if (props.searchOnSpecificProperty) {
                                          if (!queryUrl.includes('filter')) queryUrl += '&filter=';
                                          else queryUrl += ' and ';
                                          queryUrl += `${props.searchOnSpecificProperty} like '%${query.search}%'`;
                                      } else {
                                          const columnsFilter = props.columns.filter((x) => x.searchable);
                                          if (columnsFilter.length > 0) {
                                              hasSearch = true;
                                              if (!queryUrl.includes('filter')) queryUrl += '&filter=';
                                              else queryUrl += ' and ';
                                              columnsFilter.forEach((x, i) => {
                                                  const openP = i === 0 ? '(' : '';
                                                  const closeP = i === columnsFilter.length - 1 ? ')' : '';
                                                  const orO = i < columnsFilter.length - 1 ? ' or ' : '';
                                                  queryUrl += `${openP} contains(tolower(${capitalizeWordFirstLetter(
                                                      x.field
                                                  )}) , tolower('${query.search}')) ${orO}${closeP}`;
                                              });
                                          }
                                      }
                                  }

                                  if (query.filters && query.filters.length > 0 && (!props.rowCount || props.rowCount > 1)) {
                                      const columnsFilter = query.filters.filter((x) => !(parseInt(x.value?.value?.toString()) === 2));
                                      if (columnsFilter.length > 0) {
                                          if (!hasSearch) {
                                              if (!queryUrl.includes('filter')) queryUrl += '&filter=';
                                              else queryUrl += ' and ';
                                          } else {
                                              queryUrl += ' and ';
                                          }
                                          columnsFilter.forEach((x, i) => {
                                              const openP = i === 0 ? '(' : '';
                                              const closeP = i === columnsFilter.length - 1 ? ')' : '';
                                              const orO = i < columnsFilter.length - 1 ? ' and ' : '';
                                              //   const operator = x.column.type && x.column.type === 'enum' ? ' in ' : ' like ';
                                              if (!(x.column.type && x.column.type === 'enum')) {
                                                  queryUrl += `${openP} contains(tolower(${capitalizeWordFirstLetter(
                                                      x.column.field
                                                  )}) ,   tolower(${"'" + x.value + "'"})) ${orO}${closeP}`;
                                              } else {
                                                  queryUrl += `${openP} ${capitalizeWordFirstLetter(x.column.field)} eq ${
                                                      parseInt(x.value.value.toString()) !== 0
                                                  } ${orO}${closeP}`;
                                              }
                                          });
                                      }
                                  }
                                  if (props.query) {
                                      let filter_type = props.query.split(' ')[0];
                                      if (!queryUrl.includes(filter_type)) {
                                          // It is checked whether the type of filter (for example, is_active) is repeated or not, if it is, the query props will not be used (already one step).
                                          if (!hasSearch) {
                                              if (!queryUrl.includes('filter')) queryUrl += '&filter=';
                                              else queryUrl += ' and ';
                                          } else queryUrl += ' and ';
                                          queryUrl += props.query;
                                      }
                                  }

                                  let pagination = {};
                                  fetch(url + `?${queryUrl.trim()}`, {
                                      method: 'GET',
                                      headers: {
                                          Accept: 'application/json',
                                          'Content-Type': 'application/json',
                                          Authorization: `Bearer ${getToken()}`
                                      }
                                  })
                                      .then((response) => {
                                          response.headers.forEach(function (val, key) {
                                              if (key === 'pagination') {
                                                  pagination = JSON.parse(val.toString());
                                              }
                                          });
                                          let finalResponse = response.json();
                                          return finalResponse;
                                      })
                                      .then((result) => {
                                          if (result.isSuccess) {
                                              let concreteData = props.reflectDataProperty
                                                  ? Reflect.get(result, props.reflectDataProperty)
                                                  : result.data;
                                              resolve({
                                                  data: concreteData,
                                                  page: query.page,
                                                  totalCount: pagination.totalItems
                                              });
                                          } else {
                                              if (parseInt(result.StatusCode) === statusCodes.unAuthorized) logoutFromApp();
                                              resolve({
                                                  data: [],
                                                  page: 0,
                                                  totalCount: 0
                                              });
                                          }
                                      });
                              })
                        : props.reflectDataProperty === undefined
                        ? props.data
                        : Reflect.get(props.data, props.reflectDataProperty)
                }
            />
        </div>
    );
};

export default DataTableComponent;
