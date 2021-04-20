import '../App.css'
import { AccessType } from './Typer'

type Props = {
  ac: AccessType
}
const Access = (props: Props) => {
  if (props.ac === 'granted') {
    return (
      <div className='Access' style={{ background: 'green' }}>
        ACCESS GRANTED
      </div>
    )
  } else if (props.ac === 'denied') {
    return (
      <div className='Access' style={{ background: 'red' }}>
        ACCESS DENIED
      </div>
    )
  } else {
    return null
  }
}

export default Access
