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
import Menu from '@/Components/menu/menu';
import connectToDB from '@/configs/DB';
import OstadItem from '@/Components/ostadItem/OstadItem';
import commentModel from '@/model/comment';
import ostadModel from '@/model/ostad';
import MyComment from '@/Components/myComment/MyComment';
import MyOstad from '@/Components/myOstad/MyOstad';

export const dynamic = 'force-dynamic'

async function Panel() {
  const userToken = (await cookies()).get('token')
  const token = userToken?.value

  let userProductsCount = 0
  let lastProduct = []
  let userMarksCount = 0
  let userLastMark = []
  let userChatsCount = 0
  let lastChatItem = []
  let chatInfo = {}
  let markCommentsCount = 0
  let UserCommentsCount = 0
  let UserLastComment = []

  let UserOstadsCount = 0
  let UserLastOstad = []

  try {
    const userInfo = verify(token, process.env.ACCESSTOKEN_SECRETKEY)
    await connectToDB()
    const [userPsCount = 0, lastP = []] = await Promise.all([
      productModel.countDocuments({ ownerId: userInfo.id }),
      productModel.findOne({ ownerId: userInfo.id }).sort({ date: -1 }).select('-__v -location -ownerId').lean()
    ])
    userProductsCount = userPsCount
    lastProduct = lastP
    const [UMarksCount = 0, ULastMark = []] = await Promise.all([
      markModel.countDocuments({ userId: userInfo.id }),
      markModel.findOne({ userId: userInfo.id }).sort({ _id: -1 }).select('itemId itemType').populate('itemId')
    ])
    userMarksCount = UMarksCount
    userLastMark = ULastMark
    markCommentsCount = await commentModel.countDocuments({ ostadId: ULastMark?.itemId._id }).lean()

    const [UCommentsCount = 0, ULastComment = []] = await Promise.all([
      commentModel.countDocuments({ userId: userInfo.id }),
      commentModel.findOne({ userId: userInfo.id }).sort({ _id: -1 }).select('ostadId comment').populate({ path: 'ostadId', select: 'name image degree studyField category rate startYear' }).lean()

    ])
    UserCommentsCount = UCommentsCount
    UserLastComment = ULastComment

    const [UOstadsCount = 0, ULastOstad = []] = await Promise.all([
      ostadModel.countDocuments({ registrarId: userInfo.id }),
      ostadModel.findOne({ registrarId: userInfo.id }).sort({ _id: -1 }).select('-courses -biography -__v').lean()

    ])
    UserOstadsCount = UOstadsCount
    UserLastOstad = ULastOstad

    const [UChatsCount = 0, ULastChatItem = []] = await Promise.all([
      chatModel.countDocuments({ participants: userInfo.id }),
      chatModel
        .findOne({ participants: userInfo.id })
        .sort({ 'messages.createdAt': -1 }).populate({ path: 'productId', select: 'title image' }).populate({ path: 'participants', select: 'name' })
        .lean()
    ])
    userChatsCount = UChatsCount
    lastChatItem = ULastChatItem
    const lastMsgText = lastChatItem?.messages[lastChatItem.messages.length - 1].text || []
    const otherParticipantName = lastChatItem?.participants.find(part => part.name !== userInfo.name).name || null
    chatInfo = {
      _id: lastChatItem?._id,
      chatId: lastChatItem?.chatId,
      productId: lastChatItem?.productId,
      participants: lastChatItem?.participants,
      otherParticipantName,
      lastMsgText,
    }


  } catch (error) {
    console.log(error);

  }
  return (
    <>
      <Menu />
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
        <StatusCount title={'تعداد دیدگاه ها'} count={UserCommentsCount} describe={''} href={'panel/myComments'}>
          {
            UserLastComment ?
              <MyComment {...UserLastComment} />
              :
              <NullItemPanel text={'تاکنون معامله ای نداشته اید'} />
          }
        </StatusCount>
        <StatusCount title={'تعداد نشان شده ها'} count={userMarksCount} describe={''} href={'panel/myMarks'}>
          {
            userMarksCount ?
              userLastMark?.itemType == 'ostad' ?
                <OstadItem key={userLastMark?.itemId._id} ostad={userLastMark?.itemId} commentsCount={markCommentsCount} /> :
                <ProductItem product={userMarksCount} />
              :
              <NullItemPanel text={'تاکنون آگهی را نشان نکرده اید'} />
          }
        </StatusCount>
        <StatusCount title={'تعداد اساتید'} count={UserOstadsCount} describe={''} href={'panel/myOstads'}>
          {
          UserOstadsCount ?
          <MyOstad {...UserLastOstad} />
          :
          <NullItemPanel text={'تاکنون آگهی را نشان نکرده اید'} />
          }
        </StatusCount>
        <StatusCount title={'تعداد گفتوگو شده ها'} count={userChatsCount} describe={''} href={'panel/chats'}>
          {
            false ?
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