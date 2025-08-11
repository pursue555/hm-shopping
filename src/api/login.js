// 此处用于存放所有登录相关的接口请求
import request from '@/utils/request'

// 1.获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 2.获取图形验证码
export const getMsgCode = (capthaCode, capthaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      capthaCode,
      capthaKey,
      mobile
    }
  })
}

// 3.登录接口
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  },
  {
    headers: {
      platform: 'H5'
    }
  })
}
