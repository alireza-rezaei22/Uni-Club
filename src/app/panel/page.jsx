import React from 'react'

import Link from 'next/link'
import { DollarSign, UserPlus2, UserRound } from 'lucide-react'
import { ShoppingBasket } from 'lucide-react'
import { Bookmark } from 'lucide-react';
import { MessagesSquare } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { PlusCircle } from 'lucide-react';
import StatusCount from '@/Components/statusCount/StatusCount';
import productModel from '@/model/product';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import markModel from '@/model/mark';
import chatModel from '@/model/chat';
import ProductItem from '@/Components/productItem/ProductItem';
import NullItemPanel from '@/Components/nullItemPanel/nullItemPanel';
import ChatItem from '@/Components/chatItem/chatItem';
import Meniu from '@/Components/meniu/meniu';
import connectToDB from '@/configs/DB';
import OstadItem from '@/Components/ostadItem/OstadItem';
import commentModel from '@/model/comment';

export const dynamic = 'force-dynamic'

async function Panel() {

  const routes = [
    { name: 'اطلاعات من', icon: UserRound, path: '/panel/userInfo' },
    { name: 'آگهی های من', icon: ShoppingBasket, path: '/panel/myProducts' },
    { name: 'معاملات من', icon: DollarSign, path: '#' },
    { name: 'اگهی جدید', icon: PlusCircle, path: '/panel/newProduct' },
    { name: 'استاد جدید', icon: UserPlus2, path: '/panel/newProduct' },
    { name: 'نشان شده ها', icon: Bookmark, path: '/panel/markedProducts' },
    { name: 'گفتوگو های من', icon: MessagesSquare, path: '/panel/chats' },
    { name: 'خروج', icon: LogOut, path: '/' },
  ]
  const userToken = (await cookies()).get('token')
  const token = userToken?.value

  const userInfo = verify(token, process.env.ACCESSTOKEN_SECRETKEY)
  await connectToDB()
  const [userProductsCount = 0, lastProduct] = await Promise.all([
    productModel.countDocuments({ ownerId: userInfo.id }),
    productModel.findOne({ ownerId: userInfo.id }).sort({ date: -1 }).select('-__v -location -ownerId').lean()
  ])
  const [userMarksCount = 0, lastMarkRes] = await Promise.all([
    markModel.countDocuments({ userId: userInfo.id }),
    markModel.findOne({ userId: userInfo.id }).sort({_id: -1}).select('itemId itemType').populate('itemId')
  ])
  const lastMark = lastMarkRes?.itemId
  const commentsCount = await commentModel.countDocuments({ ostadId: lastMarkRes.itemId._id }).lean()

  console.log(lastMarkRes);

  const [userChatsCount = 0, lastChatItem] = await Promise.all([
    chatModel.countDocuments({ participants: userInfo.id }),
    chatModel
      .findOne({ participants: userInfo.id })
      .sort({ 'messages.createdAt': -1 }).populate({ path: 'productId', select: 'title image' }).populate({ path: 'participants', select: 'name' })
      .lean()

  ])
  const lastMsgText = lastChatItem?.messages[lastChatItem.messages.length - 1].text || []
  const otherParticipantName = lastChatItem?.participants.find(part => part.name !== userInfo.name).name || null
  const chatInfo = {
    _id: lastChatItem?._id,
    chatId: lastChatItem?.chatId,
    productId: lastChatItem?.productId,
    participants: lastChatItem?.participants,
    otherParticipantName,
    lastMsgText,
  }

  return (
    <>
      <Meniu />
      <div className='w-full hidden md:flex flex-wrap'>
        <StatusCount title={'تعداد آگهی ها'} count={userProductsCount} describe={''} href={'panel/myProducts'}>
          {
            lastProduct ?
              <ProductItem product={lastProduct} /> :
              <NullItemPanel text={'تاکنون آگهی ثبت نکرده اید'} />
          }
        </StatusCount>
        <StatusCount title={'تعداد معاملات'} count={0} describe={''} href={'panel/'}>
          {
            false ?
              <ProductItem product={lastProduct} /> :
              <NullItemPanel text={'تاکنون معامله ای نداشته اید'} />
          }
        </StatusCount>
        <StatusCount title={'تعداد نشان شده ها'} count={userMarksCount} describe={''} href={'panel/markedProducts'}>
          {
            lastMark ?
              lastMarkRes?.itemType == 'ostad' ?
                <OstadItem key={lastMarkRes?.itemId._id} ostad={lastMarkRes?.itemId} commentsCount={commentsCount} /> :
                <ProductItem product={lastMark} />
              :
              <NullItemPanel text={'تاکنون آگهی را نشان نکرده اید'} />
          }
        </StatusCount>
        <StatusCount title={'تعداد گفتوگو شده ها'} count={userChatsCount} describe={''} href={'panel/chats'}>
          {
            lastChatItem ?
              <ChatItem chat={chatInfo} />
              :
              <NullItemPanel text={'تاکنون گفتوگویی نداشته اید'} />
          }
        </StatusCount>
      </div>
    </>
  )
}

export default Panel