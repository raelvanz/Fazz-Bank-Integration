import Link from 'next/link'
import React,{FC} from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';

const Detail: NextPage = (props: any) => {
    const router = useRouter();
    const dataBank = props;
    const detailId = router.query.detailId;
    
    return (
        <div className='container py-4'>
        <h1 className="mb-3">Detail {dataBank.metaData[0].title}</h1>
        {dataBank.accounts.map((data: any, index: any) => {
            return (
                <React.Fragment key={index}>
                    <div>
                        {
                            data.id == detailId ? (
                                <React.Fragment>
                                    <h5>{data.description}</h5>
                                    <p className="my-1">
                                        Category : {data.category}
                                    </p>
                                    <p className="my-1">
                                        Debit : {data.debit ? data.debit : '-'}
                                    </p>
                                    <p className="my-1">
                                        Credit : {data.credit ? data.credit : '-'}
                                    </p>
                                    <p className="my-1">
                                        Date : {data.transactionDate}
                                    </p>
                                    <br />
                                    <Link href={`/`}>
                                        <a>Back To Homepage</a>
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

import fsPromises from 'fs/promises';
import path from 'path'
export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'json/bank.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData.toString());

  return {
    props: objectData
  }
}

export default Detail