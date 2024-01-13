import React from 'react'
import "../index.css"

const Result = ({ pointer }) => {

    const res = parseFloat(pointer.toFixed(2))
    const [imgUrl, setImgUrl] = React.useState('')
    const [message, setMessage] = React.useState('')

    React.useEffect(() => {
        if (res >= 9) {
            setImgUrl('https://giphy.com/embed/G96zgIcQn1L2xpmdxi/video')
            setMessage('Wohoooo! Keep up the top score!')
        } else if (res >= 8) {
            setImgUrl('https://giphy.com/embed/IwAZ6dvvvaTtdI8SD5')
            setMessage('Awesome! You are definitely going places!')
        } else if (res >= 7) {
            setImgUrl('https://giphy.com/embed/uJFSCnoNb98RbxoJ4p')
            setMessage('Good Job! Keep striving for more!')
        } else if (res >= 6) {
            setImgUrl('https://giphy.com/embed/0DhHqfExMMT7VdeqIr')
            setMessage('Keep trying harder buddy!')
        } else if (res >= 5) {
            setImgUrl('https://giphy.com/embed/n11bBAGXddq37hmNqP')
            setMessage('Get back to your desk and start studying!')
        } else {
            setImgUrl('https://giphy.com/embed/hyyV7pnbE0FqLNBAzs')
            setMessage('You need a lot of work! Leave everything and focus!')
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <h2 className='heading'>{`Your pointer is ${res} !`}</h2>
            <div>
                <iframe title='xyz' src={imgUrl}></iframe>
            </div>
            <p style={{marginTop: '10px', textAlign: 'center'}}>{message}</p>
        </div>
    )
}

export default Result
