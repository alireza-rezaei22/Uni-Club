const { verify } = require("jsonwebtoken")
const { cookies } = require("next/headers")

const authorizUser = async () => {
  const userToken = (await cookies()).get('token')
  const token = userToken?.value
  if (token) {
    const userInfo = verify(token, process.env.ACCESSTOKEN_SECRETKEY)
    return userInfo
  }else{
    return null
  }
}
export default authorizUser