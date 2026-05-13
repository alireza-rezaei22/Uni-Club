"use client"
import { useEffect, useState, useContext } from "react"
import Comment from '../comment/comment'
// import { AuthContext } from "../../Contexts/AuthContext";
// import AlertContext from "../../Contexts/AlertContext";

export default function Comments({ productId, productTitle }) {
    // const authContext = useContext(AuthContext)
    // const alertContext = useContext(AlertContext)
    // const userInfo = authContext?.userInfo
    // console.log(userInfo);
    const [comments, setComments] = useState([
        {
            productId: "7",
            userId: 1,
            name: "alireza",
            productTitle: "sperso maker",
            comment: "متاسفانه کارتون پاره بود متاسفانه کارتون پاره بودمتاسفانه کارتون پاره بودمتاسفانه کارتون پاره بودمتاسفانه کارتون پاره بودمتاسفانه کارتون پاره بودمتاسفانه کارتون پاره بودمتاسفانه کارتون پاره بودمتاسفانه کارتون پاره بودمتاسفانه کارتون پاره بودمتاسفانه کارتون پاره بودمتاسفانه کارتون پاره بود",
            id: 2
        },
        {
            productId: "5",
            userId: 2,
            name: "09123456789",
            productTitle: "coffee arabica",
            comment: "کامنت تستی2",
            id: 8
        },
        {
            productId: "5",
            userId: 2,
            name: "amir amiri",
            productTitle: "coffee arabica",
            comment: "تست 3",
            id: 9
        }
    ])
    const [userComment, setUserComment] = useState()
    const submitComment = () => {
        console.log(userComment);
        const userInput = userComment
        if (userInput){
            const newComment = {
                productId : "5",
                userId : 2,
                name : "amir amiri",
                productTitle : "coffee arabica",
                comment : userInput,
                id : 9
            }
            setComments(prev=> [...prev, newComment])
            setUserComment('')
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
                    return <Comment key={comment.id} {...comment} />
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
                <button className=" bg-indigo-700 text-white rounded-md px-3 py-1" onClick={submitComment}>ارسال</button>
            </div>
        </div>
    )
}