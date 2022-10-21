import type { NextPage } from 'next'
import Table from '../src/component/Table/Table';

const Home: NextPage = (props: any) => {
  const dataBank = props;
  return (
    <div className='container py-4'>
      <h1>{dataBank.metaData[0].title}</h1>
      <h3>{dataBank.metaData[0].desc}</h3>
      <p>{dataBank.metaData[0].longDesc}</p>
      <Table dataBank={dataBank.accounts}/>
    </div>
  )
}

import fsPromises from 'fs/promises';
import path from 'path'
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'json/bank.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData.toString());

  return {
    props: objectData
  }
}

export default Home