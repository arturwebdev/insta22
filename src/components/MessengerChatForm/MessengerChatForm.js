import './MessengerChatForm.css'
import IMAGES from '../../images'

function MessengerChatForm() {
  return (
	 <div className='Chat-input'>
		<input type='text' placeholder='Message...'/>
		<img src={IMAGES.like} alt=''/>
	 </div>
  )
}

export default MessengerChatForm
