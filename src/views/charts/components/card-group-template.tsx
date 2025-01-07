import {Card, CardBody, CardHeader, CardText, Col, Row} from "reactstrap"

const CardGroupTemplate = (props: any) => {
  const {data} = props
  return (
    <div className='template'>
      <Card className='card-statistics p-1 m-0' style={{height: '100%', width: '100%'}}>
        <CardHeader className='d-flex justify-content-center pt-75 pb-75' style={{boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)'}}>
          <CardText tag='h5' className="p-0 text-center">{data.data.title}</CardText>
        </CardHeader>
        <CardBody className='p-0 mt-75'>
          <Row className='gx-1'>
            {data.data.data.map((item: any, index: number) => (
              <Col lg={4} key={index} >
                <div className='h-100 p-50 d-flex flex-column justify-content-between' style={{boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)', backgroundColor: '#fff', borderRadius: '10px'}}>
                  <h5>{item.title}</h5>
                  <h5 className='pt-50'>{item.value}</h5>
                </div>

              </Col>
            ))}
          </Row>

        </CardBody>
      </Card>
    </div>
  )
}

export default CardGroupTemplate
