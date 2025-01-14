import { Card, CardBody, CardHeader } from '@nextui-org/card';

interface Props {
    totalProducts: number | string;

}


export const ProductReportCard = ({ totalProducts }: Props) => {
    return (
        <section>
            <div className='product__report--container'>
                <Card className='product__report--card bg-gradient' isPressable>
                    <CardHeader className='p-0'>
                        <h3>Total del productos </h3>
                    </CardHeader>
                    <CardBody className="p-0 overflow-visible">
                        <h3 className=' text-white text-[2rem] md:text-[3rem] font-bold'>
                            { totalProducts }
                        </h3>
                        <p className='text-white text-base font-light block'>Unidades totales</p>
                    </CardBody>
                </Card>
                
                <Card className='product__report--card bg-gradient ' isPressable>
                    <CardHeader className='p-0'>
                        <h3>Nuevos productos</h3>
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
                
                <Card className='product__report--card bg-gradient ' isPressable>
                    <CardHeader className='p-0'>
                        <h3>Productos en oferta</h3>
                    </CardHeader>
                    <CardBody className="p-0 overflow-visible">
                        <h3 className=' text-white text-[2rem] md:text-[3rem] font-bold'>
                            14
                        </h3>
                        <p className='text-white text-base font-light block'>
                            Ofertas disponibles
                        </p>
                    </CardBody>
                </Card>

            </div>
        </section>
    )
}
