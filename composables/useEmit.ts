import { FormModel } from '~~/types'
import { useToast, POSITION } from 'vue-toastification'
export const expireSeconds = 60; // 验证码过期时间，单位秒
export default function handleGetCode(form:FormModel ) {
  const countdown = ref(0);
  const isSending = ref(false);
  const error = ref('');
  const toast = useToast()
  let countdownTimer: NodeJS.Timeout | null = null;
  // 清理定时器
  const cleanupTimer = () => {
    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
  };

  // 开始倒计时
  const startCountdown = () => {
    cleanupTimer();
    countdown.value = expireSeconds;
    
    countdownTimer = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--;
      } else {
        cleanupTimer();
      }
    }, 1000);
  };
  const isEmail =(value: string) => {
    if (!value.trim().length) return true

    // https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
    const emailRe =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if (!emailRe.test(value)) {
      return false
    }
    return true
  } 
   /**
   * 获取验证码
   * @param email 目标邮箱
   * @returns 是否成功
   */
  const getCode = async (): Promise<boolean> => {
    // 清除之前的错误
    error.value = '';
    
    if (!isEmail(form.email)|| !form.email) {
      error.value = '请输入正确邮箱！';
      
       toast.error(error.value, {
        position: POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
      })
      return false;
    }
    // 检查是否在倒计时中
    // if (countdown.value > 0) {
    //   error.value = `请${countdown.value}秒后再试`;
    //   toast.error(error.value, {
    //     position: POSITION.BOTTOM_CENTER,
    //     hideProgressBar: true,
    //   })
    //   return false;
    // }
    const email = form.email;
    try {
      isSending.value = true;
      const result:any = await $fetch('/api/verification', {
        method: 'POST',
        body: { 
          email, 
        },
     });
     
      if (result.code === 200) {
        startCountdown();
        toast.success(
          '验证码已发送，请查收邮件', {
          position: POSITION.TOP_CENTER,
          hideProgressBar: true,
        })
        return true;
      } 
      // else if (result.status === 429) {
      //   error.value = result.message ;
      //   toast.error(error.value, {
      //   position: POSITION.BOTTOM_CENTER,
      //   hideProgressBar: true,
      // })
      //   return false;
      // }
      // else {
      //   error.value = result.message || '发送验证码失败';
      //   toast.error(error.value, {
      //   position: POSITION.BOTTOM_CENTER,
      //   hideProgressBar: true,
      // // })
      //   return false;
      // }
      else {
        error.value = result.error || '发送验证码失败';
        toast.error(error.value, {
          position: POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
        })
        return false;

      }
    } catch (err: any) {
      const errData = err.data.data;
      error.value = '获取验证码时发生错误，请稍后重试';
      if(err.statusCode === 492){
        error.value = '邮件发送失败';
      }
       if(err.statusCode === 491){
        error.value = '邮箱已被使用';
      }
      if(err.statusCode === 429){
        const time = errData.cd;
        error.value = `操作过于频繁，请${time}秒后再试`;
      }
      toast.error(error.value, {
        position: POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
      })
      
      return false;
    } finally {
    
      isSending.value = false;
    }
  };


  const clearError = () => {
    error.value = '';
  };

  return {
    countdown,
    isSending,
    error,
    getCode,
    clearError
  };
};