import { Guest } from "../../icons"

function Participant(props) {
  const {imgSrc, ...resProp} = props

  return (
    <div className="avatar flex justify-center items-center ">
      <div {...resProp}>
        {imgSrc? <img src={imgSrc} />: <Guest className='scale-75' />}
      </div>
    </div>
  )
}
export default Participant