import React from 'react'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from '../Button/Button'
import Card from 'react-bootstrap/Card';
import { TableProps } from "./Table.types"
import Pagination from '../Pagination/Pagination'
import TableBootstraps from 'react-bootstrap/Table'
import InputField from '../Field/InputField/inputField'
import Datepicker from '../Field/Datepicker/Datepicker'
import { BsFillArrowUpSquareFill, BsFillArrowDownSquareFill } from "react-icons/bs"

export const Table: React.FC<TableProps> = ({dataBank}: TableProps) => {
    const [dataTable, setDataTable] = React.useState([{}])
    const [dataSearch, setdataSearch] = React.useState<any>('')
    const [pageLimit, setPageLimit] = React.useState<number>(10)
    const [activePage, setActivePage] = React.useState<number>(1)
    const [totalPage, setTotalPage] = React.useState<any>(dataBank)
    const [pageStartNumber, setPageStartNumber] = React.useState<number>(1)
    const [firstDate, setFirstDate] = React.useState()
    const [lastDate, setLastDate] = React.useState()

    const limitData = async(dataTable: any, page_size: number, page_number: number) => {
        let dataLimit = await dataTable.slice((page_number - 1) * page_size, page_number * page_size)
        setDataTable(dataLimit)
    }

    const handleChangePagination = (page:any, evt:any) => {
        evt.preventDefault()
        setPageStartNumber(page)
        setActivePage(page)
        gotoPage(page)
    }

    const resetPage = (evt: any) => {
        evt.preventDefault()
        limitData(dataBank, pageLimit, pageStartNumber) 
    }

    const handleChangeSeacrhValue = (evt: any) => {
        setdataSearch(evt.target.value)
    }

    const handleChangeSeacrh = async(evt: any) => {
        evt.preventDefault()
        let result: any = []
        setActivePage(1)
        if(firstDate && lastDate && !dataSearch) {
            result = await dataBank.filter((data: any) => {
                return new Date(data.transactionDate).getTime() <= new Date(lastDate).getTime() && new Date(data.transactionDate).getTime() >= new Date(firstDate).getTime()
            })
        } else if(dataSearch && firstDate && lastDate) {
            result = await dataBank.filter((data: any) => {
                return Object.values(data).join('').toLowerCase().includes(dataSearch.toLowerCase()) && new Date(data.transactionDate).getTime() <= new Date(lastDate).getTime() && new Date(data.transactionDate).getTime() >= new Date(firstDate).getTime()
            })
        } else if(dataSearch && !firstDate && !lastDate) {
            result = await dataBank.filter((data: any) => {
                return Object.values(data).join('').toLowerCase().includes(dataSearch.toLowerCase())
            })
        }
        gotoPage(result)
        setTotalPage([...result])
        limitData(result, pageLimit, pageStartNumber)
    }

    const handleChangeLastDate = (evt: any) => {
        setLastDate(evt.target.value)
    }

    const handleChangeFirstDate = (evt: any) => {
        setFirstDate(evt.target.value)
    }
    
    const gotoPage = async(page: any) => {
        const currentPage = Math.max(0, Math.min(page, dataBank.length))
        const offset = (currentPage - 1) * pageLimit
        const ListBankPage = await totalPage.slice(offset, offset + pageLimit)
        setDataTable([...ListBankPage])
    }

    const sortDate = async(paramSort: string) => {
        await dataTable.sort(function(a:any, b:any) {
            if (paramSort == 'down') {
                return new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
            } else {
                return new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime()
            }
        })
        setDataTable([...dataTable])
    }

    React.useEffect(() => {
        limitData(dataBank, pageLimit, pageStartNumber) 
    }, [])

    return (
        <React.Fragment>  
            <Card className='mb-3'>
                <Card.Body>
                    <Row>
                        <Col>
                            <Datepicker name={'firtsDate'} label={'First Date'} handleChangeDatePicker={handleChangeFirstDate} />
                        </Col>
                        <Col>
                            <Datepicker name={'lastDate'} label={'Last Date'} handleChangeDatePicker={handleChangeLastDate} />
                        </Col>
                        <Col>
                            <InputField name={'search'} label={'Search By Description'} handleChangeField={handleChangeSeacrhValue}/>
                        </Col>
                        <Col className='position-relative'>
                            <div className='position-absolute bottom-0'>
                                <Button name={'Process'} typeButton={'success'} handleChangeProcess={handleChangeSeacrh}/>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <TableBootstraps striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <b>Transaction Date</b> 
                            <a className='float-end mx-1' onClick={() => sortDate('up')}><BsFillArrowUpSquareFill /></a> 
                            <a className='float-end mx-1' onClick={() => sortDate('down')}><BsFillArrowDownSquareFill/></a>
                        </th>
                        <th><b>Description</b></th>
                        <th><b>Category</b></th>
                        <th><b>Credit</b></th>
                        <th><b>Debit</b></th>
                        <th><b></b></th>
                    </tr>
                </thead>
                <tbody>
                    {dataTable.length ? (
                        dataTable.map((item: any, index: any) => {
                            return (
                                <tr key={index}>
                                    <td className="align-middle">{item.transactionDate}</td>
                                    <td className="align-middle">{item.description}</td>
                                    <td className="align-middle">{item.category}</td>
                                    <td className="align-middle">{item.credit ? item.credit : '-'}</td>
                                    <td className="align-middle">{item.debit ? item.debit : '-'}</td>
                                    <td className='align-middle text-center'>
                                        <Link href={`/detail/${item.id}`}>
                                            <a className="btn btn-success">Detail</a>
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
            <Row>
                <Col className='flex align-items-center'>
                    Page  {activePage}
                </Col>
                <Col>
                    <Pagination handleChangePagination={handleChangePagination} dataBank={totalPage} limitPage={10} activePage={activePage} startPage={pageStartNumber} />
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default Table