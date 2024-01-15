import React from 'react'
import "../index.css"

const Result = ({ pointer }) => {

    const res = parseFloat(pointer.toFixed(2))
    const [imgUrl, setImgUrl] = React.useState('')
    const [message, setMessage] = React.useState('')

    React.useEffect(() => {
        if (res >= 9) {
            setImgUrl('https://i.ibb.co/Ry7g69d/10-9.jpg')
            setMessage('Wohoooo! Keep up the top score!')
        } else if (res >= 8) {
            setImgUrl('https://i.ibb.co/xfLy0Pq/8-9.jpg')
            setMessage('Awesome! You are definitely going places!')
        } else if (res >= 7) {
            setImgUrl('https://i.ibb.co/xMGC0bX/7-8.jpg')
            setMessage('Good Job! Keep striving for more!')
        } else if (res >= 6) {
            setImgUrl('https://i.ibb.co/1MG4psK/6-7.jpg')
            setMessage('Keep trying harder buddy!')
        } else if (res >= 5) {
            setImgUrl('https://i.ibb.co/MNp2nDX/5-6.jpg')
            setMessage('Get back to your desk and start studying!')
        } else if(res >= 4) {
            setImgUrl('https://i.ibb.co/RS4XDzy/4-5.jpg')
            setMessage('You need a lot of work! Leave everything and focus!')
        } else  {
            setImgUrl('https://i.ibb.co/2qq4151/4-less.jpg')
            setMessage('Success is not final, failure is not fatal: It is the courage to continue that counts!')
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <h2 style={{fontFamily:'cursive'}} className='heading text-3xl text-gray-900'>{`Your pointer is ${res} !`}</h2>
            <div className='h-full w-full items-center flex justify-center '>
               <img src = {imgUrl} className='h-3/4 w-3/4  md:h-2/4 md:w-2/4 ' style={{mixBlendMode: "multiply"}} />
            </div>
            <p className='text-2xl text-gray-700' style={{marginTop: '10px', textAlign: 'center', fontFamily:'arial'}}>{message}</p>
        </div>
    )
}

export default Result
