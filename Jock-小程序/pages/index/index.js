//index.js
//获取应用实例
const app = getApp()
Page({
  data: {

    phoneInfo:{
     
    },
    phoneNum:'',
  },
  phoneNum:function(e){
    var that=this

    that.setData({

       phoneNum:e.detail.value

    })
  },
  cleanPhoneNum:function(){
    var that = this;
    that.setData({
     phoneNum:''
    })

  },
  sendPhoneNum:function(){
    wx.showLoading({
      title: '加载中',
    })

    var that=this,
        phonenumber  = that.data.phoneNum.replace(/-/g,""),
        myreg=/^[1][3,4,5,7,8][0-9]{9}$/, 
        sendphone  = phonenumber.substring(0,7);

    if (!myreg.test(phonenumber)){ 

      wx.showModal({
            content: '请输入合法序列号码!',
          });
      that.setData({

       phoneNum:''

      })
      wx.hideLoading()

      return;

    }else{
      wx.request({
        url:'https://apis.juhe.cn/mobile/get?phone='+sendphone+'&key=1189e3089256749ff5773e38babdab82',
        success:function(res){
          wx.hideLoading()
          if(res.data.resultcode==200){

            that.setData({
               phoneInfo:res.data.result
            })



          }else{
            wx.showModal({
              content: '请重试',
           
            });
          }
          
        },
        fail:function(err){
          console.log(err);
          wx.hideLoading()
          wx.showModal({
            content: '请重试',
          });
          that.setData({
            phoneInfo:''
          })

        }
      })
    }


   



  }

})

