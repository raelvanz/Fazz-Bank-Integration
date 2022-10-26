import React from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router'
import Card from 'react-bootstrap/Card';

const Detail: NextPage = (props: any) => {
    const router = useRouter()
    const dataBank = props
    const detailId = router.query.detailId
    
    return (
        <div className='container py-4'>
        <h2 className="mb-3 grad-prim"><b>Detail {dataBank.metaData[0].title}</b></h2>
        {dataBank.accounts.map((data: any, index: any) => {
            return (
                <React.Fragment key={index}>
                    <div>
                        {
                            data.id == detailId ? (
                                <React.Fragment>
                                    <Card >
                                        <Card.Header>{data.description}</Card.Header>
                                        <Card.Body>
                                            <Col xs lg="4">
                                                <Row>
                                                    <Col><b>Category</b></Col>
                                                    <Col>&nbsp; : &nbsp; {data.category}</Col>
                                                </Row>
                                                <Row>
                                                    <Col><b>Debit</b></Col>
                                                    <Col>&nbsp; : &nbsp; {data.debit ? data.debit : '-'}</Col>
                                                </Row>
                                                <Row>
                                                    <Col><b>Credit</b></Col>
                                                    <Col>&nbsp; : &nbsp; {data.credit ? data.credit : '-'}</Col>
                                                </Row>
                                                <Row>
                                                    <Col><b>Date</b></Col>
                                                    <Col>&nbsp; : &nbsp; {data.transactionDate}</Col>
                                                </Row>
                                            </Col>
                                        </Card.Body>
                                    </Card>
                                    <br />
                                    <Link href={`/`}>
                                        <a className='btn btn-light'>Back To Homepage</a>
                                    </Link>
                                </React.Fragment>
                            ) : (
                                <React.Fragment></React.Fragment>
                            )
                        }
                    </div>
                </React.Fragment>
            )
        })}
    </div>
  )
}

import fsPromises from 'fs/promises'
import path from 'path'
export async function getServerSideProps() {
    try {
        const filePath = path.join(process.cwd(), `${process.env.NEXT_PUBLIC_API_FAZZBANK}`)
        const jsonData = await fsPromises.readFile(filePath)
        const objectData = JSON.parse(jsonData.toString())
        return {
          props: objectData
        }
      } catch (error) {
        return {
          notFound: true
        }
    }
}

export default Detail