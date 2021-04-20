type Props = {
  cursorDisplay: boolean
}

const Cursor = (props: Props) => <span>{props.cursorDisplay && '|'}</span>

export default Cursor
