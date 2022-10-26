import Link from 'next/link'
import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '../Button/Button';
import Tabs from 'react-bootstrap/Tabs';
import Alert from 'react-bootstrap/Alert';
import { TableProps } from "./Table.types"
import Pagination from '../Pagination/Pagination';
import TableBootstraps from 'react-bootstrap/Table';
import Datepicker from '../Field/Datepicker/Datepicker';
import InputField from '../Field/InputField/inputField';
import { BsFillArrowUpSquareFill, BsFillArrowDownSquareFill } from "react-icons/bs";

export const Table: React.FC<TableProps> = ({dataBank}: TableProps) => {
    const [show, setShow] = React.useState(true)
    const [dataTable, setDataTable] = React.useState([{}])
    const [dataSearch, setdataSearch] = React.useState<any>('')
    const [pageLimit, setPageLimit] = React.useState<number>(10)
    const [activePage, setActivePage] = React.useState<number>(1)
    const [totalPage, setTotalPage] = React.useState<any>(dataBank)
    const [pageStartNumber, setPageStartNumber] = React.useState<number>(1)
    const [firstDate, setFirstDate] = React.useState(new Date(0))
    const [lastDate, setLastDate] = React.useState(new Date(0))

    const limitData = async(dataTable: any, page_size: number, page_number: number) => {
        let dataLimit = await dataTable.slice((page_number - 1) * page_size, page_number * page_size)
        setDataTable(dataLimit)
    }

    const handleChangePagination = (page:any, evt:any) => {
        setPageStartNumber(page)
        setActivePage(page)
        gotoPage(page)
    }

    const handleChangeFilterRange = async(evt: any) => {
        evt.preventDefault()
        let datesCollection: any = []
        await dataBank.map((item: any) => {
            if (new Date(item.transactionDate).getTime() <= new Date(lastDate).getTime() && new Date(item.transactionDate).getTime() >= new Date(firstDate).getTime()) {
                datesCollection.push(item)
            }
        })
        setShow(false)
        setTotalPage([...datesCollection])
        setDataTable([...datesCollection])
    }

    const resetPage = (evt: any) => {
        evt.preventDefault()
        setShow(true)
        limitData(dataBank, pageLimit, pageStartNumber) 
    }

    const handleChangeSeacrhValue = (evt: any) => {
        setdataSearch(evt.target.value);
    }

    const handleChangeSeacrh = async(evt: any) => {
        evt.preventDefault()
        const result = await dataBank.filter((data: any) => {
            return data.description === dataSearch
        });
        setShow(false)
        setDataTable([...result])
    }

    const handleChangeLastDate = (evt: any) => {
        setLastDate(evt.target.value);
    }

    const handleChangeFirstDate = (evt: any) => {
        setFirstDate(evt.target.value);
    }
    
    const gotoPage = async(page: any) => {
        const currentPage = Math.max(0, Math.min(page, dataBank.length));
        const offset = (currentPage - 1) * pageLimit;
        const ListBankPage = await dataBank.slice(offset, offset + pageLimit)
        setDataTable([...ListBankPage])
    }

    const sortDate = async(paramSort: string) => {
        await dataTable.sort(function(a:any, b:any) {
            if (paramSort == 'down') {
                return new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime();
            } else {
                return new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime();
            }
        });
        setDataTable([...dataTable])
    }

    React.useEffect(() => {
        limitData(dataBank, pageLimit, pageStartNumber) 
    }, []);

    return (
        <React.Fragment>  
            <Tabs
                defaultActiveKey="byName"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="byName" title="Search By Name">
                    <Row className='mb-3'>
                        <Col>
                            <InputField name={'search'} label={'Search By Name'} handleChangeField={handleChangeSeacrhValue}/>
                        </Col>
                        <Col className='position-relative'>
                            <div className='position-absolute bottom-0'>
                                <Button name={'Process'} typeButton={'success'} handleChangeProcess={handleChangeSeacrh}/>
                            </div>
                        </Col>
                        <Col className='position-relative'>
                            <div className='position-absolute bottom-0 end-0'>
                                <Button name={'Reset'} typeButton={'warning'} handleChangeProcess={resetPage}/>
                            </div>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="byRange" title="Search By Range">
                    <Row className='mb-3'>
                        <Col>
                            <Datepicker name={'firtsDate'} label={'First Date'} handleChangeDatePicker={handleChangeFirstDate} />
                        </Col>
                        <Col>
                            <Datepicker name={'lastDate'} label={'Last Date'} handleChangeDatePicker={handleChangeLastDate} />
                        </Col>
                        <Col className='position-relative'>
                            <div className='position-absolute bottom-0'>
                                <Button name={'Process'} typeButton={'success'} handleChangeProcess={handleChangeFilterRange}/>
                            </div>
                        </Col>
                        <Col className='position-relative'>
                            <div className='position-absolute bottom-0 end-0'>
                                <Button name={'Reset'} typeButton={'warning'} handleChangeProcess={resetPage}/>
                            </div>
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
            <TableBootstraps striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            Transaction Date 
                            <a className='float-end mx-1' onClick={() => sortDate('up')}><BsFillArrowUpSquareFill /></a> 
                            <a className='float-end mx-1' onClick={() => sortDate('down')}><BsFillArrowDownSquareFill/></a>
                        </th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Credit</th>
                        <th>Debit</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {dataTable.length ? (
                        dataTable.map((item: any, index: any) => {
                            return (
                                <tr key={index}>
                                    <td>{item.transactionDate}</td>
                                    <td>{item.description}</td>
                                    <td>{item.category}</td>
                                    <td>{item.credit ? item.credit : '-'}</td>
                                    <td>{item.debit ? item.debit : '-'}</td>
                                    <td className='text-center'>
                                        <Link href={`/detail/${item.id}`}>
                                            <a>Detail</a>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center">
                                Sorry data not found
                            </td>
                        </tr>
                    )}
                </tbody>
            </TableBootstraps>
            <br />
            { show ? (
                <Row>
                    <Col className='flex align-items-center'>
                        Page  {activePage} TotalPage : {totalPage.length}
                    </Col>
                    <Col>
                        <Pagination handleChangePagination={handleChangePagination} dataBank={totalPage} limitPage={10} activePage={activePage} startPage={pageStartNumber} />
                    </Col>
                </Row>
            ) : (
                <React.Fragment></React.Fragment>
            )
            }
        </React.Fragment>
    );
};

export default Table;