import Avatar from "@components/avatar"
import { Box, Calendar, DollarSign, TrendingUp, User } from "becoxy-icons"
import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from "reactstrap"

const StatsCard = () => {
  const data = [
    {
      title: '230k',
      subtitle: 'Nhân sự',
      color: 'light-primary',
      icon: <User  fontSize={24} />
    },
    {
      title: '8.549k',
      subtitle: 'Tài sản',
      color: 'light-info',
      icon: <TrendingUp fontSize={24} />
    },
    {
      title: '1.423k',
      subtitle: 'Hàng chính',
      color: 'light-danger',
      icon: <Box fontSize={24} />
    },
    {
      title: '$9745',
      subtitle: 'Công lương',
      color: 'light-warning',
      icon: <DollarSign fontSize={24} />
    },
    {
      title: '$9745',
      subtitle: 'Tuyển dụng',
      color: 'light-success',
      icon: <Calendar fontSize={24} />
    }
  ]
  const renderData = () => {
    return data.map((item, index) => {
      return (
        <Col key={index}>
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }
  return (
    <Card className='card-statistics p-0 h-100'>
      <CardHeader>
        <CardTitle tag='h4' className="p-0">Thành phần công ty</CardTitle>
        {/* <CardText className='card-text font-small-2 me-25 mb-0 p-0'>Updated 1 month ago</CardText> */}
      </CardHeader>
      <CardBody className='pb-0 pt-0 m-0' style={{
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'inherit',
        justifyContent: 'space-evenly'
      }}>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}
export default StatsCard