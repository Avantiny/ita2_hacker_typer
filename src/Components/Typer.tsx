import { Hackstring } from './Hackstring'
import Access from './Access'
import Cursor from './Cursor'
import Footer from './Footer'
import React from 'react'

const MAX_TYPING_SPEED = 20
const MIN_TYPING_SPEED = 1

export type AccessType = 'not shown' | 'granted' | 'denied'
type State = {
  numChars: number
  access: AccessType
  shownText: string
  typingSpeed: number
  scroll: number | undefined
  cursorDisplay: boolean
  cursorTime: number
}

type Props = {}

class Typer extends React.Component<Props, State> {
  state: State = {
    numChars: 0,
    shownText: '',
    access: 'not shown',
    scroll: 0,
    typingSpeed: 3,
    cursorDisplay: true,
    cursorTime: 500,
  }

  scrolldownRef = React.createRef<HTMLDivElement>()

  keyAdd = () => {
    const isTextFinised = this.state.shownText.length >= Hackstring.length
    this.setState(p => ({
      numChars: isTextFinised ? 0 : p.numChars + 1 * p.typingSpeed,
      shownText: isTextFinised ? '' : Hackstring.substring(0, p.numChars + 1),
    }))
  }

  keyHandle = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        this.setState({ access: 'granted' })
        break
      case 'CapsLock':
        this.setState({ access: 'denied' })
        break
      case 'Escape':
        this.setState({ access: 'not shown' })
        break
      case '+':
        if (this.state.typingSpeed < MAX_TYPING_SPEED) {
          this.setState(prevsState => ({ typingSpeed: prevsState.typingSpeed + 1 }))
        }
        break
      case '-':
        if (this.state.typingSpeed > MIN_TYPING_SPEED) {
          this.setState(prevsState => ({ typingSpeed: prevsState.typingSpeed - 1 }))
        }
        break
      default:
        this.keyAdd()
        break
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyHandle)
    setInterval(() => {
      this.setState(prevState => ({ cursorDisplay: !prevState.cursorDisplay }))
    }, this.state.cursorTime)
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    this.scrolldownRef.current?.scrollIntoView()
  }

  render() {
    return (
      <div className='Hacktheme'>
        <div className='Text'>
          {this.state.shownText.split('\n').map((item, i) => (
            <div key={i}>
              {item}
              {i + 1 === this.state.shownText.split('\n').length && (
                <Cursor cursorDisplay={this.state.cursorDisplay} />
              )}
            </div>
          ))}
          <Access ac={this.state.access} />
          <div ref={this.scrolldownRef} />
        </div>
        <Footer typingSpeed={this.state.typingSpeed} />
      </div>
    )
  }
}

export default Typer
