import Avatar from "@components/avatar"
import { User } from "becoxy-icons"
import { Card, CardHeader, CardText } from "reactstrap"
const CardTemplate = () => {
  return (
    <Card >
      <CardHeader className='align-items-start pb-0'>
        <div>
          <h2 className='fw-bolder'>60</h2>
          <CardText>Nhân sự</CardText>
        </div>
        <Avatar className='avatar-stats p-50 m-0' color={`light-danger`} icon={<User fontSize={21} />} />
      </CardHeader>
    </Card>
  )
}
export default CardTemplate