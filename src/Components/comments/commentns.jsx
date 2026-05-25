"use client"
import { useEffect, useState, useContext } from "react"
import Comment from '../comment/comment'
import toast from "react-hot-toast"

export default function Comments({ initComments, ostadId }) {
    const [comments, setComments] = useState([])
    const [userComment, setUserComment] = useState()

    useEffect(() => {
        setComments(initComments)
    }, [])

    const submitComment = async () => {
        console.log(userComment);
        const userInput = userComment
        if (userInput) {
            try {
                const res = await fetch(`/api/comments/${ostadId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        userInput
                    )
                })
                const data = await res.json()
                console.log(data.status);

                if (data.status == 201) {
                    toast.success(data.msg, { position: 'bottom-center' })
                    setUserComment('')
                    console.log(data);
                    setComments(data.newComments)
                } else {
                    toast.error(data.error, { position: 'bottom-center' })
                }
            } catch {

            }
            // setComments(prev => [...prev, newComment])
            // setUserComment('')
        }
        //     if (authContext.isLoggedIn) {
        //         if (userComment) {
        //             fetch('http://localhost:3000/comments', {
        //                 method: "POST",
        //                 headers: {
        //                     "Content-Type": "application/json"
        //                 },
        //                 body: JSON.stringify({
        //                     productId: productId,
        //                     userId: userInfo.id,
        //                     name: userInfo.username,
        //                     productTitle: productTitle,
        //                     comment: userComment,
        //                 })
        //             })
        //                 .then(res => {
        //                     console.log(res);
        //                     if (!res.ok) {
        //                         return res.text().then((text) => {
        //                             throw new Error(text)
        //                         })
        //                     } else {
        //                         return res.json()
        //                     }
        //                 })
        //                 .then(data => {
        //                     setComments(prev => [...prev, data])
        //                     alertContext.showAlertToast('دیدگاه شما با موفقیت ثبت شد', true, true)
        //                 })
        //                 .catch((text) => {
        //                     console.log(text.message);
        //                     switch (text.message) {
        //                         case ('Failed to fetch'): {
        //                             alertContext.showAlertToast('خطا در اتصال به سرور', true, false)
        //                         }
        //                     }
        //                 })

        //             alertContext.showAlertToast('لطفا مقداری وارد کنید', true, false)

        //         }
        //     } else {
        //         alertContext.showAlertToast('لطفا ابتدا وارد شوید', true, false)

        //     }
        //     setUserComment('')
    }
    return (
        <div className="bg-gradient-to-bl from-indigo-600 to-indigo-900 text-zinc-200 flex flex-col items-center rounded-xl px-5 py-8 mt-5 ">
            <h2 className='text-xl'>دیدگاه دانشجوایان درباره استاد</h2>
            <div className="self-start mt-8 mb-10 divide-y-[1px] w-full">
                {(comments.length > 0) ? comments.map(comment => {
                    return <Comment key={comment._id} {...comment} />
                }) :
                    <Comment />
                }
            </div>
            <div className="bg-indigo-400 w-full flex flex-col justify-center gap-y-2 items-center text-zinc-900 rounded-xl px-10 py-4">
                <h2>ثبت دیدگاه</h2>
                <textarea
                    className="bg-indigo-300 w-[100%] h-32 px-4 rounded-xl outline-none resize-none overflow-y-auto"
                    value={userComment}
                    onChange={e => setUserComment(e.target.value)}
                >

                </textarea>
                <button className=" bg-indigo-700 text-white rounded-md px-3 py-1 cursor-pointer hover:bg-indigo-800 transition-colors" onClick={submitComment}>ثبت</button>
            </div>
        </div>
    )
}