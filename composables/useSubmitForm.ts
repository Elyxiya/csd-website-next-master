import { useToast, POSITION } from 'vue-toastification'
import { FormModel } from '~~/types'

export default function useSubmitForm(form: FormModel, hcaptChaToken?: Ref<string>) {
  const isLoading = ref(false)
  const toast = useToast()
  const router = useRouter()
  async function handleSubmit() {
 

    if (isLoading.value) return
    isLoading.value = true
    

    const response = await $fetch('/api/enrolls', {
    method: 'POST',
    
    body: {
      data: form,
      
    },
   })
    .catch((e) => {
      isLoading.value = false
      let word = '提交失败，请联系管理员！'
      if(e.statusCode === 400){

        toast.error('提交信息出错！', {
          position: POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
        })
      }
      else if(e.statusCode === 402){
        toast.error('邮箱或验证码错误！', {
          position: POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
        })
      }
      else if(e.statusCode === 491){
        toast.error('该学号已报名！', {
          position: POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
        })
      }
      else{
         toast.error('提交失败，请联系管理员！', {
        position: POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
      })
      }
     
      throw e
    })
    .then(() => {
      router.push('/apply/success')
    })
    console.log('response2', response)
    isLoading.value = false
  }

  return { isLoading, handleSubmit }
}
