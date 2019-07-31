var httpUrl = "https://www.hrquan.com.cn/"; //'http://192.168.31.42:8080/'

module.exports = {
  httpUrl: httpUrl,
  getWechID: httpUrl + "wx/login",  //微信小程序获取openid与unionid

  getAddAuditing: httpUrl + "memberapi/addAuditing",  //发起注册申请
  getHomeData: httpUrl + "memberapi/indexResult",  //首页接口----
  getNewHomeData: httpUrl + "gunsApi/newIndexResult", //新首页接口----
  getAssociationMessageDetail: httpUrl + "memberapi/associationMessageDetail",  //协会消息详情----
  getChecklogin: httpUrl + "memberapi/checklogin",  //验证注册权限
  getCheckloginNew: httpUrl + "/memberapi/login",  //手机号和验证码登陆
  getRegisterOrLogin: httpUrl + "/memberapi/registerOrLogin",//手机号和验证码登陆或注册
  getPay: httpUrl + "memberapi/pay",  //购买积分
  getVerificationCode: httpUrl + "memberapi/verificationCode",  //获取验证码
  getJobRecruitList: httpUrl + "memberapi/JobRecruitList",  //招聘列表
  gerUpDataFile: httpUrl + "memberapi/upload",  //上传文件

  getOpenidLogin: httpUrl + "memberapi/openidLogin",  //openid登陆
  getBestAnswer: httpUrl + "gunsApi/bestAnswer",  //选中最佳答案
  getCheckExchangeMp: httpUrl + "gunsApi/checkExchangeMp",  //检查用户积分兑换H币可兑换数量以及比例
  getCheckExchangePoint: httpUrl + "gunsApi/checkExchangePoint",  //检查用户H币兑换积分可兑换数量以及比例
  getExchangeMp: httpUrl + "gunsApi/exchangeMp",  //用户H币兑换积分
  getExchangePointn: httpUrl + "gunsApi/exchangePoint",  //用户积分兑换H币
  getPointHistory: httpUrl + "gunsApi/pointHistory",  //我的H币历史(新)
  
  getExchangeRecord: httpUrl + "gunsApi/exchangeRecord",  //用户兑换积分历史记录
  getExchangeRecordnew: httpUrl + "gunsApi/exchangeHistoryRecord",  //用户兑换积分历史记录(新)
  getMessageDetail: httpUrl + "gunsApi/messageDetail",  //消息详情加已读接口
  getMessageList: httpUrl + "gunsApi/messageList",  //消息列表
  getMyJobRecruit: httpUrl + "gunsApi/myJobRecruit",  //我的发布
  getMyQuestion: httpUrl + "gunsApi/myQuestion",  //我的问答
  getMypointHistory: httpUrl + "gunsApi/mypointHistory",  //我的积分历史
  getMypointHistorynew: httpUrl + "gunsApi/myMpHistory",  //我的积分历史(新)
  getOrderDetail: httpUrl + "gunsApi/orderDetail",  //订单详情
  getOrderList: httpUrl + "gunsApi/orderList",  //订单列表
  getPerInfo: httpUrl + "gunsApi/perInfo",  //个人信息
  getQuestionDetail: httpUrl + "gunsApi/questionDetail",  //问答详情
  getResumeDetail: httpUrl + "gunsApi/resumeDetail",  //简历详情
  getUpdatePerInfo: httpUrl + "gunsApi/updatePerInfo",  //修改个人信息
  getResumeList: httpUrl + "memberapi/resumeList",  //招聘列表
  getUpload: httpUrl + "memberapi/upload",  //通用上传接口
  getQuestionList: httpUrl + "memberapi/questionList",  //有问必答列表
  getAnswerQuestion: httpUrl + "gunsApi/answerQuestion",  //回答问题
  getCreateQuestion: httpUrl + "gunsApi/createQuestion",  //发布问题
  getAssociationMessageList: httpUrl + "memberapi/associationMessageList",  //协会消息列表
  getCreateResume: httpUrl + "gunsApi/createResume",  //创建简历
  getCreateJobRecruit: httpUrl + "gunsApi/createJobRecruit",  //发布招聘
  getDeleteMyresume: httpUrl + "gunsApi/deleteMyresume",  //删除我发布的简历

  getTtrainList: httpUrl + "memberapi/trainList",  //培训列表
  getFfollowTrain: httpUrl + "gunsApi/followTrain",//参加培训
  getTrainDetail: httpUrl + "gunsApi/trainDetail",//培训详情
  getAttendTrainResults: httpUrl + "memberapi/attendTrainResults",//参加过此次培训的人
  getJobRecruitInfo: httpUrl + "memberapi/jobRecruitInfo",//招聘详情
  getCreateOrder: httpUrl + "memberapi/createOrder",//创建订单
  getMyTrainList: httpUrl + "gunsApi/myTrainList",//我的培训
  getDeleteMyQuestion: httpUrl + "gunsApi/deleteMyQuestion",//删除我的问答
  getDeleteMyJobRecruit: httpUrl + "gunsApi/deleteMyJobRecruit",//删除我发布的招聘
  getDeleteMyMessage: httpUrl + "gunsApi/deleteMyMessage",//删除我的消息
  getTemplateMessage: httpUrl + "wx/templateMessage",//微信小程序模板消息

  getUserInfo: httpUrl + "wx/getUserInfo",//获取微信用户基本信息接口
  getOpenidRegisterOrLogin: httpUrl + "memberapi/openidRegisterOrLogin",//微信openid登陆或注册

  getJobwantedPage: httpUrl + "memberapi/jobwantedPage",//求职列表
  getJobwantedResoult: httpUrl + "memberapi/jobwantedResoult",//求职详情
  getInsertJobwanted: httpUrl + "gunsApi/insertJobwanted",//添加求职

  getSaveBussinessInfo: httpUrl + "gunsApi/saveBussinessInfo",//添加企业简介
  getBusinessAuth: httpUrl + "gunsApi/businessAuth",//发起审核

}