import { Card, CardBody, CardHeader } from '@nextui-org/card';

interface Props {
    totalClients: number | string;

}


export const ClientsReportCard = ({ totalClients }: Props) => {
    return (
        <div className='product__reports'>
            <Card className='product__report--card bg-gradient  ' isPressable>
                <CardHeader className='p-0'>
                    <h3>Total del clientes </h3>
                </CardHeader>
                <CardBody className="p-0 overflow-visible">
                    <h3 className=' text-white text-[2rem] md:text-[3rem] font-bold'>
                        {totalClients}
                    </h3>
                    <p className='text-white text-base font-light block'>Clientes totales</p>
                </CardBody>
            </Card>

            <Card className='product__report--card bg-gradient ' isPressable>
                <CardHeader className='p-0'>
                    <h3>Nuevos clientes</h3>
                </CardHeader>
                <CardBody className="p-0 overflow-visible">
                    <h3 className=' text-white text-[2rem] md:text-[3rem] font-bold'>
                        5
                    </h3>
                    <p className='text-white text-base font-light block'>
                        Agregados hoy
                    </p>
                </CardBody>
            </Card>


        </div>
    )
}
