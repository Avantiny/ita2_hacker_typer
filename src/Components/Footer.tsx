import '../App.css'
import React from 'react'

type Props = {
  typingSpeed: number
}

export class Footer extends React.PureComponent<Props> {
  render() {
    return (
      <div className='Footer'>
        <div>Press + or - to change typing speed</div>
        <div>Typing Speed: {this.props.typingSpeed}</div>
        <div>Press Enter/Caps Lock to show Access Granted/Denied. Clear with Esc. </div>
      </div>
    )
  }
}

export default Footer
